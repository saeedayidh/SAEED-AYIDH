import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Send, ChevronDown } from 'lucide-react';
import { siteData } from '../data/siteData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/10 py-2.5 shadow-lg'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Right Side: SBA Freestanding Transparent Logo (Size Corrected to 55-70px width equivalent) */}
        <Link to="/" className="flex items-center group py-1">
          <img
            src="/assets/sba_logo_transparent.png"
            alt={siteData.brand.name}
            className="h-14 sm:h-16 md:h-16 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(213,31,43,0.75)] group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-300">
          <Link
            to="/"
            className={`hover:text-[#D51F2B] transition-colors ${
              location.pathname === '/' ? 'text-[#D51F2B] font-bold' : ''
            }`}
          >
            الرئيسية
          </Link>
          <a
            href="/#content-fields"
            className="hover:text-[#D51F2B] transition-colors"
          >
            مجالات المحتوى
          </a>
          <a
            href="/#work-fields"
            className="hover:text-[#D51F2B] transition-colors"
          >
            مجالات العمل
          </a>
          <Link
            to="/services"
            className={`hover:text-[#D51F2B] transition-colors ${
              location.pathname === '/services' ? 'text-[#D51F2B] font-bold' : ''
            }`}
          >
            خدمات سعيد
          </Link>
          <Link
            to="/news"
            className={`hover:text-[#D51F2B] transition-colors ${
              location.pathname === '/news' ? 'text-[#D51F2B] font-bold' : ''
            }`}
          >
            أخبار سعيد
          </Link>
          <Link
            to="/works"
            className={`hover:text-[#D51F2B] transition-colors ${
              location.pathname === '/works' ? 'text-[#D51F2B] font-bold' : ''
            }`}
          >
            أعمال سعيد
          </Link>
          <Link
            to="/resources"
            className={`hover:text-[#D51F2B] transition-colors ${
              location.pathname.startsWith('/resources') || location.pathname.startsWith('/tools') ? 'text-[#D51F2B] font-bold' : ''
            }`}
          >
            أدوات سعيد
          </Link>

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className="flex items-center gap-1 hover:text-[#D51F2B] transition-colors cursor-pointer py-1"
            >
              <span>المزيد</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {moreDropdownOpen && (
              <div
                className="absolute top-full right-0 mt-3 w-48 rounded-xl bg-[#151515] border border-white/10 p-2 shadow-2xl z-50 space-y-1"
                onMouseLeave={() => setMoreDropdownOpen(false)}
              >
                <Link
                  to="/about"
                  onClick={() => setMoreDropdownOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-xs font-semibold text-gray-200 hover:bg-[#D51F2B]/20 hover:text-white transition-colors"
                >
                  عن سعيد بن عايض
                </Link>
                <Link
                  to="/blog"
                  onClick={() => setMoreDropdownOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-xs font-semibold text-gray-200 hover:bg-[#D51F2B]/20 hover:text-white transition-colors"
                >
                  بلوق سعيد
                </Link>
                <Link
                  to="/centerhelp"
                  onClick={() => setMoreDropdownOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-xs font-semibold text-gray-200 hover:bg-[#D51F2B]/20 hover:text-white transition-colors"
                >
                  سعيد سنترهلب
                </Link>
                <Link
                  to="/suggestion"
                  onClick={() => setMoreDropdownOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-xs font-semibold text-gray-200 hover:bg-[#D51F2B]/20 hover:text-white transition-colors"
                >
                  بطاقة اقتراح
                </Link>
                <Link
                  to="/complaint"
                  onClick={() => setMoreDropdownOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-xs font-semibold text-gray-200 hover:bg-[#D51F2B]/20 hover:text-white transition-colors"
                >
                  بطاقة شكاوي
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Left Side: CTA Button "تواصل معنا" */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/contact"
            className="sba-btn-primary px-6 py-2.5 text-xs flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>تواصل معنا</span>
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-[#D51F2B] transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Side Sheet */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-[#080808]/98 backdrop-blur-xl z-40 p-6 flex flex-col justify-between overflow-y-auto border-t border-white/10">
          <nav className="flex flex-col space-y-4 text-right">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="py-3 text-lg font-bold border-b border-white/5 text-white hover:text-[#D51F2B]"
            >
              الرئيسية
            </Link>
            <a
              href="/#content-fields"
              onClick={closeMobileMenu}
              className="py-3 text-lg font-bold border-b border-white/5 text-white hover:text-[#D51F2B]"
            >
              مجالات المحتوى
            </a>
            <a
              href="/#work-fields"
              onClick={closeMobileMenu}
              className="py-3 text-lg font-bold border-b border-white/5 text-white hover:text-[#D51F2B]"
            >
              مجالات العمل
            </a>
            <Link
              to="/services"
              onClick={closeMobileMenu}
              className="py-3 text-lg font-bold border-b border-white/5 text-white hover:text-[#D51F2B]"
            >
              خدمات سعيد
            </Link>
            <Link
              to="/news"
              onClick={closeMobileMenu}
              className="py-3 text-lg font-bold border-b border-white/5 text-white hover:text-[#D51F2B]"
            >
              أخبار سعيد
            </Link>
            <Link
              to="/works"
              onClick={closeMobileMenu}
              className="py-3 text-lg font-bold border-b border-white/5 text-white hover:text-[#D51F2B]"
            >
              أعمال سعيد
            </Link>
            <Link
              to="/resources"
              onClick={closeMobileMenu}
              className="py-3 text-lg font-bold border-b border-white/5 text-white hover:text-[#D51F2B]"
            >
              أدوات سعيد
            </Link>
            <Link
              to="/blog"
              onClick={closeMobileMenu}
              className="py-3 text-lg font-bold border-b border-white/5 text-white hover:text-[#D51F2B]"
            >
              بلوق سعيد
            </Link>
            <Link
              to="/centerhelp"
              onClick={closeMobileMenu}
              className="py-3 text-lg font-bold border-b border-white/5 text-white hover:text-[#D51F2B]"
            >
              سعيد سنترهلب
            </Link>
          </nav>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="sba-btn-primary w-full py-4 text-center block text-sm font-bold"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
