import {useLanguage} from '../context/LanguageContext';
import {isSponsorship,type SaeedAd} from '../data/adsData';
export type AdType='all'|'ad'|'sponsorship';
export const matchesAdType=(ad:SaeedAd,type:AdType)=>type==='all'||(type==='sponsorship'?isSponsorship(ad):!isSponsorship(ad));
export function AdTypeFilter({value,onChange}:{value:AdType;onChange:(value:AdType)=>void}){
 const {isArabic}=useLanguage();
 return <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label={isArabic?'نوع الإعلان':'Ad type'}>
 {(['all','ad','sponsorship'] as const).map(type=><button key={type} type="button" aria-pressed={value===type} onClick={()=>onChange(type)} className={`rounded-xl border px-5 py-2.5 text-sm font-bold ${value===type?'border-[#D51F2B] bg-[#D51F2B]/15 text-[#D51F2B]':'border-white/10 bg-[#111] text-gray-300'}`}>{isArabic?{all:'الكل',ad:'إعلان',sponsorship:'رعاية'}[type]:{all:'All',ad:'Advertisement',sponsorship:'Sponsorship'}[type]}</button>)}
 </div>;
}
