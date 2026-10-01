import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { selectImagePrompts } from '../data/imagePromptsData';
import { ImagePromptCarousel } from './ImagePromptCarousel';
export function ImagePromptsResource() {
  const { isArabic } = useLanguage(), navigate = useNavigate();
  const [query, setQuery] = useState('');
  const items = useMemo(() => selectImagePrompts('all', query, 'featured'), [query]);
  return <div className="mt-14 border-t border-white/5 pt-12">
    <Link to="/resources/image-prompts" className="mb-3 flex w-full items-center justify-center rounded-2xl border border-[#D51F2B]/55 bg-[#D51F2B]/[0.06] px-5 py-4 text-base font-black text-[#ED1C2E] transition hover:bg-[#D51F2B] hover:text-white sm:text-lg">{isArabic ? 'برومبت صور' : 'Image Prompts'}</Link>
    <div className="mb-7 flex w-full items-stretch gap-2 sm:gap-3"><label className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-[#111] px-3 py-3.5 focus-within:border-[#D51F2B]/60 sm:px-4"><Search className="h-4 w-4 shrink-0 text-gray-500"/><input value={query} onChange={event => setQuery(event.target.value)} placeholder={isArabic ? 'ابحث عن برومبت صور...' : 'Search image prompts...'} className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"/></label><Link to="/resources/image-prompts" className="inline-flex shrink-0 items-center justify-center gap-1 rounded-2xl border border-[#D51F2B]/45 px-3 py-3.5 text-xs font-bold text-[#ED1C2E] transition hover:bg-[#D51F2B] hover:text-white sm:px-6 sm:text-sm">{isArabic ? 'استكشف الكل' : 'Explore All'}<ChevronLeft className="h-4 w-4"/></Link></div>
    <ImagePromptCarousel items={items} isArabic={isArabic} onSelect={item => navigate(`/resources/image-prompts#image-prompt-${item.id}`)}/>
    {!items.length && <p className="py-12 text-center text-sm text-gray-500">{isArabic ? 'ما لقينا برومبتات مطابقة.' : 'No matching prompts.'}</p>}
  </div>;
}
