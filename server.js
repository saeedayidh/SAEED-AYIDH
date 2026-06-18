const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

const store = require('./lib/store');
const sessions = require('./lib/sessions');
const { parseMultipart } = require('./lib/multipart');
const { sendEmail } = require('./lib/mailer');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const COLLECTIONS = ['stats', 'social', 'pages', 'faq', 'news', 'blog', 'gallery', 'navSections', 'complaintCategories', 'footerPages'];

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

function sendJSON(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > 25 * 1024 * 1024) { // 25MB limit
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function readJSON(req) {
  const buf = await readBody(req);
  if (!buf.length) return {};
  try {
    return JSON.parse(buf.toString('utf-8'));
  } catch {
    return {};
  }
}

function getAuthSession(req) {
  const cookies = sessions.parseCookies(req);
  return sessions.getSession(cookies.sid);
}

function requireAuth(req, res) {
  const session = getAuthSession(req);
  if (!session) {
    sendJSON(res, 401, { error: 'unauthorized' });
    return null;
  }
  return session;
}

function publicData(data) {
  const settings = { ...data.settings };
  delete settings.resendApiKey;
  return {
    settings,
    stats: data.stats,
    social: data.social,
    pages: data.pages,
    news: data.news.slice().sort((a, b) => new Date(b.date) - new Date(a.date)),
    blog: data.blog.slice().sort((a, b) => new Date(b.date) - new Date(a.date)),
    gallery: data.gallery,
    navSections: (data.navSections || []).filter(n => n.visible !== false),
    complaintCategories: data.complaintCategories || [],
    footerPages: (data.footerPages || []).map(fp => ({ id: fp.id, slug: fp.slug, name: fp.name }))
  };
}

function helpData(data) {
  return {
    helpCenterName: data.settings.helpCenterName,
    faq: data.faq.filter(f => f.category === 'help')
  };
}

async function serveStatic(req, res, pathname) {
  let filePath = path.join(PUBLIC_DIR, decodeURIComponent(pathname));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  if (pathname.endsWith('/')) filePath = path.join(filePath, 'index.html');

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      // SPA-ish fallback for admin routes
      if (pathname.startsWith('/admin')) {
        const adminIndex = path.join(PUBLIC_DIR, 'admin', 'index.html');
        fs.readFile(adminIndex, (e, content) => {
          if (e) { res.writeHead(404); res.end('Not found'); return; }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        });
        return;
      }
      res.writeHead(404); res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
}

async function handleApi(req, res, pathname, query) {
  const data = store.load();

  // ---------- PUBLIC ENDPOINTS ----------
  if (pathname === '/api/data' && req.method === 'GET') {
    return sendJSON(res, 200, publicData(data));
  }

  if (pathname === '/api/help' && req.method === 'GET') {
    return sendJSON(res, 200, helpData(data));
  }

  if (pathname === '/api/contact' && req.method === 'POST') {
    const body = await readJSON(req);
    const { type, name, email, message, complaintCategory } = body;
    if (!type || !['suggestion', 'complaint'].includes(type) || !message) {
      return sendJSON(res, 400, { error: 'invalid_input' });
    }
    const item = {
      id: store.nextId(data.messages),
      type,
      name: (name || '').toString().slice(0, 200),
      email: (email || '').toString().slice(0, 200),
      message: message.toString().slice(0, 5000),
      complaintCategory: type === 'complaint' ? (complaintCategory || '').toString().slice(0, 100) : undefined,
      date: new Date().toISOString(),
      read: false
    };
    data.messages.push(item);
    store.save();

    const label = type === 'suggestion' ? 'اقتراح جديد / New Suggestion' : 'شكوى جديدة / New Complaint';
    sendEmail({
      apiKey: data.settings.resendApiKey,
      from: data.settings.emailFrom,
      to: data.settings.notificationEmail,
      subject: `${label} - ${item.name || 'بدون اسم'}`,
      html: `<div dir="rtl" style="font-family:sans-serif">
        <h2>${label}</h2>
        <p><b>الاسم:</b> ${escapeHtml(item.name) || '-'}</p>
        <p><b>البريد:</b> ${escapeHtml(item.email) || '-'}</p>
        <p><b>الرسالة:</b></p>
        <p>${escapeHtml(item.message)}</p>
        <hr><p style="color:#888;font-size:12px">${item.date}</p>
      </div>`
    });

    return sendJSON(res, 201, { ok: true });
  }

  // ---------- AUTH ----------
  if (pathname === '/api/admin/login' && req.method === 'POST') {
    const body = await readJSON(req);
    const { email, password } = body;
    if (!email || !password) return sendJSON(res, 400, { error: 'invalid_input' });
    if (email.toLowerCase() !== data.admin.email.toLowerCase()) {
      return sendJSON(res, 401, { error: 'invalid_credentials' });
    }
    if (!store.verifyPassword(password, data.admin.salt, data.admin.hash)) {
      return sendJSON(res, 401, { error: 'invalid_credentials' });
    }
    const token = sessions.createSession(data.admin.email);
    res.setHeader('Set-Cookie', `sid=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`);
    return sendJSON(res, 200, { ok: true, email: data.admin.email });
  }

  if (pathname === '/api/admin/logout' && req.method === 'POST') {
    const cookies = sessions.parseCookies(req);
    sessions.destroySession(cookies.sid);
    res.setHeader('Set-Cookie', 'sid=; HttpOnly; Path=/; Max-Age=0');
    return sendJSON(res, 200, { ok: true });
  }

  if (pathname === '/api/admin/me' && req.method === 'GET') {
    const session = getAuthSession(req);
    if (!session) return sendJSON(res, 401, { error: 'unauthorized' });
    return sendJSON(res, 200, { email: session.email });
  }

  // ---------- ADMIN (protected) ----------
  if (pathname.startsWith('/api/admin/')) {
    const session = requireAuth(req, res);
    if (!session) return;

    // Full bundle for admin dashboard
    if (pathname === '/api/admin/bundle' && req.method === 'GET') {
      const safe = { ...data };
      return sendJSON(res, 200, safe);
    }

    // Settings
    if (pathname === '/api/admin/settings' && req.method === 'PUT') {
      const body = await readJSON(req);
      data.settings = { ...data.settings, ...body };
      store.save();
      return sendJSON(res, 200, { ok: true, settings: data.settings });
    }

    // Change password / email
    if (pathname === '/api/admin/credentials' && req.method === 'PUT') {
      const body = await readJSON(req);
      const { currentPassword, newEmail, newPassword } = body;
      if (!currentPassword || !store.verifyPassword(currentPassword, data.admin.salt, data.admin.hash)) {
        return sendJSON(res, 401, { error: 'invalid_current_password' });
      }
      if (newEmail) data.admin.email = newEmail;
      if (newPassword) {
        const { salt, hash } = store.hashPassword(newPassword);
        data.admin.salt = salt;
        data.admin.hash = hash;
      }
      store.save();
      return sendJSON(res, 200, { ok: true, email: data.admin.email });
    }

    // Messages
    if (pathname === '/api/admin/messages' && req.method === 'GET') {
      return sendJSON(res, 200, data.messages.slice().sort((a, b) => new Date(b.date) - new Date(a.date)));
    }
    let m = pathname.match(/^\/api\/admin\/messages\/(\d+)$/);
    if (m) {
      const id = Number(m[1]);
      if (req.method === 'DELETE') {
        data.messages = data.messages.filter(x => x.id !== id);
        store.save();
        return sendJSON(res, 200, { ok: true });
      }
      if (req.method === 'PUT') {
        const body = await readJSON(req);
        const item = data.messages.find(x => x.id === id);
        if (!item) return sendJSON(res, 404, { error: 'not_found' });
        if (typeof body.read === 'boolean') item.read = body.read;
        store.save();
        return sendJSON(res, 200, item);
      }
    }

    // File upload
    if (pathname === '/api/admin/upload' && req.method === 'POST') {
      const buf = await readBody(req);
      const { files } = parseMultipart(buf, req.headers['content-type']);
      if (!files.length) return sendJSON(res, 400, { error: 'no_file' });
      const file = files[0];
      const ext = path.extname(file.filename) || guessExt(file.mimetype);
      const fname = crypto.randomBytes(12).toString('hex') + ext;
      fs.writeFileSync(path.join(UPLOADS_DIR, fname), file.data);
      return sendJSON(res, 200, { url: `/uploads/${fname}` });
    }

    // Generic collection CRUD: /api/admin/<collection>[/<id>]
    for (const col of COLLECTIONS) {
      const re = new RegExp(`^/api/admin/${col}(?:/(\\d+))?$`);
      const cm = pathname.match(re);
      if (!cm) continue;
      const id = cm[1] ? Number(cm[1]) : null;
      const list = data[col];

      if (req.method === 'GET' && !id) {
        return sendJSON(res, 200, list);
      }
      if (req.method === 'POST' && !id) {
        const body = await readJSON(req);
        const item = { ...body, id: store.nextId(list) };
        if (col === 'news' || col === 'blog') item.date = item.date || new Date().toISOString();
        list.push(item);
        store.save();
        return sendJSON(res, 201, item);
      }
      if (req.method === 'PUT' && id) {
        const body = await readJSON(req);
        const idx = list.findIndex(x => x.id === id);
        if (idx === -1) return sendJSON(res, 404, { error: 'not_found' });
        list[idx] = { ...list[idx], ...body, id };
        store.save();
        return sendJSON(res, 200, list[idx]);
      }
      if (req.method === 'DELETE' && id) {
        const idx = list.findIndex(x => x.id === id);
        if (idx === -1) return sendJSON(res, 404, { error: 'not_found' });
        list.splice(idx, 1);
        store.save();
        return sendJSON(res, 200, { ok: true });
      }
    }

    return sendJSON(res, 404, { error: 'not_found' });
  }

  return sendJSON(res, 404, { error: 'not_found' });
}

function serveFooterPage(res, slug, data) {
  const fp = (data.footerPages || []).find(p => p.slug === slug);
  if (!fp) { res.writeHead(404); res.end('الصفحة غير موجودة'); return; }
  const s = data.settings;
  const siteAr = (s.siteName && s.siteName.ar) || 'سعيد بن عايض';
  const siteEn = (s.siteName && s.siteName.en) || 'Saeed bin Ayidh';
  const nameAr = (fp.name && fp.name.ar) || fp.slug;
  const nameEn = (fp.name && fp.name.en) || nameAr;
  const contAr = (fp.content && fp.content.ar) || '';
  const contEn = (fp.content && fp.content.en) || contAr;
  const logo = s.logo || '/assets/logo.png';
  const year = new Date().getFullYear();
  const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(nameAr)} | ${escapeHtml(siteAr)}</title>
<link rel="icon" href="${escapeHtml(logo)}">
<link rel="stylesheet" href="/css/style.css">
<style>
  .fp-wrap{max-width:780px;margin:120px auto 80px;padding:0 24px}
  .fp-wrap h1{font-size:clamp(1.8rem,4vw,2.8rem);color:var(--text);margin-bottom:28px;font-weight:700}
  .fp-body{color:var(--text-secondary);line-height:2;white-space:pre-wrap;font-size:1rem}
  .fp-nav-actions{display:flex;align-items:center;gap:10px}
</style>
</head>
<body>
<div class="aurora" aria-hidden="true"><div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div></div>
<div class="noise" aria-hidden="true"></div>
<div class="vignette" aria-hidden="true"></div>
<nav id="nav" class="scrolled">
  <div class="nav-in">
    <a href="/" class="nav-logo">
      <img src="${escapeHtml(logo)}" alt="logo">
      <span id="fp-site-name">${escapeHtml(siteAr)}</span>
    </a>
    <div class="fp-nav-actions">
      <button class="icon-btn" onclick="toggleTheme()">🌗</button>
      <button class="icon-btn" id="fpLangBtn" onclick="toggleLang()">EN</button>
      <a href="/" class="pill-btn outline" style="font-size:.82rem;padding:.35rem .9rem" id="fpBack">← العودة</a>
    </div>
  </div>
</nav>
<div class="fp-wrap">
  <h1 id="fp-title">${escapeHtml(nameAr)}</h1>
  <div class="fp-body" id="fp-body">${escapeHtml(contAr)}</div>
</div>
<footer>
  <div class="wrap">
    <p class="copy">${year} © <span id="fp-foot-name">${escapeHtml(siteAr)}</span> — جميع الحقوق محفوظة</p>
  </div>
</footer>
<script>
var FP={nameAr:${JSON.stringify(nameAr)},nameEn:${JSON.stringify(nameEn)},
  contAr:${JSON.stringify(contAr)},contEn:${JSON.stringify(contEn)},
  siteAr:${JSON.stringify(siteAr)},siteEn:${JSON.stringify(siteEn)}};
function applyTheme(){document.documentElement.setAttribute('data-theme',localStorage.getItem('theme')||'dark');}
function toggleTheme(){var c=localStorage.getItem('theme')||'dark';localStorage.setItem('theme',c==='dark'?'light':'dark');applyTheme();}
function applyFpLang(){
  var l=localStorage.getItem('lang')||'ar',ar=l==='ar';
  document.documentElement.lang=l;
  document.documentElement.dir=ar?'rtl':'ltr';
  document.getElementById('fp-title').textContent=ar?FP.nameAr:(FP.nameEn||FP.nameAr);
  document.getElementById('fp-body').textContent=ar?FP.contAr:(FP.contEn||FP.contAr);
  document.getElementById('fp-site-name').textContent=ar?FP.siteAr:(FP.siteEn||FP.siteAr);
  document.getElementById('fp-foot-name').textContent=ar?FP.siteAr:(FP.siteEn||FP.siteAr);
  document.getElementById('fpLangBtn').textContent=ar?'EN':'AR';
  document.getElementById('fpBack').textContent=ar?'← العودة':'← Back';
}
function toggleLang(){var l=localStorage.getItem('lang')||'ar';localStorage.setItem('lang',l==='ar'?'en':'ar');applyFpLang();}
applyTheme();applyFpLang();
window.addEventListener('scroll',function(){document.getElementById('nav').classList.toggle('scrolled',window.scrollY>30);});
</script>
</body>
</html>`;
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

function guessExt(mimetype) {
  const map = {
    'image/png': '.png', 'image/jpeg': '.jpg', 'image/gif': '.gif',
    'image/webp': '.webp', 'image/svg+xml': '.svg',
    'video/mp4': '.mp4', 'video/webm': '.webm'
  };
  return map[mimetype] || '';
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

const server = http.createServer(async (req, res) => {
  try {
    const parsed = url.parse(req.url, true);
    let pathname = parsed.pathname;

    if (pathname.startsWith('/api/')) {
      await handleApi(req, res, pathname, parsed.query);
      return;
    }

    // ---- Footer page route: /p/:slug ----
    if (pathname.startsWith('/p/') && pathname.length > 3) {
      const slug = pathname.slice(3).split('/')[0];
      serveFooterPage(res, slug, store.load());
      return;
    }

    // ---- Hostname-based routing for multiple domains ----
    // The site can be reached via up to 3 different domains/hostnames:
    //  - HELP_HOSTS  -> serves help.html as the root page (help center)
    //  - ADMIN_HOSTS -> serves the admin panel as the root app
    //  - everything else -> serves index.html as before (main site)
    // HELP_HOSTS / ADMIN_HOSTS are comma-separated hostnames set via env vars,
    // e.g. HELP_HOSTS="www.saeedcenterhelp.com,saeedcenterhelp.com"
    //      ADMIN_HOSTS="www.adminsaeed.com,adminsaeed.com"
    // As a fallback (no env vars set), "help."/"admin." subdomain prefixes also work.
    const hostHeader = (req.headers.host || '').split(':')[0].toLowerCase();
    const HELP_HOSTS = (process.env.HELP_HOSTS || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
    const ADMIN_HOSTS = (process.env.ADMIN_HOSTS || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
    const isHelpHost = HELP_HOSTS.includes(hostHeader) || hostHeader.startsWith('help.');
    const isAdminHost = ADMIN_HOSTS.includes(hostHeader) || hostHeader.startsWith('admin.');

    const sharedPrefixes = ['/css/', '/js/', '/assets/', '/uploads/', '/admin/'];
    const isSharedAsset = sharedPrefixes.some(p => pathname.startsWith(p));

    if (isAdminHost && !isSharedAsset) {
      // Treat the admin subdomain's "/" as the admin panel root
      pathname = pathname === '/' ? '/admin/' : '/admin' + pathname;
    } else if (isHelpHost && pathname === '/') {
      pathname = '/help.html';
    } else if (pathname === '/') {
      pathname = '/index.html';
    }

    await serveStatic(req, res, pathname);
  } catch (err) {
    console.error(err);
    sendJSON(res, 500, { error: 'server_error', message: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`Saeed bin Ayidh website running at http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
  console.log(`Default admin login -> email: admin@example.com / password: ChangeMe123!`);
  console.log(`(Change these immediately from the admin Settings tab.)`);
});
