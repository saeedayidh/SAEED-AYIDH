import React,{useCallback,useEffect,useMemo,useRef,useState}from'react';
import{Link}from'react-router-dom';
import{Search,ChevronLeft}from'lucide-react';
import{useLanguage}from'../context/LanguageContext';
import{useVisibleAutoplay}from'../hooks/useVisibleAutoplay';
import{saeedMobileWallpapers,saeedDesktopWallpapers}from'../data/saeedWallpapers';
const WallpaperCollection=({desktop=false}:{desktop?:boolean})=>{const{isArabic}=useLanguage();const source=desktop?saeedDesktopWallpapers:saeedMobileWallpapers;const url=desktop?'/saeed-wallpapers/desktop':'/saeed-wallpapers/mobile';
 const[q,setQ]=useState('');
 const[active,setActive]=useState(0);
 const[startX,setStartX]=useState<number|null>(null);
 const[direction,setDirection]=useState<'next'|'prev'>('next');
 const[animKey,setAnimKey]=useState(0);
 const dragged=useRef(false);
 const featured=useMemo(()=>source.filter(x=>!q.trim()||x.title.includes(q.trim())).slice(0,12),[q,source]);
 useEffect(()=>{source.slice(0,12).forEach(w=>{const img=new Image();img.src=w.image})},[source]);
 const move=useCallback((dir:'next'|'prev')=>{
  if(featured.length<2)return;
  setDirection(dir);setAnimKey(k=>k+1);
  setActive(v=>dir==='next'?(v+1)%featured.length:(v-1+featured.length)%featured.length);
 },[featured.length]);
 useEffect(()=>{setActive(0)},[q]);
 const autoplay=useVisibleAutoplay(()=>{if(startX===null)move('next')},featured.length>1);
 const offsets=featured.length===1?[0]:featured.length===2?[0,1]:featured.length===3?[-1,0,1]:featured.length===4?[-1,0,1,2]:[-2,-1,0,1,2];
 const cards=featured.length?offsets.map(offset=>({offset,w:featured[(active+offset+featured.length)%featured.length]})):[];
 const endDrag=(x:number)=>{if(startX===null)return;const d=x-startX;dragged.current=Math.abs(d)>20;if(d<-35)move('next');else if(d>35)move('prev');setStartX(null)};
 return <div className={desktop?"mt-14 border-t border-white/5 pt-12":""} dir={isArabic?'rtl':'ltr'}>
  <style>{`
   @keyframes resourceNext{0%{opacity:.72;transform:translateX(28px)}100%{opacity:1;transform:translateX(0)}}
   @keyframes resourcePrev{0%{opacity:.72;transform:translateX(-28px)}100%{opacity:1;transform:translateX(0)}}
   .resource-carousel-next{animation:resourceNext 1.1s cubic-bezier(.22,.75,.25,1)}
   .resource-carousel-prev{animation:resourcePrev 1.1s cubic-bezier(.22,.75,.25,1)}
  `}</style>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   {!desktop&&<div className="mb-8 text-center">
    <p className="mb-2 text-xs font-bold text-[#D51F2B]">{isArabic?'خلفيات سعيد بن عايض':'Saeed Bin Ayidh wallpapers'}</p>
    <h2 className="text-3xl font-black text-white sm:text-5xl">{isArabic?'خلفية سعيد':'Saeed Wallpapers'}</h2>
   </div>}
   <div className="mb-7">
    <Link to={url} className="mb-3 flex w-full items-center justify-center rounded-xl border border-[#D51F2B]/55 bg-[#D51F2B]/[0.06] h-10 px-4 text-sm font-black text-[#ED1C2E] transition hover:bg-[#D51F2B] hover:text-white sm:text-base">{isArabic?(desktop?'خلفية كمبيوتر':'خلفية جوال'):(desktop?'Desktop Wallpaper':'Mobile Wallpaper')}</Link>
    <div className="flex w-full items-stretch gap-2 sm:gap-3">
     <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-[#111] h-10 px-3 focus-within:border-[#D51F2B]/60 sm:px-4">
      <Search className="h-4 w-4 shrink-0 text-gray-500"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={isArabic?'ابحث عن خلفية...':'Search wallpapers...'} className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"/>
     </label>
     <Link to={url} className="inline-flex shrink-0 items-center justify-center gap-1 rounded-xl border border-[#D51F2B]/45 h-10 px-3 text-xs font-bold text-[#ED1C2E] transition hover:bg-[#D51F2B] hover:text-white sm:gap-2 sm:px-4 sm:text-sm"><span>{isArabic?'استكشف الكل':'Explore All'}</span><ChevronLeft className="h-4 w-4"/></Link>
    </div>
   </div>
   {cards.length?<div ref={autoplay} className={`relative mx-auto w-full touch-pan-y select-none overflow-hidden ${desktop?'h-[240px] max-w-[900px] sm:h-[330px]':'h-[330px] max-w-[650px] sm:h-[410px]'}`}
    onPointerDown={e=>{dragged.current=false;setStartX(e.clientX)}} onPointerUp={e=>endDrag(e.clientX)} onPointerCancel={()=>setStartX(null)}>
    <div key={animKey} className={`absolute inset-0 ${direction==='next'?'resource-carousel-next':'resource-carousel-prev'}`}>
    {cards.map(({offset,w})=>{
     const abs=Math.abs(offset),scale=offset===0?1:abs===1?.82:.68,shift=offset*(desktop?125:88);
     return <Link key={w.id} to={url} onClick={e=>{if(dragged.current){e.preventDefault();dragged.current=false}}} className={`absolute left-1/2 top-1/2 block transition-[transform,opacity] duration-[1100ms] ease-out ${desktop?'w-[260px] sm:w-[420px]':'w-[158px] sm:w-[205px]'}`} style={{zIndex:10-abs,opacity:abs===2?.28:abs===1?.68:1,transform:`translate3d(calc(-50% + ${shift}px),-50%,0) scale(${scale})`}}>
      <div className={`${desktop?'aspect-video':'aspect-[9/16]'} overflow-hidden rounded-[26px] border bg-[#141414] shadow-2xl ${offset===0?'border-[#D51F2B]/45':'border-white/10'}`}>
       <img src={w.image} alt={w.title} loading="eager" decoding="async" draggable={false} className="h-full w-full object-cover"/>
      </div>
     </Link>
    })}
    </div>
   </div>:<div className="grid h-[260px] place-items-center text-sm text-gray-500">{isArabic?'ما لقينا خلفيات مطابقة.':'No matching wallpapers found.'}</div>}

</div></div>;};
export const SaeedWallpapersSection=()=>{const{isArabic}=useLanguage();return <section id="saeed-wallpapers-section" className="relative overflow-hidden border-t border-white/5 bg-[#0B0B0B] py-20" dir={isArabic?'rtl':'ltr'}><WallpaperCollection/><WallpaperCollection desktop/></section>;};
