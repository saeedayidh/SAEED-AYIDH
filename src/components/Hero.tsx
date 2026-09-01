import React from 'react';
import { Send, Compass } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface HeroProps {
  lang: Language;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenContact }) => {
  const t = translations[lang].hero;

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-hero-glow">
      {/* Background SBA Logo Backdrop Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full flex items-center justify-center opacity-10 pointer-events-none select-none">
        <img src="/assets/hero_sba_logo.png" alt="SBA Background Logo" className="w-96 h-auto filter blur-[1px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-right dir-rtl:text-right dir-ltr:text-left">
            
            {/* Hero SBA Calligraphy Logo */}
            <div className="mb-2">
              <img src="/assets/hero_sba_logo.png" alt="SBA Logo" className="h-16 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(220,38,38,0.6)]" />
            </div>

            {/* SBA Badge */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/50 dark:bg-red-950/50 light:bg-red-100 border border-red-800/40 light:border-red-200">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-red-400 light:text-red-700">
                {t.greeting}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white dark:text-white light:text-gray-900 leading-tight">
              {t.name}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 max-w-2xl leading-relaxed font-light">
              {t.title}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
              <button
                onClick={onOpenContact}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:to-red-500 shadow-red-glow glow-button cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>{t.contactBtn}</span>
              </button>

              <a
                href="#portfolio"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-gray-200 dark:text-gray-200 light:text-gray-800 bg-red-950/30 dark:bg-red-950/30 light:bg-white border border-red-900/40 light:border-gray-300 hover:bg-red-900/30 hover:border-red-700 transition-all cursor-pointer shadow-sm"
              >
                <Compass className="w-5 h-5 text-red-500" />
                <span>{t.exploreBtn}</span>
              </a>
            </div>

            {/* Social Links Icons Bar */}
            <div className="pt-6 flex items-center gap-4 border-t border-red-900/30 light:border-red-100 w-full">
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-red-950/40 dark:bg-red-950/40 light:bg-red-50 border border-red-900/30 light:border-red-200 text-gray-300 light:text-gray-700 hover:text-red-500 hover:scale-110 transition-all" title="TikTok">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 2.191A6.34 6.34 0 0 0 4 15.67a6.342 6.342 0 0 0 10.823 4.469V11.23a8.231 8.231 0 0 0 4.766 1.503v-3.47a4.78 4.78 0 0 1-3.003-1.077h.003z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-red-950/40 dark:bg-red-950/40 light:bg-red-50 border border-red-900/30 light:border-red-200 text-gray-300 light:text-gray-700 hover:text-red-500 hover:scale-110 transition-all" title="X (Twitter)">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-red-950/40 dark:bg-red-950/40 light:bg-red-50 border border-red-900/30 light:border-red-200 text-gray-300 light:text-gray-700 hover:text-red-500 hover:scale-110 transition-all" title="Snapchat">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.002 0c-4.484 0-7.391 3.228-7.391 6.577 0 1.837.734 3.197 1.464 4.137.185.239.261.428.163.708-.13.376-.446 1.077-1.428 1.488-.636.265-1.257.069-1.637-.179-.319-.208-.553-.356-.811-.356-.407 0-.756.368-.696 1.042.083.923 1.157 2.052 2.68 2.37.527.11 1.079.117 1.631.02.502-.088 1.01-.225 1.484-.403.498.811 1.642 1.341 2.541 1.341.9 0 2.043-.53 2.541-1.341.474.178.982.315 1.484.403.552.097 1.104.09 1.631-.02 1.523-.318 2.597-1.447 2.68-2.37.06-.674-.289-1.042-.696-1.042-.258 0-.492.148-.811.356-.38.248-1.001.444-1.637.179-.982-.411-1.298-1.112-1.428-1.488-.098-.28-.022-.469.163-.708.73-.94 1.464-2.3 1.464-4.137C19.393 3.228 16.486 0 12.002 0z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-red-950/40 dark:bg-red-950/40 light:bg-red-50 border border-red-900/30 light:border-red-200 text-gray-300 light:text-gray-700 hover:text-red-500 hover:scale-110 transition-all" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-red-950/40 dark:bg-red-950/40 light:bg-red-50 border border-red-900/30 light:border-red-200 text-gray-300 light:text-gray-700 hover:text-red-500 hover:scale-110 transition-all" title="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>

          </div>

          {/* Hero Portrait Section with Original Saeed Bin Ayidh Photo */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden border-2 border-red-600/40 shadow-red-glow-lg group bg-black">
              
              {/* Exact Saeed Bin Ayidh Photo */}
              <img
                src="/assets/saeed_portrait.png"
                alt="سعيد بن عايض"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
