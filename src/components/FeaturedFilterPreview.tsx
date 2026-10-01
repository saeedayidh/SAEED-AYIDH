import React, { useEffect, useRef, useState } from 'react';
import type { FeaturedFilter } from '../data/featuredFiltersData';
import { filterCss } from '../data/featuredFiltersData';

export function FeaturedFilterPreview({ item, isArabic, compact = false }: { item: FeaturedFilter; isArabic: boolean; compact?: boolean }) {
  const [position, setPosition] = useState(50);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const original = useRef<HTMLVideoElement>(null);
  const edited = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (item.kind !== 'video' || !root.current) return;
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { threshold: .2 });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [item.kind]);
  useEffect(() => {
    if (item.kind !== 'video') return;
    const a = original.current, b = edited.current;
    if (!a || !b) return;
    if (visible) { void a.play().catch(() => {}); void b.play().catch(() => {}); }
    else { a.pause(); b.pause(); }
  }, [visible, item.kind]);
  const update = (clientX: number) => {
    if (!root.current) return;
    const box = root.current.getBoundingClientRect();
    setPosition(Math.max(0, Math.min(100, (clientX - box.left) / box.width * 100)));
  };
  const media = (after: boolean) => item.kind === 'photo'
    ? <img src={item.preview} alt="" loading="lazy" draggable={false} className="h-full w-full object-cover" style={after ? { filter: filterCss(item) } : undefined}/>
    : <video ref={after ? edited : original} src={item.preview} poster="/assets/filter-preview.jpg" muted loop playsInline preload="metadata" aria-hidden="true" className="h-full w-full object-cover" style={after ? { filter: filterCss(item) } : undefined}
        onTimeUpdate={!after ? () => { if (edited.current && original.current && Math.abs(edited.current.currentTime - original.current.currentTime) > .15) edited.current.currentTime = original.current.currentTime; } : undefined}/>;
  return <div ref={root} className={`relative isolate w-full overflow-hidden bg-[#1b1b1b] ${compact ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}
    onPointerDown={event => { event.stopPropagation(); event.currentTarget.setPointerCapture(event.pointerId); update(event.clientX); }}
    onPointerMove={event => { if (event.buttons) update(event.clientX); }}
    onPointerUp={event => event.stopPropagation()}>
    <div className="absolute inset-0">{media(false)}</div>
    <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>{media(true)}</div>
    <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_14px_#000]" style={{ left: `${position}%` }}>
      <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/80 bg-[#181818]/90 text-xs text-white shadow-lg">◀▶</span>
    </div>
    <span className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-black/70 px-2.5 py-1 text-xs text-white">{isArabic ? 'قبل' : 'Before'}</span>
    <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/70 px-2.5 py-1 text-xs text-white">{isArabic ? 'بعد' : 'After'}</span>
    <input type="range" min="0" max="100" value={position} onChange={event => setPosition(Number(event.target.value))}
      aria-label={isArabic ? `قارن قبل وبعد ${item.title}` : `Compare before and after ${item.titleEn}`}
      className="absolute bottom-0 left-1/2 h-1 w-28 -translate-x-1/2 opacity-0 focus:opacity-100"/>
  </div>;
}
