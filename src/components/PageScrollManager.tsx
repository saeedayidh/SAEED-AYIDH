import {useEffect,useLayoutEffect,useRef} from 'react';
import {useLocation,useNavigate,useNavigationType} from 'react-router-dom';
import {scrollPageTo,scrollPageToHash} from '../lib/pageScroll';

// Positions live only for this document: a refresh never restores an old section.
export function PageScrollManager(){
 const location=useLocation(),navigate=useNavigate(),type=useNavigationType();
 const positions=useRef(new Map<string,number>());
 const visited=useRef(new Set<string>());
 const current=useRef(location.key);
 const entryKey=useRef(location.key);
 useLayoutEffect(()=>{
  const initial=location.key===entryKey.current;
  current.current=location.key;
  const saved=type==='POP'?positions.current.get(location.key):undefined;
  visited.current.add(location.key);
  // Homepage entry/refresh always opens at the top, including stale section hashes.
  const top=saved!==undefined?saved:initial&&location.pathname==='/'?0:undefined;
  let stopped=false;
  const restore=()=>{
   if(stopped)return;
   if(top!==undefined)scrollPageTo(top);
   else if(location.hash)scrollPageToHash(location.hash);
   else scrollPageTo(0);
  };
  restore();
  const frame=requestAnimationFrame(restore);
  // Images and CMS content can change page height after the route mounts.
  const observer=new ResizeObserver(restore);observer.observe(document.body);
  const stop=()=>{stopped=true;observer.disconnect();};
  const timer=window.setTimeout(stop,2000);
  window.addEventListener('wheel',stop,{passive:true});
  window.addEventListener('touchstart',stop,{passive:true});
  window.addEventListener('pointerdown',stop,{passive:true});
  const onShow=()=>restore();window.addEventListener('pageshow',onShow);
  return()=>{stop();cancelAnimationFrame(frame);clearTimeout(timer);window.removeEventListener('wheel',stop);window.removeEventListener('touchstart',stop);window.removeEventListener('pointerdown',stop);window.removeEventListener('pageshow',onShow);};
 },[location.key,location.pathname,location.hash,type]);
 useEffect(()=>{
  const save=()=>positions.current.set(current.current,window.scrollY);
  const click=(event:MouseEvent)=>{
   const link=(event.target as Element)?.closest?.('a[href]') as HTMLAnchorElement|null;
   if(!link||link.origin!==window.location.origin||link.target==='_blank'||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   save();
   // Back links return through router history, preserving the exact source position.
   const label=link.textContent?.trim()||'';
   if(/^(الرجوع|العودة|رجوع|Back\b)/i.test(label)&&visited.current.size>1){
    event.preventDefault();event.stopPropagation();navigate(-1);
   }
  };
  window.addEventListener('scroll',save,{passive:true});
  document.addEventListener('click',click,true);
  return()=>{window.removeEventListener('scroll',save);document.removeEventListener('click',click,true);};
 },[navigate]);
 return null;
}
