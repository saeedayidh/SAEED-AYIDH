const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'saeed-smart-links-'));
process.env.CMS_DATA_FILE = path.join(directory, 'cms.json');
process.env.SMART_LINKS_DATA_FILE = path.join(directory, 'smart.json');
const smart = require('../lib/smart-links');
const platforms = require('../shared/smart-link-platforms.json');
after(() => fs.rmSync(directory, { recursive: true, force: true }));

test('all 19 destinations are built from approved templates', () => {
  const inputs = { whatsapp: '+966 50 123 4567', phone: '٠٠٩٦٦٥٠١٢٣٤٥٦٧', email: 'user@example.com', appstore: 'id123456789', googleplay: 'com.example.app', discord: 'invite-code' };
  const result = smart.validateProfile({ accounts: platforms.map(platform => ({ platform: platform.id, value: inputs[platform.id] || '@example' })), primary: 'instagram' });
  assert.equal(result.accounts.length, 19);
  assert.equal(result.basePath, '/go/instagram.com/example');
  assert.equal(result.accounts.find(item => item.platform === 'phone').url, 'tel:+966501234567');
  assert.equal(result.accounts.find(item => item.platform === 'appstore').url, 'https://apps.apple.com/app/id123456789');
  assert.equal(result.accounts.find(item => item.platform === 'youtube').url, 'https://www.youtube.com/@example');
  assert.equal(result.accounts.find(item => item.platform === 'googleplay').url, 'https://play.google.com/store/apps/details?id=com.example.app');
});

test('a published profile survives reload, and same username never overwrites it', () => {
  const original = smart.createProfile({ name: 'Original', accounts: [{ platform: 'instagram', value: 'same-user' }, { platform: 'whatsapp', value: '966501234567' }] });
  const collision = smart.createProfile({ name: 'Another', accounts: [{ platform: 'instagram', value: 'same-user' }] });
  assert.equal(original.path, '/go/instagram.com/same-user');
  assert.notEqual(collision.path, original.path);
  delete require.cache[require.resolve('../lib/smart-links')];
  const restored = require('../lib/smart-links').load();
  assert.equal(restored.profiles[original.path].name, 'Original');
  assert.equal(restored.profiles[original.path].accounts.length, 2);
  assert.equal(restored.profiles[collision.path].name, 'Another');
});

test('untrusted URLs, duplicate platforms, empty profiles and malformed contacts are rejected', () => {
  for (const input of [
    { accounts: [] },
    { accounts: [{ platform: 'unknown', value: 'example' }] },
    { accounts: [{ platform: 'instagram', value: 'https://evil.example' }] },
    { accounts: [{ platform: 'instagram', value: 'user/../../x' }] },
    { accounts: [{ platform: 'phone', value: '0501234567' }] },
    { accounts: [{ platform: 'email', value: 'email@' }] },
    { accounts: [{ platform: 'instagram', value: 'a' }, { platform: 'instagram', value: 'b' }] },
  ]) assert.throws(() => smart.validateProfile(input));
});

test('corrupt storage blocks creation instead of replacing saved data', () => {
  const original = fs.readFileSync(smart.DATA_FILE, 'utf8');
  fs.writeFileSync(smart.DATA_FILE, '{broken');
  assert.throws(() => smart.createProfile({ accounts: [{ platform: 'x', value: 'example' }] }));
  assert.equal(fs.readFileSync(smart.DATA_FILE, 'utf8'), '{broken');
  fs.writeFileSync(smart.DATA_FILE, original);
});
