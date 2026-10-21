import {AdTypeFilter,matchesAdType,type AdType} from '../components/AdTypeFilter';
import {useState} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {ArrowRight,Search} from 'lucide-react';
import {useCMS} from '../context/CMSContext';
import {useLanguage} from '../context/LanguageContext';
import {getAds} from '../data/adsData';
import {SaeedAdCard} from '../components/SaeedAdsSection';
export function AdsPage(){
 const [params]=useSearchParams();
 const {data}=useCMS(),{isArabic}=useLanguage(),[category,setCategory]=useState(''),[adType,setAdType]=useState<AdType>(params.get('type')==='ad'?'ad':params.get('type')==='sponsorship'?'sponsorship':'all'),[query,setQuery]=useState(params.get('q')||'');
 const ads=getAds(data.global).filter(ad=>ad.inSection);
 const categories=[...new Set(ads.map(ad=>ad.category||'أخرى'))];
 const visible=ads.filter(ad=>(!category||ad.category===category)&&matchesAdType(ad,adType)&&`${ad.name} ${ad.nameEn} ${ad.category} ${ad.categoryEn} ${ad.description} ${ad.descriptionEn}`.toLowerCase().includes(query.trim().toLowerCase()));
 return <div className="mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 lg:px-8" dir={isArabic?'rtl':'ltr'}>
 <Link to="/#saeed-ads-section" className="sba-back-button"><ArrowRight className={`h-4 w-4 text-[#D51F2B] ${isArabic?'':'rotate-180'}`}/>{isArabic?'الرجوع':'Back'}</Link>
 <h1 className="mb-8 mt-8 text-center text-3xl font-black text-white sm:text-5xl">{isArabic?'سعيد ادز':'Saeed Ads'}</h1>
 <AdTypeFilter bar value={adType} onChange={setAdType}/>
 <label className="mb-6 flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-4 focus-within:border-[#D51F2B]/60"><Search className="h-4 w-4 shrink-0 text-gray-500"/><span className="sr-only">{isArabic?'البحث في سعيد ادز':'Search Saeed Ads'}</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={isArabic?'ابحث عن متجر أو شركة...':'Search stores or companies...'} className="w-full min-w-0 bg-transparent text-sm text-white outline-none"/></label>
 <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label={isArabic?'نوع المتجر أو الشركة':'Business type'}>
 {['',...categories].map(value=><button key={value} type="button" aria-pressed={category===value} onClick={()=>setCategory(value)} className={`rounded-xl border px-4 py-2 text-sm font-bold ${category===value?'border-[#D51F2B] bg-[#D51F2B]/15 text-[#D51F2B]':'border-white/10 bg-[#111] text-gray-300'}`}>{value?(isArabic?value:ads.find(ad=>ad.category===value)?.categoryEn):(isArabic?'الكل':'All')}</button>)}
 </div>
 <div className="grid gap-6 md:grid-cols-2">{visible.map(ad=><SaeedAdCard key={ad.id} ad={ad}/>)}</div>
 {!visible.length&&<p className="py-12 text-center text-gray-400">{isArabic?'لا توجد إعلانات في هذا التصنيف':'No ads in this category'}</p>}
 </div>;
}
