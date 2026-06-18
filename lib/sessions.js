const crypto = require('crypto');

const sessions = new Map(); // token -> { email, expires }
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function createSession(email) {
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, { email, expires: Date.now() + SESSION_TTL_MS });
  return token;
}

function getSession(token) {
  if (!token) return null;
  const s = sessions.get(token);
  if (!s) return null;
  if (s.expires < Date.now()) {
    sessions.delete(token);
    return null;
  }
  return s;
}

function destroySession(token) {
  sessions.delete(token);
}

function parseCookies(req) {
  const header = req.headers.cookie;
  const out = {};
  if (!header) return out;
  header.split(';').forEach(pair => {
    const idx = pair.indexOf('=');
    if (idx === -1) return;
    const key = pair.slice(0, idx).trim();
    const val = pair.slice(idx + 1).trim();
    out[key] = decodeURIComponent(val);
  });
  return out;
}

module.exports = { createSession, getSession, destroySession, parseCookies };
