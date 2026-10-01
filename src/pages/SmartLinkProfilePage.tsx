import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { SmartLinkProfile } from '../lib/smartLinks';
import { SmartLinkProfileCard } from '../components/SmartLinkProfileCard';
import { ShareButton } from '../components/ShareButton';

export function SmartLinkProfilePage() {
  const { isArabic } = useLanguage();
  const { pathname } = useLocation();
  const [profile, setProfile] = useState<SmartLinkProfile | null>(null);
  const [status, setStatus] = useState('loading');
  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading'); setProfile(null);
    fetch(`/api/smart-links?path=${encodeURIComponent(pathname)}`, { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error(response.status === 404 ? 'missing' : 'error');
      const data = await response.json(); setProfile(data.profile); setStatus('ready');
    }).catch(error => { if (error.name !== 'AbortError') setStatus(error.message === 'missing' ? 'missing' : 'error'); });
    return () => controller.abort();
  }, [pathname]);
  return <div className="min-h-screen bg-[#090909] px-4 pb-20 pt-28 text-white" dir={isArabic ? 'rtl' : 'ltr'}><div className="mx-auto max-w-md">
    {status === 'loading' && <div className="grid h-64 place-items-center"><LoaderCircle aria-label={isArabic ? 'جاري التحميل' : 'Loading'} className="h-7 w-7 animate-spin text-[#D51F2B]"/></div>}
    {profile && <><div className="mb-4 flex justify-end"><ShareButton title={profile.name || (isArabic ? 'روابطي' : 'My links')} url={`https://saeedbinayidh.com${profile.path}`}/></div><SmartLinkProfileCard profile={profile} isArabic={isArabic}/></>}
    {['missing', 'error'].includes(status) && <div role="alert" className="rounded-3xl border border-white/10 bg-[#111] p-8 text-center"><h1 className="text-xl font-black">{status === 'missing' ? (isArabic ? 'الرابط غير موجود' : 'Link not found') : (isArabic ? 'تعذر تحميل الصفحة' : 'Could not load this page')}</h1><p className="mt-4 text-sm text-gray-500">{isArabic ? 'راجع الرابط أو جرّب فتحه مرة ثانية.' : 'Check the address or try again.'}</p></div>}
    <Link to="/tools/smart-link" className="mt-7 block text-center text-xs text-gray-500 transition hover:text-[#D51F2B]">{isArabic ? 'أنشئ رابطك الذكي مع أدوات سعيد' : 'Create your Smart Link with Saeed Tools'}</Link>
  </div></div>;
}
