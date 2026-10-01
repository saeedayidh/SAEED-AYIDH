import React, { useEffect, useState } from 'react';
import { CheckCircle2, Paperclip, Send, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
let statusRequest: Promise<boolean> | undefined;
const inputClass = 'w-full rounded-xl border border-white/10 bg-[#080808] px-4 py-3 text-sm text-white outline-none focus:border-[#D51F2B]';
const errorText: Record<string, [string, string]> = {
  unsafe_attachment: ['تم رفض مرفق غير آمن. احذفه ثم حاول مجددًا.', 'An unsafe attachment was rejected. Remove it and try again.'],
  attachment_scanner_unavailable: ['فحص المرفقات غير متاح حاليًا. أرسل الرسالة دون مرفقات أو حاول لاحقًا.', 'Attachment scanning is unavailable. Send without attachments or try later.'],
  attachment_scan_busy: ['الفحص مشغول حاليًا. حاول بعد قليل.', 'Scanning is busy. Please try shortly.'],
  attachment_type_mismatch: ['محتوى المرفق لا يطابق نوعه. اختر ملفًا سليمًا.', 'Attachment content does not match its type. Choose a valid file.'],
  unsupported_attachment: ['نوع المرفق غير مسموح. استخدم الأنواع الموضحة.', 'Unsupported attachment. Use a listed file type.'],
};
export function FeedbackForm({ type }: { type: 'suggestion' | 'complaint' }) {
  const { isArabic } = useLanguage(), { data } = useCMS();
  const complaint = type === 'complaint';
  const cfg: any = (data.global as any)[complaint ? 'complaintPage' : 'suggestionPage'] || {};
  const t = (ar: string, en: string) => isArabic ? ar : en;
  const configured = (key: string, ar: string, en: string) => cfg[isArabic ? key : key + 'En'] || t(ar, en);
  const [sent, setSent] = useState(false), [sending, setSending] = useState(false), [error, setError] = useState('');
  const [files, setFiles] = useState<File[]>([]), [enabled, setEnabled] = useState<boolean | null>(null);
  useEffect(() => { let active = true; if (!statusRequest) statusRequest = fetch('/api/submissions/attachments/status').then(r => r.ok ? r.json() : { enabled: false }).then(x => !!x.enabled).catch(() => false); void statusRequest.then(value => { if (active) setEnabled(value); }); return () => { active = false; }; }, []);
  const categories = cfg.categories?.length ? cfg.categories : [{ id: 'content', label: 'المحتوى', labelEn: 'Content' }, { id: 'services', label: 'الخدمات', labelEn: 'Services' }, { id: 'tools', label: 'الأدوات', labelEn: 'Tools' }, { id: 'tech', label: 'مشكلة تقنية', labelEn: 'Technical issue' }, { id: 'other', label: 'أخرى', labelEn: 'Other' }];
  const requiredLabel = (label: string) => <>{label.replace(/\s*\*/g, '')} <span className="text-[#ED1C2E]" aria-hidden="true">*</span><span className="sr-only">{t('إجباري', 'Required')}</span></>;
  const selectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = [...files, ...Array.from(e.target.files || [])]; e.target.value = '';
    if (next.length > 3 || next.some(f => f.size > 5 * 1024 * 1024) || next.reduce((n,f) => n + f.size, 0) > 12 * 1024 * 1024) { setError(t('الحد 3 مرفقات، 5 ميجابايت للملف و12 ميجابايت إجمالًا.', 'Limit: 3 attachments, 5 MB each and 12 MB total.')); return; }
    if (next.some(f => !/\.(jpe?g|png|webp|mp4|mov|pdf|txt)$/i.test(f.name))) { setError(t('نوع الملف غير مسموح.', 'Unsupported file type.')); return; }
    setError(''); setFiles(next);
  };
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = event.currentTarget, fd = new FormData(form);
    if (!['name','email','message'].every(key => String(fd.get(key) || '').trim())) { setError(t('أكمل الحقول الإجبارية.', 'Complete the required fields.')); return; }
    setSending(true); setError('');
    try {
      const attachments = await Promise.all(files.map(file => new Promise<{ name: string; base64: string }>((resolve,reject) => { const reader = new FileReader(); reader.onload = () => resolve({ name: file.name, base64: String(reader.result).split(',')[1] }); reader.onerror = reject; reader.readAsDataURL(file); })));
      const response = await fetch('/api/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify({ type, name: String(fd.get('name') || '').trim(), email: String(fd.get('email') || '').trim(), message: String(fd.get('message') || '').trim(), category: complaint ? fd.get('category') : undefined, attachments }) });
      if (!response.ok) { const result = await response.json().catch(() => ({})); throw Error(result.error || 'send_failed'); }
      setSent(true); setFiles([]); form.reset();
    } catch (cause) { const code = cause instanceof Error ? cause.message : ''; const text = errorText[code]; setError(text ? text[isArabic ? 0 : 1] : t('تعذر الإرسال. راجع البيانات وحاول مرة أخرى.', 'Could not send. Check your details and try again.')); }
    finally { setSending(false); }
  };
  if (sent) return <div className="flex min-h-[580px] flex-col items-center justify-center gap-4 text-center"><CheckCircle2 className="h-14 w-14 text-emerald-500"/><h3 className="text-xl font-black">{complaint ? t('تم تقديم شكواك بنجاح!', 'Complaint submitted!') : t('تم إرسال اقتراحك بنجاح!', 'Suggestion sent!')}</h3><button type="button" className="sba-btn-secondary px-5 py-3 text-sm" onClick={() => setSent(false)}>{t('إرسال مرة أخرى', 'Send another')}</button></div>;
  const prefix = `feedback-${type}`;
  return <form onSubmit={submit} className="flex flex-1 flex-col gap-4 text-start" dir={isArabic ? 'rtl' : 'ltr'}>
    <p className="text-[11px] text-gray-500">{t('الحقول بعلامة * إجبارية.', 'Fields marked * are required.')}</p>
    {(['name','email'] as const).map(key => <div key={key}><label htmlFor={`${prefix}-${key}`} className="mb-2 block text-xs font-bold text-gray-200">{requiredLabel(configured(key + 'Label', key === 'name' ? 'الاسم' : 'البريد الإلكتروني', key === 'name' ? 'Name' : 'Email'))}</label><input id={`${prefix}-${key}`} name={key} type={key === 'email' ? 'email' : 'text'} autoComplete={key} required maxLength={key === 'name' ? 120 : 200} className={inputClass}/></div>)}
    {complaint ? <div><label htmlFor={`${prefix}-category`} className="mb-2 block text-xs font-bold">{requiredLabel(configured('categoryLabel', 'قسم الشكوى', 'Complaint category'))}</label><select id={`${prefix}-category`} name="category" required className={inputClass}><option value="">{t('اختر قسم الشكوى', 'Choose a category')}</option>{categories.filter((c:any) => c.enabled !== false).map((c:any) => <option key={c.id} value={c.id}>{isArabic ? c.label : c.labelEn || c.label}</option>)}</select></div> : <div className="hidden min-h-[70px] lg:block" aria-hidden="true"/>}
    <div><label htmlFor={`${prefix}-message`} className="mb-2 block text-xs font-bold">{requiredLabel(complaint ? t('اكتب تفاصيل الشكوى', 'Complaint details') : t('اكتب اقتراحك', 'Your suggestion'))}</label><textarea id={`${prefix}-message`} name="message" required maxLength={5000} rows={5} placeholder={complaint ? t('اكتب تفاصيل الشكوى...', 'Describe your complaint...') : t('اكتب اقتراحك...', 'Write your suggestion...')} className={inputClass + ' min-h-36 resize-y'}/></div>
    <div className="rounded-xl border border-white/10 p-4"><label htmlFor={`${prefix}-attachments`} className="mb-2 flex items-center gap-2 text-xs font-bold"><Paperclip className="h-4 w-4 text-[#D51F2B]"/>{t('مرفقات (اختياري)', 'Attachments (optional)')}</label><input id={`${prefix}-attachments`} type="file" multiple disabled={!enabled || sending} accept=".jpg,.jpeg,.png,.webp,.mp4,.mov,.pdf,.txt" onChange={selectFiles} className="w-full text-xs text-gray-400 file:me-3 file:rounded-lg file:border-0 file:bg-[#D51F2B]/15 file:p-2 file:text-[#ED1C2E] disabled:opacity-40"/><p className="mt-2 text-[10px] leading-5 text-gray-500">{t('صور JPG / PNG / WEBP، فيديو MP4 / MOV، ملفات PDF / TXT. حتى 3 ملفات، 5 ميجابايت للملف.', 'JPG / PNG / WEBP images, MP4 / MOV video, PDF / TXT files. Up to 3 files, 5 MB each.')}</p>{enabled === false && <p className="mt-2 text-[11px] text-amber-400">{t('رفع المرفقات متوقف مؤقتًا حتى يجهز فحص الأمان. تقدر ترسل الرسالة بدون مرفقات.', 'Attachments are paused until security scanning is ready. You can send without attachments.')}</p>}{files.map((file,index) => <div key={index} className="mt-2 flex items-center justify-between gap-3 text-xs text-gray-300"><span className="truncate">{file.name}</span><button type="button" disabled={sending} onClick={() => setFiles(files.filter((_,i) => i !== index))} aria-label={t('حذف المرفق', 'Remove attachment')}><X className="h-4 w-4"/></button></div>)}</div>
    {error && <p role="alert" className="text-xs text-red-400">{error}</p>}
    <button type="submit" disabled={sending} className="sba-btn-primary mt-auto flex w-full items-center justify-center gap-2 py-3.5 text-sm font-bold disabled:opacity-50"><Send className="h-4 w-4"/>{sending ? t('جاري الإرسال والفحص...', 'Sending and scanning...') : configured('submitLabel', complaint ? 'تقديم شكوى' : 'إرسال اقتراح', complaint ? 'Submit complaint' : 'Send suggestion')}</button>
  </form>;
}
