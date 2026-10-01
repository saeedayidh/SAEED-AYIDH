const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), os = require('os'), path = require('path');
const { createPromptCopies } = require('../lib/prompt-copies');
const prompts = require('../src/data/imagePrompts.json');
test('50 unique bilingual prompts and valid original assets', () => {
  assert.equal(prompts.length, 50);
  for (const key of ['id', 'title', 'titleEn', 'promptAr', 'promptEn', 'image']) assert.equal(new Set(prompts.map(x => x[key])).size, 50);
  for (const item of prompts) assert.ok(fs.existsSync(path.join(__dirname, '../public', item.image)));
  assert.equal(new Set(prompts.map(x => x.category)).size, 6);
});
test('persistent unique browser counts, independent prompts and rejected writes', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sba-prompt-test-')), file = path.join(dir, 'counts.json');
  let counter = createPromptCopies(file);
  const call = async (method, endpoint, cookie = '', origin = true, limited = false) => {
    let response; const headers = {};
    const handled = await counter.handle({ method, headers: { cookie } }, { setHeader: (k,v) => headers[k] = v }, endpoint, { json: (_,status,body) => response = { status, body }, origin: () => origin, rate: () => limited });
    return { handled, ...response, cookie: headers['Set-Cookie']?.split(';')[0] || cookie };
  };
  try {
    const a = await call('GET', '/api/image-prompts/copies'); assert.equal(a.body.counts['ember-portrait'], 0);
    assert.equal((await call('POST', '/api/image-prompts/copy/ember-portrait', a.cookie)).body.count, 1);
    assert.equal((await call('POST', '/api/image-prompts/copy/ember-portrait', a.cookie)).body.count, 1);
    const b = await call('GET', '/api/image-prompts/copies');
    assert.equal((await call('POST', '/api/image-prompts/copy/ember-portrait', b.cookie)).body.count, 2);
    assert.equal((await call('POST', '/api/image-prompts/copy/rain-traveler', a.cookie)).body.count, 1);
    counter = createPromptCopies(file);
    assert.equal((await call('POST', '/api/image-prompts/copy/ember-portrait', a.cookie)).body.count, 2);
    assert.equal((await call('POST', '/api/image-prompts/copy/unknown', a.cookie)).status, 404);
    assert.equal((await call('POST', '/api/image-prompts/copy/ember-portrait', '', false)).status, 403);
    assert.equal((await call('POST', '/api/image-prompts/copy/ember-portrait', '', true, true)).status, 429);
    assert.equal((await call('GET', '/api/image-prompts/copies', a.cookie)).body.counts['ember-portrait'], 2);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
