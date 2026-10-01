import React, { useEffect, useMemo, useState } from 'react';
import { Download, Search, SlidersHorizontal } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { featuredFilters, downloadFilter, type FeaturedFilter } from '../data/featuredFiltersData';
import { FeaturedFilterCarousel } from '../components/FeaturedFilterCarousel';
import { FeaturedFilterPreview } from '../components/FeaturedFilterPreview';
import { FavoriteButton } from '../components/FavoriteButton';
import { ShareButton } from '../components/ShareButton';

export const FeaturedFiltersPage: React.FC = () => {
  const { isArabic } = useLanguage();
  const { hash } = useLocation();
  const [kind, setKind] = useState<'photo' | 'video'>('photo');
  const [query, setQuery] = useState('');
  const items = useMemo(() => featuredFilters.filter(item => item.kind === kind &&
    `${item.title} ${item.titleEn}`.toLowerCase().includes(query.trim().toLowerCase())), [kind, query]);
  useEffect(() => {
    const id = hash.replace(/^#/, '');
    if (!id.startsWith('featured-filter-')) return;
    const selected = featuredFilters.find(item => `featured-filter-${item.id}` === id);
    if (selected) setKind(selected.kind);
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 100);
  }, [hash]);
  const select = (item: FeaturedFilter) => document.getElementById(`featured-filter-${item.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  return <main className="min-h-screen bg-[#090909] pb-24 pt-28 text-white" dir={isArabic ? 'rtl' : 'ltr'}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="mb-2 text-xs font-bold text-[#D51F2B]">{isArabic ? 'موارد سعيد' : 'Saeed Resources'}</p>
        <h1 className="text-3xl font-black sm:text-5xl">{isArabic ? 'فلتر مميز' : 'Featured Filters'}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400">{isArabic ? '10 فلاتر صور و10 فلاتر مقاطع. حرّك الخط لمقارنة النتيجة، وحمّل ملف الفلتر لاستخدامه في محرر يدعم ملفات LUT.' : '10 photo looks and 10 video looks. Drag the line to compare, then download a LUT file for a compatible editor.'}</p>
      </div>
      <FeaturedFilterCarousel items={items} isArabic={isArabic} onSelect={select}/>
      <div className="mt-10 flex flex-col items-center gap-5 border-y border-white/10 py-7 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3 text-base font-bold text-gray-200"><SlidersHorizontal className="h-5 w-5 text-[#D51F2B]"/>{isArabic ? 'فلترة الفلاتر' : 'Filter looks'}</div>
        <div className="flex gap-2 rounded-2xl bg-[#121212] p-1.5">
          {(['photo', 'video'] as const).map(value => <button type="button" key={value} onClick={() => setKind(value)}
            aria-pressed={kind === value} className={`min-w-28 rounded-xl px-5 py-2.5 text-sm font-bold transition ${kind === value ? 'bg-[#D51F2B] text-white' : 'border border-white/10 text-gray-400 hover:text-white'}`}>
            {value === 'photo' ? (isArabic ? 'صورة' : 'Photo') : (isArabic ? 'فيديو' : 'Video')}
          </button>)}
        </div>
      </div>
      <label className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111] px-5 py-4 focus-within:border-[#D51F2B]/70">
        <Search className="h-5 w-5 text-gray-500"/><input value={query} onChange={event => setQuery(event.target.value)} placeholder={isArabic ? 'ابحث عن فلتر...' : 'Search filters...'} className="w-full bg-transparent text-sm outline-none placeholder:text-gray-600"/>
      </label>
      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(item => <article id={`featured-filter-${item.id}`} key={item.id} className="overflow-hidden rounded-[26px] border border-white/10 bg-[#121212]">
          <FeaturedFilterPreview item={item} isArabic={isArabic}/>
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div><p className="mb-1 text-[11px] font-bold text-[#D51F2B]">{item.kind === 'photo' ? (isArabic ? 'صورة' : 'Photo') : (isArabic ? 'فيديو' : 'Video')}</p><h2 className="text-lg font-black">{isArabic ? item.title : item.titleEn}</h2></div>
              <div className="flex gap-2"><FavoriteButton id={`featured-filter-${item.id}`} title={isArabic ? item.title : item.titleEn} url={`/resources/filters#featured-filter-${item.id}`} type={isArabic ? 'فلتر' : 'Filter'}/><ShareButton title={isArabic ? item.title : item.titleEn} url={`/resources/filters#featured-filter-${item.id}`}/></div>
            </div>
            <button type="button" onClick={() => downloadFilter(item)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D51F2B]/50 bg-[#D51F2B]/10 px-4 py-3 text-sm font-bold text-[#ED1C2E] transition hover:bg-[#D51F2B] hover:text-white"><Download className="h-4 w-4"/>{isArabic ? 'تحميل ملف الفلتر (.cube)' : 'Download filter (.cube)'}</button>
          </div>
        </article>)}
      </div>
      {items.length === 0 && <p className="py-16 text-center text-sm text-gray-400">{isArabic ? 'ما لقينا فلاتر مطابقة.' : 'No matching filters found.'}</p>}
      <p className="mt-9 text-center text-xs leading-6 text-gray-500">{isArabic ? 'ملف .cube مخصص للتطبيقات التي تدعم استيراد LUT. بعض تطبيقات التواصل لا تدعم رفعه مباشرة.' : 'The .cube file works in editors with LUT import. Some social apps do not accept it directly.'}</p>
    </div>
  </main>;
};
