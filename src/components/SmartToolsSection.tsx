import React from 'react';
import { ArrowUpRight, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { smartLinkPlatforms } from '../lib/smartLinks';
import { SmartPlatformIcon } from './SmartLinkProfileCard';

export function SmartToolsSection() {
  const { isArabic } = useLanguage();
  return <section id="tools-section" className="border-t border-white/5 bg-[#090909] py-20" dir={isArabic ? 'rtl' : 'ltr'}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="mb-2 text-xs font-bold text-[#D51F2B]">{isArabic ? 'أدوات عملية لك' : 'Useful tools for you'}</p>
      <h2 className="mb-9 text-3xl font-black text-white sm:text-5xl">{isArabic ? 'أدوات سعيد' : 'Saeed Tools'}</h2>
      <Link to="/tools/smart-link" className="group relative grid overflow-hidden rounded-[30px] border border-[#D51F2B]/30 bg-[#111] p-7 sm:p-10 lg:grid-cols-[1fr_340px] lg:items-center lg:gap-14">
        <div className="pointer-events-none absolute -end-16 -top-28 h-72 w-72 rounded-full bg-[#D51F2B]/10 blur-3xl"/>
        <div className="relative"><div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-[#D51F2B]/40 bg-[#D51F2B]/10"><Link2 className="h-6 w-6 text-[#D51F2B]"/></div><h3 className="text-2xl font-black text-white sm:text-3xl">{isArabic ? 'رابط ذكي' : 'Smart Link'}</h3><p className="mt-4 max-w-xl text-sm leading-7 text-gray-400">{isArabic ? 'كل حساباتك في صفحة واحدة. اختر التطبيقات وأضف اليوزر، وخذ رابطًا باسمك يبدأ بدومين سعيد.' : 'All your accounts on one page. Choose apps, add usernames, and generate a link on Saeed’s domain.'}</p><span className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#D51F2B] px-6 py-3 text-sm font-bold text-white transition group-hover:bg-[#b91823]">{isArabic ? 'أنشئ رابطك' : 'Create your link'}<ArrowUpRight className="h-4 w-4"/></span></div>
        <div className="relative mt-9 rounded-3xl border border-white/10 bg-[#080808] p-5 lg:mt-0"><div className="mb-4 truncate rounded-xl border border-white/10 bg-[#111] px-3 py-3 font-mono text-[10px] text-gray-400" dir="ltr"><span className="text-[#D51F2B]">saeedbinayidh.com</span>/go/instagram.com/username</div><div className="grid grid-cols-4 gap-2">{smartLinkPlatforms.filter(platform => ['whatsapp','snapchat','tiktok','instagram','youtube','telegram','discord','x'].includes(platform.id)).map(platform => <span key={platform.id} className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-[#111] px-1 py-3"><SmartPlatformIcon platform={platform}/><span className="text-[8px] text-gray-500">{isArabic ? platform.ar : platform.en}</span></span>)}</div><p className="mt-4 text-center text-[10px] text-gray-600">{isArabic ? '19 تطبيقًا وخدمة · رابط واحد' : '19 apps and services · One link'}</p></div>
      </Link>
    </div>
  </section>;
}
