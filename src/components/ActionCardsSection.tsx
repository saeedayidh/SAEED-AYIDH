import React from 'react';
import { Lightbulb, AlertTriangle } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';
import { FeedbackForm } from './FeedbackForm';
export const ActionCardsSection: React.FC = () => {
  const { data } = useCMS(), { isArabic } = useLanguage();
  const cfg: any = (data.global as any).actionCards || {};
  if (cfg.enabled === false) return null;
  return <section id="action-cards-section" className="border-t border-white/5 bg-[#080808] py-20" dir={isArabic ? 'rtl' : 'ltr'}><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid auto-rows-fr gap-8 lg:grid-cols-2">{(['suggestion','complaint'] as const).map(type => {
    const complaint = type === 'complaint', Icon = complaint ? AlertTriangle : Lightbulb;
    const key = (suffix: string) => type + suffix + (isArabic ? '' : 'En');
    return <article key={type} className="sba-card flex h-full flex-col border-[#D51F2B]/30 p-6 sm:p-8"><div className="mb-6 min-h-[110px] text-start"><div className="mb-4 flex items-center gap-3"><Icon className="h-5 w-5 text-[#D51F2B]"/><h3 className="text-2xl font-black">{cfg[key('Title')] || (isArabic ? complaint ? 'بطاقة شكوى' : 'بطاقة اقتراح' : complaint ? 'Complaint' : 'Suggestion')}</h3></div><p className="text-xs leading-6 text-gray-400">{cfg[key('Description')] || (isArabic ? complaint ? 'واجهتك مشكلة أو عندك شكوى؟ أرسل التفاصيل وسأراجعها بأقرب وقت.' : 'عندك فكرة أو اقتراح يساعد في تطوير الموقع أو المحتوى؟ شاركني اقتراحك.' : complaint ? 'Have a problem or complaint? Send the details for review.' : 'Have an idea to improve the website or content? Share your suggestion.')}</p></div><FeedbackForm type={type}/></article>;
  })}</div></div></section>;
};
