import { Lightbulb, AlertTriangle } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';
import { FeedbackForm } from './FeedbackForm';
import { Link } from 'react-router-dom';
export function FeedbackPage({ type }: { type: 'suggestion' | 'complaint' }) {
  const { data } = useCMS(), { isArabic } = useLanguage(), complaint = type === 'complaint';
  const cfg: any = (data.global as any)[complaint ? 'complaintPage' : 'suggestionPage'] || {}, Icon = complaint ? AlertTriangle : Lightbulb;
  return <div className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:px-8" dir={isArabic ? 'rtl' : 'ltr'}><Link to="/#action-cards-section" className="mb-7 inline-block rounded-xl border border-[#D51F2B]/40 px-5 py-3 text-sm text-[#ED1C2E]">{isArabic ? 'الرجوع' : 'Back'}</Link><header className="mb-10 text-center"><Icon className="mx-auto h-7 w-7 text-[#D51F2B]"/><h1 className="mt-4 text-4xl font-black">{cfg[isArabic ? 'title' : 'titleEn'] || (isArabic ? complaint ? 'بطاقة شكوى' : 'بطاقة اقتراح' : complaint ? 'Complaint' : 'Suggestion')}</h1><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400">{cfg[isArabic ? 'description' : 'descriptionEn'] || (isArabic ? complaint ? 'أرسل تفاصيل شكواك لمراجعتها.' : 'شارك اقتراحك لتطوير الموقع والمحتوى والخدمات.' : complaint ? 'Send your complaint for review.' : 'Share your ideas for the website, content and services.')}</p></header><div className="sba-card flex min-h-[720px] flex-col border-[#D51F2B]/30 p-6 sm:p-10"><FeedbackForm type={type}/></div></div>;
}
