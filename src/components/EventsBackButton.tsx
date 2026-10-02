import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
export function EventsBackButton({detail=false}:{detail?:boolean}){
 const {isArabic}=useLanguage(),Icon=isArabic?ArrowRight:ArrowLeft;
 return <Link to={detail?'/events':'/#events-section'} className="mb-6 inline-flex items-center gap-2 rounded-xl border border-[#D51F2B]/40 bg-[#D51F2B]/10 px-4 py-2.5 text-sm font-bold text-[#ED1C2E] transition hover:bg-[#D51F2B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D51F2B]"><Icon className="h-4 w-4" aria-hidden="true"/>{isArabic?'الرجوع':'Back'}</Link>;
}
