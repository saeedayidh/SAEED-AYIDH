import React,{useEffect,useMemo,useState}from'react';
import{Link}from'react-router-dom';
import{Search,ChevronLeft}from'lucide-react';
import{useLanguage}from'../context/LanguageContext';
import{wallpapers}from'../data/resourcesData';

export const ResourcesSection:React.FC=()=>{
 const{isArabic}=useLanguage();
 const[q,setQ]=useState('');
 const featured=useMemo(()=>wallpapers.filter(x=>!q.trim()||x.title.includes(q.trim())).slice(0,8),[q]);
 const loop=[...featured,...featured];
 useEffect(()=>{wallpapers.slice(0,12).forEach(w=>{const img=new Image();img.src=w.image})},[]);
 return <section id="resources-section" className="relative overflow-hidden border-t border-white/5 bg-[#0B0B0B] py-20" dir={isArabic?'rtl':'ltr'}>
  <style>{`
   @keyframes saeedResourcesLTR{0%{transform:translate3d(-50%,0,0)}100%{transform:translate3d(0,0,0)}}
   .saeed-resources-track{display:flex;width:max-content;animation:saeedResourcesLTR 28s linear infinite;will-change:transform}
   .saeed-resources-track:hover{animation-play-state:paused}
  `}</style>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   <div className="mb-8">
    <p className="mb-2 text-xs font-bold text-[#D51F2B]">{isArabic?'موارد مختارة لك':'Resources selected for you'}</p>
    <h2 className="text-3xl font-black text-white sm:text-5xl">{isArabic?'موارد سعيد':'Saeed Resources'}</h2>
   </div>

   <div className="mb-7">
    <Link to="/resources/wallpapers" className="mb-3 flex w-full items-center justify-center rounded-2xl border border-[#D51F2B]/55 bg-[#D51F2B]/[0.06] px-5 py-4 text-base font-black text-[#ED1C2E] transition hover:bg-[#D51F2B] hover:text-white sm:text-lg">
     {isArabic?'خلفية جوال':'Mobile Wallpaper'}
    </Link>
    <div className="flex w-full items-stretch gap-2 sm:gap-3">
     <label className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-[#111] px-3 py-3.5 focus-within:border-[#D51F2B]/60 sm:px-4">
      <Search className="h-4 w-4 shrink-0 text-gray-500"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={isArabic?'ابحث عن خلفية...':'Search wallpapers...'} className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"/>
     </label>
     <Link to="/resources/wallpapers" className="inline-flex shrink-0 items-center justify-center gap-1 rounded-2xl border border-[#D51F2B]/45 px-3 py-3.5 text-xs font-bold text-[#ED1C2E] transition hover:bg-[#D51F2B] hover:text-white sm:gap-2 sm:px-6 sm:text-sm">
      <span>{isArabic?'استكشف الكل':'Explore All'}</span><ChevronLeft className="h-4 w-4"/>
     </Link>
    </div>
   </div>

   <div className="relative min-h-[275px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] sm:min-h-[350px]">
    <div className="saeed-resources-track gap-4 py-2" dir="ltr">
     {loop.map((w,i)=><Link key={`${w.id}-${i}`} to="/resources/wallpapers" className="group block w-[150px] shrink-0 sm:w-[190px]">
      <div className="aspect-[9/16] overflow-hidden rounded-[24px] border border-white/10 bg-[#141414] shadow-xl">
       <img src={w.image} alt={w.title} loading="eager" decoding="async" fetchPriority={i<8?'high':'auto'} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
      </div>
     </Link>)}
    </div>
   </div>
  </div>
 </section>
};