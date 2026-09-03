import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Send } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Navbar: React.FC = () => {
  const { data } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const links = [...(data.navbar.links || [])].filter(link => link.isEnabled).sort((a, b) => a.order - b.order);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const renderLink = (link: any, mobile = false) => {
    const cls = mobile
      ? 'py-4 text-base font-bold border-b border-white/5 text-white'
      : `hover:text-[#D51F2B] transition-colors ${location.pathname === link.url ? 'text-[#D51F2B] font-bold' : ''}`;
    const click = mobile ? () => setMobileMenuOpen(false) : undefined;
    if (link.url?.startsWith('/#') || link.url?.startsWith('http')) return <a key={link.id} href={link.url} onClick={click} target={link.isExternal ? '_blank' : undefined} rel={link.isExternal ? 'noreferrer' : undefined} className={cls}>{link.label}</a>;
    return <Link key={link.id} to={link.url || '/'} onClick={click} className={cls}>{link.label}</Link>;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/10 py-2.5 shadow-lg' : 'bg-[#050505]/90 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none py-3 lg:py-4'}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between gap-5">
          <Link to="/" className="flex items-center group py-1 shrink-0">
            <img src={data.global.logoUrl || '/assets/sba_logo_transparent.png'} alt={data.global.websiteName} className="h-11 sm:h-14 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform" />
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 text-sm font-medium text-gray-300 flex-1 min-w-0">
            {links.map(link => renderLink(link))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Link to={data.navbar.contactBtnUrl || '/contact'} className="sba-btn-primary px-6 py-2.5 text-xs flex items-center gap-2"><Send className="w-3.5 h-3.5" /><span>{data.navbar.contactBtnLabel || 'تواصل معنا'}</span></Link>
          </div>

          <button type="button" onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-white hover:text-[#D51F2B]" aria-label="فتح القائمة"><Menu className="w-8 h-8" /></button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[9999] bg-[#050505]" dir="rtl">
          <div className="h-[76px] px-5 flex items-center justify-between border-b border-white/10 bg-[#080808]">
            <img src={data.global.logoUrl || '/assets/sba_logo_transparent.png'} alt={data.global.websiteName} className="h-11 w-auto object-contain" />
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="p-2 text-white" aria-label="إغلاق القائمة"><X className="w-8 h-8" /></button>
          </div>
          <div className="h-[calc(100dvh-76px)] overflow-y-auto px-6 py-4">
            <nav className="flex flex-col text-right">{links.map(link => renderLink(link, true))}</nav>
            <Link to={data.navbar.contactBtnUrl || '/contact'} onClick={() => setMobileMenuOpen(false)} className="sba-btn-primary w-full py-4 text-center block text-sm font-bold mt-6">{data.navbar.contactBtnLabel || 'تواصل معنا'}</Link>
          </div>
        </div>
      )}
    </>
  );
};
