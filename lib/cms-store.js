const fs = require('fs');
const path = require('path');

const CMS_DATA_FILE = process.env.CMS_DATA_FILE || path.join(__dirname, '..', 'data', 'cms.json');

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
