import React from 'react';
import { ArrowUpRight, Link2, Mail, Phone } from 'lucide-react';
import { smartLinkPlatforms, type SmartLinkPlatform, type SmartLinkProfile } from '../lib/smartLinks';

export function SmartPlatformIcon({ platform }: { platform: SmartLinkPlatform }) {
  const [failed, setFailed] = React.useState(false);
  if (platform.icon === 'phone') return <Phone className="h-5 w-5 text-[#D51F2B]"/>;
  if (platform.icon === 'mail') return <Mail className="h-5 w-5 text-[#D51F2B]"/>;
  const src = platform.id === 'linkedin' ? 'https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/linkedin.svg' : `https://cdn.simpleicons.org/${platform.icon}/D51F2B`;
  return failed ? <span className="text-xs font-black text-[#D51F2B]">{platform.en.slice(0, 2)}</span> : <img src={src} alt="" aria-hidden="true" onError={() => setFailed(true)} className="h-5 w-5 object-contain" style={platform.id === 'linkedin' ? { filter: 'invert(22%) sepia(90%) saturate(3242%) hue-rotate(339deg)' } : undefined}/>;
}

export function SmartLinkProfileCard({ profile, isArabic, preview = false }: { profile: SmartLinkProfile; isArabic: boolean; preview?: boolean }) {
  return <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#101010] p-6 shadow-2xl sm:p-8" dir={isArabic ? 'rtl' : 'ltr'}>
    <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#D51F2B]/15 to-transparent"/>
    <div className="relative mb-7 text-center">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-[#D51F2B]/35 bg-[#D51F2B]/10 text-2xl font-black text-white">{profile.name ? Array.from(profile.name)[0]?.toUpperCase() : <Link2 className="h-7 w-7 text-[#D51F2B]"/>}</div>
      <h2 className="break-words text-2xl font-black text-white">{profile.name || (isArabic ? 'روابطي' : 'My links')}</h2>
      {profile.bio && <p className="mt-3 break-words text-sm leading-6 text-gray-400">{profile.bio}</p>}
      <p className="mt-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#D51F2B]">{isArabic ? 'حساباتي في مكان واحد' : 'All my accounts. One place.'}</p>
    </div>
    <div className="relative space-y-2.5">
      {profile.accounts.map(account => {
        const platform = smartLinkPlatforms.find(item => item.id === account.platform);
        if (!platform) return null;
        return <a key={account.platform} href={preview ? undefined : account.url} target={['phone', 'email'].includes(platform.id) ? undefined : '_blank'} rel="noopener noreferrer" aria-disabled={preview || undefined}
          className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-[#171717] px-4 py-3.5 text-white transition ${preview ? '' : 'hover:-translate-y-0.5 hover:border-[#D51F2B]/60 hover:bg-[#1e1415]'}`}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-black/40"><SmartPlatformIcon platform={platform}/></span>
          <span className="min-w-0 flex-1"><span className="block text-sm font-bold">{isArabic ? platform.ar : platform.en}</span><span dir="ltr" className="block truncate text-start text-[11px] text-gray-500">{account.value}</span></span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-gray-500"/>
        </a>;
      })}
      {!profile.accounts.length && <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center text-sm leading-6 text-gray-600">{isArabic ? 'أضف حساباتك وشاهد المعاينة هنا' : 'Add accounts to see your preview here'}</div>}
    </div>
    <div className="relative mt-7 flex items-center justify-center gap-2 border-t border-white/5 pt-5 text-[10px] text-gray-500"><img src="/assets/sba_logo_transparent.png" alt="SBA" className="h-5 w-auto object-contain"/><span>{isArabic ? 'رابط ذكي · أدوات سعيد' : 'Smart Link · Saeed Tools'}</span></div>
  </div>;
}
