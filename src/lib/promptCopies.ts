import { useEffect, useSyncExternalStore } from 'react';
let counts: Record<string, number> = {}, ready: Promise<void> | undefined;
const listeners = new Set<() => void>();
function emit() { for (const callback of listeners) callback(); }
function load() {
  if (!ready) ready = fetch('/api/image-prompts/copies', { credentials: 'same-origin' }).then(async response => {
    if (!response.ok) throw Error('copy counts');
    counts = (await response.json()).counts; emit();
  }).catch(() => { ready = undefined; });
  return ready;
}
export function usePromptCopies(id: string) {
  useEffect(() => { void load(); }, []);
  return useSyncExternalStore(callback => { listeners.add(callback); return () => { listeners.delete(callback); }; }, () => counts[id], () => undefined);
}
export async function recordPromptCopy(id: string) {
  await load();
  const response = await fetch(`/api/image-prompts/copy/${encodeURIComponent(id)}`, { method: 'POST', credentials: 'same-origin' });
  if (!response.ok) throw Error('copy count unavailable');
  const result = await response.json();
  counts = { ...counts, [id]: Math.max(counts[id] || 0, result.count) }; emit();
}
