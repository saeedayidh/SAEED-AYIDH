const contest = require('../src/data/photoContest.json');
function seedEvent(data) {
 if (!data) return false;
 const global = data.global || {}, seeded = Array.isArray(global.seededEventIds) ? global.seededEventIds : [];
 let changed = false;
 if (!seeded.includes(contest.id)) {
 const events = Array.isArray(global.saeedEvents) ? global.saeedEvents : [];
 global.saeedEvents = events.map(event => event.id === 'demo-live' ? {...event,enabled:false} : event);
 if (!events.some(event => event.id === contest.id)) global.saeedEvents.push({...contest});
 global.seededEventIds = [...seeded,contest.id]; changed = true;
 }
 if (global.photoContestInstructionsVersion !== 1) {
  const event = (global.saeedEvents || []).find(event => event.id === contest.id);
  const previous = {"instructions": "افتح رابط التسجيل على الواتساب خلال فترة التسجيل.\nأرسل أفضل صورة صورتها للمشاركة في فعالية صور تفوز.\nتابع عرض الصور والتصويت على سناب شات خلال موعد الفعالية.", "instructionsEn": "Open the WhatsApp registration link during the registration period.\nSend your best photograph to enter Capture to Win.\nFollow the photos and voting on Snapchat during the event."};
  if (event) for (const key of ['instructions','instructionsEn']) if (event[key] === previous[key]) event[key] = contest[key];
  global.photoContestInstructionsVersion = 1; changed = true;
 }
 data.global = global; return changed;
}
module.exports = { seedEvent };
