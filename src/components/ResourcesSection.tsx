import React,{useMemo,useState}from'react';
import{Link}from'react-router-dom';
import{Search,ChevronLeft}from'lucide-react';
import{useLanguage}from'../context/LanguageContext';
import{wallpapers}from'../data/resourcesData';

export const ResourcesSection:React.FC=()=>{
 const{isArabic}=useLanguage();
 const[q,setQ]=useState('');
 const featured=useMemo(()=>wallpapers.filter(x=>!q.trim()||x.title.includes(q.trim())).slice(0,8),[q]);
 const loop=[...featured,...featured];
 return <section id="resources-section" className="relative overflow-hidden border-t border-white/5 bg-[#0B0B0B] py-20" dir={isArabic?'rtl':'ltr'}>
  <style>{`@keyframes saeedResourcesLTR{from{transform:translateX(-50%)}to{transform:translateX(0)}}.saeed-resources-track{animation:saeedResourcesLTR 34s linear infinite}.saeed-resources-track:hover{animation-play-state:paused}@media(prefers-reduced-motion:reduce){.saeed-resources-track{animation:none}}`}</style>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   <div className="mb-8">
    <p className="mb-2 text-xs font-bold text-[#D51F2B]">{isArabic?'موارد مختارة لك':'Resources selected for you'}</p>
    <h2 className="text-3xl font-black text-white sm:text-5xl">{isArabic?'موارد سعيد':'Saeed Resources'}</h2>
   </div>
   <div className="mb-8 grid items-center gap-3 md:grid-cols-[auto_1fr_auto]">
    <h3 className="order-1 text-xl font-black text-white md:order-3 md:text-2xl">{isArabic?'خلفيات الجوال':'Mobile Wallpapers'}</h3>
    <label className="order-2 flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-[#111] px-4 py-3 focus-within:border-[#D51F2B]/60 md:order-2">
     <Search className="h-4 w-4 shrink-0 text-gray-500"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={isArabic?'ابحث عن خلفية...':'Search wallpapers...'} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"/>
    </label>
    <Link to="/resources/wallpapers" className="order-3 inline-flex items-center justify-center gap-2 rounded-2xl border border-[#D51F2B]/40 px-5 py-3 text-sm font-bold text-[#D51F2B] transition hover:bg-[#D51F2B] hover:text-white md:order-1">
     <span>{isArabic?'استكشف الكل':'Explore All'}</span><ChevronLeft className="h-4 w-4"/>
    </Link>
   </div>
   <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
    <div className="saeed-resources-track flex w-max gap-4 py-2" dir="ltr">
     {loop.map((w,i)=><Link key={`${w.id}-${i}`} to="/resources/wallpapers" className="group block w-[150px] shrink-0 sm:w-[190px]">
      <div className="aspect-[9/16] overflow-hidden rounded-[24px] border border-white/10 bg-[#141414] shadow-xl">
       <img src={w.image} alt={w.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
      </div>
     </Link>)}
    </div>
   </div>
  </div>
 </section>
};