const fs = require('fs'), path = require('path'), crypto = require('crypto');
const prompts = require('../src/data/imagePrompts.json');
function createPromptCopies(file = process.env.PROMPT_COPIES_FILE || path.join(path.dirname(process.env.CMS_DATA_FILE || path.join(__dirname, '..', 'data', 'saeed-cms.json')), 'saeed-prompt-copies.json')) {
  const ids = new Set(prompts.map(item => item.id)), limits = new Map();
  let data;
  function load() {
    if (data) return data;
    try { data = JSON.parse(fs.readFileSync(file, 'utf8')); }
    catch (error) { if (error.code !== 'ENOENT') throw error; data = { secret: crypto.randomBytes(32).toString('hex'), copies: {} }; }
    if (!data.secret || !data.copies || typeof data.copies !== 'object') throw Error('Invalid prompt copy data');
    return data;
  }
  function save(next) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const temporary = file + '.tmp';
    fs.writeFileSync(temporary, JSON.stringify(next), { mode: 0o600 });
    fs.renameSync(temporary, file); data = next;
  }
  const signature = id => crypto.createHmac('sha256', load().secret).update(id).digest('hex');
  function visitor(q, r) {
    const raw = /(?:^|;\s*)sba_prompt_visitor=([a-f0-9]{48})\.([a-f0-9]{64})(?:;|$)/.exec(q.headers.cookie || '');
    if (raw && crypto.timingSafeEqual(Buffer.from(raw[2], 'hex'), Buffer.from(signature(raw[1]), 'hex'))) return raw[1];
    const id = crypto.randomBytes(24).toString('hex');
    r.setHeader('Set-Cookie', `sba_prompt_visitor=${id}.${signature(id)}; HttpOnly; Path=/api/image-prompts; Max-Age=31536000; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
    return id;
  }
  const count = id => Object.keys(load().copies[id] || {}).length;
  async function handle(q, r, p, { json, origin, rate }) {
    if (p !== '/api/image-prompts/copies' && !p.startsWith('/api/image-prompts/copy/')) return false;
    if (p === '/api/image-prompts/copies' && q.method === 'GET') {
      visitor(q, r); json(r, 200, { counts: Object.fromEntries([...ids].map(id => [id, count(id)])) }); return true;
    }
    const id = p.slice('/api/image-prompts/copy/'.length);
    if (q.method !== 'POST' || !ids.has(id)) { json(r, q.method === 'POST' ? 404 : 405, { error: 'invalid_prompt_request' }); return true; }
    if (!origin(q)) { json(r, 403, { error: 'cross_site_request_blocked' }); return true; }
    if (rate(limits, q, 120, 10 * 60e3)) { json(r, 429, { error: 'too_many_requests' }); return true; }
    const v = visitor(q, r), key = crypto.createHash('sha256').update(v).digest('hex'), current = load();
    if (!current.copies[id]?.[key]) save({ ...current, copies: { ...current.copies, [id]: { ...(current.copies[id] || {}), [key]: true } } });
    json(r, 200, { count: count(id) }); return true;
  }
  return { handle };
}
module.exports = { createPromptCopies };
