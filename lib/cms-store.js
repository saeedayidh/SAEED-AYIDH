const fs = require('fs');
const path = require('path');

const PROJECT_FALLBACK = path.join(__dirname, '..', 'data', 'cms.json');

function pickPersistentPath() {
  if (process.env.CMS_DATA_FILE) return process.env.CMS_DATA_FILE;

  const candidates = [
    '/var/data/saeed-cms.json',
    '/data/saeed-cms.json'
  ];

  for (const file of candidates) {
    try {
      const dir = path.dirname(file);
      fs.mkdirSync(dir, { recursive: true });
      fs.accessSync(dir, fs.constants.W_OK);
      return file;
    } catch {
      // Try the next mount candidate.
    }
  }

  return PROJECT_FALLBACK;
}

const CMS_DATA_FILE = pickPersistentPath();

function migrateLegacyFileIfNeeded() {
  if (CMS_DATA_FILE === PROJECT_FALLBACK || fs.existsSync(CMS_DATA_FILE) || !fs.existsSync(PROJECT_FALLBACK)) return;
  try {
    const dir = path.dirname(CMS_DATA_FILE);
    fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(PROJECT_FALLBACK, CMS_DATA_FILE);
    console.log(`Migrated CMS data to persistent storage: ${CMS_DATA_FILE}`);
  } catch (error) {
    console.error('Failed to migrate legacy CMS data', error);
  }
}

migrateLegacyFileIfNeeded();
console.log(`CMS data file: ${CMS_DATA_FILE}`);

function load() {
  if (!fs.existsSync(CMS_DATA_FILE)) return null;
  try {
    const raw = fs.readFileSync(CMS_DATA_FILE, 'utf8');
    if (!raw.trim()) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function save(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Invalid CMS payload');
  }
  const dir = path.dirname(CMS_DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const temp = `${CMS_DATA_FILE}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(data, null, 2));
  fs.renameSync(temp, CMS_DATA_FILE);
}

module.exports = { load, save, CMS_DATA_FILE };
