import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { WatchFaceItem } from '../data/watchFacesData';

type Props = {
  faces: WatchFaceItem[];
  isArabic: boolean;
  onSelect: (face: WatchFaceItem) => void;
  initialId?: number;
};

export function WatchFaceCarousel({ faces, isArabic, onSelect, initialId }: Props) {
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);
  const dragged = useRef(false);
  useEffect(() => {
    setActive(Math.max(0, faces.findIndex(face => face.id === initialId)));
  }, [faces, initialId]);
  const move = (step: number) => setActive(index => (index + step + faces.length) % faces.length);
  const endDrag = (x: number) => {
    if (startX.current === null) return;
    const delta = x - startX.current;
    dragged.current = Math.abs(delta) > 25;
    if (delta < -35) move(1);
    if (delta > 35) move(-1);
    startX.current = null;
  };
  if (!faces.length) return null;
  const offsets = faces.length === 1 ? [0] : faces.length === 2 ? [0, 1] :
    faces.length === 3 ? [-1, 0, 1] : faces.length === 4 ? [-1, 0, 1, 2] : [-2, -1, 0, 1, 2];
  return <div className="mx-auto w-full max-w-[700px]" dir="ltr">
    <div className="relative h-[240px] w-full touch-pan-y select-none overflow-hidden sm:h-[330px]"
      onPointerDown={event => { startX.current = event.clientX; dragged.current = false; }}
      onPointerUp={event => endDrag(event.clientX)}
      onPointerCancel={() => { startX.current = null; }}>
      {offsets.map(offset => {
        const index = (active + offset + faces.length) % faces.length;
        const face = faces[index];
        const distance = Math.abs(offset);
        return <button key={face.id} type="button" onClick={() => {
          if (dragged.current) { dragged.current = false; return; }
          if (offset) move(offset);
          else onSelect(face);
        }} aria-label={`${isArabic ? 'واجهة ساعة' : 'Watch face'} ${face.id}`}
          className="absolute left-1/2 top-1/2 w-[180px] transition-[transform,opacity] duration-[1050ms] ease-out sm:w-[245px]"
          style={{ zIndex: 10 - distance, opacity: distance === 2 ? .3 : distance === 1 ? .72 : 1,
            transform: `translate3d(calc(-50% + ${offset * 87}px),-50%,0) scale(${distance === 0 ? 1 : distance === 1 ? .78 : .61})` }}>
          <img src={face.image} alt={face.title} draggable={false}
            className={`aspect-square w-full rounded-[27%] shadow-2xl ring-1 ${distance === 0 ? 'ring-[#D51F2B]/65' : 'ring-white/10'}`}/>
        </button>;
      })}
    </div>
    <div className="mt-2 flex items-center justify-center gap-4">
      <button type="button" onClick={() => move(-1)} disabled={faces.length === 1} aria-label={isArabic ? 'الواجهة السابقة' : 'Previous watch face'}
        className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-[#151515] text-white hover:border-[#D51F2B] disabled:opacity-30"><ChevronLeft size={18}/></button>
      <span className="min-w-14 text-center text-sm text-gray-400">{active + 1} / {faces.length}</span>
      <button type="button" onClick={() => move(1)} disabled={faces.length === 1} aria-label={isArabic ? 'الواجهة التالية' : 'Next watch face'}
        className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-[#151515] text-white hover:border-[#D51F2B] disabled:opacity-30"><ChevronRight size={18}/></button>
    </div>
  </div>;
}
