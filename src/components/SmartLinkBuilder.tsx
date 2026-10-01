import React, { useEffect, useMemo, useState } from 'react';
import { Check, Copy, ExternalLink, Link2, LoaderCircle, Plus, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { smartLinkPlatforms, smartAccountUrl, type SmartLinkProfile, defaultSmartTheme } from '../lib/smartLinks';
import { SmartLinkProfileCard, SmartPlatformIcon } from './SmartLinkProfileCard';
import { SmartLinkAppearance, prepareSmartImage } from './SmartLinkAppearance';
import { ShareButton } from './ShareButton';

export function SmartLinkBuilder() {
  const { isArabic } = useLanguage();
  const [selected, setSelected] = useState(['instagram', 'whatsapp', 'snapchat', 'tiktok']);
  const [values, setValues] = useState<Record<string, string>>({});
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [theme, setTheme] = useState({ ...defaultSmartTheme });
  const [avatarData, setAvatarData] = useState<string | undefined>();
  const [bannerData, setBannerData] = useState<string | undefined>();
  const [mediaBusy, setMediaBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ profile: SmartLinkProfile; url: string; editToken: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const active = smartLinkPlatforms.filter(platform => selected.includes(platform.id));
  const accounts = useMemo(() => active.filter(platform => values[platform.id]?.trim()).map(platform => ({ platform: platform.id, value: values[platform.id].trim(), url: smartAccountUrl(platform, values[platform.id]) })), [selected, values]);
  const avatar = avatarData ?? result?.profile.avatar;
  const banner = bannerData ?? result?.profile.banner;
  const clear = () => { setDirty(true); setError(''); setCopied(false); };
  useEffect(() => {
    let cancelled = false;
    try {
      const stored = JSON.parse(localStorage.getItem('sba-smart-link-editor') || 'null');
      if (!stored?.path || !stored?.editToken) return;
      setBusy(true);
      fetch(`/api/smart-links?path=${encodeURIComponent(stored.path)}`).then(async response => {
        if (!response.ok) return;
        const { profile } = await response.json(); if (cancelled) return;
        setName(profile.name); setUsername(profile.username || ''); setBio(profile.bio); setTheme({ ...defaultSmartTheme, ...profile.theme });
        setSelected(profile.accounts.map((item: { platform: string }) => item.platform));
        setValues(Object.fromEntries(profile.accounts.map((item: { platform: string; value: string }) => [item.platform, item.value])));
        setResult({ profile, editToken: stored.editToken, url: `https://saeedbinayidh.com${profile.path}` });
      }).catch(() => {}).finally(() => { if (!cancelled) setBusy(false); });
    } catch {}
    return () => { cancelled = true; };
  }, []);
  const upload = async (file: File, isBanner: boolean) => {
    setMediaBusy(true); setError('');
    try { const data = await prepareSmartImage(file, isBanner); clear(); if (isBanner) setBannerData(data); else setAvatarData(data); }
    catch { setError(isArabic ? 'اختر صورة JPG أو PNG أو WebP صالحة بحجم أقل من 10 ميجابايت.' : 'Choose a valid JPG, PNG or WebP image under 10 MB.'); }
    finally { setMediaBusy(false); }
  };
  const toggle = (id: string) => { clear(); setSelected(ids => ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id]); };
  const label = (kind: string) => isArabic ? (({ phone: 'الرقم مع رمز الدولة', email: 'البريد الإلكتروني', appId: 'رقم التطبيق', package: 'معرّف التطبيق', invite: 'رمز الدعوة' } as Record<string, string>)[kind] || 'اليوزر') : (({ phone: 'Number with country code', email: 'Email address', appId: 'App ID', package: 'Package ID', invite: 'Invite code' } as Record<string, string>)[kind] || 'Username');
  const generate = async (event: React.FormEvent) => {
    event.preventDefault(); if (busy || mediaBusy) return;
    setBusy(true); setError(''); setCopied(false);
    try {
      const response = await fetch('/api/smart-links', { method: result ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, username, bio, theme, avatarData, bannerData, path: result?.profile.path, editToken: result?.editToken, accounts: accounts.map(({ platform, value }) => ({ platform, value })) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(response.status === 409 ? (isArabic ? 'اسم المستخدم مستخدم، اختر اسمًا آخر.' : 'Username is taken. Choose another one.') : response.status === 403 ? (isArabic ? 'تعذر التحقق من صلاحية التعديل في هذا المتصفح.' : 'Edit access could not be verified in this browser.') : response.status === 429 ? (isArabic ? 'وصلت للحد المؤقت. جرّب لاحقًا.' : 'Please try again later.') : response.status === 400 ? (isArabic ? 'راجع اليوزرات والأرقام ومعرّفات التطبيقات.' : 'Check your usernames, numbers and app IDs.') : (isArabic ? 'تعذر حفظ الرابط الآن. جرّب مرة ثانية.' : 'Could not save your link. Please retry.'));
      setResult(data); setDirty(false); setAvatarData(undefined); setBannerData(undefined);
      try { localStorage.setItem('sba-smart-link-editor', JSON.stringify({ path: data.profile.path, editToken: data.editToken })); } catch {}
    } catch (failure) { setError(failure instanceof Error ? failure.message : (isArabic ? 'تعذر الاتصال بالموقع.' : 'Could not connect.')); }
    finally { setBusy(false); }
  };
  const copy = async () => { if (!result) return; try { await navigator.clipboard.writeText(result.url); setCopied(true); } catch { setError(isArabic ? 'اضغط على الرابط لتحديده وانسخه يدويًا.' : 'Select the link and copy it manually.'); } };
  return <div dir={isArabic ? 'rtl' : 'ltr'}>
    <div className="mb-7 flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-bold text-gray-300">{isArabic ? 'اختر التطبيقات، ثم أضف حساباتك' : 'Choose apps, then add your accounts'}</p><span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-gray-500">{isArabic ? '19 تطبيقًا وخدمة' : '19 apps and services'}</span></div>
    <div className="mb-9 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">
      {smartLinkPlatforms.map(platform => <button type="button" key={platform.id} onClick={() => toggle(platform.id)} disabled={busy} aria-pressed={selected.includes(platform.id)}
        className={`relative flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 transition ${selected.includes(platform.id) ? 'border-[#D51F2B]/60 bg-[#D51F2B]/10 text-white' : 'border-white/10 bg-[#101010] text-gray-400 hover:border-white/30'}`}>
        <SmartPlatformIcon platform={platform}/><span className="text-[11px] font-bold">{isArabic ? platform.ar : platform.en}</span><span className="absolute end-2 top-2">{selected.includes(platform.id) ? <Check className="h-3 w-3 text-[#D51F2B]"/> : <Plus className="h-3 w-3 text-gray-600"/>}</span>
      </button>)}
    </div>
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <form onSubmit={generate} className="min-w-0 space-y-5">
        <fieldset disabled={busy || mediaBusy} className="space-y-5">
          <div className="grid gap-4">
            <label className="block text-xs font-bold text-gray-400">{isArabic ? 'الاسم (إجباري)' : 'Name (required)'}<input required maxLength={80} value={name} onChange={event => { clear(); setName(event.target.value); }} placeholder={isArabic ? 'اسمك أو اسم مشروعك' : 'Your name or project'} className="mt-2 w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none focus:border-[#D51F2B]/60"/></label>
            <label className="block text-xs font-bold text-gray-400">{isArabic ? 'اسم المستخدم (إجباري)' : 'Username (required)'}<input required minLength={3} maxLength={40} readOnly={!!result} value={username} onChange={event => { clear(); setUsername(event.target.value.replace(/^@/, '').toLowerCase()); }} autoCapitalize="none" autoCorrect="off" spellCheck={false} placeholder="yourname" className="mt-2 w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none focus:border-[#D51F2B]/60" dir="ltr"/><span className="mt-2 block break-all font-normal text-gray-500" dir="ltr">https://saeedbinayidh.com/go/{username || 'yourname'}</span><span className="mt-1 block text-[10px] font-normal text-gray-500">{isArabic ? '3–40 حرفًا: أحرف وأرقام ونقطة وشرطة وشرطة سفلية. يثبت اسم المستخدم بعد التوليد.' : '3–40 letters, digits, dots, hyphens or underscores. The username is fixed after generation.'}</span></label>
            <label className="block text-xs font-bold text-gray-400">{isArabic ? 'نبذة قصيرة (اختياري)' : 'Short bio (optional)'}<input maxLength={180} value={bio} onChange={event => { clear(); setBio(event.target.value); }} className="mt-2 w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none focus:border-[#D51F2B]/60"/></label>
          </div>
          <div className="space-y-3">
            {active.map(platform => <div key={platform.id} className="rounded-2xl border border-white/10 bg-[#101010] p-4">
              <div className="mb-3 flex items-center gap-2"><SmartPlatformIcon platform={platform}/><span className="flex-1 text-sm font-bold text-white">{isArabic ? platform.ar : platform.en}</span><button type="button" onClick={() => toggle(platform.id)} aria-label={isArabic ? `إزالة ${platform.ar}` : `Remove ${platform.en}`} className="p-1 text-gray-600 hover:text-white"><X className="h-4 w-4"/></button></div>
              <label className="block"><span className="mb-2 block text-[11px] text-gray-500">{label(platform.kind)}</span><div className="flex min-w-0 items-center rounded-xl border border-white/10 bg-black/30 focus-within:border-[#D51F2B]/60" dir="ltr">
                <span className="hidden max-w-[55%] shrink-0 truncate border-r border-white/10 px-3 text-[10px] text-gray-600 sm:block">{platform.prefix}</span>
                <input value={values[platform.id] || ''} onChange={event => { clear(); setValues(current => ({ ...current, [platform.id]: event.target.value })); }} type={platform.kind === 'email' ? 'email' : 'text'} inputMode={platform.kind === 'phone' ? 'tel' : platform.kind === 'appId' ? 'numeric' : undefined} autoCapitalize="none" autoCorrect="off" spellCheck={false} maxLength={160} placeholder={platform.placeholder} aria-label={`${isArabic ? platform.ar : platform.en}: ${label(platform.kind)}`} className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600"/>
              </div><p className="mt-2 truncate text-[10px] text-gray-600 sm:hidden" dir="ltr">{platform.prefix}</p></label>
            </div>)}
          </div>
          <SmartLinkAppearance theme={theme} onChange={value => { clear(); setTheme(value); }} isArabic={isArabic} onImage={upload} onRemove={isBanner => { clear(); if (isBanner) setBannerData(''); else setAvatarData(''); }} avatar={avatar} banner={banner}/>

        </fieldset>
        <p className="text-xs leading-6 text-gray-500">{isArabic ? 'الحسابات اللي تضيفها تظهر لكل من يفتح رابطك. اكتب اليوزر فقط بدون رابط؛ وللرقم أضف رمز الدولة.' : 'Accounts you add are public to anyone with your link. Enter usernames without a full URL; include the country code for phone numbers.'}</p>
        <button type="submit" disabled={busy || mediaBusy || !accounts.length || !name.trim() || username.trim().length < 3} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D51F2B] px-6 py-4 text-sm font-black text-white transition hover:bg-[#b91823] disabled:cursor-not-allowed disabled:opacity-40">{busy ? <LoaderCircle className="h-5 w-5 animate-spin"/> : <Sparkles className="h-5 w-5"/>}{busy ? (isArabic ? 'جاري توليد الرابط...' : 'Generating...') : (result ? (isArabic ? 'حفظ التعديلات' : 'Save changes') : (isArabic ? 'توليد الرابط' : 'Generate link'))}</button>
        {mediaBusy && <p className="text-xs text-gray-400">{isArabic ? 'جاري تجهيز الصورة...' : 'Preparing image...'}</p>}
        {result && <p className="text-xs text-gray-500">{isArabic ? 'صلاحية تعديل رابطك محفوظة في هذا المتصفح.' : 'Edit access is saved in this browser.'}</p>}
        {dirty && result && <p className="text-xs text-amber-400">{isArabic ? 'اضغط حفظ التعديلات لتحديث صفحتك.' : 'Save changes to update your public page.'}</p>}
        {error && <p role="alert" className="rounded-xl border border-[#D51F2B]/30 bg-[#D51F2B]/10 p-4 text-sm text-red-300">{error}</p>}
        {result && <div aria-live="polite" className="rounded-2xl border border-[#D51F2B]/40 bg-[#D51F2B]/5 p-5"><p className="mb-3 flex items-center gap-2 text-sm font-bold text-white"><Check className="h-4 w-4 text-[#D51F2B]"/>{isArabic ? 'رابطك جاهز للمشاركة' : 'Your link is ready'}</p><input readOnly value={result.url} onFocus={event => event.target.select()} aria-label={isArabic ? 'الرابط المولد' : 'Generated link'} dir="ltr" className="mb-4 w-full rounded-xl border border-white/10 bg-[#080808] p-3 text-xs text-gray-300 outline-none"/><div className="flex flex-wrap items-center gap-2"><button type="button" onClick={copy} className="flex items-center gap-2 rounded-xl bg-[#D51F2B] px-4 py-2.5 text-xs font-bold text-white"><Copy className="h-4 w-4"/>{copied ? (isArabic ? 'تم النسخ' : 'Copied') : (isArabic ? 'نسخ الرابط' : 'Copy link')}</button><a href={result.profile.path} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs text-white"><ExternalLink className="h-4 w-4"/>{isArabic ? 'فتح الصفحة' : 'Open page'}</a><ShareButton title={name || (isArabic ? 'روابطي' : 'My links')} url={result.url}/><button type="button" onClick={() => { setResult(null); setName(''); setUsername(''); setBio(''); setValues({}); setTheme({ ...defaultSmartTheme }); setAvatarData(undefined); setBannerData(undefined); clear(); try { localStorage.removeItem('sba-smart-link-editor'); } catch {} }} className="px-3 py-2 text-xs text-gray-500">{isArabic ? 'إنشاء رابط جديد' : 'Create another link'}</button></div></div>}
      </form>
      <aside className="min-w-0 lg:sticky lg:top-28"><p className="mb-4 flex items-center justify-center gap-2 text-xs font-bold text-gray-500"><Link2 className="h-4 w-4 text-[#D51F2B]"/>{isArabic ? 'معاينة مباشرة' : 'Live preview'}</p><SmartLinkProfileCard profile={{ name, username, bio, accounts, avatar, banner, theme, path: '' }} isArabic={isArabic} preview/></aside>
    </div>
  </div>;
}
