import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';
import { filterEvents, normalizeEvents } from '../data/eventsData';
import { EventCard } from './EventCard';
export function useEventClock() { const [now, setNow] = useState(Date.now()); useEffect(() => { const timer = window.setInterval(() => setNow(Date.now()), 30000); return () => window.clearInterval(timer); }, []); return now; }
export function EventsSection() {
  const { data } = useCMS(), { isArabic } = useLanguage(), now = useEventClock();
  const events = filterEvents(normalizeEvents((data.global as any).saeedEvents), 'all', now).slice(0,3);
  return <section id="events-section" className="border-t border-white/5 bg-[#090909] py-20" dir={isArabic ? 'rtl' : 'ltr'}><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><header className="mb-10 text-center"><p className="text-xs font-bold text-[#D51F2B]">{isArabic ? 'الأحداث القادمة' : 'Upcoming events'}</p><h2 className="mt-3 text-3xl font-black sm:text-5xl">{isArabic ? 'سعيد ايفنتس' : 'Saeed Events'}</h2><Link to="/events" className="mt-5 inline-block rounded-xl border border-[#D51F2B]/40 px-5 py-3 text-xs font-bold text-[#ED1C2E]">{isArabic ? 'استكشف الكل' : 'Explore all'}</Link></header><div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">{events.map(event => <EventCard key={event.id} event={event} isArabic={isArabic} now={now}/>)}</div>{!events.length && <p className="py-12 text-center text-sm text-gray-500">{isArabic ? 'لا توجد فعاليات قادمة حاليًا.' : 'No upcoming events.'}</p>}</div></section>;
}
