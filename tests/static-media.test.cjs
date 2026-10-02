const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),{spawn}=require('node:child_process');
test('public video supports byte ranges, suffix ranges, HEAD and rejects invalid ranges',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'saeed-media-')),child=spawn(process.execPath,['server.js'],{cwd:path.join(__dirname,'..'),env:{...process.env,PORT:'4388',CMS_DATA_FILE:path.join(dir,'cms.json'),DATA_FILE:path.join(dir,'site.json'),ANALYTICS_DATA_FILE:path.join(dir,'analytics.json'),MEDIA_DIR:path.join(dir,'media'),CLAMAV_AUTO_SETUP:'0'},stdio:['ignore','pipe','pipe']});
 try{await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('startup timeout')),15000);child.stdout.on('data',d=>{if(d.toString().includes('website running')){clearTimeout(timer);resolve()}});child.on('exit',code=>{clearTimeout(timer);reject(Error('server exit '+code))})});
 const url='http://127.0.0.1:4388/assets/creator-video/0.mp4',bytes=fs.readFileSync(path.join(__dirname,'../public/assets/creator-video/0.mp4'));
 const r=await fetch(url,{headers:{Range:'bytes=0-31'}});assert.equal(r.status,206);assert.equal(r.headers.get('content-type'),'video/mp4');assert.equal(r.headers.get('content-range'),`bytes 0-31/${bytes.length}`);assert.deepEqual(Buffer.from(await r.arrayBuffer()),bytes.subarray(0,32));
 const tail=await fetch(url,{headers:{Range:'bytes=-24'}});assert.equal(tail.status,206);assert.deepEqual(Buffer.from(await tail.arrayBuffer()),bytes.subarray(-24));
 const head=await fetch(url,{method:'HEAD'});assert.equal(head.status,200);assert.equal(Number(head.headers.get('content-length')),bytes.length);assert.equal((await head.arrayBuffer()).byteLength,0);
 for(const range of ['bytes=99999999-','bytes=30-20','bytes=-0','bytes=0-1,3-4']){const bad=await fetch(url,{headers:{Range:range}});assert.equal(bad.status,416);assert.equal(bad.headers.get('content-range'),`bytes */${bytes.length}`)}
 }finally{child.kill();await new Promise(resolve=>child.on('exit',resolve));fs.rmSync(dir,{recursive:true,force:true})}
});
