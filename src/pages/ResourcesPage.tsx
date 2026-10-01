import React,{useEffect,useMemo,useState}from'react';
import{Search,SlidersHorizontal,ChevronLeft,ChevronRight,X,Download}from'lucide-react';
import{FavoriteButton}from'../components/FavoriteButton';
import{ShareButton}from'../components/ShareButton';
import{useLanguage}from'../context/LanguageContext';
import{wallpapers,wallpaperCategories,type WallpaperCategory}from'../data/resourcesData';

const PER_PAGE=10;
export const ResourcesPage:React.FC=()=>{
 const{isArabic}=useLanguage();
 const[q,setQ]=useState('');
 const[category,setCategory]=useState<WallpaperCategory>('الكل');
 const[page,setPage]=useState(1);
 const[selected,setSelected]=useState<string|null>(null);
 const filtered=useMemo(()=>wallpapers.filter(w=>(category==='الكل'||w.category===category)&&(!q.trim()||w.title.includes(q.trim())||w.category.includes(q.trim()))),[q,category]);
 const pages=Math.max(1,Math.ceil(filtered.length/PER_PAGE));
 useEffect(()=>setPage(1),[q,category]);
 const visible=filtered.slice((page-1)*PER_PAGE,page*PER_PAGE);
 const hero=wallpapers.slice(0,7);
 const pageButtons=useMemo(()=>{
  if(pages<=5)return Array.from({length:pages},(_,i)=>i+1);
  if(page<=3)return[1,2,3,4,5];
  if(page>=pages-2)return Array.from({length:5},(_,i)=>pages-4+i);
  return[page-2,page-1,page,page+1,page+2];
 },[page,pages]);
 return <div className="min-h-screen bg-[#080808] pb-24 pt-28 text-white" dir={isArabic?'rtl':'ltr'}>
  <style>{`@keyframes wallHeroLTR{from{transform:translateX(-50%)}to{transform:translateX(0)}}.wall-hero-track{animation:wallHeroLTR 38s linear infinite}.wall-hero-track:hover{animation-play-state:paused}`}</style>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   <div className="mb-8">
    <p className="mb-2 text-xs font-bold text-[#D51F2B]">{isArabic?'موارد سعيد':'Saeed Resources'}</p>
    <h1 className="text-4xl font-black sm:text-6xl">{isArabic?'خلفيات الجوال':'Mobile Wallpapers'}</h1>
    <p className="mt-3 text-sm text-gray-500">{isArabic?'100 خلفية مختارة للجوال — طبيعة، بحر، جبال، صحراء وسماء.':'100 selected mobile wallpapers — nature, sea, mountains, desert and sky.'}</p>
   </div>

   <div className="mb-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
    <div className="wall-hero-track flex w-max gap-3 py-2" dir="ltr">
     {[...hero,...hero].map((w,i)=><button key={`${w.id}-hero-${i}`} onClick={()=>setSelected(w.image)} className="w-[120px] shrink-0 overflow-hidden rounded-[22px] border border-white/10 bg-[#111] sm:w-[155px]">
      <img src={w.image} alt={w.title} className="aspect-[9/16] h-auto w-full object-cover" loading="eager"/>
     </button>)}
    </div>
   </div>

   <div className="mb-8 border-y border-white/5 py-7">
    <div className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-400"><SlidersHorizontal className="h-4 w-4 text-[#D51F2B]"/><span>{isArabic?'تصفية الخلفيات':'Filter wallpapers'}</span></div>
    <div className="flex flex-wrap gap-2">
     {wallpaperCategories.map(cat=><button key={cat} onClick={()=>setCategory(cat)} className={`rounded-xl border px-4 py-2 text-xs font-bold transition ${category===cat?'border-[#D51F2B] bg-[#D51F2B] text-white':'border-white/10 bg-[#111] text-gray-400 hover:border-white/20 hover:text-white'}`}>{cat}</button>)}
    </div>
   </div>

   <label className="mb-9 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#101010] px-5 py-4 focus-within:border-[#D51F2B]/60">
    <Search className="h-5 w-5 text-gray-500"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={isArabic?'ابحث في الخلفيات...':'Search wallpapers...'} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"/>
   </label>

   {visible.length?<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
    {visible.map(w=><div key={w.id} id={`wallpaper-${w.id}`} className="group text-right">
     <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] border border-white/10 bg-[#111] transition group-hover:border-[#D51F2B]/60">
      <button type="button" onClick={()=>setSelected(w.image)} className="absolute inset-0 h-full w-full" aria-label={w.title}>
       <img src={w.image} alt={w.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"/>
      </button>
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/65 p-1.5 backdrop-blur-md">
       <a href={w.image} download={`saeed-wallpaper-${w.id}.jpg`} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} aria-label={isArabic?'تحميل':'Download'} title={isArabic?'تحميل':'Download'} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-black/70 transition hover:border-[#D51F2B]"><Download className="h-4 w-4 text-white"/></a>
       <ShareButton title={w.title} url={w.image}/>
       <FavoriteButton id={`wallpaper-${w.id}`} title={w.title} url={`/resources/wallpapers#wallpaper-${w.id}`} type="wallpaper"/>
      </div>
     </div>
     <div className="mt-2 flex items-center justify-between px-1"><span className="text-xs font-bold text-white">{w.title}</span><span className="text-[10px] text-gray-600">{w.category}</span></div>
    </div>)}
   </div>:<div className="py-20 text-center text-sm text-gray-500">{isArabic?'ما لقينا خلفيات مطابقة.':'No matching wallpapers found.'}</div>}

   {pages>1&&<div className="mt-12 flex flex-wrap items-center justify-center gap-2" dir="ltr">
    <button disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#111] disabled:opacity-30"><ChevronLeft className="h-4 w-4"/></button>
    {pageButtons.map(n=><button key={n} onClick={()=>setPage(n)} className={`h-10 min-w-10 rounded-xl border px-3 text-sm font-black ${page===n?'border-[#D51F2B] bg-[#D51F2B]':'border-white/10 bg-[#111] text-gray-400'}`}>{n}</button>)}
    {pages>5&&pageButtons[pageButtons.length-1]<pages&&<button onClick={()=>setPage(Math.min(pages,pageButtons[pageButtons.length-1]+1))} className="h-10 rounded-xl border border-white/10 bg-[#111] px-4 text-sm font-black text-gray-400">+</button>}
    <button disabled={page===pages} onClick={()=>setPage(p=>Math.min(pages,p+1))} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#111] disabled:opacity-30"><ChevronRight className="h-4 w-4"/></button>
   </div>}
  </div>

  {selected&&<div className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4 backdrop-blur-sm" onClick={()=>setSelected(null)}>
   <button className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/60" onClick={()=>setSelected(null)}><X className="h-5 w-5"/></button>
   <img src={selected} alt="" className="max-h-[88vh] max-w-full rounded-[28px] object-contain shadow-2xl" onClick={e=>e.stopPropagation()}/>
  </div>}
 </div>
};