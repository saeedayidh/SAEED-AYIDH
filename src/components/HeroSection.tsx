import React from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { siteData } from '../data/siteData';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full flex items-center justify-center pt-24 sm:pt-28 pb-10 sm:pb-16 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_50%,_rgba(180,18,27,0.18)_0%,_transparent_55%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full" dir="ltr">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:min-h-[70vh]">
          <div className="w-full lg:w-[50%] flex flex-col items-start space-y-5 sm:space-y-6 text-right z-20" dir="rtl">
            <h1 className="text-[42px] leading-[1.15] sm:text-6xl lg:text-[60px] font-black text-white tracking-tight drop-shadow-md">
              سعيد بن عايض
            </h1>

            <p className="text-[15px] sm:text-lg text-gray-200 leading-[2] sm:leading-relaxed font-light max-w-xl drop-shadow-sm">
              {siteData.brand.bio}
            </p>

            <div className="w-full pt-1">
              <Link
                to="/contact"
                className="sba-btn-primary w-full sm:w-auto px-8 py-3.5 text-sm sm:text-xs flex items-center justify-center gap-2 cursor-pointer shadow-red-glow"
              >
                <Send className="w-4 h-4" />
                <span>تواصل معي</span>
              </Link>
            </div>

            <div className="pt-5 flex items-center justify-between sm:justify-start gap-2.5 sm:gap-3.5 border-t border-white/15 w-full max-w-md">
              {[
                ['x', 'X (Twitter)'],
                ['instagram', 'Instagram'],
                ['tiktok', 'TikTok'],
                ['snapchat', 'Snapchat'],
                ['youtube', 'YouTube'],
                ['linkedin', 'LinkedIn']
              ].map(([key, label]) => (
                <a
                  key={key}
                  href={siteData.brand.socials[key as keyof typeof siteData.brand.socials]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#151515]/90 border border-white/15 flex items-center justify-center text-[11px] font-bold text-gray-300 hover:text-[#D51F2B] hover:border-[#B5121B] transition-all backdrop-blur-md"
                  aria-label={label}
                  title={label}
                >
                  {key === 'x' ? 'X' : key === 'instagram' ? 'IG' : key === 'tiktok' ? 'TT' : key === 'snapchat' ? 'SC' : key === 'youtube' ? 'YT' : 'in'}
                </a>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[44%] flex justify-center lg:justify-end z-20">
            <div className="relative w-full max-w-[480px]">
              <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden border border-white/10 bg-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(213,31,43,0.15)] transition-all duration-300 hover:border-[#D51F2B]/30">
                <img
                  src="/assets/saeed_portrait_new.jpg"
                  alt="سعيد بن عايض"
                  className="w-full h-auto object-cover object-center aspect-square"
                  style={{ filter: 'none', opacity: 1, mixBlendMode: 'normal' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
