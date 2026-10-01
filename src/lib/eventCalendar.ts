import type { SaeedEvent } from '../data/eventsData';
const escapeText = (text: string) => text.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
const stamp = (date: string) => new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
export function eventCalendar(event: SaeedEvent, ar: boolean, reminder = true) {
  const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Saeed Bin Ayidh//Events//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${event.id}@saeedbinayidh.com`,`DTSTAMP:${stamp(new Date().toISOString())}`,`DTSTART:${stamp(event.start)}`,`DTEND:${stamp(event.end)}`,`SUMMARY:${escapeText(ar ? event.title : event.titleEn || event.title)}`,`DESCRIPTION:${escapeText(ar ? event.description : event.descriptionEn || event.description)}`,`LOCATION:${escapeText(ar ? event.location : event.locationEn || event.location)}`];
  if (reminder) lines.push('BEGIN:VALARM','ACTION:DISPLAY','TRIGGER:-PT15M',`DESCRIPTION:${escapeText(ar ? 'تذكير بالفعالية' : 'Event reminder')}`,'END:VALARM');
  lines.push('END:VEVENT','END:VCALENDAR');
  // Fold by UTF-8 octet length for Arabic calendar clients (RFC 5545).
  return lines.map(line => { let result = '', segment = '', size = 0; for (const char of line) { const n = new TextEncoder().encode(char).length; if (size + n > 73) { result += segment + '\r\n '; segment = ''; size = 1; } segment += char; size += n; } return result + segment; }).join('\r\n') + '\r\n';
}
export function downloadEventCalendar(event: SaeedEvent, ar: boolean) {
  const url = URL.createObjectURL(new Blob([eventCalendar(event, ar)], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = `${event.id}.ics`; document.body.appendChild(a); a.click(); a.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
