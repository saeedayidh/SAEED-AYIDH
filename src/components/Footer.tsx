import React from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { siteData } from '../data/siteData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/10 text-gray-400 text-xs pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 5 Columns Layout in RTL (SBA identity on the RIGHT, followed by 4 navigation columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16 text-right" dir="rtl">
          
          {/* SBA Identity Block (Appears on the RIGHT side in RTL - Corrected Enlarged Logo 90-130px width) */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="inline-block py-1">
              <img
                src="/assets/sba_logo_transparent.png"
                alt={siteData.brand.name}
                className="h-20 sm:h-24 md:h-28 w-auto max-w-[240px] min-w-[150px] object-contain filter drop-shadow-[0_0_18px_rgba(213,31,43,0.8)]"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed font-light text-xs">
              {siteData.brand.footerMotto}
            </p>
            
            {/* Quick Email Contact Button */}
            <div className="pt-2">
              <a href={`mailto:${siteData.brand.email}`} className="text-xs font-mono font-bold text-[#D51F2B] hover:underline block mb-2">
                {siteData.brand.email}
              </a>
              <Link
                to="/contact"
                className="sba-btn-primary w-full py-2.5 px-4 text-xs flex items-center justify-center gap-2 block text-center"
              >
                <Send className="w-3.5 h-3.5" />
                <span>تواصل معنا</span>
              </Link>
            </div>
          </div>

          {/* Column 1: صفحات سعيد */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white pb-2 border-b border-white/10">صفحات سعيد</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="hover:text-[#D51F2B] transition-colors">الرئيسية</Link></li>
              <li><Link to="/about" className="hover:text-[#D51F2B] transition-colors">عن سعيد</Link></li>
              <li><a href="/#content-fields" className="hover:text-[#D51F2B] transition-colors">مجالات المحتوى</a></li>
              <li><a href="/#work-fields" className="hover:text-[#D51F2B] transition-colors">مجالات العمل</a></li>
              <li><Link to="/services" className="hover:text-[#D51F2B] transition-colors">خدمات سعيد</Link></li>
              <li><Link to="/news" className="hover:text-[#D51F2B] transition-colors">أخبار سعيد</Link></li>
              <li><Link to="/works" className="hover:text-[#D51F2B] transition-colors">أعمال سعيد</Link></li>
              <li><Link to="/blog" className="hover:text-[#D51F2B] transition-colors">بلوق سعيد</Link></li>
            </ul>
          </div>

          {/* Column 2: أدوات سعيد */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white pb-2 border-b border-white/10">أدوات سعيد</h4>
            <ul className="space-y-2.5">
              <li><Link to="/tools/ai-prompts-library" className="hover:text-[#D51F2B] transition-colors">البرومبت</Link></li>
              <li><Link to="/tools/sba-4k-wallpaper" className="hover:text-[#D51F2B] transition-colors">خلفيات الجوال</Link></li>
              <li><Link to="/tools/sba-classic-watchface" className="hover:text-[#D51F2B] transition-colors">واجهات الساعات</Link></li>
              <li><Link to="/tools/cinematic-lightroom-filter" className="hover:text-[#D51F2B] transition-colors">الفلاتر</Link></li>
              <li><Link to="/tools/content-shortcut" className="hover:text-[#D51F2B] transition-colors">الاختصارات</Link></li>
              <li><Link to="/tools/unified-social-page" className="hover:text-[#D51F2B] transition-colors">صفحة حسابات سعيد</Link></li>
            </ul>
          </div>

          {/* Column 3: المساعدة والتواصل */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white pb-2 border-b border-white/10">المساعدة والتواصل</h4>
            <ul className="space-y-2.5">
              <li><Link to="/centerhelp" className="hover:text-[#D51F2B] transition-colors">سعيد سنترهلب</Link></li>
              <li><Link to="/suggestion" className="hover:text-[#D51F2B] transition-colors">بطاقة اقتراح</Link></li>
              <li><Link to="/complaint" className="hover:text-[#D51F2B] transition-colors">بطاقة شكوى</Link></li>
              <li><Link to="/contact" className="hover:text-[#D51F2B] transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Column 4: روابط سعيد (حسابات وشبكات التواصل الاجتماعية) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white pb-2 border-b border-white/10">روابط سعيد</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/tools/unified-social-page" className="hover:text-[#D51F2B] transition-colors font-semibold text-white">
                  حسابات سعيد الموحدة
                </Link>
              </li>
              <li>
                <a href={siteData.brand.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-[#D51F2B] transition-colors flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 fill-current text-[#D51F2B]" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a href={siteData.brand.socials.x} target="_blank" rel="noopener noreferrer" className="hover:text-[#D51F2B] transition-colors flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span>X (Twitter)</span>
                </a>
              </li>
              <li>
                <a href={siteData.brand.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#D51F2B] transition-colors flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 fill-current text-pink-500" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href={siteData.brand.socials.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-[#D51F2B] transition-colors flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 2.191A6.34 6.34 0 0 0 4 15.67a6.342 6.342 0 0 0 10.823 4.469V11.23a8.231 8.231 0 0 0 4.766 1.503v-3.47a4.78 4.78 0 0 1-3.003-1.077h.003z"/></svg>
                  <span>TikTok</span>
                </a>
              </li>
              <li>
                <a href={siteData.brand.socials.snapchat} target="_blank" rel="noopener noreferrer" className="hover:text-[#D51F2B] transition-colors flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 fill-current text-yellow-400" viewBox="0 0 24 24"><path d="M12.002 0c-4.484 0-7.391 3.228-7.391 6.577 0 1.837.734 3.197 1.464 4.137.185.239.261.428.163.708-.13.376-.446 1.077-1.428 1.488-.636.265-1.257.069-1.637-.179-.319-.208-.553-.356-.811-.356-.407 0-.756.368-.696 1.042.083.923 1.157 2.052 2.68 2.37.527.11 1.079.117 1.631.02.502-.088 1.01-.225 1.484-.403.498.811 1.642 1.341 2.541 1.341.9 0 2.043-.53 2.541-1.341.474.178.982.315 1.484.403.552.097 1.104.09 1.631-.02 1.523-.318 2.597-1.447 2.68-2.37.06-.674-.289-1.042-.696-1.042-.258 0-.492.148-.811.356-.38.248-1.001.444-1.637.179-.982-.411-1.298-1.112-1.428-1.488-.098-.28-.022-.469.163-.708.73-.94 1.464-2.3 1.464-4.137C19.393 3.228 16.486 0 12.002 0z"/></svg>
                  <span>Snapchat</span>
                </a>
              </li>
              <li>
                <a href={siteData.brand.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#D51F2B] transition-colors flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 fill-current text-blue-500" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Small Bottom Copyright & Legal Links Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4" dir="rtl">
          <p>© 2026 سعيد بن عايض — جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">سياسة الخصوصية</Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">الشروط والأحكام</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
