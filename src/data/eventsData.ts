export type SaeedEvent = {
  id: string; title: string; titleEn: string; description: string; descriptionEn: string;
  image: string; start: string; end: string; platform: string; location: string; locationEn: string;
  registration: 'open' | 'closed'; registrationEnd?: string; about: string; aboutEn: string; instructions: string; instructionsEn: string;
  prizes: string; prizesEn: string; important: string; importantEn: string; registrationUrl: string; eventUrl: string;
  demo?: boolean; enabled?: boolean;
};
export const demoEvents: SaeedEvent[] = [{
  id: 'demo-live', title: 'لقاء مباشر — فعالية تجريبية', titleEn: 'Live Meetup — Demo Event',
  description: 'فعالية تجريبية لمعاينة البطاقات والتفاصيل والتذكير. ليست إعلانًا عن فعالية حقيقية.', descriptionEn: 'A test event to preview cards, details and reminders. This is not a real event announcement.',
  image: '/assets/events/demo-live.webp', start: '2026-10-03T20:00:00+03:00', end: '2026-10-03T21:00:00+03:00', platform: 'youtube',
  location: 'يوتيوب — موقع افتراضي للتجربة', locationEn: 'YouTube — demo location', registration: 'closed',
  about: 'هذه الفعالية مخصصة لاختبار تجربة سعيد ايفنتس فقط. سنستبدلها لاحقًا بفعالية حقيقية مع البيانات والروابط المعتمدة.', aboutEn: 'This event tests the Saeed Events experience. It will later be replaced with a real event and approved details and links.',
  instructions: 'التسجيل غير متاح لهذه التجربة. عند إعلان فعالية حقيقية ستظهر خطوات التسجيل ورابطه هنا.', instructionsEn: 'Registration is unavailable for this demo. A real event will include registration instructions and a link here.',
  prizes: 'لا توجد جوائز لهذه الفعالية التجريبية.', prizesEn: 'There are no prizes for this demo event.',
  important: 'الموعد والمدة والمنصة بيانات تجريبية. جميع الأوقات بتوقيت السعودية. لا توجد صفحة تسجيل أو بث حقيقي لهذه التجربة.', importantEn: 'Date, duration and platform are test data. All times use Saudi time. No real registration page or stream exists for this demo.',
  registrationUrl: '', eventUrl: '', demo: true, enabled: true,
}];
export function normalizeEvents(value: unknown): SaeedEvent[] {
  const source = Array.isArray(value) ? value : demoEvents;
  const seen = new Set<string>();
  return source.filter((item): item is SaeedEvent => !!item && typeof item === 'object' && /^[A-Za-z0-9_-]{1,80}$/.test(item.id) && !seen.has(item.id) && (seen.add(item.id), true) && item.enabled !== false && typeof item.title === 'string' && Number.isFinite(Date.parse(item.start)) && Date.parse(item.end) > Date.parse(item.start)).sort((a,b) => Date.parse(a.start) - Date.parse(b.start));
}
export type EventPeriod = 'all' | 'today' | 'week' | 'month';
export function filterEvents(items: SaeedEvent[], period: EventPeriod, now: number) {
  const saudi = new Date(now + 3 * 3600000), midnight = Date.UTC(saudi.getUTCFullYear(), saudi.getUTCMonth(), saudi.getUTCDate()) - 3 * 3600000;
  const todayEnd = midnight + 86400000, weekStart = midnight - saudi.getUTCDay() * 86400000;
  const limit = period === 'today' ? todayEnd : period === 'week' ? weekStart + 7 * 86400000 : period === 'month' ? Date.UTC(saudi.getUTCFullYear(), saudi.getUTCMonth() + 1, 1) - 3 * 3600000 : Infinity;
  return items.filter(item => Date.parse(item.end) > now && Date.parse(item.start) < limit);
}
export function countdown(event: SaeedEvent, now: number, ar: boolean) {
  const ms = Date.parse(event.start) - now;
  if (Date.parse(event.end) <= now) return ar ? 'انتهت الفعالية' : 'Event ended';
  if (ms <= 0) return ar ? 'الفعالية الآن' : 'Live now';
  const minutes = Math.ceil(ms / 60000), hours = Math.ceil(ms / 3600000), days = Math.ceil(ms / 86400000);
  return ar ? new Intl.RelativeTimeFormat('ar', { numeric: 'always' }).format(days > 1 ? days : hours > 1 ? hours : minutes, days > 1 ? 'day' : hours > 1 ? 'hour' : 'minute') : days > 1 ? `In ${days} days` : hours > 1 ? `In ${hours} hours` : `In ${minutes} min`;
}
export function eventDate(event: SaeedEvent, ar: boolean) { return new Intl.DateTimeFormat(ar ? 'ar-SA-u-ca-gregory' : 'en-GB', { timeZone: 'Asia/Riyadh', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(event.start)); }
export function safeEventUrl(value: string) { try { const url = new URL(value); return ['https:','http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } }

export function filterEventTime(items: SaeedEvent[], date: string, hour: string, minute: string) {
 return items.filter(event => { const d = new Date(Date.parse(event.start) + 3 * 3600000); return (!date || d.toISOString().slice(0,10) === date) && (!hour || String(d.getUTCHours()).padStart(2,'0') === hour) && (!minute || String(d.getUTCMinutes()).padStart(2,'0') === minute); });
}
