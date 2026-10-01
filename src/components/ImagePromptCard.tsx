import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { promptText, promptCategories, promptPlatforms, type ImagePrompt, type PromptPlatform } from '../data/imagePromptsData';
import { FavoriteButton } from './FavoriteButton';
import { ShareButton } from './ShareButton';
import { usePromptCopies, recordPromptCopy } from '../lib/promptCopies';
export function ImagePromptCard({ item, isArabic, language, platform }: { item: ImagePrompt; isArabic: boolean; language: 'ar' | 'en'; platform: PromptPlatform }) {
  const [copied, setCopied] = useState(false), [expanded, setExpanded] = useState(false), [failed, setFailed] = useState(false);
  const count = usePromptCopies(item.id);
  const [countFailed, setCountFailed] = useState(false);
  const text = promptText(item, language, platform);
  const copy = async () => {
    setFailed(false);
    try {
      try { if (!navigator.clipboard) throw new Error('clipboard'); await navigator.clipboard.writeText(text); }
      catch { const input = document.createElement('textarea'); input.value = text; input.style.position = 'fixed'; input.style.opacity = '0'; document.body.appendChild(input); input.focus(); input.select(); const ok = document.execCommand('copy'); input.remove(); if (!ok) throw new Error('copy'); }
      setCopied(true); window.setTimeout(() => setCopied(false), 2500);
      setCountFailed(false); void recordPromptCopy(item.id).catch(() => setCountFailed(true));
    } catch { setFailed(true); setExpanded(true); }
  };
  const target = promptPlatforms.find(value => value.id === item.platforms[0]);
  const isWritingRequest = item.platforms[0] === 'claude';
  const category = promptCategories.find(value => value.id === item.category);
  return <article id={`image-prompt-${item.id}`} className="scroll-mt-28 overflow-hidden rounded-[26px] border border-white/10 bg-[#111]">
    <div className="relative"><img src={item.image} alt={isArabic ? item.title : item.titleEn} loading="lazy" className="aspect-[4/5] w-full object-cover"/><div className="absolute left-3 top-3 flex gap-2"><FavoriteButton id={`image-prompt-${item.id}`} title={isArabic ? item.title : item.titleEn} url={`/resources/image-prompts#image-prompt-${item.id}`} type={isArabic ? 'برومبت' : 'Prompt'}/><ShareButton title={isArabic ? item.title : item.titleEn} url={`/resources/image-prompts#image-prompt-${item.id}`}/></div></div>
    <div className="p-5"><span className="text-[10px] font-bold text-[#D51F2B]">{isArabic ? category?.ar : category?.en}</span><p className="mt-2 text-xs text-gray-400">{isArabic ? 'مخصص لـ ' : 'Written for '}{isArabic ? target?.ar : target?.en}{isWritingRequest ? (isArabic ? ' · صياغة برومبت' : ' · Prompt writing') : ''}</p><h2 className="mt-2 text-lg font-black text-white">{isArabic ? item.title : item.titleEn}</h2><p className="mt-2 text-xs leading-6 text-gray-500">{isArabic ? item.description : item.descriptionEn}</p><p dir={language === 'ar' ? 'rtl' : 'ltr'} className={`mt-4 whitespace-pre-line rounded-xl border border-white/5 bg-black/25 p-4 text-sm leading-7 text-gray-300 ${expanded ? '' : 'line-clamp-4'}`}>{text}</p><button type="button" onClick={() => setExpanded(value => !value)} className="mt-3 text-xs text-gray-500 hover:text-white">{expanded ? (isArabic ? 'إخفاء النص الكامل' : 'Collapse prompt') : (isArabic ? 'عرض النص كاملًا' : 'Read full prompt')}</button><button type="button" onClick={copy} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D51F2B]/40 bg-[#D51F2B]/10 py-3 text-sm font-bold text-[#ED1C2E] transition hover:bg-[#D51F2B] hover:text-white">{copied ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}{copied ? (isArabic ? 'تم نسخ البرومبت' : 'Prompt copied') : (isWritingRequest ? (isArabic ? 'انسخ طلب صياغة البرومبت' : 'Copy prompt-writing request') : (isArabic ? 'انسخ البرومبت' : 'Copy prompt'))}</button><p aria-live="polite" title={isArabic ? 'يُحسب كل متصفح مرة واحدة لهذا البرومبت' : 'Each browser is counted once for this prompt'} className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400"><Copy className="h-3 w-3"/>{count === undefined ? (isArabic ? 'عدد الناسخين غير متاح حاليًا' : 'Copy count unavailable') : (isArabic ? `نسخه ${count.toLocaleString('ar-SA')} زائر` : `Copied by ${count.toLocaleString('en-US')} visitors`)}</p>{countFailed && <p className="mt-2 text-xs text-gray-500">{isArabic ? 'تم النسخ، لكن تعذر تحديث العدّاد. حاول النسخ لاحقًا لتسجيله.' : 'Copied, but the counter could not update. Copy again later to register it.'}</p>}{failed && <p role="alert" className="mt-3 text-xs text-red-300">{isArabic ? 'تعذر النسخ التلقائي. حدد النص الكامل وانسخه يدويًا.' : 'Select the full prompt above and copy it manually.'}</p>}</div>
  </article>;
}
