import { useEffect, useRef } from 'react';

export function useVisibleAutoplay(advance: () => void, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useRef(advance);
  useEffect(() => { callback.current = advance; }, [advance]);
  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;
    let visible = false, pointer = false, hovered = false, focused = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(node);
    const down = () => { pointer = true; };
    const up = () => { pointer = false; };
    const enter = (e: PointerEvent) => { if (e.pointerType === 'mouse') hovered = true; };
    const leave = () => { hovered = false; };
    const focus = () => { focused = true; };
    const blur = (e: FocusEvent) => { focused = node.contains(e.relatedTarget as Node | null); };
    node.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    node.addEventListener('pointerenter', enter); node.addEventListener('pointerleave', leave);
    node.addEventListener('focusin', focus); node.addEventListener('focusout', blur);
    const timer = window.setInterval(() => {
      if (visible && !document.hidden && !reduced.matches && !pointer && !hovered && !focused) callback.current();
    }, 4600);
    return () => {
      observer.disconnect(); window.clearInterval(timer);
      node.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      node.removeEventListener('pointerenter', enter); node.removeEventListener('pointerleave', leave);
      node.removeEventListener('focusin', focus); node.removeEventListener('focusout', blur);
    };
  }, [enabled]);
  return ref;
}
