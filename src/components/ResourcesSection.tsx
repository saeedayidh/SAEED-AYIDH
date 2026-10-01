import React,{useEffect,useMemo,useState}from'react';
import{Link}from'react-router-dom';
import{Search,ChevronLeft}from'lucide-react';
import{useLanguage}from'../context/LanguageContext';
import{wallpapers}from'../data/resourcesData';

export const ResourcesSection:React.FC=()=>{
 const{isArabic}=useLanguage();
 const[q,setQ]=useState('');
 const[active,setActive]=useState(0);
 const featured=useMemo(()=>wallpapers.filter(x=>!q.trim()||x.title.includes(q.trim())||x.category.includes(q.trim())).slice(0,12),[q]);
 useEffect(()=>{wallpapers.slice(0,12).forEach(w=>{const img=new Image();img.src=w.image})},[]);
 useEffect(()=>{setActive(0);if(featured.length<2)return;const t=window.setInterval(()=>setActive(v=>(v+1)%featured.length),3200);return()=>window.clearInterval(t)},[featured.length]);
 const cards=featured.length?[-2,-1,0,1,2].map(offset=>({offset,w:featured[(active+offset+featured.length)%featured.length]})):[];
 return <section id="resources-section" className="relative overflow-hidden border-t border-white/5 bg-[#0B0B0B] py-20" dir={isArabic?'rtl':'ltr'}>
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
   {cards.length?<div className="relative mx-auto h-[300px] max-w-[650px] overflow-hidden sm:h-[390px]">
    {cards.map(({offset,w})=>{
     const abs=Math.abs(offset),scale=offset===0?1:abs===1?0.82:0.68,shift=offset*105;
     return <Link key={`${w.id}-${offset}`} to="/resources/wallpapers" className="absolute left-1/2 top-1/2 block w-[150px] -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out sm:w-[195px]" style={{zIndex:10-abs,opacity:abs===2?0.48:abs===1?0.76:1,transform:`translate(calc(-50% + ${shift}px),-50%) scale(${scale})`}}>
      <div className={`aspect-[9/16] overflow-hidden rounded-[26px] border bg-[#141414] shadow-2xl ${offset===0?'border-[#D51F2B]/45':'border-white/10'}`}>
       <img src={w.image} alt={w.title} loading="eager" decoding="async" className="h-full w-full object-cover"/>
      </div>
     </Link>
    })}
   </div>:<div className="grid h-[260px] place-items-center text-sm text-gray-500">{isArabic?'ما لقينا خلفيات مطابقة.':'No matching wallpapers found.'}</div>}
  </div>
 </section>
};