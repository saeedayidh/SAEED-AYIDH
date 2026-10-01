// Official ClamAV packages, pinned to the release's published SHA-256 digests.
// Installation is rootless and asynchronous: the website never waits for downloads.
const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const crypto = require('node:crypto'), https = require('node:https');
const { execFile } = require('node:child_process');
const { pipeline } = require('node:stream/promises');
const VERSION = '1.5.4';
const RELEASES = {
  x64: { arch: 'x86_64', sha: '28d6efc5b4423e7830c3559339552eb53870a9eac51ac4efb37d60530d329886' },
  arm64: { arch: 'aarch64', sha: '4bdab4118e8accb02108316b996d7c14da1cccc4eea2dff7bea82109f9239d95' },
};
const root = path.join(path.dirname(require('./cms-store').CMS_DATA_FILE), 'antivirus');
const install = path.join(root, VERSION), prefix = path.join(install, 'usr/local');
const database = path.join(root, 'database'), config = path.join(root, 'freshclam.conf');
const managed = !process.env.CLAMAV_SCAN_COMMAND && process.env.CLAMAV_AUTO_SETUP !== '0' && (process.env.RENDER === 'true' || process.env.CLAMAV_AUTO_SETUP === '1');
let starting, updating = false, ready = false, scanning = false;
function execute(command, args, options = {}) {
  return new Promise((resolve, reject) => execFile(command, args, { timeout: 60000, maxBuffer: 65536, windowsHide: true, ...options }, (error, stdout) => error ? reject(error) : resolve(stdout)));
}
function memoryBudget() {
  let total = os.totalmem(), used = process.memoryUsage().rss;
  try { const limit = fs.readFileSync('/sys/fs/cgroup/memory.max', 'utf8').trim(); if (limit !== 'max') { total = Math.min(total, Number(limit)); used = Number(fs.readFileSync('/sys/fs/cgroup/memory.current', 'utf8')); } }
  catch { try { const limit = Number(fs.readFileSync('/sys/fs/cgroup/memory/memory.limit_in_bytes', 'utf8')); total = Math.min(total, limit); used = Number(fs.readFileSync('/sys/fs/cgroup/memory/memory.usage_in_bytes', 'utf8')); } catch {} }
  return Math.floor(Math.min(3 * 1024 ** 3, total - used - 192 * 1024 ** 2));
}
const environment = () => ({ ...process.env, CVD_CERTS_DIR: path.join(prefix, 'etc/certs'), CURL_CA_BUNDLE: '/etc/ssl/certs/ca-certificates.crt', LD_LIBRARY_PATH: [path.join(prefix, 'lib'),path.join(prefix, 'lib64'),process.env.LD_LIBRARY_PATH].filter(Boolean).join(':') });
async function bounded(command, args, timeout = 60000) {
  const budget = memoryBudget();
  // Abort before loading large signature databases if it would endanger the web server.
  if (budget < 1024 ** 3) throw Error('antivirus_memory_unavailable');
  return execute('/usr/bin/prlimit', [`--as=${budget}`, '--', command, ...args], { env: environment(), timeout });
}
async function scan(args) {
  if (!managed) return execute(process.env.CLAMAV_SCAN_COMMAND || 'clamscan', args);
  if (!ready || updating || scanning) throw Error('antivirus_not_ready');
  scanning = true;
  try { return await bounded(path.join(prefix, 'bin/clamscan'), [`--database=${database}`, ...args]); }
  finally { scanning = false; }
}
function download(url, dest, remaining = 5) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || !['github.com','release-assets.githubusercontent.com','objects.githubusercontent.com'].includes(parsed.hostname)) return reject(Error('untrusted_antivirus_download'));
    const request = https.get(parsed, { headers: {'User-Agent':'Saeed-Security-Setup'} }, response => {
      if ([301,302,303,307,308].includes(response.statusCode)) { response.resume(); if (!remaining || !response.headers.location) return reject(Error('download_redirect')); return download(new URL(response.headers.location, parsed).href, dest, remaining - 1).then(resolve,reject); }
      if (response.statusCode !== 200) { response.resume(); return reject(Error(`antivirus_download_${response.statusCode}`)); }
      let bytes = 0; response.on('data', chunk => { bytes += chunk.length; if(bytes > 130 * 1024 ** 2) response.destroy(Error('antivirus_package_too_large')); });
      pipeline(response, fs.createWriteStream(dest, {flags:'wx',mode:0o600})).then(resolve,reject);
    });
    request.setTimeout(30000, () => request.destroy(Error('antivirus_download_timeout')));
    const deadline = setTimeout(() => request.destroy(Error('antivirus_download_deadline')), 180000);
    request.on('close', () => clearTimeout(deadline)); request.on('error',reject);
  });
}
async function verifyPackage(file, expected) {
  const hash = crypto.createHash('sha256'); for await (const chunk of fs.createReadStream(file)) hash.update(chunk);
  if (hash.digest('hex') !== expected) throw Error('antivirus_package_checksum');
}
async function installEngine() {
  const release = RELEASES[process.arch]; if (process.platform !== 'linux' || !release) throw Error('antivirus_platform_unsupported');
  fs.mkdirSync(root,{recursive:true,mode:0o700});
  if (fs.existsSync(path.join(install,'.verified'))) return;
  const staging = fs.mkdtempSync(path.join(root,'.install-'));
  try {
    const file = path.join(staging,'clamav.deb');
    await download(`https://github.com/Cisco-Talos/clamav/releases/download/clamav-${VERSION}/clamav-${VERSION}.linux.${release.arch}.deb`,file);
    await verifyPackage(file,release.sha);
    const extracted = path.join(staging,'extracted');
    await execute('dpkg-deb',['--extract',file,extracted],{timeout:60000});
    fs.writeFileSync(path.join(extracted,'.verified'),release.sha,{mode:0o600});
    fs.rmSync(install,{recursive:true,force:true}); fs.renameSync(extracted,install);
  } finally { fs.rmSync(staging,{recursive:true,force:true}); }
}
async function selfTest() {
  const temp = fs.mkdtempSync(path.join(root,'.probe-'));
  try {
    const clean = path.join(temp,'clean.txt'), infected = path.join(temp,'eicar.txt');
    fs.writeFileSync(clean,'Saeed clean antivirus readiness probe',{mode:0o600});
    // EICAR is a harmless antivirus test string, never an executable or public asset.
    fs.writeFileSync(infected,Buffer.from('WDVPIVAlQEFQWzRcUFpYNTQoUF4pN0NDKTd9JEVJQ0FSLVNUQU5EQVJELUFOVElWSVJVUy1URVNULUZJTEUhJEgrSCo=','base64'),{mode:0o600});
    const args = ['--no-summary','--fail-if-cvd-older-than=7',`--database=${database}`];
    await bounded(path.join(prefix,'bin/clamscan'),[...args,clean]);
    let detected = false; try { await bounded(path.join(prefix,'bin/clamscan'),[...args,infected]); } catch(error) { if (error.code === 1) detected = true; else throw error; }
    if (!detected) throw Error('antivirus_self_test_failed');
  } finally { fs.rmSync(temp,{recursive:true,force:true}); }
}
async function update() {
  if (updating || scanning) return;
  updating = true;
  try {
    fs.mkdirSync(database,{recursive:true,mode:0o700});
    fs.writeFileSync(config,`DatabaseDirectory ${database}\nDatabaseOwner ${os.userInfo().username}\nDatabaseMirror database.clamav.net\nDNSDatabaseInfo current.cvd.clamav.net\nConnectTimeout 20\nReceiveTimeout 120\nTestDatabases no\nScriptedUpdates yes\n`,{mode:0o600});
    // FreshClam verifies vendor signatures; the scan below also verifies loadability.
    await bounded(path.join(prefix,'bin/freshclam'),[`--config-file=${config}`],600000);
    await selfTest(); ready = true;
    console.log('Private feedback antivirus is ready (clean and EICAR tests passed).');
  } catch(error) {
    console.error('Private feedback antivirus update unavailable:',error.message);
    // A temporary CDN outage may use a previously verified, still-fresh database.
    try { await selfTest(); ready = true; } catch { ready = false; }
  }
  finally { updating = false; }
}
function start() {
  if (!managed || starting) return starting;
  starting = (async () => {
    await installEngine(); await update();
  })().catch(error=>console.error('Private feedback antivirus setup unavailable:',error.message));
  // Retry setup failures, honor FreshClam cooldowns, and update signatures regularly.
  setInterval(async()=>{ await starting; try { await installEngine(); await update(); } catch(error) { console.error('Private feedback antivirus retry unavailable:',error.message); } },6 * 3600000).unref();
  return starting;
}
module.exports = { start, scan, verifyPackage, memoryBudget, status: () => managed ? ready && !updating : null };
