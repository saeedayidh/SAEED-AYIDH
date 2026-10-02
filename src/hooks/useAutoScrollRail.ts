import { useEffect, useRef } from 'react';

// Native touch scrolling stays available in both directions. Automatic movement
// yields to the user and only runs while the rail is visible.
export function useAutoScrollRail() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false, hovered = false, focused = false, dragged = false;
    let resumeAt = 0;
    let gesture: { id: number; x: number; y: number; scroll: number } | null = null;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(node);
    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragged = false;
      gesture = { id: e.pointerId, x: e.clientX, y: e.clientY, scroll: node.scrollLeft };
      resumeAt = Date.now() + 4600;
    };
    const move = (e: PointerEvent) => {
      if (!gesture || gesture.id !== e.pointerId) return;
      const dx = e.clientX - gesture.x;
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(e.clientY - gesture.y)) dragged = true;
      if (dragged && e.pointerType === 'mouse') {
        node.setPointerCapture(e.pointerId);
        node.scrollLeft = gesture.scroll - dx;
        e.preventDefault();
      }
    };
    const end = () => { if (!gesture) return; gesture = null; resumeAt = Date.now() + 4600; };
    const click = (e: MouseEvent) => { if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; } };
    const enter = (e: PointerEvent) => { if (e.pointerType === 'mouse') hovered = true; };
    const leave = () => { hovered = false; };
    const focus = () => { focused = true; };
    const blur = (e: FocusEvent) => { focused = node.contains(e.relatedTarget as Node | null); };
    const wheel = () => { resumeAt = Date.now() + 4600; };
    const preventImageDrag = (e: DragEvent) => e.preventDefault();
    node.addEventListener('pointerdown', down);
    node.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    node.addEventListener('click', click, true);
    node.addEventListener('pointerenter', enter);
    node.addEventListener('pointerleave', leave);
    node.addEventListener('focusin', focus);
    node.addEventListener('focusout', blur);
    node.addEventListener('wheel', wheel, { passive: true });
    node.addEventListener('dragstart', preventImageDrag);
    const timer = window.setInterval(() => {
      if (!visible || document.hidden || reduced.matches || hovered || focused || gesture || Date.now() < resumeAt) return;
      const max = node.scrollWidth - node.clientWidth;
      if (max <= 1) return;
      const track = node.firstElementChild as HTMLElement | null;
      const card = track?.firstElementChild as HTMLElement | null;
      if (!card || !track) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = card.getBoundingClientRect().width + gap;
      node.scrollTo({ left: node.scrollLeft >= max - 4 ? 0 : Math.min(max, node.scrollLeft + step), behavior: 'smooth' });
    }, 4600);
    return () => {
      observer.disconnect(); window.clearInterval(timer);
      node.removeEventListener('pointerdown', down); node.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end); window.removeEventListener('pointercancel', end);
      node.removeEventListener('click', click, true); node.removeEventListener('pointerenter', enter);
      node.removeEventListener('pointerleave', leave); node.removeEventListener('focusin', focus);
      node.removeEventListener('focusout', blur); node.removeEventListener('wheel', wheel);
      node.removeEventListener('dragstart', preventImageDrag);
    };
  }, []);
  return ref;
}
