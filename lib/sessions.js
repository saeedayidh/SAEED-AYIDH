const crypto = require('crypto');

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const configuredSecret = process.env.SESSION_SECRET;
const sessionSecret = configuredSecret || crypto.randomBytes(32).toString('hex');

if (!configuredSecret) {
  console.warn('SESSION_SECRET is not set; sessions will be invalidated when the process restarts.');
}

function sign(value) {
  return crypto.createHmac('sha256', sessionSecret).update(value).digest('base64url');
}

function createSession(email, sessionVersion = 0) {
  const payload = Buffer.from(JSON.stringify({
    email,
    sessionVersion,
    expires: Date.now() + SESSION_TTL_MS
  }), 'utf8').toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function getSession(token) {
  if (!token || typeof token !== 'string') return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!session.email || !session.expires || session.expires < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

// Signed cookies are stateless. Client logout invalidates the browser cookie;
// password changes rotate sessionVersion to invalidate previously issued sessions.
function destroySession() {}

function parseCookies(req) {
  const header = req.headers.cookie;
  const out = {};
  if (!header) return out;
  header.split(';').forEach((pair) => {
    const idx = pair.indexOf('=');
    if (idx === -1) return;
    const key = pair.slice(0, idx).trim();
    const val = pair.slice(idx + 1).trim();
    try { out[key] = decodeURIComponent(val); }
    catch { out[key] = val; }
  });
  return out;
}

module.exports = { createSession, getSession, destroySession, parseCookies };
