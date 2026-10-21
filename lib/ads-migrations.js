const alfa = require('./alfa-sponsorship.json');
// Apply once to existing CMS lists. Later edits, disabling or removal stay intact.
function migrateAds(data) {
  if (!data?.global || data.global.alfaSponsorshipAddedV1) return false;
  if (Array.isArray(data.global.saeedAds) && !data.global.saeedAds.some(ad => ad.id === alfa.id)) {
    data.global.saeedAds.push({...alfa, accounts: alfa.accounts.map(account => ({...account}))});
  }
  data.global.alfaSponsorshipAddedV1 = true;
  return true;
}
module.exports = {migrateAds};
