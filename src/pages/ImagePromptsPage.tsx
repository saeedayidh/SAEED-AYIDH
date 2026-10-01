import { ResourceBackButton } from '../components/ResourceBackButton';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Search, SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { imagePrompts, selectImagePrompts, promptPlatforms, promptCategories, type PromptPlatform } from '../data/imagePromptsData';
import { ImagePromptCarousel } from '../components/ImagePromptCarousel';
import { ImagePromptCard } from '../components/ImagePromptCard';
export function ImagePromptsPage() {
  const { isArabic } = useLanguage();
  const { hash } = useLocation();
  const [platform, setPlatform] = useState<PromptPlatform>('all');
  const [category, setCategory] = useState('all'), [query, setQuery] = useState(''), [sort, setSort] = useState('featured');
  const [language, setLanguage] = useState<'ar' | 'en'>(isArabic ? 'ar' : 'en');
  const items = useMemo(() => selectImagePrompts(category, query, sort, platform), [category, query, sort, platform]);
  useEffect(() => {
    const id = hash.replace('#image-prompt-', '');
    if (!imagePrompts.some(item => item.id === id)) return;
    setPlatform('all'); setCategory('all'); setQuery('');
    const timer = window.setTimeout(() => document.getElementById(`image-prompt-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    return () => window.clearTimeout(timer);
  }, [hash]);
  return <div className="min-h-screen bg-[#090909] pb-24 pt-28 text-white" dir={isArabic ? 'rtl' : 'ltr'}><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <ResourceBackButton/>
    <div className="mb-7 text-center"><p className="text-xs font-bold text-[#D51F2B]">{isArabic ? 'موارد سعيد' : 'Saeed Resources'}</p><h1 className="mt-3 text-3xl font-black sm:text-5xl">{isArabic ? 'برومبت صور' : 'Image Prompts'}</h1><p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400">{isArabic ? '50 برومبت لصور الأشخاص. اختر الأسلوب، ثم انسخ النص وأرفق صورة الشخص مع أداة الصور المناسبة.' : '50 people portrait prompts. Choose a style, copy the text and attach the person’s photo in your preferred image tool.'}</p></div>
    <ImagePromptCarousel items={items} isArabic={isArabic} onSelect={item => document.getElementById(`image-prompt-${item.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}/>
    <h2 className="mb-5 mt-9 text-center text-xl font-black">{isArabic ? 'مكتبة برومبت صور' : 'Image Prompt Library'}</h2>
    <div className="mb-7 flex gap-2 overflow-x-auto pb-3" aria-label={isArabic ? 'اختيار المنصة' : 'Choose platform'}>
      {promptPlatforms.map(item => <button type="button" key={item.id} aria-pressed={platform === item.id} onClick={() => setPlatform(item.id)} className={`shrink-0 rounded-2xl border px-5 py-3 text-sm font-bold transition ${platform === item.id ? 'border-[#D51F2B] bg-[#D51F2B] text-white' : 'border-white/10 bg-[#111] text-gray-400 hover:text-white'}`}>{isArabic ? item.ar : item.en}</button>)}
    </div>
    <p className="mb-5 text-xs leading-6 text-gray-500">{isArabic ? 'كل مجموعة لها صياغة مخصصة للمنصة المستهدفة. صور المعاينة مولّدة هنا، وليست نتائج اختبار على كل منصة.' : 'Each group is written for its target platform. Previews were generated here and are not test results from every platform.'}</p>
    {platform === 'claude' && <p className="mb-6 rounded-2xl border border-white/10 bg-[#111] p-4 text-xs leading-7 text-gray-400">{isArabic ? 'كلود يساعدك على إعداد وصياغة البرومبت. بعد ذلك استخدم النص مع أداة توليد صور؛ هذه البرومبتات لا تفترض أن كلود يولّد صورًا فوتوغرافية مباشرة.' : 'Claude helps prepare and refine the prompt. Use the result with an image-generation tool; these prompts do not assume native photo generation in Claude.'}</p>}
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
      <div className="flex flex-wrap gap-3">
        <label className="relative flex min-w-40 items-center gap-2 rounded-xl border border-[#D51F2B]/50 bg-[#111] px-4 py-3"><SlidersHorizontal className="h-4 w-4 text-[#D51F2B]"/><span className="sr-only">{isArabic ? 'التصنيف' : 'Category'}</span><select value={category} onChange={event => setCategory(event.target.value)} className="w-full appearance-none bg-transparent pe-5 text-sm font-bold outline-none">{promptCategories.map(item => <option key={item.id} value={item.id} className="bg-[#111]">{isArabic ? item.ar : item.en}</option>)}</select><ChevronDown className="pointer-events-none absolute end-3 h-4 w-4 text-gray-500"/></label>
        <label className="relative flex items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-4 py-3"><ArrowDownWideNarrow className="h-4 w-4 text-gray-500"/><span className="sr-only">{isArabic ? 'الترتيب' : 'Sort'}</span><select value={sort} onChange={event => setSort(event.target.value)} className="appearance-none bg-transparent pe-5 text-sm outline-none"><option value="featured" className="bg-[#111]">{isArabic ? 'المميزة أولًا' : 'Featured first'}</option><option value="name" className="bg-[#111]">{isArabic ? 'حسب الاسم' : 'By name'}</option></select><ChevronDown className="pointer-events-none absolute end-3 h-4 w-4 text-gray-500"/></label>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500"><span>{isArabic ? 'لغة البرومبت' : 'Prompt language'}</span>{(['ar', 'en'] as const).map(value => <button type="button" key={value} onClick={() => setLanguage(value)} aria-pressed={language === value} className={`rounded-lg border px-3 py-2 ${language === value ? 'border-[#D51F2B] text-white' : 'border-white/10'}`}>{value === 'ar' ? 'عربي' : 'English'}</button>)}</div>
    </div>
    <label className="my-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111] px-5 py-4 focus-within:border-[#D51F2B]/60"><Search className="h-5 w-5 text-gray-500"/><input value={query} onChange={event => setQuery(event.target.value)} placeholder={isArabic ? 'ابحث في برومبت صور...' : 'Search image prompts...'} className="w-full bg-transparent text-sm outline-none placeholder:text-gray-600"/></label>
    <p aria-live="polite" className="mb-5 text-xs text-gray-500">{items.length} {isArabic ? 'برومبت' : 'prompts'}</p>
    <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map(item => <ImagePromptCard key={`${item.id}-${platform}-${language}`} item={item} isArabic={isArabic} platform={platform} language={language}/>)}</div>
    {!items.length && <p className="py-16 text-center text-sm text-gray-500">{isArabic ? 'ما لقينا برومبتات مطابقة. جرّب تصنيفًا أو بحثًا آخر.' : 'No matching prompts. Try another category or search.'}</p>}
    <p className="mt-9 text-center text-[11px] leading-6 text-gray-600">{isArabic ? 'المعاينات لشخصيات خيالية. أرفق صورتك عند استخدام البرومبت؛ قد تختلف النتيجة حسب الأداة والإعدادات.' : 'Previews feature fictional people. Attach your photo when using a prompt; results vary by tool and settings.'}</p>
  </div></div>;
}
