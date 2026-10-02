const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
async function mount(name) {
 const {transformWithOxc}=await import('vite');
 const code=(await transformWithOxc(fs.readFileSync(`src/hooks/${name}.ts`,'utf8'),`${name}.ts`)).code.replace(/^import .*from "react";\n/m,'').replace('export function','function');
 const effects=[],listeners=new Map(),globalListeners=new Map(),scrolls=[];
 const node={scrollWidth:900,clientWidth:300,scrollLeft:0,firstElementChild:{firstElementChild:{getBoundingClientRect:()=>({width:280})}},contains:()=>false,setPointerCapture(){},scrollTo(x){scrolls.push(x)},addEventListener(k,f){listeners.set(k,f)},removeEventListener(k){listeners.delete(k)}};
 let tick,intersect,disconnected=false,cleared=false;const doc={hidden:false},reduced={matches:false};
 const context={useRef:x=>({current:x===null?node:x}),useEffect:f=>effects.push(f),window:{matchMedia:()=>reduced,setInterval:f=>(tick=f,1),clearInterval:()=>{cleared=true},addEventListener:(k,f)=>globalListeners.set(k,f),removeEventListener:k=>globalListeners.delete(k)},document:doc,IntersectionObserver:class{constructor(f){intersect=f}observe(){}disconnect(){disconnected=true}},getComputedStyle:()=>({columnGap:'20'}),Date};
 vm.createContext(context);vm.runInContext(code+`;this.hook=${name};`,context);
 let calls=0;context.hook(()=>calls++,true);const cleanups=effects.map(f=>f()).filter(Boolean);
 return {node,scrolls,doc,reduced,listeners,globalListeners,visible:v=>intersect([{isIntersecting:v}]),tick:()=>tick(),calls:()=>calls,cleanup(){cleanups.forEach(f=>f());assert.ok(disconnected&&cleared);assert.equal(listeners.size,0);assert.equal(globalListeners.size,0)}};
}
test('autoplay respects visibility, background tabs, reduced motion and user interaction',async()=>{
 const m=await mount('useVisibleAutoplay');m.tick();assert.equal(m.calls(),0);m.visible(true);m.tick();assert.equal(m.calls(),1);
 m.doc.hidden=true;m.tick();m.doc.hidden=false;m.reduced.matches=true;m.tick();assert.equal(m.calls(),1);m.reduced.matches=false;
 m.listeners.get('pointerdown')();m.tick();assert.equal(m.calls(),1);m.globalListeners.get('pointerup')();m.tick();assert.equal(m.calls(),2);
 m.listeners.get('focusin')();m.tick();assert.equal(m.calls(),2);m.listeners.get('focusout')({relatedTarget:null});m.tick();assert.equal(m.calls(),3);m.cleanup();
});
test('rails advance by a card, wrap at the end, and do not move when hidden or fully visible',async()=>{
 const m=await mount('useAutoScrollRail');m.tick();assert.equal(m.scrolls.length,0);m.visible(true);m.tick();assert.equal(m.scrolls[0].left,300);
 m.node.scrollLeft=600;m.tick();assert.equal(m.scrolls[1].left,0);m.node.clientWidth=900;m.tick();assert.equal(m.scrolls.length,2);m.cleanup();
});
test('mouse dragging scrolls the rail and suppresses accidental navigation',async()=>{
 const m=await mount('useAutoScrollRail');m.listeners.get('pointerdown')({button:0,pointerId:1,clientX:200,clientY:0});let prevented=false;
 m.listeners.get('pointermove')({pointerId:1,pointerType:'mouse',clientX:100,clientY:0,preventDefault(){prevented=true}});assert.equal(m.node.scrollLeft,100);assert.ok(prevented);
 let suppressed=false;m.listeners.get('click')({preventDefault(){suppressed=true},stopPropagation(){}});assert.ok(suppressed);m.globalListeners.get('pointerup')();m.cleanup();
});
