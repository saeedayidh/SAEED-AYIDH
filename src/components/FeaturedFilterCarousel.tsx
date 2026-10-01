import React, { useEffect, useRef, useState } from 'react';
import type { FeaturedFilter } from '../data/featuredFiltersData';
import { FeaturedFilterPreview } from './FeaturedFilterPreview';

export function FeaturedFilterCarousel({ items, isArabic, onSelect }: { items: FeaturedFilter[]; isArabic: boolean; onSelect: (item: FeaturedFilter) => void }) {
  const [active, setActive] = useState(0);
  const start = useRef<number | null>(null);
  const dragged = useRef(false);
  useEffect(() => setActive(0), [items]);
  useEffect(() => {
    if (items.length < 2) return;
    const timer = window.setInterval(() => { if (start.current === null) setActive(v => (v + 1) % items.length); }, 4600);
    return () => window.clearInterval(timer);
  }, [items.length]);
  if (!items.length) return null;
  const offsets = items.length < 3 ? [0] : [-2, -1, 0, 1, 2];
  return <div className="relative mx-auto h-[265px] w-full max-w-[750px] touch-pan-y select-none overflow-hidden sm:h-[345px]" dir="ltr"
    onPointerDown={event => { start.current = event.clientX; dragged.current = false; }}
    onPointerUp={event => { if (start.current === null) return; const delta = event.clientX - start.current; dragged.current = Math.abs(delta) > 25; if (delta < -35) setActive(v => (v + 1) % items.length); if (delta > 35) setActive(v => (v - 1 + items.length) % items.length); start.current = null; }}
    onPointerCancel={() => { start.current = null; }}>
    {offsets.map(offset => {
      const item = items[(active + offset + items.length) % items.length];
      const distance = Math.abs(offset);
      return <div key={item.id} className="absolute left-1/2 top-1/2 w-[245px] overflow-hidden rounded-[26px] border bg-[#101010] shadow-2xl transition-[transform,opacity] duration-[1100ms] ease-out sm:w-[340px]"
        style={{ zIndex: 10 - distance, opacity: distance === 2 ? .25 : distance === 1 ? .65 : 1,
          borderColor: offset === 0 ? '#D51F2B88' : '#ffffff22', transform: `translate3d(calc(-50% + ${offset * 115}px),-50%,0) scale(${distance === 0 ? 1 : distance === 1 ? .78 : .61})` }}>
        {distance === 0 ? <FeaturedFilterPreview item={item} isArabic={isArabic} compact/> : <img src={item.kind === 'photo' ? item.preview : '/assets/filter-preview.jpg'} alt="" draggable={false} className="aspect-[4/3] w-full object-cover" style={{ filter: `brightness(${item.brightness}) contrast(${item.contrast}) saturate(${item.saturation})` }}/>} 
        <button type="button" onClick={() => { if (dragged.current) { dragged.current = false; return; } if (offset) setActive(v => (v + offset + items.length) % items.length); else onSelect(item); }}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-start text-sm font-bold text-white hover:text-[#ED1C2E]">
          <span>{isArabic ? item.title : item.titleEn}</span><span className="text-xs text-[#ED1C2E]">{isArabic ? 'عرض' : 'View'}</span>
        </button>
      </div>;
    })}
  </div>;
}
