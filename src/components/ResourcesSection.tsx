import React,{useMemo,useState}from'react';
import{Link}from'react-router-dom';
import{Search,ChevronLeft,Download}from'lucide-react';
import{FavoriteButton}from'./FavoriteButton';
import{ShareButton}from'./ShareButton';
import{useLanguage}from'../context/LanguageContext';
import{wallpapers}from'../data/resourcesData';

export const ResourcesSection:React.FC=()=>{
 const{isArabic}=useLanguage();
 const[q,setQ]=useState('');
 const featured=useMemo(()=>wallpapers.filter(x=>!q.trim()||x.title.includes(q.trim())||x.category.includes(q.trim())).slice(0,8),[q]);
 const loop=[...featured,...featured];
 return <section id="resources-section" className="relative overflow-hidden border-t border-white/5 bg-[#0B0B0B] py-20" dir={isArabic?'rtl':'ltr'}>
  <style>{`@keyframes saeedResourcesLTR{0%{transform:translate3d(-50%,0,0)}100%{transform:translate3d(0,0,0)}}.saeed-resources-track{animation:saeedResourcesLTR 34s linear infinite;will-change:transform}.saeed-resources-track:hover{animation-play-state:paused}@media(prefers-reduced-motion:reduce){.saeed-resources-track{animation:none;transform:none}}`}</style>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   <div className="mb-8">
    <p className="mb-2 text-xs font-bold text-[#D51F2B]">{isArabic?'موارد مختارة لك':'Resources selected for you'}</p>
    <h2 className="text-3xl font-black text-white sm:text-5xl">{isArabic?'موارد سعيد':'Saeed Resources'}</h2>
   </div>

   <div className="mb-4 flex w-full items-center rounded-2xl border border-[#D51F2B]/40 bg-[#D51F2B]/5 px-5 py-4 text-[#D51F2B]">
    <h3 className="w-full text-right text-base font-black sm:text-lg">{isArabic?'خلفية جوال':'Mobile Wallpaper'}</h3>
   </div>
   <div className="mb-8 flex items-stretch gap-2 sm:gap-3">
    <label className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-[#111] px-3 py-3 focus-within:border-[#D51F2B]/60 sm:px-4">
     <Search className="h-4 w-4 shrink-0 text-gray-500"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={isArabic?'ابحث عن خلفية...':'Search wallpapers...'} className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"/>
    </label>
    <Link to="/resources/wallpapers" className="inline-flex shrink-0 items-center justify-center gap-1 rounded-2xl border border-[#D51F2B]/40 px-3 py-3 text-xs font-bold text-[#D51F2B] transition hover:bg-[#D51F2B] hover:text-white sm:gap-2 sm:px-5 sm:text-sm">
     <span>{isArabic?'استكشف الكل':'Explore All'}</span><ChevronLeft className="h-4 w-4"/>
    </Link>
   </div>

   <div className="overflow-hidden">
    <div className="saeed-resources-track flex w-max gap-4 py-2" dir="ltr">
     {loop.map((w,i)=><div key={`${w.id}-${i}`} className="group relative w-[150px] shrink-0 sm:w-[190px]">
      <Link to="/resources/wallpapers" className="relative block aspect-[9/16] w-full overflow-hidden rounded-[24px] border border-white/10 bg-[#141414] shadow-xl">
       <img src={w.image} alt={w.title} loading="eager" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
      </Link>
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-black/70 p-1 backdrop-blur-md">
       <a href={w.image} download={`saeed-wallpaper-${w.id}.jpg`} target="_blank" rel="noreferrer" aria-label={isArabic?'تحميل':'Download'} title={isArabic?'تحميل':'Download'} className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-black/70 transition hover:border-[#D51F2B]"><Download className="h-3.5 w-3.5 text-white"/></a>
       <ShareButton title={w.title} url={w.image} className="!h-8 !w-8"/>
       <FavoriteButton id={`wallpaper-${w.id}`} title={w.title} url={`/resources/wallpapers#wallpaper-${w.id}`} type="wallpaper" className="!h-8 !w-8"/>
      </div>
     </div>)}
    </div>
   </div>
  </div>
 </section>
};