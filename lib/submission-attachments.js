const fs = require('fs'), path = require('path'), crypto = require('crypto'), { execFile } = require('child_process');
const MAX_FILE = 5 * 1024 * 1024, MAX_TOTAL = 12 * 1024 * 1024, MAX_COUNT = 3;
const directory = path.join(path.dirname(require('./cms-store').CMS_DATA_FILE), 'submission-attachments');
const scanner = process.env.CLAMAV_SCAN_COMMAND || 'clamscan';
let busy = false;
const fail = (code, statusCode = 400) => Object.assign(Error(code), { publicCode: code, statusCode });
function run(args) { return new Promise((resolve, reject) => execFile(scanner, args, { timeout: 60000, maxBuffer: 65536, windowsHide: true }, (error, stdout) => error ? reject(error) : resolve(stdout))); }
let readiness;
async function available() {
  if (readiness && Date.now() - readiness.at < 60000) return readiness.ok;
  const temp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'saeed-av-'));
  try {
    const probe = path.join(temp, 'probe.txt'); fs.writeFileSync(probe, 'Saeed attachment scanner readiness probe');
    await run(['--no-summary', '--fail-if-cvd-older-than=7', probe]);
    readiness = { at: Date.now(), ok: true }; return true;
  } catch { readiness = { at: Date.now(), ok: false }; return false; }
  finally { fs.rmSync(temp, { recursive: true, force: true }); }
}
function validate(input) {
  if (!input || typeof input !== 'object') throw fail('invalid_attachment');
  const name = String(input.name || '').normalize('NFKC');
  if (name.length > 150 || !/^[^\x00-\x1f\x7f\\/:]+\.(jpg|jpeg|png|webp|mp4|mov|pdf|txt)$/i.test(name)) throw fail('unsupported_attachment');
  const ext = path.extname(name).slice(1).toLowerCase(), raw = String(input.base64 || '');
  if (!raw || raw.length > Math.ceil(MAX_FILE / 3) * 4 || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(raw)) throw fail('invalid_attachment');
  const bytes = Buffer.from(raw, 'base64');
  if (!bytes.length || bytes.length > MAX_FILE) throw fail('attachment_too_large', 413);
  const sig = bytes.toString('ascii', 0, 16);
  const valid = ext === 'jpg' || ext === 'jpeg' ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 : ext === 'png' ? bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) : ext === 'webp' ? sig.startsWith('RIFF') && sig.slice(8,12) === 'WEBP' : ext === 'mp4' || ext === 'mov' ? bytes.length > 20 && sig.slice(4,8) === 'ftyp' && ['isom','iso2','mp41','mp42','avc1','M4V ','qt  '].includes(sig.slice(8,12)) : ext === 'pdf' ? sig.startsWith('%PDF-') : ext === 'txt' ? !bytes.includes(0) && !sig.startsWith('MZ') && !sig.startsWith('PK') : false;
  if (!valid) throw fail('attachment_type_mismatch');
  if (ext === 'txt') { try { new TextDecoder('utf-8', { fatal: true }).decode(bytes); } catch { throw fail('invalid_attachment'); } }
  return { name, ext, bytes };
}
async function prepare(inputs) {
  if (inputs == null) return [];
  if (!Array.isArray(inputs) || inputs.length > MAX_COUNT) throw fail('too_many_attachments');
  if (!inputs.length) return [];
  const validated = inputs.map(validate);
  if (validated.reduce((total, item) => total + item.bytes.length, 0) > MAX_TOTAL) throw fail('attachments_too_large', 413);
  if (busy) throw fail('attachment_scan_busy', 503);
  busy = true; const created = [];
  try {
    fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
    const used = fs.readdirSync(directory).reduce((sum, name) => { const stat = fs.statSync(path.join(directory, name)); return sum + (stat.isFile() ? stat.size : 0); }, 0);
    if (used + validated.reduce((sum, item) => sum + item.bytes.length, 0) > 250 * 1024 * 1024) throw fail('attachment_storage_full', 503);
    for (const item of validated) {
      const id = crypto.randomBytes(24).toString('hex'), dest = path.join(directory, id + '.' + item.ext);
      fs.writeFileSync(dest, item.bytes, { flag: 'wx', mode: 0o600 });
      created.push({ id, name: item.name, extension: item.ext, size: item.bytes.length });
      try { await run(['--no-summary', '--infected', '--fail-if-cvd-older-than=7', '--max-filesize=6M', '--max-scansize=20M', '--alert-exceeds-max=yes', '--alert-encrypted=yes', dest]); }
      catch (error) { throw fail(error.code === 1 ? 'unsafe_attachment' : 'attachment_scanner_unavailable', error.code === 1 ? 400 : 503); }
    }
    return created;
  } catch (error) { remove(created); throw error; }
  finally { busy = false; }
}
function remove(items) { for (const item of items) { try { fs.unlinkSync(path.join(directory, item.id + '.' + item.extension)); } catch {} } }
function filePath(item) { if (!/^[a-f0-9]{48}$/.test(item.id) || !/^(jpg|jpeg|png|webp|mp4|mov|pdf|txt)$/.test(item.extension)) return null; return path.join(directory, item.id + '.' + item.extension); }
module.exports = { validate, prepare, available, remove, filePath, MAX_FILE, MAX_TOTAL, MAX_COUNT };
