const contest = require('../src/data/photoContest.json');
function seedEvent(data) {
 if (!data) return false;
 const global = data.global || {}, seeded = Array.isArray(global.seededEventIds) ? global.seededEventIds : [];
 if (seeded.includes(contest.id)) return false;
 const events = Array.isArray(global.saeedEvents) ? global.saeedEvents : [];
 global.saeedEvents = events.map(event => event.id === 'demo-live' ? {...event,enabled:false} : event);
 if (!events.some(event => event.id === contest.id)) global.saeedEvents.push({...contest});
 global.seededEventIds = [...seeded,contest.id]; data.global = global;
 return true;
}
module.exports = { seedEvent };
