import React, { useEffect, useMemo, useState } from 'react';
import { Download, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { FavoriteButton } from '../components/FavoriteButton';
import { ShareButton } from '../components/ShareButton';
import { WatchFaceCarousel } from '../components/WatchFaceCarousel';
import { useLanguage } from '../context/LanguageContext';
import { watchFaces, type WatchFaceItem } from '../data/watchFacesData';

const PER_PAGE = 10;
export const WatchFacesPage: React.FC = () => {
  const { isArabic } = useLanguage();
  const { hash } = useLocation();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<WatchFaceItem | null>(null);
  const filtered = useMemo(() => watchFaces.filter(face => !query.trim() ||
    face.title.includes(query.trim()) || String(face.id).includes(query.trim())), [query]);
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  useEffect(() => setPage(1), [query]);
  useEffect(() => {
    const id = Number(hash.match(/^#watch-face-(\d+)$/)?.[1]);
    if (!id || id > watchFaces.length) return;
    setPage(Math.ceil(id / PER_PAGE));
    setSelected(watchFaces[id - 1]);
  }, [hash]);
  const faceTitle = (face: WatchFaceItem) => isArabic ? face.title : `Watch Face ${face.id}`;
  const pageButtons = Array.from({ length: pages }, (_, i) => i + 1);
  return <div className="min-h-screen bg-[#080808] pb-24 pt-28 text-white" dir={isArabic ? 'rtl' : 'ltr'}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="mb-2 text-xs font-bold text-[#D51F2B]">{isArabic ? 'موارد سعيد' : 'Saeed Resources'}</p>
        <h1 className="text-4xl font-black sm:text-6xl">{isArabic ? 'واجهة الساعة' : 'Watch Face'}</h1>
        <p className="mt-3 text-base text-gray-400">{isArabic ? '50 واجهة ساعة جاهزة للاستعراض والتحميل.' : 'Explore and download 50 watch faces.'}</p>
      </div>
      <div className="mb-14">
        <WatchFaceCarousel faces={watchFaces} isArabic={isArabic} onSelect={setSelected}/>
      </div>
      <label className="mb-9 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#101010] px-5 py-4 focus-within:border-[#D51F2B]/60">
        <Search className="h-5 w-5 text-gray-500"/>
        <input value={query} onChange={event => setQuery(event.target.value)}
          placeholder={isArabic ? 'ابحث عن واجهة ساعة...' : 'Search watch faces...'}
          className="w-full bg-transparent text-base text-white outline-none placeholder:text-gray-500"/>
      </label>
      {visible.length ? <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {visible.map(face => <div key={face.id} id={`watch-face-${face.id}`}>
          <div className="group relative aspect-square overflow-hidden rounded-[28%] border border-white/10 bg-[#111]">
            <button type="button" onClick={() => setSelected(face)} aria-label={faceTitle(face)} className="absolute inset-0 h-full w-full">
              <img src={face.image} alt={faceTitle(face)} loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"/>
            </button>
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-black/80 p-1.5 backdrop-blur-md">
              <a href={face.image} download={`saeed-watch-face-${face.id}.svg`}
                aria-label={isArabic ? 'تحميل' : 'Download'}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-black/70"><Download className="h-4 w-4"/></a>
              <ShareButton title={faceTitle(face)} url={`/resources/watch-faces#watch-face-${face.id}`}/>
              <FavoriteButton id={`watch-face-${face.id}`} title={faceTitle(face)}
                url={`/resources/watch-faces#watch-face-${face.id}`} type="watch-face"/>
            </div>
          </div>
          <p className="mt-2 px-1 text-sm font-bold">{faceTitle(face)}</p>
        </div>)}
      </div> : <p className="py-16 text-center text-gray-400">{isArabic ? 'ما لقينا واجهات مطابقة.' : 'No matching watch faces.'}</p>}
      {pages > 1 && <nav aria-label={isArabic ? 'صفحات واجهة الساعة' : 'Watch face pages'}
        className="mt-12 flex flex-wrap items-center justify-center gap-2" dir="ltr">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} aria-label={isArabic ? 'السابق' : 'Previous'}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#111] disabled:opacity-30"><ChevronLeft className="h-4 w-4"/></button>
        {pageButtons.map(number => <button key={number} onClick={() => setPage(number)}
          aria-current={page === number ? 'page' : undefined}
          className={`h-10 min-w-10 rounded-xl border px-3 text-sm font-black ${page === number ? 'border-[#D51F2B] bg-[#D51F2B]' : 'border-white/10 bg-[#111] text-gray-400'}`}>{number}</button>)}
        <button disabled={page === pages} onClick={() => setPage(p => p + 1)} aria-label={isArabic ? 'التالي' : 'Next'}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#111] disabled:opacity-30"><ChevronRight className="h-4 w-4"/></button>
      </nav>}
    </div>
    {selected && <div role="dialog" aria-modal="true" aria-label={faceTitle(selected)}
      className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={() => setSelected(null)}>
      <button type="button" aria-label={isArabic ? 'إغلاق' : 'Close'} onClick={() => setSelected(null)}
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/60"><X className="h-5 w-5"/></button>
      <div className="flex flex-col items-center gap-5" onClick={event => event.stopPropagation()}>
        <img src={selected.image} alt={faceTitle(selected)} className="max-h-[70vh] max-w-[82vw] rounded-[26%] shadow-2xl"/>
        <a href={selected.image} download={`saeed-watch-face-${selected.id}.svg`}
          className="inline-flex items-center gap-2 rounded-xl bg-[#D51F2B] px-6 py-3 text-sm font-bold">
          <Download size={17}/>{isArabic ? 'تحميل الواجهة' : 'Download face'}
        </a>
      </div>
    </div>}
  </div>;
};
