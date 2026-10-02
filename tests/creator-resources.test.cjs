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
test('all 15 libraries have bilingual usable resources and verified local font assets',async()=>{
 const{catalog,design}=await modules;assert.equal(catalog.extraResources.length,15);
 const all=catalog.extraResources.flatMap(x=>x.items);assert.equal(new Set(all.map(x=>x.id)).size,all.length);
 for(const group of catalog.extraResources){assert.ok(group.ar&&group.en&&group.items.length);for(const item of group.items){assert.ok(item.ar&&item.en);if(item.font){assert.ok(fs.statSync(path.join(__dirname,'../public',item.font)).size>100000);assert.match(fs.readFileSync(path.join(__dirname,'../public',item.license),'utf8'),/SIL OPEN FONT LICENSE/)}if(['wallpaper','avatar','icons','gradient','template','sizes'].includes(item.kind)){const svg=design.resourceSvg(item);assert.match(svg,/^<svg/);assert.ok(!svg.includes('<script'));}if(item.kind==='prompt'){assert.ok(item.prompt.length>200&&item.promptEn.length>200)}}}
 const prompts=all.filter(x=>x.kind==='prompt');assert.equal(new Set(prompts.map(x=>x.prompt)).size,prompts.length);
});
test('invoice calculates totals and HTML export escapes editable user input',async()=>{
 const{templates}=await modules;const v={...templates.templateDefaults('invoice-templates',true),name:'<img src=x onerror=alert(1)>',details:'صورة | 2 | 75\nتصميم | 3 | 50',color:'red; background:url(javascript:x)'};
 const html=templates.templateHtml('invoice-templates',2,v,true);assert.ok(html.includes('300.00 SAR'));assert.ok(!html.includes('<img src=x'));assert.ok(html.includes('&lt;img'));assert.ok(!html.includes('javascript:'));
});
