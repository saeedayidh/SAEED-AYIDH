import React, { useMemo, useState } from 'react';
import { Check, Copy, ExternalLink, Link2, LoaderCircle, Plus, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { smartLinkPlatforms, smartAccountUrl, type SmartLinkProfile } from '../lib/smartLinks';
import { SmartLinkProfileCard, SmartPlatformIcon } from './SmartLinkProfileCard';
import { ShareButton } from './ShareButton';

export function SmartLinkBuilder() {
  const { isArabic } = useLanguage();
  const [selected, setSelected] = useState(['instagram', 'whatsapp', 'snapchat', 'tiktok']);
  const [values, setValues] = useState<Record<string, string>>({});
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [primary, setPrimary] = useState('instagram');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ profile: SmartLinkProfile; url: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const active = smartLinkPlatforms.filter(platform => selected.includes(platform.id));
  const accounts = useMemo(() => active.filter(platform => values[platform.id]?.trim()).map(platform => ({ platform: platform.id, value: values[platform.id].trim(), url: smartAccountUrl(platform, values[platform.id]) })), [selected, values]);
  const effectivePrimary = accounts.some(account => account.platform === primary) ? primary : (accounts.find(account => account.platform === 'instagram') || accounts[0])?.platform || '';
  const clear = () => { setResult(null); setError(''); setCopied(false); };
  const toggle = (id: string) => { clear(); setSelected(ids => ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id]); };
  const label = (kind: string) => isArabic ? (({ phone: 'الرقم مع رمز الدولة', email: 'البريد الإلكتروني', appId: 'رقم التطبيق', package: 'معرّف التطبيق', invite: 'رمز الدعوة' } as Record<string, string>)[kind] || 'اليوزر') : (({ phone: 'Number with country code', email: 'Email address', appId: 'App ID', package: 'Package ID', invite: 'Invite code' } as Record<string, string>)[kind] || 'Username');
  const generate = async (event: React.FormEvent) => {
    event.preventDefault(); if (busy) return;
    setBusy(true); setError(''); setCopied(false);
    try {
      const response = await fetch('/api/smart-links', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, bio, primary: effectivePrimary, accounts: accounts.map(({ platform, value }) => ({ platform, value })) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(response.status === 429 ? (isArabic ? 'وصلت للحد المؤقت. جرّب لاحقًا.' : 'Please try again later.') : response.status === 400 ? (isArabic ? 'راجع اليوزرات والأرقام ومعرّفات التطبيقات.' : 'Check your usernames, numbers and app IDs.') : (isArabic ? 'تعذر حفظ الرابط الآن. جرّب مرة ثانية.' : 'Could not save your link. Please retry.'));
      setResult(data);
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
        <fieldset disabled={busy} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-bold text-gray-400">{isArabic ? 'اسم الصفحة (اختياري)' : 'Page name (optional)'}<input maxLength={80} value={name} onChange={event => { clear(); setName(event.target.value); }} placeholder={isArabic ? 'اسمك أو اسم مشروعك' : 'Your name or project'} className="mt-2 w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none focus:border-[#D51F2B]/60"/></label>
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
          {accounts.length > 0 && <label className="block text-xs font-bold text-gray-400">{isArabic ? 'الحساب المستخدم في عنوان الرابط' : 'Account used in your link address'}<select value={effectivePrimary} onChange={event => { clear(); setPrimary(event.target.value); }} className="mt-2 w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none focus:border-[#D51F2B]/60">{accounts.map(account => { const platform = smartLinkPlatforms.find(item => item.id === account.platform)!; return <option key={account.platform} value={account.platform}>{isArabic ? platform.ar : platform.en} · {account.value}</option>; })}</select></label>}
        </fieldset>
        <p className="text-xs leading-6 text-gray-500">{isArabic ? 'الحسابات اللي تضيفها تظهر لكل من يفتح رابطك. اكتب اليوزر فقط بدون رابط؛ وللرقم أضف رمز الدولة.' : 'Accounts you add are public to anyone with your link. Enter usernames without a full URL; include the country code for phone numbers.'}</p>
        <button type="submit" disabled={busy || !accounts.length} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D51F2B] px-6 py-4 text-sm font-black text-white transition hover:bg-[#b91823] disabled:cursor-not-allowed disabled:opacity-40">{busy ? <LoaderCircle className="h-5 w-5 animate-spin"/> : <Sparkles className="h-5 w-5"/>}{busy ? (isArabic ? 'جاري توليد الرابط...' : 'Generating...') : (isArabic ? 'توليد الرابط' : 'Generate link')}</button>
        {error && <p role="alert" className="rounded-xl border border-[#D51F2B]/30 bg-[#D51F2B]/10 p-4 text-sm text-red-300">{error}</p>}
        {result && <div aria-live="polite" className="rounded-2xl border border-[#D51F2B]/40 bg-[#D51F2B]/5 p-5"><p className="mb-3 flex items-center gap-2 text-sm font-bold text-white"><Check className="h-4 w-4 text-[#D51F2B]"/>{isArabic ? 'رابطك جاهز للمشاركة' : 'Your link is ready'}</p><input readOnly value={result.url} onFocus={event => event.target.select()} aria-label={isArabic ? 'الرابط المولد' : 'Generated link'} dir="ltr" className="mb-4 w-full rounded-xl border border-white/10 bg-[#080808] p-3 text-xs text-gray-300 outline-none"/><div className="flex flex-wrap items-center gap-2"><button type="button" onClick={copy} className="flex items-center gap-2 rounded-xl bg-[#D51F2B] px-4 py-2.5 text-xs font-bold text-white"><Copy className="h-4 w-4"/>{copied ? (isArabic ? 'تم النسخ' : 'Copied') : (isArabic ? 'نسخ الرابط' : 'Copy link')}</button><a href={result.profile.path} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs text-white"><ExternalLink className="h-4 w-4"/>{isArabic ? 'فتح الصفحة' : 'Open page'}</a><ShareButton title={name || (isArabic ? 'روابطي' : 'My links')} url={result.url}/></div></div>}
      </form>
      <aside className="min-w-0 lg:sticky lg:top-28"><p className="mb-4 flex items-center justify-center gap-2 text-xs font-bold text-gray-500"><Link2 className="h-4 w-4 text-[#D51F2B]"/>{isArabic ? 'معاينة مباشرة' : 'Live preview'}</p><SmartLinkProfileCard profile={{ name: name || (smartLinkPlatforms.find(item => item.id === effectivePrimary)?.kind === 'username' ? accounts.find(item => item.platform === effectivePrimary)?.value.replace(/^@/, '') || '' : ''), bio, accounts, primary, path: '' }} isArabic={isArabic} preview/></aside>
    </div>
  </div>;
}
