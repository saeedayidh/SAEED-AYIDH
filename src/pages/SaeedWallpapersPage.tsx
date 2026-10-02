import React,{useState}from'react';
import{Link,useParams}from'react-router-dom';
import{Search,Download,X}from'lucide-react';
import{useLanguage}from'../context/LanguageContext';
import{saeedMobileWallpapers,saeedDesktopWallpapers}from'../data/saeedWallpapers';
import{FavoriteButton}from'../components/FavoriteButton';
import{ShareButton}from'../components/ShareButton';
export const SaeedWallpapersPage=()=>{
 const{isArabic}=useLanguage();const{device}=useParams();const desktop=device==='desktop';
 const[q,setQ]=useState('');const[selected,setSelected]=useState<string|null>(null);
 const items=(desktop?saeedDesktopWallpapers:saeedMobileWallpapers).filter(w=>w.title.includes(q.trim()));
 return <div className="min-h-screen bg-[#080808] pb-24 pt-28 text-white" dir={isArabic?'rtl':'ltr'}><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 <Link to="/#saeed-wallpapers-section" className="mb-6 inline-flex rounded-xl border border-[#D51F2B]/40 px-4 py-2.5 text-sm font-bold text-[#ED1C2E]">{isArabic?'الرجوع':'Back'}</Link>
 <p className="mb-2 text-xs font-bold text-[#D51F2B]">{isArabic?'خلفية سعيد':'Saeed Wallpapers'}</p><h1 className="mb-7 text-4xl font-black sm:text-6xl">{isArabic?(desktop?'خلفية كمبيوتر':'خلفية جوال'):(desktop?'Desktop Wallpaper':'Mobile Wallpaper')}</h1>
 <div className="mb-6 flex gap-2">{['mobile','desktop'].map(d=><Link key={d} to={`/saeed-wallpapers/${d}`} className={`rounded-xl border px-4 py-2 text-sm font-bold ${device===d?'border-[#D51F2B] bg-[#D51F2B]':'border-white/10 bg-[#111]'}`}>{isArabic?(d==='mobile'?'خلفية جوال':'خلفية كمبيوتر'):(d==='mobile'?'Mobile':'Desktop')}</Link>)}</div>
 {<label className="mb-9 flex items-center gap-3 rounded-xl border border-white/10 bg-[#111] px-4 py-3"><Search className="h-4 w-4 text-gray-500"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={isArabic?'ابحث عن خلفية...':'Search wallpapers...'} className="min-w-0 w-full bg-transparent text-sm outline-none"/></label>}
 {items.length?<div className={`grid gap-4 ${desktop?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3':'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'}`}>{items.map(w=><div key={w.id} id={`saeed-wallpaper-${w.id}`}><div className={`relative ${desktop?'aspect-video':'aspect-[9/16]'} overflow-hidden rounded-[22px] border border-white/10 bg-[#111]`}>
 <button onClick={()=>setSelected(w.image)} className="absolute inset-0 h-full w-full" aria-label={w.title}><img src={w.image} alt={w.title} loading="lazy" className="h-full w-full object-cover"/></button>
 <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/70 p-1.5">
 <a href={w.image} download={`saeed-${device}-${w.id}.jpg`} aria-label={isArabic?'تحميل':'Download'} className="grid h-9 w-9 place-items-center rounded-full border border-white/10"><Download className="h-4 w-4"/></a>
 <ShareButton title={w.title} url={`/saeed-wallpapers/${device}#saeed-wallpaper-${w.id}`}/><FavoriteButton id={`saeed-${device}-wallpaper-${w.id}`} title={w.title} url={`/saeed-wallpapers/${device}#saeed-wallpaper-${w.id}`} type="wallpaper"/>
 </div></div><p className="mt-2 text-xs font-bold">{isArabic?w.title:`Saeed Wallpaper ${w.id}`}</p><p className="mt-1 text-xs text-gray-500" dir="ltr">{w.width} × {w.height}</p></div>)}</div>:<p className="py-16 text-center text-gray-500">{desktop?(isArabic?'خلفيات الكمبيوتر قريبًا.':'Desktop wallpapers coming soon.'):(isArabic?'ما لقينا خلفيات مطابقة.':'No matching wallpapers found.')}</p>}
 </div>{selected&&<div role="dialog" aria-modal="true" aria-label={isArabic?'معاينة الخلفية':'Wallpaper preview'} className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4" onClick={()=>setSelected(null)}><button aria-label={isArabic?'إغلاق':'Close'} className="absolute right-5 top-5 rounded-full bg-[#111] p-3" onClick={()=>setSelected(null)}><X className="h-5 w-5"/></button><img src={selected} alt={isArabic?'خلفية سعيد':'Saeed Wallpaper'} className="max-h-[88vh] max-w-full rounded-2xl object-contain" onClick={e=>e.stopPropagation()}/></div>}</div>;
};
