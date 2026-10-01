import React,{useCallback,useEffect,useRef,useState}from'react';

const SAEED_CHARACTER='https://cdn-ai-hs.picsart.com/ai-hot-storage/6cc5060e-2672-461c-9d18-f7e5eecf0c03.png';
type Scene='left'|'right'|'bottom-left'|'bottom-right'|'run-ltr'|'run-rtl';
const scenes:Scene[]=['left','right','bottom-left','bottom-right','run-ltr','run-rtl'];

export const SaeedInteractiveCharacter:React.FC=()=>{
  const[scene,setScene]=useState<Scene>('right');
  const[visible,setVisible]=useState(false);
  const[fleeing,setFleeing]=useState(false);
  const lastScene=useRef<Scene>('right');
  const hideTimer=useRef<number|undefined>(undefined);
  const cycleTimer=useRef<number|undefined>(undefined);
  const lastPointer=useRef({x:0,y:0,t:0});

  const hide=useCallback(()=>{
    setFleeing(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current=window.setTimeout(()=>{setVisible(false);setFleeing(false)},650);
  },[]);

  const appear=useCallback(()=>{
    const options=scenes.filter(x=>x!==lastScene.current);
    const next=options[Math.floor(Math.random()*options.length)];
    lastScene.current=next;
    setScene(next);
    setFleeing(false);
    setVisible(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current=window.setTimeout(()=>hide(),next.startsWith('run')?4200:5000);
  },[hide]);

  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const first=window.setTimeout(appear,7000);
    cycleTimer.current=window.setInterval(appear,15000);
    return()=>{window.clearTimeout(first);window.clearTimeout(hideTimer.current);window.clearInterval(cycleTimer.current)}
  },[appear]);

  useEffect(()=>{
    if(!visible)return;
    const onPointer=(e:PointerEvent)=>{
      const now=performance.now(),prev=lastPointer.current;
      const distance=Math.hypot(e.clientX-prev.x,e.clientY-prev.y);
      if(prev.t&&now-prev.t<280&&distance>55)hide();
      lastPointer.current={x:e.clientX,y:e.clientY,t:now};
    };
    const onTouch=()=>hide();
    window.addEventListener('pointermove',onPointer,{passive:true});
    window.addEventListener('touchmove',onTouch,{passive:true});
    return()=>{window.removeEventListener('pointermove',onPointer);window.removeEventListener('touchmove',onTouch)}
  },[visible,hide]);

  if(!visible)return null;
  const run=scene==='run-ltr'||scene==='run-rtl';
  return <><style>{`
.saeed-character-layer{position:fixed;z-index:45;pointer-events:none;will-change:transform,opacity;filter:drop-shadow(0 16px 28px rgba(0,0,0,.55));transition:opacity .28s ease,transform .62s cubic-bezier(.2,.8,.2,1)}
.saeed-character-img{display:block;width:clamp(105px,12vw,180px);height:auto;user-select:none;-webkit-user-drag:none}
.saeed-left{left:-42px;top:34%;animation:saeedPeekLeft .65s both}.saeed-right{right:-42px;top:28%;animation:saeedPeekRight .65s both}
.saeed-bottom-left{left:4%;bottom:-115px;animation:saeedPeekBottom .7s both}.saeed-bottom-right{right:5%;bottom:-115px;animation:saeedPeekBottom .7s both}
.saeed-run-ltr{left:-210px;bottom:3%;animation:saeedRunLTR 4.2s linear both}.saeed-run-rtl{right:-210px;bottom:3%;animation:saeedRunRTL 4.2s linear both}
.saeed-running{width:clamp(115px,13vw,195px);animation:saeedBob .24s ease-in-out infinite alternate}
.saeed-flee{opacity:0!important;transform:translate3d(var(--flee-x,0),45px,0) scale(.72) rotate(-7deg)!important}
.saeed-left.saeed-flee{--flee-x:-180px}.saeed-right.saeed-flee{--flee-x:180px}.saeed-bottom-left.saeed-flee{--flee-x:-150px}.saeed-bottom-right.saeed-flee{--flee-x:150px}
@keyframes saeedPeekLeft{from{opacity:0;transform:translateX(-90px) rotate(7deg)}to{opacity:1;transform:translateX(0) rotate(3deg)}}
@keyframes saeedPeekRight{from{opacity:0;transform:translateX(90px) rotate(-7deg)}to{opacity:1;transform:translateX(0) rotate(-3deg)}}
@keyframes saeedPeekBottom{from{opacity:0;transform:translateY(100px)}to{opacity:1;transform:translateY(0)}}
@keyframes saeedRunLTR{0%{opacity:0;transform:translateX(0) scaleX(1)}8%{opacity:1}90%{opacity:1}100%{opacity:0;transform:translateX(calc(100vw + 420px)) scaleX(1)}}
@keyframes saeedRunRTL{0%{opacity:0;transform:translateX(0) scaleX(-1)}8%{opacity:1}90%{opacity:1}100%{opacity:0;transform:translateX(calc(-100vw - 420px)) scaleX(-1)}}
@keyframes saeedBob{from{transform:translateY(0) rotate(-2deg)}to{transform:translateY(-8px) rotate(2deg)}}
@media(max-width:640px){.saeed-character-img{width:100px}.saeed-running{width:112px}.saeed-left{left:-35px}.saeed-right{right:-35px}.saeed-bottom-left,.saeed-bottom-right{bottom:-72px}}
@media(prefers-reduced-motion:reduce){.saeed-character-layer{display:none!important}}
`}</style><div aria-hidden="true" className={`saeed-character-layer saeed-${scene} ${fleeing?'saeed-flee':''}`}>
    <img src={SAEED_CHARACTER} alt="" draggable={false} className={run?'saeed-character-img saeed-running':'saeed-character-img'}/>
  </div></>
};