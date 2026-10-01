import React, { useEffect, useRef, useState } from 'react';
import type { ImagePrompt } from '../data/imagePromptsData';
export function ImagePromptCarousel({ items, isArabic, onSelect }: { items: ImagePrompt[]; isArabic: boolean; onSelect: (item: ImagePrompt) => void }) {
  const [active, setActive] = useState(0);
  const start = useRef<number | null>(null);
  const dragged = useRef(false);
  useEffect(() => setActive(0), [items]);
  useEffect(() => {
    if (items.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => { if (start.current === null) setActive(value => (value + 1) % items.length); }, 4600);
    return () => window.clearInterval(timer);
  }, [items.length]);
  if (!items.length) return null;
  const offsets = items.length === 1 ? [0] : items.length === 2 ? [0, 1] : items.length === 3 ? [-1, 0, 1] : items.length === 4 ? [-1, 0, 1, 2] : [-2, -1, 0, 1, 2];
  return <div className="relative mx-auto h-[360px] w-full max-w-[760px] touch-pan-y select-none overflow-hidden sm:h-[455px]" dir="ltr"
    onPointerDown={event => { start.current = event.clientX; dragged.current = false; }}
    onPointerUp={event => { if (start.current === null) return; const delta = event.clientX - start.current; dragged.current = Math.abs(delta) > 25; if (delta < -35) setActive(value => (value + 1) % items.length); if (delta > 35) setActive(value => (value - 1 + items.length) % items.length); start.current = null; }}
    onPointerCancel={() => { start.current = null; }}>
    {offsets.map(offset => {
      const item = items[(active % items.length + offset + items.length) % items.length], distance = Math.abs(offset);
      return <button key={item.id} type="button" onClick={() => { if (dragged.current) { dragged.current = false; return; } if (offset) setActive(value => (value + offset + items.length) % items.length); else onSelect(item); }}
        aria-label={isArabic ? item.title : item.titleEn} className="absolute left-1/2 top-1/2 w-[225px] overflow-hidden rounded-[28px] border bg-[#111] shadow-2xl transition-[transform,opacity] duration-[1100ms] ease-out sm:w-[290px]"
        style={{ zIndex: 10 - distance, opacity: distance === 2 ? .25 : distance === 1 ? .65 : 1, borderColor: distance === 0 ? '#D51F2B88' : '#ffffff22', transform: `translate3d(calc(-50% + ${offset * 112}px),-50%,0) scale(${distance === 0 ? 1 : distance === 1 ? .78 : .61})` }}>
        <img src={item.image} alt="" draggable={false} loading={distance === 0 ? 'eager' : 'lazy'} className="aspect-[4/5] w-full object-cover"/>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent px-4 pb-5 pt-16 text-start" dir={isArabic ? 'rtl' : 'ltr'}>{item.featured && <span className="mb-2 inline-block rounded-full border border-[#D51F2B]/40 bg-black/60 px-2 py-1 text-[9px] font-bold text-[#ED1C2E]">{isArabic ? 'مختار لك' : 'Selected for you'}</span>}<h3 className="text-base font-black text-white">{isArabic ? item.title : item.titleEn}</h3></div>
      </button>;
    })}
  </div>;
}
