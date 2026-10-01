import React,{useCallback,useEffect,useMemo,useRef,useState}from'react';
import{Link}from'react-router-dom';
import{Search,ChevronLeft}from'lucide-react';
import{useLanguage}from'../context/LanguageContext';
import{wallpapers}from'../data/resourcesData';

export const ResourcesSection:React.FC=()=>{
 const{isArabic}=useLanguage();
 const[q,setQ]=useState('');
 const[active,setActive]=useState(0);
 const[startX,setStartX]=useState<number|null>(null);
 const[direction,setDirection]=useState<'next'|'prev'>('next');
 const[animKey,setAnimKey]=useState(0);
 const dragged=useRef(false);
 const featured=useMemo(()=>wallpapers.filter(x=>!q.trim()||x.title.includes(q.trim())||x.category.includes(q.trim())).slice(0,12),[q]);
 useEffect(()=>{wallpapers.slice(0,12).forEach(w=>{const img=new Image();img.src=w.image})},[]);
 const move=useCallback((dir:'next'|'prev')=>{
  if(featured.length<2)return;
  setDirection(dir);setAnimKey(k=>k+1);
  setActive(v=>dir==='next'?(v+1)%featured.length:(v-1+featured.length)%featured.length);
 },[featured.length]);
 useEffect(()=>{setActive(0)},[q]);
 useEffect(()=>{if(featured.length<2)return;const t=window.setInterval(()=>move('next'),4200);return()=>window.clearInterval(t)},[featured.length,move]);
 const cards=featured.length?[-2,-1,0,1,2].map(offset=>({offset,w:featured[(active+offset+featured.length)%featured.length]})):[];
 const endDrag=(x:number)=>{if(startX===null)return;const d=x-startX;dragged.current=Math.abs(d)>20;if(d<-35)move('next');else if(d>35)move('prev');setStartX(null)};
 return <section id="resources-section" className="relative overflow-hidden border-t border-white/5 bg-[#0B0B0B] py-20" dir={isArabic?'rtl':'ltr'}>
  <style>{`
   @keyframes resourceNext{0%{opacity:.72;transform:translateX(28px)}100%{opacity:1;transform:translateX(0)}}
   @keyframes resourcePrev{0%{opacity:.72;transform:translateX(-28px)}100%{opacity:1;transform:translateX(0)}}
   .resource-carousel-next{animation:resourceNext 1.05s cubic-bezier(.22,.75,.25,1)}
   .resource-carousel-prev{animation:resourcePrev 1.05s cubic-bezier(.22,.75,.25,1)}
  `}</style>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   <div className="mb-8">
    <p className="mb-2 text-xs font-bold text-[#D51F2B]">{isArabic?'موارد مختارة لك':'Resources selected for you'}</p>
    <h2 className="text-3xl font-black text-white sm:text-5xl">{isArabic?'موارد سعيد':'Saeed Resources'}</h2>
   </div>
   <div className="mb-7">
    <Link to="/resources/wallpapers" className="mb-3 flex w-full items-center justify-center rounded-2xl border border-[#D51F2B]/55 bg-[#D51F2B]/[0.06] px-5 py-4 text-base font-black text-[#ED1C2E] transition hover:bg-[#D51F2B] hover:text-white sm:text-lg">{isArabic?'خلفية جوال':'Mobile Wallpaper'}</Link>
    <div className="flex w-full items-stretch gap-2 sm:gap-3">
     <label className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-[#111] px-3 py-3.5 focus-within:border-[#D51F2B]/60 sm:px-4">
      <Search className="h-4 w-4 shrink-0 text-gray-500"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={isArabic?'ابحث عن خلفية...':'Search wallpapers...'} className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"/>
     </label>
     <Link to="/resources/wallpapers" className="inline-flex shrink-0 items-center justify-center gap-1 rounded-2xl border border-[#D51F2B]/45 px-3 py-3.5 text-xs font-bold text-[#ED1C2E] transition hover:bg-[#D51F2B] hover:text-white sm:gap-2 sm:px-6 sm:text-sm"><span>{isArabic?'استكشف الكل':'Explore All'}</span><ChevronLeft className="h-4 w-4"/></Link>
    </div>
   </div>
   {cards.length?<div className="relative mx-auto h-[330px] w-full max-w-[650px] touch-pan-y select-none overflow-hidden sm:h-[410px]"
    onPointerDown={e=>{dragged.current=false;setStartX(e.clientX)}} onPointerUp={e=>endDrag(e.clientX)} onPointerCancel={()=>setStartX(null)}>
    <div key={animKey} className={`absolute inset-0 ${direction==='next'?'resource-carousel-next':'resource-carousel-prev'}`}>
    {cards.map(({offset,w})=>{
     const abs=Math.abs(offset),scale=offset===0?1:abs===1?.82:.68,shift=offset*88;
     return <Link key={w.id} to="/resources/wallpapers" onClick={e=>{if(dragged.current){e.preventDefault();dragged.current=false}}} className="absolute left-1/2 top-1/2 block w-[158px] transition-[transform,opacity] duration-[1050ms] ease-out sm:w-[205px]" style={{zIndex:10-abs,opacity:abs===2?.28:abs===1?.68:1,transform:`translate3d(calc(-50% + ${shift}px),-50%,0) scale(${scale})`}}>
      <div className={`aspect-[9/16] overflow-hidden rounded-[26px] border bg-[#141414] shadow-2xl ${offset===0?'border-[#D51F2B]/45':'border-white/10'}`}>
       <img src={w.image} alt={w.title} loading="eager" decoding="async" draggable={false} className="h-full w-full object-cover"/>
      </div>
     </Link>
    })}
    </div>
   </div>:<div className="grid h-[260px] place-items-center text-sm text-gray-500">{isArabic?'ما لقينا خلفيات مطابقة.':'No matching wallpapers found.'}</div>}
  </div>
 </section>
};