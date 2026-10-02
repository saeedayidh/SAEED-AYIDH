const {test,after}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let server;
const modules=(async()=>{server=await (await import('vite')).createServer({server:{middlewareMode:true},appType:'custom'});const [logic,catalog,design,templates]=await Promise.all(['toolLogic','resourceCatalog','resourceDesign','templateDesign'].map(x=>server.ssrLoadModule(`/src/features/creator/${x}.ts`)));return{logic,catalog,design,templates}})();
after(async()=>{await modules;await server?.close()});
test('Arabic usernames and topic hashtags are usable, links reject unsafe protocols',async()=>{
 const{logic}=await modules;
 const names=logic.usernames('سعيد بن عايض','تصوير','');assert.ok(names.length>=10);assert.equal(new Set(names).size,names.length);assert.ok(names.every(x=>/^[a-z0-9._]{1,30}$/.test(x)));assert.ok(names.some(x=>x.includes('photo')));
 const tags=logic.hashtags('تصوير جوال في الدمام');assert.ok(tags.includes('#تصوير_جوال'));assert.ok(tags.includes('#photography'));assert.ok(!tags.includes('#في'));assert.equal(new Set(tags).size,tags.length);
 for(const value of ['javascript:alert(1)','data:text/html,x','https://name:secret@example.com'])assert.throws(()=>logic.validLink(value));assert.equal(logic.validLink('https://instagram.com/name'),'https://instagram.com/name');
});
test('all 8 active libraries have bilingual usable resources and verified local font assets',async()=>{
 const{catalog,design}=await modules;assert.equal(catalog.extraResources.length,8);assert.ok(!catalog.extraResources.some(g=>['text-styles','video-prompts'].includes(g.id)));
 const all=catalog.extraResources.flatMap(x=>x.items);assert.equal(new Set(all.map(x=>x.id)).size,all.length);
 for(const group of catalog.extraResources){assert.ok(group.ar&&group.en&&group.items.length);for(const item of group.items){assert.ok(item.ar&&item.en);if(item.font){assert.equal(fs.readFileSync(path.join(__dirname,'../public',item.font)).subarray(0,4).toString('hex'),'00010000');assert.match(fs.readFileSync(path.join(__dirname,'../public',item.license),'utf8'),/SIL OPEN FONT LICENSE/)}for(const asset of [item.image,item.preview,item.video].filter(Boolean)){assert.ok(fs.statSync(path.join(__dirname,'../public',asset)).size>100,asset)}if(['wallpaper','avatar','icons','gradient','template','sizes'].includes(item.kind)){const svg=design.resourceSvg(item);assert.match(svg,/^<svg/);assert.ok(!svg.includes('<script'));}if(item.kind==='prompt'){assert.ok(item.prompt.length>200&&item.promptEn.length>200)}}}
 const prompts=all.filter(x=>x.kind==='prompt');assert.equal(new Set(prompts.map(x=>x.prompt)).size,prompts.length);
});
test('invoice calculates totals and HTML export escapes editable user input',async()=>{
 const{templates}=await modules;const v={...templates.templateDefaults('invoice-templates',true),name:'<img src=x onerror=alert(1)>',details:'صورة | 2 | 75\nتصميم | 3 | 50',color:'red; background:url(javascript:x)'};
 const html=templates.templateHtml('invoice-templates',2,v,true);assert.ok(html.includes('300.00 SAR'));assert.ok(!html.includes('<img src=x'));assert.ok(html.includes('&lt;img'));assert.ok(!html.includes('javascript:'));
});

test('templates have distinct structures for their purpose and all videos are real MP4 files',async()=>{const {catalog,templates}=await modules;const groups=['profile-templates','cv-templates','portfolio-templates','media-kit-templates','invoice-templates'].map(id=>({id}));assert.ok(groups.every(g=>!catalog.extraResources.some(x=>x.id===g.id)));const html=groups.map(g=>templates.templateHtml(g.id,0,templates.templateDefaults(g.id,true),true));assert.equal(new Set(html).size,5);for(const marker of ['profile-link','timeline-dot','project-art','stat-value','invoice-bottom'])assert.ok(html.some(x=>x.includes(marker)));for(const item of catalog.archivedResourceCatalog.find(g=>g.id==='video-prompts').items){const data=fs.readFileSync(path.join(__dirname,'../public',item.video));assert.ok(data.subarray(0,40).includes(Buffer.from('ftyp')))}const fonts=catalog.extraResources.find(g=>g.id==='font-packs').items;assert.equal(fonts.length,18);assert.ok(fonts.some(x=>x.categoryEn==='English'));assert.equal(catalog.extraResources.find(g=>g.id==='app-icons').items.length,26)});

test('iPad wallpaper collection uses twelve independent images, not desktop assets',async()=>{
 const {catalog}=await modules;const ipad=catalog.extraResources.find(g=>g.id==='ipad-wallpapers').items,desktop=catalog.extraResources.find(g=>g.id==='desktop-wallpapers').items;
 assert.equal(ipad.length,12);assert.equal(new Set(ipad.map(x=>x.image)).size,12);
 const crypto=require('node:crypto'),hash=x=>crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../public',x.image))).digest('hex');
 const desktopHashes=new Set(desktop.map(hash));assert.ok(ipad.every(x=>!desktopHashes.has(hash(x))));assert.equal(new Set(ipad.map(hash)).size,12);
 const preview=fs.readFileSync(path.join(__dirname,'../src/features/creator/ResourcePreview.tsx'),'utf8');assert.match(preview,/data-size-frame/);assert.match(preview,/h-\[72px\]/);
});
