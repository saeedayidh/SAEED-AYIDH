const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const platforms = require('../shared/smart-link-platforms.json');
const { CMS_DATA_FILE } = require('./cms-store');
const DATA_FILE = process.env.SMART_LINKS_DATA_FILE || path.join(path.dirname(CMS_DATA_FILE), 'saeed-smart-links.json');
const creationAttempts = new Map();
setInterval(() => {
  const cutoff = Date.now() - 60 * 60 * 1000;
  for (const [key, value] of creationAttempts) if (value.t < cutoff) creationAttempts.delete(key);
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
  const primary = accounts.find(account => account.platform === input.primary) || accounts.find(account => account.platform === 'instagram') || accounts[0];
  const definition = platforms.find(p => p.id === primary.platform);
  const name = typeof input.name === 'string' ? input.name.trim().slice(0, 80) : '';
  const bio = typeof input.bio === 'string' ? input.bio.trim().slice(0, 180) : '';
  return { name: name || (definition.kind === 'username' ? primary.value : ''), bio, accounts, primary: primary.platform,
    basePath: `/go/${definition.domain}/${encodeURIComponent(primary.value.toLowerCase())}` };
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
function createProfile(input) {
  const validated = validateProfile(input);
  const saved = load();
  if (Object.keys(saved.profiles).length >= 20000) throw new Error('storage_full');
  let route = validated.basePath;
  while (Object.hasOwn(saved.profiles, route)) route = `${validated.basePath}-${crypto.randomBytes(5).toString('hex')}`;
  const { basePath, ...profile } = validated;
  const item = { ...profile, path: route, createdAt: new Date().toISOString() };
  saved.profiles[route] = item;
  save(saved);
  return item;
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
      json(r, profile ? 200 : 404, profile ? { profile } : { error: 'not_found' });
    } catch { json(r, 503, { error: 'storage_unavailable' }); }
    return true;
  }
  if (q.method !== 'POST') { json(r, 405, { error: 'method_not_allowed' }); return true; }
  if (!origin(q)) { json(r, 403, { error: 'cross_site_request_blocked' }); return true; }
  if (rate(creationAttempts, q, 15, 60 * 60 * 1000)) { json(r, 429, { error: 'too_many_requests' }); return true; }
  const input = await read(q, 16384);
  try {
    const profile = createProfile(input);
    json(r, 201, { profile, url: `https://saeedbinayidh.com${profile.path}` });
  } catch (error) {
    const validation = /^(invalid_accounts|invalid_platform|invalid_account|invalid_phone|invalid_email|invalid_app_id|invalid_package|invalid_username)$/.test(error.message);
    json(r, validation ? 400 : 503, { error: validation ? error.message : 'storage_unavailable' });
  }
  return true;
}
module.exports = { handle, normalize, validateProfile, createProfile, load, DATA_FILE };
