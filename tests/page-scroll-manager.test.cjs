const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
async function setup(){
 const {transformWithOxc}=await import('vite');
 const code=(await transformWithOxc(fs.readFileSync('src/components/PageScrollManager.tsx','utf8'),'PageScrollManager.tsx')).code.replace(/^import .*;$/gm,'').replace('export function','function');
 const refs=[],layouts=[],effects=[],listeners={},calls=[],navigation=[];let index=0;
 const state={location:{key:'home',pathname:'/',hash:'#resources-section'},type:'POP'};
 const context={Map,Set,window:{scrollY:0,location:{origin:'https://example.com'},setTimeout:()=>1,addEventListener:(n,fn)=>listeners[n]=fn,removeEventListener:()=>{}},document:{body:{},addEventListener:(n,fn)=>listeners[n]=fn,removeEventListener:()=>{}},ResizeObserver:class{observe(){}disconnect(){}},requestAnimationFrame:()=>1,cancelAnimationFrame(){},clearTimeout(){},useRef:v=>refs[index++]||(refs[index-1]={current:v}),useLocation:()=>state.location,useNavigate:()=>v=>navigation.push(v),useNavigationType:()=>state.type,useLayoutEffect:fn=>layouts.push(fn),useEffect:fn=>effects.push(fn),scrollPageTo:v=>calls.push(v),scrollPageToHash:v=>calls.push(v)};
 vm.createContext(context);vm.runInContext(code+';this.render=PageScrollManager;',context);
 const render=()=>{index=0;layouts.length=0;effects.length=0;context.render();layouts[0]();effects[0]();};
 return {state,context,render,layouts,listeners,calls,navigation};
}
test('fresh homepage with stale hash stays at the top even when effects run twice',async()=>{const s=await setup();s.render();s.layouts[0]();assert.deepEqual(s.calls,[0,0]);});
test('back links use history and POP restores the saved source position',async()=>{
 const s=await setup();s.render();s.context.window.scrollY=1850;s.listeners.scroll();
 s.state.location={key:'resource',pathname:'/resources/wallpapers',hash:''};s.state.type='PUSH';s.render();
 let prevented=false;const link={origin:'https://example.com',target:'',textContent:'الرجوع'};
 s.listeners.click({target:{closest:()=>link},button:0,preventDefault(){prevented=true},stopPropagation(){}});
 assert.equal(prevented,true);assert.deepEqual(s.navigation,[-1]);
 s.state.location={key:'home',pathname:'/',hash:'#resources-section'};s.state.type='POP';s.render();assert.equal(s.calls.at(-1),1850);
});
