const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
async function setup(){
 const {transformWithOxc}=await import('vite');
 const source=(await transformWithOxc(fs.readFileSync('src/lib/pageScroll.ts','utf8'),'pageScroll.ts')).code.replace(/export function/g,'function');
 const calls=[],removed=[],style={scrollBehavior:'smooth'},history={scrollRestoration:'auto'};
 const context={window:{history,scrollY:300,scrollTo:v=>calls.push(v),sessionStorage:{removeItem:key=>removed.push(key)}},document:{documentElement:{style},getElementById:id=>id==='resources-section'?{getBoundingClientRect:()=>({top:200})}:null}};
 vm.createContext(context);vm.runInContext(source+';this.api={scrollPageTo,scrollPageToHash,initializePageScroll};',context);
 return {api:context.api,calls,removed,style,history};
}
test('fresh visits disable browser scroll restoration and clear stale return markers',async()=>{
 const s=await setup();s.api.initializePageScroll();assert.equal(s.history.scrollRestoration,'manual');assert.deepEqual(s.removed,['sba_return_card']);s.api.scrollPageTo(0);assert.equal(s.calls[0].top,0);assert.equal(s.calls[0].left,0);assert.equal(s.calls[0].behavior,'auto');assert.equal(s.style.scrollBehavior,'smooth');
});
test('section links retain their vertical target without scrolling the RTL viewport sideways',async()=>{
 const s=await setup();s.api.scrollPageToHash('#resources-section');assert.equal(s.calls[0].top,400);assert.equal(s.calls[0].left,0);s.api.scrollPageToHash('#missing');s.api.scrollPageToHash('#%broken');assert.equal(s.calls.length,1);s.api.scrollPageTo(-50);assert.equal(s.calls[1].top,0);
});
