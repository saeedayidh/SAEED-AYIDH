// Avoid scrollIntoView moving the viewport sideways in RTL layouts.
export function scrollPageTo(top: number) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo({ top: Math.max(0, top), left: 0, behavior: 'auto' });
  root.style.scrollBehavior = previous;
}

export function scrollPageToHash(hash: string) {
  let id: string;
  try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (target) scrollPageTo(target.getBoundingClientRect().top + window.scrollY - 100);
}

export function initializePageScroll() {
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  // Never let a marker from a previous visit override a fresh entry to the site.
  try { window.sessionStorage.removeItem('sba_return_card'); } catch { /* Storage may be disabled. */ }
}
