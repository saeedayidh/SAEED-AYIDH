const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { execFileSync } = require('child_process');

// Render is configured to run `node server.js` directly, so npm's prestart hook
// is bypassed. Build the React/Vite frontend here before the server starts.
const PROJECT_ROOT = __dirname;
const DIST_INDEX = path.join(PROJECT_ROOT, 'dist', 'index.html');
const VITE_BINARY = path.join(
  PROJECT_ROOT,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'vite.cmd' : 'vite'
);

function ensureFrontendBuild() {
  console.log('Building current Antigravity React frontend...');
  if (!fs.existsSync(VITE_BINARY)) {
    throw new Error('Vite is not installed; cannot build the React frontend.');
  }
  execFileSync(VITE_BINARY, ['build'], {
    cwd: PROJECT_ROOT,
    stdio: 'inherit'
  });
  if (!fs.existsSync(DIST_INDEX)) {
    throw new Error('Frontend build completed without dist/index.html.');
  }
}

ensureFrontendBuild();

const store = require('./lib/store');
const sessions = require('./lib/sessions');
const cmsStore = require('./lib/cms-store');

const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PUBLIC_DIR = path.join(__dirname, 'public');
const DIST_DIR = path.join(__dirname, 'dist');

const loginAttempts = new Map();
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 8;

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
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (IS_PRODUCTION) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
}

function sendJSON(res, status, data) {
  setSecurityHeaders(res);
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function readBody(req, maxBytes = 5 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    let rejected = false;
    req.on('data', (chunk) => {
      if (rejected) return;
      size += chunk.length;
      if (size > maxBytes) {
        rejected = true;
        reject(Object.assign(new Error('Payload too large'), { statusCode: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => { if (!rejected) resolve(Buffer.concat(chunks)); });
    req.on('error', reject);
  });
}

async function readJSON(req, maxBytes) {
  const buf = await readBody(req, maxBytes);
  if (!buf.length) return {};
  try { return JSON.parse(buf.toString('utf8')); }
  catch { throw Object.assign(new Error('Invalid JSON'), { statusCode: 400 }); }
}

function clientKey(req) {
  return req.socket.remoteAddress || 'unknown';
}

function isLoginRateLimited(req) {
  const key = clientKey(req);
  const now = Date.now();
  const current = loginAttempts.get(key);
  if (!current || now - current.startedAt > LOGIN_WINDOW_MS) {
    loginAttempts.set(key, { count: 1, startedAt: now });
    return false;
  }
  current.count += 1;
  return current.count > LOGIN_MAX_ATTEMPTS;
}

function clearLoginAttempts(req) {
  loginAttempts.delete(clientKey(req));
}

function sameOriginAllowed(req) {
  if (req.headers['sec-fetch-site'] === 'cross-site') return false;
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
}

function requireSameOrigin(req, res) {
  if (!sameOriginAllowed(req)) {
    sendJSON(res, 403, { error: 'cross_site_request_blocked' });
    return false;
  }
  return true;
}

function getAuthSession(req) {
  const cookies = sessions.parseCookies(req);
  const session = sessions.getSession(cookies.sid);
  if (!session) return null;
  const data = store.load();
  if (!data.admin || data.admin.email !== session.email) return null;
  if ((data.admin.sessionVersion || 0) !== (session.sessionVersion || 0)) return null;
  return session;
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
  const settings = { ...(data.settings || {}) };
  delete settings.resendApiKey;
  delete settings.notificationEmail;
  delete settings.emailFrom;
  return {
    settings,
    stats: data.stats || [],
    social: data.social || [],
    pages: data.pages || [],
    news: (data.news || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date)),
    blog: (data.blog || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date)),
    gallery: data.gallery || [],
    services: data.services || [],
    imageBanners: (data.imageBanners || []).filter((b) => b.enabled !== false),
    promoBanners: (data.promoBanners || []).filter((b) => b.enabled !== false),
    navSections: (data.navSections || []).filter((n) => n.visible !== false),
    complaintCategories: data.complaintCategories || [],
    footerPages: (data.footerPages || []).map((fp) => ({ id: fp.id, slug: fp.slug, name: fp.name })),
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

function publicCMSData(cms) {
  if (!cms) return null;
  const { submissions, ...publicCms } = cms;
  return publicCms;
}

function validateCMSPayload(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  const objectFields = ['theme', 'global', 'navbar', 'hero'];
  for (const field of objectFields) {
    if (data[field] != null && (typeof data[field] !== 'object' || Array.isArray(data[field]))) return false;
  }
  const arrayFields = ['sections', 'contentFields', 'news', 'blog', 'tools', 'services', 'portfolio', 'pages', 'media', 'submissions'];
  for (const field of arrayFields) {
    if (data[field] != null && !Array.isArray(data[field])) return false;
  }
  return true;
}

function safeStaticPath(root, pathname) {
  let decoded;
  try { decoded = decodeURIComponent(pathname); }
  catch { return null; }
  if (decoded.includes('\0')) return null;
  const relative = decoded.replace(/^\/+/, '');
  const candidate = path.resolve(root, relative);
  const rootResolved = path.resolve(root);
  if (candidate !== rootResolved && !candidate.startsWith(`${rootResolved}${path.sep}`)) return null;
  return candidate;
}

async function serveStatic(req, res, pathname) {
  // Built React files always take priority.
  const distFile = safeStaticPath(DIST_DIR, pathname);
  if (distFile && fs.existsSync(distFile) && fs.statSync(distFile).isFile()) {
    const ext = path.extname(distFile).toLowerCase();
    setSecurityHeaders(res);
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
    });
    fs.createReadStream(distFile).pipe(res);
    return;
  }

  // Allow static assets from public, but never serve legacy public HTML pages.
  const publicFile = safeStaticPath(PUBLIC_DIR, pathname);
  if (publicFile && fs.existsSync(publicFile) && fs.statSync(publicFile).isFile() && path.extname(publicFile).toLowerCase() !== '.html') {
    const ext = path.extname(publicFile).toLowerCase();
    setSecurityHeaders(res);
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=3600'
    });
    fs.createReadStream(publicFile).pipe(res);
    return;
  }

  // SPA fallback must always be the current React build; never the legacy public/index.html.
  if (fs.existsSync(DIST_INDEX)) {
    setSecurityHeaders(res);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store, no-cache, must-revalidate' });
    fs.createReadStream(DIST_INDEX).pipe(res);
    return;
  }

  setSecurityHeaders(res);
  res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end('Frontend build unavailable');
}

async function handleApi(req, res, pathname) {
  const data = store.load();

  if (pathname === '/api/data' && req.method === 'GET') {
    return sendJSON(res, 200, publicData(data));
  }

  if (pathname === '/api/cms' && req.method === 'GET') {
    return sendJSON(res, 200, { data: publicCMSData(cmsStore.load()) });
  }

  if (pathname === '/api/admin/cms' && req.method === 'GET') {
    if (!requireAuth(req, res)) return;
    return sendJSON(res, 200, { data: cmsStore.load() });
  }

  if (pathname === '/api/admin/cms' && req.method === 'PUT') {
    if (!requireSameOrigin(req, res) || !requireAuth(req, res)) return;
    const body = await readJSON(req, 8 * 1024 * 1024);
    if (!validateCMSPayload(body)) return sendJSON(res, 400, { error: 'invalid_cms_payload' });
    cmsStore.save(body);
    return sendJSON(res, 200, { ok: true });
  }

  if (pathname === '/api/submissions' && req.method === 'POST') {
    if (!requireSameOrigin(req, res)) return;
    const body = await readJSON(req, 256 * 1024);
    const type = ['suggestion', 'complaint', 'contact'].includes(body.type) ? body.type : 'contact';
    const name = String(body.name || '').trim().slice(0, 120);
    const email = String(body.email || '').trim().slice(0, 200);
    const message = String(body.message || '').trim().slice(0, 5000);
    if (!name || !email || !message) return sendJSON(res, 400, { error: 'invalid_submission' });

    const item = {
      id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      name,
      email,
      phone: body.phone ? String(body.phone).trim().slice(0, 40) : undefined,
      category: body.category ? String(body.category).trim().slice(0, 120) : undefined,
      message,
      attachmentUrl: body.attachmentUrl ? String(body.attachmentUrl).slice(0, 2000) : undefined,
      date: new Date().toLocaleDateString('ar-SA'),
      status: 'جديد'
    };
    const cms = cmsStore.load() || {};
    cms.submissions = [item, ...(Array.isArray(cms.submissions) ? cms.submissions : [])].slice(0, 5000);
    cmsStore.save(cms);
    return sendJSON(res, 201, { ok: true, item });
  }

  if (pathname === '/api/admin/login' && req.method === 'POST') {
    if (!requireSameOrigin(req, res)) return;
    if (isLoginRateLimited(req)) return sendJSON(res, 429, { error: 'too_many_attempts' });
    if (!data.admin) return sendJSON(res, 503, { error: 'admin_not_configured' });
    const body = await readJSON(req, 64 * 1024);
    const email = String(body.email || '').trim();
    const password = String(body.password || '');
    if (!email || !password) return sendJSON(res, 400, { error: 'invalid_input' });
    if (email.toLowerCase() !== String(data.admin.email).toLowerCase() ||
        !store.verifyPassword(password, data.admin.salt, data.admin.hash)) {
      return sendJSON(res, 401, { error: 'invalid_credentials' });
    }
    clearLoginAttempts(req);
    const token = sessions.createSession(data.admin.email, data.admin.sessionVersion || 0);
    res.setHeader('Set-Cookie', `sid=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Strict${IS_PRODUCTION ? '; Secure' : ''}`);
    return sendJSON(res, 200, { ok: true, email: data.admin.email });
  }

  if (pathname === '/api/admin/session' && req.method === 'GET') {
    const session = getAuthSession(req);
    return sendJSON(res, 200, { authenticated: Boolean(session), email: session?.email || null });
  }

  if (pathname === '/api/admin/logout' && req.method === 'POST') {
    if (!requireSameOrigin(req, res)) return;
    res.setHeader('Set-Cookie', `sid=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${IS_PRODUCTION ? '; Secure' : ''}`);
    return sendJSON(res, 200, { ok: true });
  }

  if (pathname === '/api/admin/change-password' && req.method === 'POST') {
    if (!requireSameOrigin(req, res) || !requireAuth(req, res)) return;
    if (!data.admin) return sendJSON(res, 503, { error: 'admin_not_configured' });
    const body = await readJSON(req, 64 * 1024);
    const currentPassword = String(body.currentPassword || '');
    const newPassword = String(body.newPassword || '');
    if (!currentPassword || newPassword.length < 12) {
      return sendJSON(res, 400, { error: 'invalid_password', minLength: 12 });
    }
    if (!store.verifyPassword(currentPassword, data.admin.salt, data.admin.hash)) {
      return sendJSON(res, 401, { error: 'invalid_credentials' });
    }
    const { salt, hash } = store.hashPassword(newPassword);
    data.admin = {
      ...data.admin,
      salt,
      hash,
      sessionVersion: (data.admin.sessionVersion || 0) + 1
    };
    store.save();
    res.setHeader('Set-Cookie', `sid=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${IS_PRODUCTION ? '; Secure' : ''}`);
    return sendJSON(res, 200, { ok: true, reauthenticate: true });
  }

  return sendJSON(res, 404, { error: 'not_found' });
}

const server = http.createServer(async (req, res) => {
  try {
    const parsed = url.parse(req.url, true);
    const pathname = parsed.pathname || '/';
    if (pathname.startsWith('/api/')) {
      await handleApi(req, res, pathname);
      return;
    }
    await serveStatic(req, res, pathname);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      sendJSON(res, err.statusCode || 500, { error: err.statusCode === 413 ? 'payload_too_large' : (err.statusCode === 400 ? 'invalid_json' : 'server_error') });
    } else {
      res.end();
    }
  }
});

server.listen(PORT, () => {
  console.log(`Saeed bin Ayidh website running at http://localhost:${PORT}`);
});
