// JSON-file data store used by the Node backend.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, '..', 'data', 'data.json');
const COLLECTIONS = [
  'domains','buttons','cards','wallpapers','watchfaces','prompts','audioWorks','storiesWorks',
  'vlogsWorks','extraWorks','stats','social','pages','faq','news','blog','gallery','services',
  'imageBanners','promoBanners','navSections','complaintCategories','footerPages','messages'
];

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

function verifyPassword(password, salt, hash) {
  if (!password || !salt || !hash) return false;
  const check = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
  const expected = Buffer.from(hash, 'hex');
  return check.length === expected.length && crypto.timingSafeEqual(check, expected);
}

function safeDefaults() {
  return {
    settings: {},
    admin: null,
    ...Object.fromEntries(COLLECTIONS.map((key) => [key, []]))
  };
}

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE) || fs.statSync(DATA_FILE).size === 0) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(safeDefaults(), null, 2));
  }
}

let cache = null;

function save() {
  if (!cache) return;
  fs.writeFileSync(DATA_FILE, JSON.stringify(cache, null, 2));
}

function load() {
  if (cache) return cache;
  ensureDataFile();
  try {
    cache = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    cache = safeDefaults();
    save();
  }

  cache.settings ||= {};
  for (const key of COLLECTIONS) cache[key] ||= [];

  // Older project builds shipped a demo administrator. It is disabled unconditionally.
  if (cache.admin?.email === 'admin@example.com') {
    cache.admin = null;
    save();
  }

  // First-run administrator bootstrap. Credentials are supplied only by the host environment.
  if (!cache.admin && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    if (process.env.ADMIN_PASSWORD.length < 12) {
      console.warn('ADMIN_PASSWORD must contain at least 12 characters; admin bootstrap skipped.');
    } else {
      const { salt, hash } = hashPassword(process.env.ADMIN_PASSWORD);
      cache.admin = { email: process.env.ADMIN_EMAIL.trim(), salt, hash };
      save();
    }
  }

  return cache;
}

function nextId(arr = []) {
  return arr.reduce((max, item) => Math.max(max, Number(item?.id) || 0), 0) + 1;
}

module.exports = { load, save, nextId, hashPassword, verifyPassword, DATA_FILE };
