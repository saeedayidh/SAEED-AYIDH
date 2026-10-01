const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'saeed-smart-links-'));
process.env.CMS_DATA_FILE = path.join(directory, 'cms.json');
process.env.SMART_LINKS_DATA_FILE = path.join(directory, 'smart.json');
process.env.MEDIA_DIR = path.join(directory, 'media');
const smart = require('../lib/smart-links');
const platforms = require('../shared/smart-link-platforms.json');
const payload = overrides => ({ name: 'Client', username: 'client', accounts: [{ platform: 'instagram', value: 'example' }], ...overrides });
after(() => fs.rmSync(directory, { recursive: true, force: true }));

test('all 19 destinations use approved templates; route uses the independent username', () => {
  const inputs = { whatsapp: '+966 50 123 4567', phone: '٠٠٩٦٦٥٠١٢٣٤٥٦٧', email: 'user@example.com', appstore: 'id123456789', googleplay: 'com.example.app', discord: 'invite-code' };
  const result = smart.validateProfile(payload({ username: 'my-name', accounts: platforms.map(platform => ({ platform: platform.id, value: inputs[platform.id] || '@example' })) }));
  assert.equal(result.accounts.length, 19);
  assert.equal(result.basePath, '/go/my-name');
  assert.equal(result.accounts.find(item => item.platform === 'phone').url, 'tel:+966501234567');
  assert.equal(result.accounts.find(item => item.platform === 'appstore').url, 'https://apps.apple.com/app/id123456789');
  assert.equal(result.accounts.find(item => item.platform === 'youtube').url, 'https://www.youtube.com/@example');
  assert.equal(result.accounts.find(item => item.platform === 'googleplay').url, 'https://play.google.com/store/apps/details?id=com.example.app');
});

test('name is required, bio is optional, and chosen usernames cannot be taken twice', () => {
  assert.throws(() => smart.validateProfile(payload({ name: ' ' })), /invalid_name/);
  assert.throws(() => smart.validateProfile(payload({ username: '../unsafe' })), /invalid_username/);
  assert.equal(smart.validateProfile(payload()).bio, '');
  const original = smart.createProfile(payload());
  assert.equal(original.profile.path, '/go/client');
  assert.ok(original.editToken);
  assert.equal(original.profile.editHash, undefined);
  assert.throws(() => smart.createProfile(payload({ name: 'Another' })), /username_taken/);
  assert.equal(smart.load().profiles['/go/client'].name, 'Client');
});

test('only the owner token can save color changes on the existing URL', () => {
  const created = smart.createProfile(payload({ username: 'owner' }));
  const input = payload({ username: 'owner', path: created.profile.path, editToken: created.editToken, theme: { accent: '#22aa99', intensity: 77 } });
  assert.throws(() => smart.createProfile({ ...input, editToken: 'bad' }, true), /unauthorized/);
  const edited = smart.createProfile(input, true);
  assert.equal(edited.profile.path, created.profile.path);
  assert.equal(edited.profile.theme.accent, '#22aa99');
  assert.equal(edited.profile.theme.intensity, 77);
  assert.throws(() => smart.createProfile({ ...input, username: 'another' }, true), /username_locked/);
  delete require.cache[require.resolve('../lib/smart-links')];
  assert.equal(require('../lib/smart-links').load().profiles['/go/owner'].theme.accent, '#22aa99');
});

test('avatar and banner persist as media; omitted images are retained on edit', () => {
  const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aP1sAAAAASUVORK5CYII=';
  const created = smart.createProfile(payload({ username: 'images', avatarData: image, bannerData: image }));
  for (const asset of [created.profile.avatar, created.profile.banner]) assert.ok(fs.existsSync(path.join(directory, asset)));
  const edited = smart.createProfile(payload({ username: 'images', path: created.profile.path, editToken: created.editToken, bio: 'Optional bio' }), true);
  assert.equal(edited.profile.avatar, created.profile.avatar);
  assert.equal(edited.profile.banner, created.profile.banner);
  assert.throws(() => smart.createProfile(payload({ username: 'bad-image', avatarData: 'https://external.example/image.png' })), /invalid_image/);
});

test('untrusted URLs, duplicate platforms and malformed themes are rejected', () => {
  for (const input of [
    { accounts: [] }, { accounts: [{ platform: 'unknown', value: 'example' }] },
    { accounts: [{ platform: 'instagram', value: 'https://evil.example' }] },
    { accounts: [{ platform: 'phone', value: '0501234567' }] },
    { accounts: [{ platform: 'email', value: 'email@' }] },
    { accounts: [{ platform: 'instagram', value: 'a' }, { platform: 'instagram', value: 'b' }] },
    { theme: { accent: 'url(javascript:alert(1))' } }, { theme: { intensity: 200 } },
  ]) assert.throws(() => smart.validateProfile(payload(input)));
});

test('public HTML has customer title and image, with no site title or icon', () => {
  const html = smart.renderIndex('<head><title>سعيد بن عايض | SBA</title><link rel="icon" href="/favicon.svg"></head>', '/go/images');
  assert.ok(html.includes('<title>Client</title>'));
  assert.ok(html.includes('og:image'));
  assert.ok(!html.includes('SBA') && !html.includes('سعيد') && !html.includes('/favicon.svg'));
});

test('corrupt storage blocks creation instead of replacing saved data', () => {
  const original = fs.readFileSync(smart.DATA_FILE, 'utf8');
  fs.writeFileSync(smart.DATA_FILE, '{broken');
  assert.throws(() => smart.createProfile(payload({ username: 'corrupt-check' })));
  assert.equal(fs.readFileSync(smart.DATA_FILE, 'utf8'), '{broken');
  fs.writeFileSync(smart.DATA_FILE, original);
});
