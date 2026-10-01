import { ResourceBackButton } from '../components/ResourceBackButton';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SmartLinkBuilder } from '../components/SmartLinkBuilder';

export function SmartLinkPage() {
  const { isArabic } = useLanguage();
  return <div className="min-h-screen bg-[#090909] pb-24 pt-28 text-white" dir={isArabic ? 'rtl' : 'ltr'}><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <ResourceBackButton tools/>
    <div className="mb-10 text-center"><Link to="/#tools-section" className="text-xs font-bold text-[#D51F2B]">{isArabic ? 'أدوات سعيد' : 'Saeed Tools'}</Link><h1 className="mt-3 text-4xl font-black sm:text-5xl">{isArabic ? 'رابط ذكي' : 'Smart Link'}</h1><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400">{isArabic ? 'كل حساباتك في رابط واحد. جهّز صفحتك، شاهد المعاينة، ثم ولّد رابطك وشاركه.' : 'All your accounts in one link. Build your page, preview it, then generate and share your link.'}</p></div>
    <SmartLinkBuilder/>
  </div></div>;
}
