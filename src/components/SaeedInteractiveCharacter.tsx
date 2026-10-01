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
  return <div aria-hidden="true" className={`saeed-character-layer saeed-${scene} ${fleeing?'saeed-flee':''}`}>
    <img src={SAEED_CHARACTER} alt="" draggable={false} className={run?'saeed-character-img saeed-running':'saeed-character-img'}/>
  </div>
};