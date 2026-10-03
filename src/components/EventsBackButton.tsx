import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
export function EventsBackButton({detail=false}:{detail?:boolean}){
 const {isArabic}=useLanguage(),Icon=isArabic?ArrowRight:ArrowLeft;
 return <Link to={detail?'/events':'/#events-section'} className="sba-back-button mb-6"><Icon className="h-4 w-4" aria-hidden="true"/>{isArabic?'الرجوع':'Back'}</Link>;
}
