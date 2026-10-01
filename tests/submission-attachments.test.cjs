const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'sba-upload-test-'));
process.env.CMS_DATA_FILE = path.join(temp, 'cms.json');
const scanner = path.join(temp, 'scanner');
fs.writeFileSync(scanner, '#!/usr/bin/env node\nconst fs=require("fs"); fs.writeFileSync(process.env.TEST_SCAN_ARGS,JSON.stringify(process.argv.slice(2))); process.exit(Number(process.env.TEST_SCAN_EXIT||0));\n', {mode:0o700});
process.env.CLAMAV_SCAN_COMMAND = scanner; process.env.TEST_SCAN_ARGS = path.join(temp, 'args.json');
const files = require('../lib/submission-attachments');
const sample = {name:'message.txt',base64:Buffer.from('Hello').toString('base64')};
test('private uploads validate, scan, reject and clean staged files', async () => {
  try {
    for(const name of ['../message.txt','payload.exe','page.svg','bad:message.txt']) assert.throws(()=>files.validate({...sample,name}));
    assert.throws(()=>files.validate({...sample,name:'image.png'}), /attachment_type_mismatch/);
    assert.throws(()=>files.validate({...sample,base64:'!!!!'}), /invalid_attachment/);
    assert.throws(()=>files.validate({...sample,base64:Buffer.from([0xff,0xfe]).toString('base64')}));
    await assert.rejects(files.prepare(Array(4).fill(sample)), /too_many_attachments/);
    const result = await files.prepare([sample]);
    assert.equal(result.length,1); assert.equal(fs.readFileSync(files.filePath(result[0]),'utf8'),'Hello');
    assert.equal(fs.statSync(files.filePath(result[0])).mode & 0o777,0o600);
    const args = JSON.parse(fs.readFileSync(process.env.TEST_SCAN_ARGS));
    assert.ok(args.includes('--alert-encrypted=yes')); assert.ok(args.includes('--fail-if-cvd-older-than=7'));
    files.remove(result);
    process.env.TEST_SCAN_EXIT='1'; await assert.rejects(files.prepare([sample]), /unsafe_attachment/);
    process.env.TEST_SCAN_EXIT='2'; await assert.rejects(files.prepare([sample]), /attachment_scanner_unavailable/);
    assert.equal(await files.available(),false);
    assert.deepEqual(fs.readdirSync(path.join(temp,'submission-attachments')),[]);
    assert.equal(files.filePath({id:'../bad',extension:'txt'}),null);
    assert.deepEqual(await files.prepare(),[]);
  } finally { fs.rmSync(temp,{recursive:true,force:true}); }
});
