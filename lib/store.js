// Simple JSON-file based data store (no external DB dependency needed).
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_FILE = process.env.DATA_FILE || path.join('/data', 'data.json');

function hashPassword(password, salt) {
  salt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

function verifyPassword(password, salt, hash) {
  const check = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(check, 'hex'), Buffer.from(hash, 'hex'));
}

function defaultData() {
  const { salt, hash } = hashPassword('ChangeMe123!');
  return {
    settings: {
      siteName: { ar: 'سعيد بن عايض', en: 'Saeed bin Ayidh' },
      tagline: {
        ar: 'شاعر، منشد، راوي قصص، قيمر، وفلوقر',
        en: 'Poet, Singer, Storyteller, Gamer & Vlogger'
      },
      welcomeMessage: {
        ar: 'أرحب ملايين عداد المطر والسيل !.\nيامرحبا مليون تراحيب المطر يالشيخخ.\nيامرحبا مليار في ذمتي ، نورت موقع سعيد بن عايض.',
        en: 'A welcome as countless as raindrops and floods!\nA million welcomes, like the rain, dear friend.\nA billion welcomes upon my honor — you have lit up the website of Saeed bin Ayidh.'
      },
      aboutTitle: { ar: 'من هو سعيد بن عايض؟', en: 'Who is Saeed bin Ayidh?' },
      aboutText: {
        ar: 'أنا سعيد بن عايض، شاعر، منشد، راوي قصص، قيمر، وفلوقر.\nعالمي واسع ومتنوّع، وأُبدع في مجالاتي المختلفة.\nمرحبًا بكم في عالمي المتنوّع.\nبين إبداع الكلمات وحماس المغامرة؛ نروي، نُنشد، ونوثق اللحظة.',
        en: "I'm Saeed bin Ayidh — a poet, singer, storyteller, gamer and vlogger.\nMy world is wide and diverse, and I create across many fields.\nWelcome to my diverse world.\nBetween the art of words and the thrill of adventure, we narrate, we sing, and we document the moment."
      },
      announcementTitle: { ar: 'حسابات سعيد بن عايض', en: 'Saeed bin Ayidh — Accounts' },
      announcementText: {
        ar: 'تنور سعيد بن عايض على منصات التواصل الاجتماعي !..',
        en: "You're lighting up Saeed bin Ayidh's social media — follow along!"
      },
      pagesTitle: { ar: 'صفحات سعيد بن عايض للأستكشاف !.', en: 'Saeed bin Ayidh — Pages to Explore!' },
      newsTitle: { ar: 'أخبار سعيد', en: "Saeed's News" },
      blogTitle: { ar: 'المدونة', en: 'Blog' },
      galleryTitle: { ar: 'معرض الصور والمقاطع', en: 'Gallery' },
      statsTitle: { ar: 'إحصائيات', en: 'Stats' },
      contactTitle: { ar: 'اقتراحات وشكاوى', en: 'Suggestions & Complaints' },
      helpCenterName: { ar: 'سعيد سنترهلب', en: 'Saeed Center Help' },
      logo: '/assets/logo.png',
      avatar: '/assets/avatar.jpg',
      whatsapp: '',          // wa.me URL or phone for floating contact button
      customCss: '',         // injected into <style> on main site
      customJs: '',          // injected into <script> on main site
      mainSiteUrl: '',       // full URL of the main site (shown in admin "view site" link)
      helpCenterUrl: '',     // full URL of the help center site
      notificationEmail: '',
      resendApiKey: '',
      emailFrom: 'onboarding@resend.dev'
    },
    admin: { email: 'admin@example.com', salt, hash },
    navSections: [
      { id: 1, label: { ar: 'الرئيسية', en: 'Home' }, href: '#home', visible: true },
      { id: 2, label: { ar: 'من أنا', en: 'About' }, href: '#about', visible: true },
      { id: 3, label: { ar: 'الحسابات', en: 'Accounts' }, href: '#social', visible: true },
      { id: 4, label: { ar: 'الصفحات', en: 'Pages' }, href: '#pages', visible: true },
      { id: 5, label: { ar: 'إحصائيات', en: 'Stats' }, href: '#stats', visible: true },
      { id: 6, label: { ar: 'المعرض', en: 'Gallery' }, href: '#gallery', visible: true },
      { id: 7, label: { ar: 'الأخبار', en: 'News' }, href: '#news', visible: true },
      { id: 8, label: { ar: 'المدونة', en: 'Blog' }, href: '#blog', visible: true },
      { id: 9, label: { ar: 'تواصل معي', en: 'Contact' }, href: '#contact', visible: true },
      { id: 10, label: { ar: 'مركز المساعدة', en: 'Help Center' }, href: '/help.html', visible: true }
    ],
    complaintCategories: [
      { id: 1, name: { ar: 'محتوى', en: 'Content' } },
      { id: 2, name: { ar: 'تقني', en: 'Technical' } },
      { id: 3, name: { ar: 'سلوك', en: 'Behavior' } }
    ],
    footerPages: [],
    stats: [
      { id: 1, icon: '👥', value: '0', label: { ar: 'متابعين انستقرام', en: 'Instagram Followers' } },
      { id: 2, icon: '🎵', value: '0', label: { ar: 'متابعين تيك توك', en: 'TikTok Followers' } },
      { id: 3, icon: '▶️', value: '0', label: { ar: 'مشتركين يوتيوب', en: 'YouTube Subscribers' } },
      { id: 4, icon: '👀', value: '0', label: { ar: 'إجمالي المشاهدات', en: 'Total Views' } }
    ],
    social: [
      { id: 1, platform: 'instagram', name: { ar: 'انستقرام', en: 'Instagram' }, url: 'https://www.instagram.com/saeed.ayidh?igsh=MW93dW14cDBjOGlnZw==' },
      { id: 2, platform: 'x', name: { ar: 'اكس', en: 'X (Twitter)' }, url: 'https://x.com/saeedbinayidh?s=21&t=o5zhmgF9bZG_mQ47HMhFEg' },
      { id: 3, platform: 'tiktok', name: { ar: 'تيك توك', en: 'TikTok' }, url: 'https://www.tiktok.com/@saeedbinayidh?_r=1&_t=ZS-96lrnjKwXnY' },
      { id: 4, platform: 'jaco', name: { ar: 'جاكو', en: 'Jaco' }, url: 'https://l.jaco.live/TLc5ieIU7c' },
      { id: 5, platform: 'threads', name: { ar: 'ثريدز', en: 'Threads' }, url: 'https://www.threads.com/@saeed.ayidh?igshid=NTc4MTIwNjQ2YQ==' },
      { id: 6, platform: 'facebook', name: { ar: 'فيسبوك', en: 'Facebook' }, url: 'https://www.facebook.com/share/1FnyoSxabd/?mibextid=wwXIfr' },
      { id: 7, platform: 'snapchat', name: { ar: 'سناب شات', en: 'Snapchat' }, url: 'https://snapchat.com/t/95LRaQY1' },
      { id: 8, platform: 'reddit', name: { ar: 'ريدت', en: 'Reddit' }, url: 'https://www.reddit.com/u/8h76/s/Zrw1DOfYzz' },
      { id: 9, platform: 'youtube', name: { ar: 'يوتيوب', en: 'YouTube' }, url: 'https://youtube.com/@saeedayidh?si=iHQGZ8FPV1TDhjmW' },
      { id: 10, platform: 'whatsapp', name: { ar: 'واتساب (تواصل)', en: 'WhatsApp (Contact)' }, url: 'https://wa.me/message/PGU4PTVFQRVXH1' },
      { id: 11, platform: 'whatsapp-channel', name: { ar: 'قناة واتساب', en: 'WhatsApp Channel' }, url: 'https://whatsapp.com/channel/0029Vb7qd6O2phHPutLJoC0t' },
      { id: 12, platform: 'telegram', name: { ar: 'تيليجرام (تواصل)', en: 'Telegram (Contact)' }, url: 'https://t.me/SaeedBinAyidh1' },
      { id: 13, platform: 'telegram-channel', name: { ar: 'قناة تيليجرام', en: 'Telegram Channel' }, url: 'https://t.me/saeedbinayidh' },
      { id: 14, platform: 'linkedin', name: { ar: 'لينكدإن', en: 'LinkedIn' }, url: 'https://www.linkedin.com/in/saeed-bin-ayidh-1622262b0?utm_source=share_via&utm_content=profile&utm_medium=member_ios' }
    ],
    pages: [
      { id: 1, group: { ar: 'صفحات سعيد', en: "Saeed's Pages" }, title: { ar: 'حسابات سعيد', en: "Saeed's Accounts" }, url: 'https://solo.to/saeedalqahtani' },
      { id: 2, group: { ar: 'صفحات سعيد', en: "Saeed's Pages" }, title: { ar: 'اردر العالمية', en: 'ARDR Global' }, url: 'https://solo.to/ardrgroup' },
      { id: 3, group: { ar: 'صفحات الترفيه', en: 'Entertainment Pages' }, title: { ar: 'سعيد ايفنت', en: 'Saeed Event' }, url: 'https://t.me/EmpireSaeed' },
      { id: 4, group: { ar: 'صفحات الترفيه', en: 'Entertainment Pages' }, title: { ar: 'مجتمعات سعيد', en: "Saeed's Communities" }, url: 'https://t.me/EmpireSaeed' }
    ],
    faq: [
      { id: 1, category: 'help', question: { ar: 'كيف أرسل اقتراح أو شكوى؟', en: 'How do I send a suggestion or complaint?' }, answer: { ar: 'انتقل إلى قسم "اقتراحات وشكاوى" في الصفحة الرئيسية، اختر النوع المناسب واكتب رسالتك ثم اضغط إرسال.', en: 'Go to the "Suggestions & Complaints" section on the homepage, choose the right type, write your message and press send.' } },
      { id: 2, category: 'help', question: { ar: 'هل بياناتي محفوظة بأمان؟', en: 'Is my information kept safe?' }, answer: { ar: 'نعم، رسائلك تُستخدم فقط للتواصل معك أو تحسين المحتوى ولا تتم مشاركتها مع أي طرف ثالث.', en: 'Yes, your messages are only used to contact you or improve our content and are never shared with third parties.' } }
    ],
    news: [
      { id: 1, title: { ar: 'انطلاق الموقع الرسمي لسعيد بن عايض', en: 'The Official Website of Saeed bin Ayidh is Live' }, content: { ar: 'يسرنا الإعلان عن انطلاق الموقع الرسمي الذي يجمع كل أعمال وحسابات سعيد بن عايض في مكان واحد.', en: "We're excited to announce the launch of the official website bringing together all of Saeed bin Ayidh's work and accounts in one place." }, image: '', date: new Date().toISOString() }
    ],
    blog: [
      { id: 1, slug: 'welcome-post', title: { ar: 'مرحبًا بكم في مدونتي', en: 'Welcome to My Blog' }, content: { ar: 'هذه أول تدوينة في مدونتي الجديدة، تابعوني لقراءة المزيد من القصص والمقالات.', en: 'This is the first post on my new blog. Follow along for more stories and articles.' }, image: '', date: new Date().toISOString() }
    ],
    gallery: [],
    messages: []
  };
}

let cache = null;

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE) || fs.statSync(DATA_FILE).size === 0) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData(), null, 2));
    return;
  }
  try { JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); }
  catch { fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData(), null, 2)); }
}

function load() {
  if (cache) return cache;
  ensureDataFile();
  cache = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  // Migrate: add new fields if missing from older data files
  const d = defaultData();
  if (!cache.navSections) cache.navSections = d.navSections;
  if (!cache.complaintCategories) cache.complaintCategories = d.complaintCategories;
  if (!cache.footerPages) cache.footerPages = d.footerPages;
  const ds = d.settings;
  ['whatsapp','customCss','customJs','mainSiteUrl','helpCenterUrl'].forEach(k => {
    if (cache.settings[k] === undefined) cache.settings[k] = ds[k];
  });
  return cache;
}

function save() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(cache, null, 2));
}

function nextId(arr) {
  return arr.reduce((max, item) => Math.max(max, item.id || 0), 0) + 1;
}

module.exports = { load, save, nextId, hashPassword, verifyPassword, DATA_FILE };
