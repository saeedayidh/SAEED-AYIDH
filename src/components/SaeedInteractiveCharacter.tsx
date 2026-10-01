import React,{useCallback,useEffect,useRef,useState}from'react';

type Scene='left'|'top'|'right'|'bottom-left'|'bottom-right';
const scenes:Scene[]=['left','top','right','bottom-left','bottom-right'];
const assets:Record<Scene,string>={
  left:'https://gcdn.picsart.com/editing-temp/3e4d27d1-9803-400e-806e-428c4b119f7c.png',
  top:'https://gcdn.picsart.com/editing-temp/ace54c0a-1706-4e8e-bb5e-17ba58d672fe.png',
  right:'https://gcdn.picsart.com/editing-temp/4e77668d-3b48-407b-a200-9f3a52d5524c.png',
  'bottom-left':'https://gcdn.picsart.com/editing-temp/7eb286ab-03e1-4625-8ee9-a3f5f4b5057e.png',
  'bottom-right':'https://gcdn.picsart.com/editing-temp/774efa05-e7f3-4efa-b558-9c1750503e27.png'
};

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
    hideTimer.current=window.setTimeout(()=>{setVisible(false);setFleeing(false)},620);
  },[]);

  const appear=useCallback(()=>{
    const options=scenes.filter(x=>x!==lastScene.current);
    const next=options[Math.floor(Math.random()*options.length)];
    lastScene.current=next;
    setScene(next);
    setFleeing(false);
    setVisible(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current=window.setTimeout(hide,5200);
  },[hide]);

  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const first=window.setTimeout(appear,4500);
    cycleTimer.current=window.setInterval(appear,15000);
    return()=>{window.clearTimeout(first);window.clearTimeout(hideTimer.current);window.clearInterval(cycleTimer.current)}
  },[appear]);

  useEffect(()=>{
    if(!visible)return;
    const onPointer=(e:PointerEvent)=>{
      const now=performance.now(),prev=lastPointer.current;
      const distance=Math.hypot(e.clientX-prev.x,e.clientY-prev.y);
      if(prev.t&&now-prev.t<260&&distance>65)hide();
      lastPointer.current={x:e.clientX,y:e.clientY,t:now};
    };
    window.addEventListener('pointermove',onPointer,{passive:true});
    return()=>window.removeEventListener('pointermove',onPointer);
  },[visible,hide]);

  if(!visible)return null;
  const src=assets[scene];
  return <><style>{`
.saeed-peek{position:fixed;z-index:45;pointer-events:none;will-change:transform,opacity;transition:opacity .25s ease,transform .62s cubic-bezier(.2,.8,.2,1);filter:drop-shadow(0 14px 26px rgba(0,0,0,.58));overflow:hidden}
.saeed-peek img{display:block;width:100%;height:auto;user-select:none;-webkit-user-drag:none}
.saeed-peek-main{position:relative;z-index:1}
.saeed-peek-eyes{position:absolute;inset:0;z-index:2;animation:saeedEyes 1.35s ease-in-out infinite alternate;clip-path:inset(var(--eye-top) var(--eye-right) var(--eye-bottom) var(--eye-left))}
.saeed-left{left:-5px;top:22%;width:155px;--eye-top:25%;--eye-right:20%;--eye-bottom:60%;--eye-left:28%;animation:saeedInLeft .65s both}
.saeed-top{left:50%;top:-8px;width:270px;--eye-top:28%;--eye-right:25%;--eye-bottom:56%;--eye-left:34%;animation:saeedInTop .7s both}
.saeed-right{right:-4px;top:24%;width:170px;--eye-top:25%;--eye-right:24%;--eye-bottom:60%;--eye-left:27%;animation:saeedInRight .65s both}
.saeed-bottom-left{left:1%;bottom:-3px;width:190px;--eye-top:25%;--eye-right:25%;--eye-bottom:60%;--eye-left:26%;animation:saeedInBottom .7s both}
.saeed-bottom-right{right:1%;bottom:-3px;width:205px;--eye-top:23%;--eye-right:24%;--eye-bottom:62%;--eye-left:28%;animation:saeedInBottom .7s both}
.saeed-flee{opacity:0!important}
.saeed-left.saeed-flee{transform:translateX(-180px) rotate(5deg) scale(.92)!important}.saeed-right.saeed-flee{transform:translateX(180px) rotate(-5deg) scale(.92)!important}
.saeed-top.saeed-flee{transform:translateY(-180px) scale(.92)!important}.saeed-bottom-left.saeed-flee,.saeed-bottom-right.saeed-flee{transform:translateY(180px) scale(.92)!important}
@keyframes saeedInLeft{from{opacity:0;transform:translateX(-120px)}to{opacity:1;transform:translateX(0)}}@keyframes saeedInRight{from{opacity:0;transform:translateX(120px)}to{opacity:1;transform:translateX(0)}}@keyframes saeedInTop{from{opacity:0;transform:translate(-50%,-130px)}to{opacity:1;transform:translate(-50%,0)}}@keyframes saeedInBottom{from{opacity:0;transform:translateY(130px)}to{opacity:1;transform:translateY(0)}}
@keyframes saeedEyes{0%,12%{transform:translateX(-2px)}45%,60%{transform:translateX(2px)}88%,100%{transform:translateX(0)}}
@media(max-width:640px){.saeed-left{width:110px}.saeed-right{width:118px}.saeed-top{width:190px}.saeed-bottom-left{width:125px}.saeed-bottom-right{width:140px}}
@media(prefers-reduced-motion:reduce){.saeed-peek{display:none!important}}
`}</style><div aria-hidden="true" className={`saeed-peek saeed-${scene} ${fleeing?'saeed-flee':''}`}>
    <img src={src} alt="" draggable={false} className="saeed-peek-main"/>
    <img src={src} alt="" draggable={false} className="saeed-peek-eyes"/>
  </div></>
};