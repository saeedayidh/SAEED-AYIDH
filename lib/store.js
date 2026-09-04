// JSON-file data store used by the Node backend.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_FALLBACK = path.join(__dirname, '..', 'data', 'data.json');
function pickDataFile() {
  if (process.env.DATA_FILE) return process.env.DATA_FILE;
  for (const file of ['/var/data/saeed-data.json', '/data/saeed-data.json']) {
    try { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.accessSync(path.dirname(file), fs.constants.W_OK); return file; } catch {}
  }
  return PROJECT_FALLBACK;
}
const DATA_FILE = pickDataFile();
const COLLECTIONS = ['domains','buttons','cards','wallpapers','watchfaces','prompts','audioWorks','storiesWorks','vlogsWorks','extraWorks','stats','social','pages','faq','news','blog','gallery','services','imageBanners','promoBanners','navSections','complaintCategories','footerPages','messages'];

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { salt, hash };
}
function verifyPassword(password, salt, hash) {
  if (!password || !salt || !hash) return false;
  const check = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
  const expected = Buffer.from(hash, 'hex');
  return check.length === expected.length && crypto.timingSafeEqual(check, expected);
}
function safeDefaults(){return{settings:{},admin:null,...Object.fromEntries(COLLECTIONS.map(k=>[k,[]]))}}
function migrate(){if(DATA_FILE===PROJECT_FALLBACK||fs.existsSync(DATA_FILE)||!fs.existsSync(PROJECT_FALLBACK))return;try{fs.mkdirSync(path.dirname(DATA_FILE),{recursive:true});fs.copyFileSync(PROJECT_FALLBACK,DATA_FILE)}catch{}}
migrate(); let cache=null;
function ensureDataFile(){const dir=path.dirname(DATA_FILE);if(!fs.existsSync(dir))fs.mkdirSync(dir,{recursive:true});if(!fs.existsSync(DATA_FILE)||fs.statSync(DATA_FILE).size===0)fs.writeFileSync(DATA_FILE,JSON.stringify(safeDefaults(),null,2))}
function save(){if(!cache)return;const tmp=`${DATA_FILE}.tmp`;fs.writeFileSync(tmp,JSON.stringify(cache,null,2));fs.renameSync(tmp,DATA_FILE)}
function load(){if(cache)return cache;ensureDataFile();try{cache=JSON.parse(fs.readFileSync(DATA_FILE,'utf8'))}catch{cache=safeDefaults();save()}cache.settings||={};for(const key of COLLECTIONS)cache[key]||=[];if(cache.admin?.email==='admin@example.com'){cache.admin=null;save()}if(!cache.admin&&process.env.ADMIN_EMAIL&&process.env.ADMIN_PASSWORD){if(process.env.ADMIN_PASSWORD.length<12){console.warn('ADMIN_PASSWORD must contain at least 12 characters; admin bootstrap skipped.')}else{const h=hashPassword(process.env.ADMIN_PASSWORD);cache.admin={email:process.env.ADMIN_EMAIL.trim(),...h,sessionVersion:0};save()}}return cache}
function nextId(arr=[]){return arr.reduce((max,item)=>Math.max(max,Number(item?.id)||0),0)+1}
module.exports={load,save,nextId,hashPassword,verifyPassword,DATA_FILE};
