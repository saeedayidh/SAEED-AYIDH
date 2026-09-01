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
const DIST_DIR = path.join(__dirname, 'dist');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const ALLOWED_USER_EXTS = new Set([
  '.jpg','.jpeg','.png','.gif','.webp','.svg',
  '.mp4','.webm','.mov','.avi',
  '.pdf','.doc','.docx','.xls','.xlsx','.ppt','.pptx',
  '.txt','.csv','.zip','.rar'
]);

const COLLECTIONS = ['stats', 'social', 'pages', 'faq', 'news', 'blog', 'gallery', 'services', 'imageBanners', 'promoBanners', 'navSections', 'complaintCategories', 'footerPages', 'domains', 'buttons', 'cards', 'wallpapers', 'watchfaces', 'prompts', 'audioWorks', 'storiesWorks', 'vlogsWorks', 'extraWorks'];

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
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.m4a': 'audio/mp4',
  '.ogg': 'audio/ogg',
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
      if (size > 25 * 1024 * 1024) {
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
  delete settings.notificationEmail;
  delete settings.emailFrom;
  return {
    settings,
    stats: data.stats,
    social: data.social,
    pages: data.pages,
    news: (data.news || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date)),
    blog: (data.blog || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date)),
    gallery: data.gallery,
    services: data.services || [],
    imageBanners: (data.imageBanners || []).filter(b => b.enabled !== false),
    promoBanners: (data.promoBanners || []).filter(b => b.enabled !== false),
    navSections: (data.navSections || []).filter(n => n.visible !== false),
    complaintCategories: data.complaintCategories || [],
    footerPages: (data.footerPages || []).map(fp => ({ id: fp.id, slug: fp.slug, name: fp.name })),
    domains: data.domains || [],
    buttons: data.buttons || [],
    cards: data.cards || [],
    wallpapers: data.wallpapers || [],
    watchfaces: data.watchfaces || [],
    prompts: data.prompts || [],
    audioWorks: data.audioWorks || [],
    storiesWorks: data.storiesWorks || [],
    vlogsWorks: data.vlogsWorks || [],
    extraWorks: data.extraWorks || []
  };
}

async function serveStatic(req, res, pathname) {
  let decodedPath = decodeURIComponent(pathname);
  
  // Try serving from dist directory first (Vite build)
  let filePath = path.join(DIST_DIR, decodedPath);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // Try serving from public directory
  filePath = path.join(PUBLIC_DIR, decodedPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // SPA fallback for React Router (serve dist/index.html or public/index.html)
  const distIndex = path.join(DIST_DIR, 'index.html');
  const publicIndex = path.join(PUBLIC_DIR, 'index.html');

  if (fs.existsSync(distIndex)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(distIndex).pipe(res);
    return;
  } else if (fs.existsSync(publicIndex)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(publicIndex).pipe(res);
    return;
  }

  res.writeHead(404);
  res.end('Not found');
}

async function handleApi(req, res, pathname, query) {
  const data = store.load();

  if (pathname === '/api/data' && req.method === 'GET') {
    return sendJSON(res, 200, publicData(data));
  }

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

  return sendJSON(res, 404, { error: 'not_found' });
}

const server = http.createServer(async (req, res) => {
  try {
    const parsed = url.parse(req.url, true);
    let pathname = parsed.pathname;

    if (pathname.startsWith('/api/')) {
      await handleApi(req, res, pathname, parsed.query);
      return;
    }

    await serveStatic(req, res, pathname);
  } catch (err) {
    console.error(err);
    sendJSON(res, 500, { error: 'server_error', message: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`Saeed bin Ayidh website running at http://localhost:${PORT}`);
});
