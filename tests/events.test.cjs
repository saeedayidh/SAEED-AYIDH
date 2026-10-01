const {test}=require('node:test'), assert=require('node:assert/strict');
const {demoEvents,filterEvents,safeEventUrl,countdown}=require('../src/data/eventsData.ts');
const {eventCalendar}=require('../src/lib/eventCalendar.ts');
test('Saudi date filtering and ongoing events',()=>{
 const event={...demoEvents[0],start:'2026-10-02T00:30:00+03:00',end:'2026-10-02T01:30:00+03:00'};
 assert.equal(filterEvents([event],'today',Date.parse('2026-10-01T21:00:00Z')).length,1);
 assert.equal(filterEvents([event],'today',Date.parse('2026-10-01T20:00:00Z')).length,0);
 assert.equal(filterEvents([event],'all',Date.parse(event.end)).length,0);
 assert.equal(countdown(event,Date.parse(event.start),true),'الفعالية الآن');
 assert.equal(safeEventUrl('javascript:alert(1)'),'');
});
test('calendar UTC times, safe text, alarm and Arabic line folding',()=>{
 const calendar=eventCalendar({...demoEvents[0],title:'عنوان عربي طويل '.repeat(20),description:'First, next;\nInjected'},true);
 assert.ok(calendar.includes('DTSTART:20261003T170000Z'));
 assert.ok(calendar.includes('TRIGGER:-PT15M'));
 assert.ok(calendar.includes('DESCRIPTION:First\\, next\\;\\nInjected'));
 for(const line of calendar.split('\r\n')) assert.ok(Buffer.byteLength(line)<=75);
 assert.equal(demoEvents.length,1); assert.equal(demoEvents[0].demo,true);
});
