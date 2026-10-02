const {test}=require('node:test'),assert=require('node:assert/strict');
const event=require('../src/data/photoContest.json'),{seedEvent}=require('../lib/events-catalog');
test('approved Saudi registration and event dates and links',()=>{
 assert.equal(event.registrationStart,'2026-10-02T20:00:00+03:00');
 assert.equal(new Date(event.registrationEnd).getUTCDay(),0);
 assert.equal(new Date(event.start).getUTCDay(),1);
 assert.equal(new Date(event.end).getUTCDay(),3);
 for(const field of ['registrationStart','registrationEnd','start','end'])assert.equal(new Date(event[field]).getUTCHours(),17);
 assert.equal(event.eventUrl,'https://snapchat.com/t/305CIs4M');
 assert.equal(event.registrationUrl,'https://wa.me/message/PGU4PTVFQRVXH1');
 assert.equal(event.platform,'snapchat'); assert.equal(event.demo,false);
});
test('CMS event migration preserves customer data and later edits/deletion',()=>{
 const cms={submissions:[{id:'private'}],global:{saeedEvents:[{id:'demo-live',enabled:true},{id:'existing',title:'Existing'}],unrelated:'keep'}};
 assert.equal(seedEvent(cms),true);assert.equal(cms.global.saeedEvents.length,3);assert.equal(cms.global.saeedEvents[0].enabled,false);assert.equal(cms.submissions[0].id,'private');assert.equal(cms.global.unrelated,'keep');
 cms.global.saeedEvents.find(x=>x.id===event.id).title='Edited';assert.equal(seedEvent(cms),false);assert.equal(cms.global.saeedEvents[2].title,'Edited');
 cms.global.saeedEvents=cms.global.saeedEvents.filter(x=>x.id!==event.id);assert.equal(seedEvent(cms),false);assert.equal(cms.global.saeedEvents.length,2);
 assert.equal(seedEvent(null),false);
});
