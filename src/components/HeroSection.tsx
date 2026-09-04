import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Compass } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';

const buttonEn:Record<string,string>={'تواصل معي':'Contact Me','استكشف أعمالي':'Explore My Work'};

export const HeroSection: React.FC = () => {
  const { data } = useCMS(); const {language,isArabic}=useLanguage();
  const socialAccounts = ((data.global as any).socialAccounts || []).filter((item: any) => item.enabled && item.url);
  const buttons = data.hero.buttons || [];
  const heroEn:any=(data.global as any).heroEnglish||{};
  if (!data.hero.isVisible) return null;
  const heading=language==='en'?(heroEn.heading||data.global.nameEnglish||'SAEED BIN AYIDH'):data.hero.heading;
  const description=language==='en'?(heroEn.description||'Content creator and business developer working across content, digital marketing, artificial intelligence, and digital experiences.'):(data.hero.description || data.global.description);

  return <section className="relative w-full flex items-center justify-center pt-24 sm:pt-28 pb-10 sm:pb-16 overflow-hidden bg-[#050505]">
    <div className="absolute inset-0 z-0 bg-[#050505]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_50%,_rgba(180,18,27,0.18)_0%,_transparent_55%)] pointer-events-none" /><div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" /></div>
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full"><div className={`flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:min-h-[70vh] ${isArabic?'':'lg:flex-row-reverse'}`}>
      <div className={`w-full lg:w-[50%] flex flex-col space-y-5 sm:space-y-6 z-20 ${isArabic?'items-start text-right':'items-start text-left'}`} dir={isArabic?'rtl':'ltr'}><h1 className="text-[42px] leading-[1.15] sm:text-6xl lg:text-[60px] font-black text-white tracking-tight drop-shadow-md">{heading}</h1><p className="text-[15px] sm:text-lg text-gray-200 leading-[2] sm:leading-relaxed font-light max-w-xl drop-shadow-sm">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto pt-1">{buttons.map((button,index)=><Link key={`${button.label}-${index}`} to={button.url} className={`${button.isPrimary?'sba-btn-primary':'sba-btn-secondary'} w-full sm:w-auto px-8 py-3.5 text-sm sm:text-xs flex items-center justify-center gap-2 cursor-pointer`}>{button.isPrimary?<Send className="w-4 h-4"/>:<Compass className="w-4 h-4 text-[#D51F2B]"/>}<span>{language==='en'?(buttonEn[button.label]||button.label):button.label}</span></Link>)}</div>
        {socialAccounts.length>0&&<div className="pt-5 flex flex-wrap items-center gap-2.5 sm:gap-3.5 border-t border-white/15 w-full max-w-xl">{socialAccounts.map((account:any)=><a key={account.id} href={account.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#151515]/90 border border-white/15 flex items-center justify-center overflow-hidden text-[10px] font-bold text-gray-300 hover:border-[#B5121B] transition-all" aria-label={account.platform} title={account.platform}>{account.iconImage?<img src={account.iconImage} alt={account.platform} className="w-6 h-6 object-contain"/>:<span>{account.platform.slice(0,2)}</span>}</a>)}</div>}
      </div>
      <div className="w-full lg:w-[44%] flex justify-center lg:justify-end z-20"><div className="relative w-full max-w-[480px]"><div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden border border-white/10 bg-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(213,31,43,0.15)]"><img src={data.hero.portraitUrl} alt={isArabic?data.global.nameArabic:data.global.nameEnglish} className="w-full h-auto object-cover object-center aspect-square"/></div></div></div>
    </div></div>
  </section>;
};
