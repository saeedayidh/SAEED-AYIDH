import React from 'react';
import { ArrowUpRight, Mail, Phone, UserRound } from 'lucide-react';
import { smartLinkPlatforms, type SmartLinkPlatform, type SmartLinkProfile, defaultSmartTheme } from '../lib/smartLinks';

export function SmartPlatformIcon({ platform }: { platform: SmartLinkPlatform }) {
  const [failed, setFailed] = React.useState(false);
  if (platform.icon === 'phone') return <Phone className="h-5 w-5 text-[#D51F2B]"/>;
  if (platform.icon === 'mail') return <Mail className="h-5 w-5 text-[#D51F2B]"/>;
  const src = platform.id === 'linkedin' ? 'https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/linkedin.svg' : `https://cdn.simpleicons.org/${platform.icon}/D51F2B`;
  return failed ? <span className="text-xs font-black text-[#D51F2B]">{platform.en.slice(0, 2)}</span> : <img src={src} alt="" aria-hidden="true" onError={() => setFailed(true)} className="h-5 w-5 object-contain" style={platform.id === 'linkedin' ? { filter: 'invert(22%) sepia(90%) saturate(3242%) hue-rotate(339deg)' } : undefined}/>;
}

export function SmartLinkProfileCard({ profile, isArabic, preview = false }: { profile: SmartLinkProfile; isArabic: boolean; preview?: boolean }) {
  const theme = { ...defaultSmartTheme, ...profile.theme };
  return <div className="relative overflow-hidden rounded-[32px] border border-black/10 shadow-2xl" style={{ background: theme.background, color: theme.text }} dir={isArabic ? 'rtl' : 'ltr'}>
    <div className="relative h-40 w-full overflow-hidden sm:h-48" style={{ background: `linear-gradient(135deg, ${theme.card}, ${theme.accent}${Math.round(theme.intensity * 2.55).toString(16).padStart(2, '0')})` }}>
      {profile.banner && <img src={profile.banner} alt={isArabic ? 'بنر الصفحة' : 'Page banner'} className="h-full w-full object-cover"/>}
    </div>
    <div className="relative -mt-12 px-5 pb-7 sm:px-8">
      <div className="mx-auto mb-4 grid h-24 w-24 place-items-center overflow-hidden rounded-full border-4 shadow-xl" style={{ borderColor: theme.background, background: theme.card, color: theme.secondary }}>
        {profile.avatar ? <img src={profile.avatar} alt={profile.name || (isArabic ? 'الصورة الشخصية' : 'Profile photo')} className="h-full w-full object-cover"/> : <UserRound strokeWidth={1.2} className="h-14 w-14" aria-label={isArabic ? 'صورة شخصية افتراضية' : 'Default profile photo'}/>}
      </div>
      <div className="mb-7 text-center">
        <h1 className="break-words text-2xl font-black">{profile.name || (isArabic ? 'الاسم' : 'Name')}</h1>
        {profile.username && <p className="mt-2 text-xs" dir="ltr" style={{ color: theme.secondary }}>@{profile.username}</p>}
        {profile.bio && <p className="mt-4 whitespace-pre-line break-words text-sm leading-7" style={{ color: theme.secondary }}>{profile.bio}</p>}
      </div>
      <div className="space-y-3">
        {profile.accounts.map(account => {
          const platform = smartLinkPlatforms.find(item => item.id === account.platform);
          if (!platform) return null;
          return <a key={account.platform} href={preview ? undefined : account.url} target={['phone', 'email'].includes(platform.id) ? undefined : '_blank'} rel="noopener noreferrer" aria-disabled={preview || undefined}
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition ${preview ? '' : 'hover:-translate-y-0.5 hover:opacity-90'}`}
            style={{ background: theme.card, borderColor: `${theme.accent}${Math.round(theme.intensity * 2.55).toString(16).padStart(2, '0')}`, color: theme.text }}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: theme.background }}><SmartPlatformIcon platform={platform}/></span>
            <span className="min-w-0 flex-1"><span className="block text-sm font-bold">{isArabic ? platform.ar : platform.en}</span><span dir="ltr" className="block truncate text-start text-[11px]" style={{ color: theme.secondary }}>{account.value}</span></span>
            <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: theme.accent }}/>
          </a>;
        })}
        {!profile.accounts.length && <div className="rounded-2xl border border-dashed px-5 py-10 text-center text-sm leading-6" style={{ borderColor: theme.secondary, color: theme.secondary }}>{isArabic ? 'أضف حساباتك وشاهد المعاينة هنا' : 'Add accounts to see your preview here'}</div>}
      </div>
    </div>
  </div>;
}
