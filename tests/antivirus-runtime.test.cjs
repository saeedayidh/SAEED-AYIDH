const {test}=require('node:test'), assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),crypto=require('node:crypto');
const {verifyPackage,memoryBudget}=require('../lib/antivirus-runtime');
test('engine package must match its pinned SHA256 before extraction',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'sba-digest-')),file=path.join(dir,'package');
 try {fs.writeFileSync(file,'verified test bytes');const digest=crypto.createHash('sha256').update('verified test bytes').digest('hex');await verifyPackage(file,digest);fs.appendFileSync(file,'tampered');await assert.rejects(verifyPackage(file,digest),/antivirus_package_checksum/);}finally{fs.rmSync(dir,{recursive:true,force:true});}
 assert.ok(Number.isFinite(memoryBudget()));assert.ok(memoryBudget()<=3*1024**3);
});
