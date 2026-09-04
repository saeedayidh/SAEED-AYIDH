import React from 'react';
import { ArrowRight, ArrowLeft, ArrowUpLeft } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { defaultSaeedPlatform, SaeedPlatform } from '../components/SaeedPlatformSection';
import { useLanguage } from '../context/LanguageContext';

export const SaeedPlatformPage:React.FC=()=>{
 const {id}=useParams(); const {data}=useCMS(); const {language,isArabic}=useLanguage(); const platform:SaeedPlatform=(data.global as any).saeedPlatform||defaultSaeedPlatform;
 const item=(platform.items||[]).find(x=>x.id===id&&x.enabled); const BackIcon=isArabic?ArrowRight:ArrowLeft;
 if(!item)return <div className="mx-auto max-w-5xl px-5 py-32 text-center" dir={isArabic?'rtl':'ltr'}><h1 className="text-3xl font-black">{isArabic?'القسم غير متاح':'Section unavailable'}</h1><a href="/#saeed-sections" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D51F2B] px-5 py-3 text-sm font-bold"><BackIcon className="h-4 w-4"/>{isArabic?'العودة إلى الأقسام':'Back to sections'}</a></div>;
 const title=language==='en'?(item.titleEn||item.title):item.title; const description=language==='en'?(item.descriptionEn||item.description):item.description; const badge=language==='en'?(item.badgeEn||item.badge):item.badge;
 return <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32" dir={isArabic?'rtl':'ltr'}>
  <a href="/#saeed-sections" className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"><BackIcon className="h-4 w-4"/>{isArabic?'أقسام سعيد':'Saeed Sections'}</a>
  <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#101010]">{item.imageUrl&&<img src={item.imageUrl} alt={title} className="max-h-[520px] w-full object-cover"/>}{item.videoUrl&&<video src={item.videoUrl} controls playsInline className="max-h-[620px] w-full bg-black object-contain"/>}<div className="p-7 sm:p-12"><span className="rounded-full bg-[#D51F2B]/10 px-3 py-1 text-xs font-black text-[#E52E3C]">{badge}</span><h1 className="mt-5 text-4xl font-black sm:text-6xl">{title}</h1><p className="mt-6 max-w-3xl whitespace-pre-wrap text-base leading-9 text-gray-400 sm:text-lg">{description}</p><div className="mt-9 flex flex-wrap gap-3">{(item.buttons||[]).filter(b=>b.enabled&&b.label).map((b,i)=><a key={i} href={b.url&&b.url!=='#'?b.url:`/saeed/${item.id}`} className="inline-flex items-center gap-2 rounded-xl bg-[#D51F2B] px-5 py-3 text-sm font-black">{language==='en'?(b.labelEn||'Explore'):b.label}<ArrowUpLeft className="h-4 w-4"/></a>)}</div></div></div>
 </div>;
};
