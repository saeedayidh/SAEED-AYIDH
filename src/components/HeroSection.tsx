import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Compass } from 'lucide-react';
import { siteData } from '../data/siteData';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#050505]">
      
      {/* Background: Minimal Deep Black with subtle outer glow on right side */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        {/* Extremely subtle ambient red glow strictly OUTSIDE the right portrait area */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_50%,_rgba(180,18,27,0.18)_0%,_transparent_55%)] pointer-events-none"></div>

        {/* Top & Bottom Vignettes for seamless integration */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full" dir="ltr">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[70vh]">
          
          {/* ========================================================================= */}
          {/* LEFT SIDE CONTENT: MODEL 01 — STARTS DIRECTLY WITH NAME (50% Width)       */}
          {/* ========================================================================= */}
          <div
            className="w-full lg:w-[50%] flex flex-col items-start space-y-6 text-right z-20"
            dir="rtl"
          >
            {/* 1. Main Name Heading (56px-64px desktop) */}
            <h1 className="text-4xl sm:text-6xl lg:text-[60px] font-black text-white tracking-tight leading-tight drop-shadow-md">
              سعيد بن عايض
            </h1>

            {/* 2. Bio Description (17px-19px) */}
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-light max-w-xl drop-shadow-sm">
              {siteData.brand.bio}
            </p>

            {/* 3. CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Link
                to="/contact"
                className="sba-btn-primary px-8 py-3.5 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-red-glow"
              >
                <Send className="w-4 h-4" />
                <span>تواصل معي</span>
              </Link>

              <Link
                to="/works"
                className="sba-btn-secondary px-8 py-3.5 text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#D51F2B]" />
                <span>استكشف أعمالي</span>
              </Link>
            </div>

            {/* 4. Social Media Icons (Underneath Buttons in one horizontal row) */}
            <div className="pt-6 flex items-center gap-3.5 border-t border-white/15 w-full max-w-md">
              <a
                href={siteData.brand.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#151515]/90 border border-white/15 flex items-center justify-center text-gray-300 hover:text-[#D51F2B] hover:border-[#B5121B] hover:scale-110 transition-all backdrop-blur-md"
                title="X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>

              <a
                href={siteData.brand.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#151515]/90 border border-white/15 flex items-center justify-center text-gray-300 hover:text-[#D51F2B] hover:border-[#B5121B] hover:scale-110 transition-all backdrop-blur-md"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg>
              </a>

              <a
                href={siteData.brand.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#151515]/90 border border-white/15 flex items-center justify-center text-gray-300 hover:text-[#D51F2B] hover:border-[#B5121B] hover:scale-110 transition-all backdrop-blur-md"
                title="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 2.191A6.34 6.34 0 0 0 4 15.67a6.342 6.342 0 0 0 10.823 4.469V11.23a8.231 8.231 0 0 0 4.766 1.503v-3.47a4.78 4.78 0 0 1-3.003-1.077h.003z"/></svg>
              </a>

              <a
                href={siteData.brand.socials.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#151515]/90 border border-white/15 flex items-center justify-center text-gray-300 hover:text-[#D51F2B] hover:border-[#B5121B] hover:scale-110 transition-all backdrop-blur-md"
                title="Snapchat"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.002 0c-4.484 0-7.391 3.228-7.391 6.577 0 1.837.734 3.197 1.464 4.137.185.239.261.428.163.708-.13.376-.446 1.077-1.428 1.488-.636.265-1.257.069-1.637-.179-.319-.208-.553-.356-.811-.356-.407 0-.756.368-.696 1.042.083.923 1.157 2.052 2.68 2.37.527.11 1.079.117 1.631.02.502-.088 1.01-.225 1.484-.403.498.811 1.642 1.341 2.541 1.341.9 0 2.043-.53 2.541-1.341.474.178.982.315 1.484.403.552.097 1.104.09 1.631-.02 1.523-.318 2.597-1.447 2.68-2.37.06-.674-.289-1.042-.696-1.042-.258 0-.492.148-.811.356-.38.248-1.001.444-1.637.179-.982-.411-1.298-1.112-1.428-1.488-.098-.28-.022-.469.163-.708.73-.94 1.464-2.3 1.464-4.137C19.393 3.228 16.486 0 12.002 0z"/></svg>
              </a>

              <a
                href={siteData.brand.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#151515]/90 border border-white/15 flex items-center justify-center text-gray-300 hover:text-[#D51F2B] hover:border-[#B5121B] hover:scale-110 transition-all backdrop-blur-md"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>

              <a
                href={siteData.brand.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#151515]/90 border border-white/15 flex items-center justify-center text-gray-300 hover:text-[#D51F2B] hover:border-[#B5121B] hover:scale-110 transition-all backdrop-blur-md"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: MODEL 01 — ORIGINAL UNTOUCHED SQUARE PORTRAIT + PREMIUM FRAME*/}
          {/* ZERO FILTERS, ZERO OVERLAYS, 100% ORIGINAL PIXELS/COLORS PRESERVED      */}
          {/* ========================================================================= */}
          <div className="w-full lg:w-[44%] flex justify-center lg:justify-end z-20">
            <div className="relative w-full max-w-[480px]">
              
              {/* Premium Subtle Frame Container */}
              <div className="relative rounded-[28px] overflow-hidden border border-white/10 bg-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(213,31,43,0.15)] transition-all duration-300 hover:border-[#D51F2B]/30">
                
                {/* ORIGINAL SQUARE IMAGE — 100% UNTOUCHED PIXELS / ZERO FILTERS OR OVERLAYS */}
                <img
                  src="/assets/saeed_portrait_new.jpg"
                  alt="سعيد بن عايض"
                  className="w-full h-auto object-cover object-center aspect-square"
                  style={{
                    filter: 'none',
                    opacity: 1,
                    mixBlendMode: 'normal'
                  }}
                />

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
