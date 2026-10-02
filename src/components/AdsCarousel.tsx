import {useEffect,useRef} from 'react';
import {SaeedAdCard} from './SaeedAdsSection';
import {useLanguage} from '../context/LanguageContext';
import type {SaeedAd} from '../data/adsData';
export function AdsCarousel({ads}:{ads:SaeedAd[]}){
 const {isArabic}=useLanguage(),rail=useRef<HTMLDivElement>(null);
 const gesture=useRef<{x:number;scroll:number;pointer:number}|null>(null);
 const dragged=useRef(false),paused=useRef(false),focused=useRef(false);
 useEffect(()=>{if(ads.length<2||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const timer=window.setInterval(()=>{const node=rail.current;if(!node||gesture.current||paused.current||focused.current)return;const max=node.scrollWidth-node.clientWidth;if(max<=1)return;const step=(node.firstElementChild as HTMLElement).offsetWidth+24;node.scrollTo({left:node.scrollLeft>=max-4?0:Math.min(max,node.scrollLeft+step),behavior:'smooth'});},4600);
 return()=>window.clearInterval(timer);},[ads.length]);
 return <div ref={rail} dir="ltr" role="region" aria-label={isArabic?'إعلانات سعيد — اسحب لاستعراض الإعلانات':'Saeed Ads — swipe to browse'} tabIndex={0}
 className="flex items-stretch gap-6 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
 onPointerEnter={e=>{if(e.pointerType==='mouse')paused.current=true}}
 onPointerLeave={()=>{paused.current=false;gesture.current=null}}
 onFocusCapture={()=>{focused.current=true}}
 onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))focused.current=false}}
 onPointerDown={e=>{dragged.current=false;if(e.button===0)gesture.current={x:e.clientX,scroll:e.currentTarget.scrollLeft,pointer:e.pointerId}}}
 onPointerMove={e=>{const g=gesture.current;if(e.pointerType!=='mouse'||!g||g.pointer!==e.pointerId)return;const delta=e.clientX-g.x;if(Math.abs(delta)>8){dragged.current=true;e.currentTarget.setPointerCapture(e.pointerId);e.currentTarget.scrollLeft=g.scroll-delta;e.preventDefault()}}}
 onPointerUp={()=>{gesture.current=null}} onPointerCancel={()=>{gesture.current=null}}
 onClickCapture={e=>{if(dragged.current){e.preventDefault();e.stopPropagation()}}}
 onDragStart={e=>e.preventDefault()}>
 {ads.map(ad=><div key={ad.id} dir={isArabic?'rtl':'ltr'} className="w-[86%] shrink-0 sm:w-[55%]"><SaeedAdCard ad={ad}/></div>)}
 </div>;
}
