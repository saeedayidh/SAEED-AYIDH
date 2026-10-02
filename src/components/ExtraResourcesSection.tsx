import React,{useMemo,useState}from'react';
import{Link,useNavigate}from'react-router-dom';
import{Search,ChevronLeft}from'lucide-react';
import{useLanguage}from'../context/LanguageContext';
import{extraResources,type ResourceCollection}from'../features/creator/resourceCatalog';
import{ResourceCarousel}from'../features/creator/ResourceCarousel';
function CollectionSection({collection}:{collection:ResourceCollection}){
 const{isArabic}=useLanguage(),navigate=useNavigate(),[query,setQuery]=useState('');
 const items=useMemo(()=>collection.items.filter(x=>`${x.ar} ${x.en} ${x.category} ${x.categoryEn}`.toLowerCase().includes(query.trim().toLowerCase())),[collection,query]);
 const url=`/resources/${collection.id}`;
 return <div className="mt-14 border-t border-white/5 pt-12"><Link to={url} className="mb-3 flex h-10 w-full items-center justify-center rounded-xl border border-[#D51F2B]/55 bg-[#D51F2B]/[.06] px-4 text-sm font-black text-[#ED1C2E] hover:bg-[#D51F2B] hover:text-white">{isArabic?collection.ar:collection.en}</Link><div className="mb-7 flex gap-2"><label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-3"><Search className="h-4 w-4 shrink-0 text-gray-500"/><span className="sr-only">{isArabic?'بحث':'Search'}</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={isArabic?`ابحث في ${collection.ar}…`:`Search ${collection.en.toLowerCase()}…`} className="min-w-0 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"/></label><Link to={url} className="inline-flex h-10 shrink-0 items-center gap-1 rounded-xl border border-[#D51F2B]/45 px-3 text-xs font-bold text-[#ED1C2E] hover:bg-[#D51F2B] hover:text-white">{isArabic?'استكشف الكل':'Explore All'}<ChevronLeft className="h-4 w-4"/></Link></div><ResourceCarousel items={items} isArabic={isArabic} onSelect={item=>navigate(`${url}#${item.id}`)}/></div>;
}
export function ExtraResourcesSection({ids}:{ids?:string[]}={}){return <>{extraResources.filter(collection=>!ids||ids.includes(collection.id)).map(collection=><CollectionSection key={collection.id} collection={collection}/>)}</>;}
