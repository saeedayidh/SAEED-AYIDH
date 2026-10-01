const {test}=require('node:test'),assert=require('node:assert/strict');
const {filterEventTime,demoEvents}=require('../src/data/eventsData.ts');
test('date, hour and minute combine using Saudi local time',()=>{
 const event={...demoEvents[0],start:'2026-10-02T21:05:00Z'};
 assert.equal(filterEventTime([event],'2026-10-03','00','05').length,1);
 assert.equal(filterEventTime([event],'2026-10-02','','').length,0);
 assert.equal(filterEventTime([event],'','21','').length,0);
 assert.equal(filterEventTime([event],'','','06').length,0);
 assert.equal(filterEventTime([event],'','','').length,1);
});
