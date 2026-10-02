import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';
import { filterEvents, normalizeEvents } from '../data/eventsData';
import { EventCard } from './EventCard';
export function useEventClock() { const [now, setNow] = useState(Date.now()); useEffect(() => { const timer = window.setInterval(() => setNow(Date.now()), 30000); return () => window.clearInterval(timer); }, []); return now; }
export function EventsSection() {
  const { data } = useCMS(), { isArabic } = useLanguage(), now = useEventClock();
  const events = filterEvents(normalizeEvents((data.global as any).saeedEvents), 'all', now).slice(0,3);
  return <section id="events-section" className="border-t border-white/5 bg-[#090909] py-20" dir={isArabic ? 'rtl' : 'ltr'}><div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8"><header className="mb-7 text-center"><p className="text-xs font-bold text-[#D51F2B]">{isArabic ? 'الأحداث القادمة' : 'Upcoming events'}</p><h2 className="mt-3 text-3xl font-black sm:text-5xl">{isArabic ? 'سعيد ايفنتس' : 'Saeed Events'}</h2><p className="mt-4 text-sm leading-7 text-gray-400">{isArabic ? 'لقاءات وفعاليات قادمة، اكتشف تفاصيلها واستعد لموعدها.' : 'Upcoming meetups and events. Explore the details and save the date.'}</p></header><div className="grid grid-cols-2 gap-3 sm:gap-4">{events.map(event => <div key={event.id} className={events.indexOf(event) === 0 ? 'col-span-2 mx-auto w-full max-w-[340px]' : 'min-w-0'}><EventCard event={event} isArabic={isArabic} now={now}/></div>)}</div>{!events.length && <p className="py-12 text-center text-sm text-gray-500">{isArabic ? 'لا توجد فعاليات قادمة حاليًا.' : 'No upcoming events.'}</p>}<div className="mt-7 text-center"><Link to="/events" className="inline-flex shrink-0 items-center justify-center gap-1 rounded-2xl border border-[#D51F2B]/45 px-3 py-3.5 text-xs font-bold text-[#ED1C2E] transition hover:bg-[#D51F2B] hover:text-white sm:gap-2 sm:px-6 sm:text-sm"><span>{isArabic ? 'استكشف الكل' : 'Explore all'}</span>{isArabic ? <ChevronLeft className="h-4 w-4"/> : <ChevronRight className="h-4 w-4"/>}</Link></div></div></section>;
}
