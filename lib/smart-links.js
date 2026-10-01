const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const platforms = require('../shared/smart-link-platforms.json');
const { CMS_DATA_FILE } = require('./cms-store');
const MEDIA = process.env.MEDIA_DIR || (fs.existsSync('/data') ? '/data/media' : path.join(__dirname, '..', 'data', 'media'));
const DEFAULT_THEME = { background: '#090909', card: '#171717', text: '#ffffff', secondary: '#9ca3af', accent: '#D51F2B', intensity: 35 };
const publicProfile = ({ editHash, ...profile }) => profile;
const DATA_FILE = process.env.SMART_LINKS_DATA_FILE || path.join(path.dirname(CMS_DATA_FILE), 'saeed-smart-links.json');
const creationAttempts = new Map();
const editAttempts = new Map();
setInterval(() => {
  const cutoff = Date.now() - 60 * 60 * 1000;
  for (const attempts of [creationAttempts, editAttempts]) for (const [key, value] of attempts) if (value.t < cutoff) attempts.delete(key);
}, 30 * 60 * 1000).unref();

function normalize(platform, raw) {
  if (typeof raw !== 'string' || raw.length > 200) throw new Error('invalid_account');
  let value = raw.trim();
  if (platform.kind === 'phone') {
    value = value.replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit))).replace(/[\s()+-]/g, '');
    if (value.startsWith('00')) value = value.slice(2);
    if (!/^[1-9]\d{6,14}$/.test(value)) throw new Error('invalid_phone');
  } else if (platform.kind === 'email') {
    if (!/^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/.test(value) || value.length > 160) throw new Error('invalid_email');
  } else if (platform.kind === 'appId') {
    value = value.replace(/^id/i, '');
    if (!/^\d{5,20}$/.test(value)) throw new Error('invalid_app_id');
  } else if (platform.kind === 'package') {
    if (!/^[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z][A-Za-z0-9_]*)+$/.test(value) || value.length > 150) throw new Error('invalid_package');
  } else {
    value = value.replace(/^@/, '');
    if (!/^[\p{L}\p{N}_.-]{1,100}$/u.test(value) || value === '.' || value === '..') throw new Error('invalid_username');
  }
  return value;
}

function validateProfile(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || !Array.isArray(input.accounts) || !input.accounts.length || input.accounts.length > platforms.length) throw new Error('invalid_accounts');
  const seen = new Set();
  const accounts = input.accounts.map(account => {
    const platform = platforms.find(p => p.id === account?.platform);
    if (!platform || seen.has(platform.id)) throw new Error('invalid_platform');
    seen.add(platform.id);
    const value = normalize(platform, account.value);
    const encoded = platform.kind === 'phone' || platform.kind === 'appId' ? value : encodeURIComponent(value);
    return { platform: platform.id, value, url: platform.prefix + encoded };
  });
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  if (!name || name.length > 80) throw new Error('invalid_name');
  const username = typeof input.username === 'string' ? input.username.trim().replace(/^@/, '').toLowerCase() : '';
  if (!/^[\p{L}\p{N}][\p{L}\p{N}_.-]{2,39}$/u.test(username)) throw new Error('invalid_username');
  const bio = typeof input.bio === 'string' ? input.bio.trim().slice(0, 180) : '';
  const theme = { ...DEFAULT_THEME };
  for (const key of ['background', 'card', 'text', 'secondary', 'accent']) {
    if (input.theme?.[key] != null) {
      if (!/^#[a-fA-F0-9]{6}$/.test(input.theme[key])) throw new Error('invalid_theme');
      theme[key] = input.theme[key];
    }
  }
  if (input.theme?.intensity != null) {
    if (!Number.isFinite(input.theme.intensity) || input.theme.intensity < 0 || input.theme.intensity > 100) throw new Error('invalid_theme');
    theme.intensity = input.theme.intensity;
  }
  return { name, username, bio, accounts, theme, basePath: `/go/${encodeURIComponent(username)}` };

}

function load() {
  if (!fs.existsSync(DATA_FILE)) return { version: 1, profiles: {} };
  const saved = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  if (saved.version !== 1 || !saved.profiles || typeof saved.profiles !== 'object' || Array.isArray(saved.profiles)) throw new Error('invalid_storage');
  return saved;
}
function save(data) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true, mode: 0o700 });
  const temporary = `${DATA_FILE}.${crypto.randomBytes(8).toString('hex')}.tmp`;
  try {
    fs.writeFileSync(temporary, JSON.stringify(data), { mode: 0o600, flag: 'wx' });
    fs.renameSync(temporary, DATA_FILE);
  } catch (error) {
    try { fs.unlinkSync(temporary); } catch {}
    throw error;
  }
}
function image(raw, previous, created) {
  if (raw == null) return previous || '';
  if (raw === '') return '';
  const match = typeof raw === 'string' && /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(raw);
  if (!match) throw new Error('invalid_image');
  const data = Buffer.from(match[2], 'base64');
  const type = match[1];
  const valid = type === 'image/jpeg' ? data[0] === 255 && data[1] === 216 && data[2] === 255 : type === 'image/png' ? data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) : data.toString('ascii', 0, 4) === 'RIFF' && data.toString('ascii', 8, 12) === 'WEBP';
  if (!valid || data.length < 12 || data.length > 1024 * 1024) throw new Error('invalid_image');
  fs.mkdirSync(MEDIA, { recursive: true, mode: 0o700 });
  const filename = `smart-${crypto.randomBytes(16).toString('hex')}.${type === 'image/jpeg' ? 'jpg' : type === 'image/png' ? 'png' : 'webp'}`;
  const file = path.join(MEDIA, filename);
  fs.writeFileSync(file, data, { flag: 'wx', mode: 0o600 });
  created.push(file);
  return `/media/${filename}`;
}
function createProfile(input, update = false) {
  const validated = validateProfile(input);
  const saved = load();
  const route = update ? input.path : validated.basePath;
  const existing = Object.hasOwn(saved.profiles, route) ? saved.profiles[route] : null;
  if (update) {
    const hash = crypto.createHash('sha256').update(String(input.editToken || '')).digest('hex');
    if (!existing?.editHash || !crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(existing.editHash))) throw new Error('unauthorized');
    if (validated.username !== existing.username) throw new Error('username_locked');
  } else {
    if (existing) throw new Error('username_taken');
    if (Object.keys(saved.profiles).length >= 20000) throw new Error('storage_full');
  }
  const editToken = update ? input.editToken : crypto.randomBytes(32).toString('hex');
  const created = [];
  try {
    const { basePath, ...profile } = validated;
    const item = { ...profile, avatar: image(input.avatarData, existing?.avatar, created), banner: image(input.bannerData, existing?.banner, created), path: route,
      createdAt: existing?.createdAt || new Date().toISOString(), editHash: crypto.createHash('sha256').update(editToken).digest('hex') };
    saved.profiles[route] = item;
    save(saved);
    return { profile: publicProfile(item), editToken };
  } catch (error) {
    for (const file of created) try { fs.unlinkSync(file); } catch {}
    throw error;
  }
}

async function handle(q, r, pathname, helpers) {
  if (pathname !== '/api/smart-links') return false;
  const { json, read, origin, rate } = helpers;
  if (q.method === 'GET') {
    const route = new URL(q.url, 'http://localhost').searchParams.get('path') || '';
    if (!route.startsWith('/go/') || route.length > 2000) { json(r, 400, { error: 'invalid_path' }); return true; }
    try {
      const saved = load();
      const profile = Object.hasOwn(saved.profiles, route) ? saved.profiles[route] : null;
      json(r, profile ? 200 : 404, profile ? { profile: publicProfile(profile) } : { error: 'not_found' });
    } catch { json(r, 503, { error: 'storage_unavailable' }); }
    return true;
  }
  if (!['POST', 'PUT'].includes(q.method)) { json(r, 405, { error: 'method_not_allowed' }); return true; }
  if (!origin(q)) { json(r, 403, { error: 'cross_site_request_blocked' }); return true; }
  if (rate(q.method === 'PUT' ? editAttempts : creationAttempts, q, q.method === 'PUT' ? 120 : 15, 60 * 60 * 1000)) { json(r, 429, { error: 'too_many_requests' }); return true; }
  const input = await read(q, 3 * 1024 * 1024);
  try {
    const result = createProfile(input, q.method === 'PUT');
    json(r, q.method === 'PUT' ? 200 : 201, { ...result, url: `https://saeedbinayidh.com${result.profile.path}` });
  } catch (error) {
    const validation = /^(invalid_name|invalid_theme|invalid_image|invalid_accounts|invalid_platform|invalid_account|invalid_phone|invalid_email|invalid_app_id|invalid_package|invalid_username)$/.test(error.message);
    const status = error.message === 'username_taken' ? 409 : error.message === 'unauthorized' ? 403 : error.message === 'username_locked' ? 400 : validation ? 400 : 503;
    json(r, status, { error: status === 503 ? 'storage_unavailable' : error.message });
  }
  return true;
}
function renderIndex(html, route) {
  let profile;
  try { profile = load().profiles[route]; } catch {}
  const escape = value => String(value || '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const name = profile?.name || 'الروابط | Links';
  const favicon = profile?.avatar || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4=';
  const meta = `<meta name="description" content="${escape(profile?.bio || name)}"><meta property="og:title" content="${escape(name)}"><meta property="og:description" content="${escape(profile?.bio || '')}">${profile?.avatar ? `<meta property="og:image" content="https://saeedbinayidh.com${escape(profile.avatar)}">` : ''}`;
  return html.replace(/<title>.*?<\/title>/s, `<title>${escape(name)}</title>`).replace(/<link[^>]+rel="icon"[^>]*>/, `<link rel="icon" href="${escape(favicon)}">`).replace('</head>', meta + '</head>');
}

module.exports = { handle, normalize, validateProfile, createProfile, load, DATA_FILE, renderIndex };
