import React from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { siteData } from '../data/siteData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/10 text-gray-400 text-xs pt-12 sm:pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-14 text-right" dir="rtl">
          <div className="space-y-4">
            <Link to="/" className="inline-block py-1">
              <img src="/assets/sba_logo_transparent.png" alt={siteData.brand.name} className="h-16 sm:h-20 w-auto max-w-[180px] object-contain filter drop-shadow-[0_0_18px_rgba(213,31,43,0.8)]" />
            </Link>
            <p className="text-gray-400 leading-relaxed font-light text-xs max-w-sm">{siteData.brand.footerMotto}</p>
            <div className="pt-2">
              <a href={`mailto:${siteData.brand.email}`} className="text-xs font-mono font-bold text-[#D51F2B] hover:underline block mb-3">{siteData.brand.email}</a>
              <Link to="/contact" className="sba-btn-primary w-full sm:w-auto py-3 px-6 text-xs flex items-center justify-center gap-2 text-center"><Send className="w-3.5 h-3.5" /><span>تواصل معنا</span></Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white pb-2 border-b border-white/10">صفحات سعيد</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="hover:text-[#D51F2B]">الرئيسية</Link></li>
              <li><Link to="/about" className="hover:text-[#D51F2B]">عن سعيد</Link></li>
              <li><a href="/#content-fields" className="hover:text-[#D51F2B]">مجالات المحتوى</a></li>
              <li><a href="/#work-fields" className="hover:text-[#D51F2B]">مجالات العمل</a></li>
              <li><Link to="/services" className="hover:text-[#D51F2B]">خدمات سعيد</Link></li>
              <li><Link to="/news" className="hover:text-[#D51F2B]">أخبار سعيد</Link></li>
              <li><Link to="/blog" className="hover:text-[#D51F2B]">بلوق سعيد</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white pb-2 border-b border-white/10">المساعدة والتواصل</h4>
            <ul className="space-y-2.5">
              <li><Link to="/centerhelp" className="hover:text-[#D51F2B]">سعيد سنترهلب</Link></li>
              <li><Link to="/suggestion" className="hover:text-[#D51F2B]">بطاقة اقتراح</Link></li>
              <li><Link to="/complaint" className="hover:text-[#D51F2B]">بطاقة شكوى</Link></li>
              <li><Link to="/contact" className="hover:text-[#D51F2B]">تواصل معنا</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white pb-2 border-b border-white/10">روابط سعيد</h4>
            <ul className="space-y-2.5">
              <li><a href={siteData.brand.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-[#D51F2B]">YouTube</a></li>
              <li><a href={siteData.brand.socials.x} target="_blank" rel="noopener noreferrer" className="hover:text-[#D51F2B]">X (Twitter)</a></li>
              <li><a href={siteData.brand.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#D51F2B]">Instagram</a></li>
              <li><a href={siteData.brand.socials.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-[#D51F2B]">TikTok</a></li>
              <li><a href={siteData.brand.socials.snapchat} target="_blank" rel="noopener noreferrer" className="hover:text-[#D51F2B]">Snapchat</a></li>
              <li><a href={siteData.brand.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#D51F2B]">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-7 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4" dir="rtl">
          <p>© 2026 سعيد بن عايض — جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-gray-300">سياسة الخصوصية</Link>
            <Link to="/terms" className="hover:text-gray-300">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
