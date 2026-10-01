import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { defaultSmartTheme, type SmartLinkProfile } from '../lib/smartLinks';
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
  useEffect(() => {
    const originalTitle = document.title;
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const originalIcon = favicon?.getAttribute('href');
    document.head.querySelectorAll('meta[property^="og:"],meta[name="description"]').forEach(element => element.remove());
    document.title = profile?.name || (isArabic ? 'الروابط' : 'Links');
    if (favicon) favicon.href = profile?.avatar || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
    return () => { document.title = originalTitle; if (favicon && originalIcon) favicon.href = originalIcon; };
  }, [profile, isArabic]);
  const theme = { ...defaultSmartTheme, ...profile?.theme };
  return <div style={{ background: theme.background, color: theme.text }} className="min-h-screen px-4 pb-12 pt-6 font-cairo" dir={isArabic ? 'rtl' : 'ltr'}><div className="mx-auto max-w-md">
    {status === 'loading' && <div className="grid h-64 place-items-center"><LoaderCircle aria-label={isArabic ? 'جاري التحميل' : 'Loading'} className="h-7 w-7 animate-spin text-[#D51F2B]"/></div>}
    {profile && <><div className="mb-4 flex justify-end"><ShareButton title={profile.name || (isArabic ? 'روابطي' : 'My links')} url={`https://saeedbinayidh.com${profile.path}`}/></div><SmartLinkProfileCard profile={profile} isArabic={isArabic}/></>}
    {['missing', 'error'].includes(status) && <div role="alert" className="rounded-3xl border border-white/10 bg-[#111] p-8 text-center"><h1 className="text-xl font-black">{status === 'missing' ? (isArabic ? 'الرابط غير موجود' : 'Link not found') : (isArabic ? 'تعذر تحميل الصفحة' : 'Could not load this page')}</h1><p className="mt-4 text-sm text-gray-500">{isArabic ? 'راجع الرابط أو جرّب فتحه مرة ثانية.' : 'Check the address or try again.'}</p></div>}

  </div></div>;
}
