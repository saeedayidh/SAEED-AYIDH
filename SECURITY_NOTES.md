# Security Notes

The project no longer relies on hardcoded frontend administrator passwords or a browser `localStorage` authentication flag.

## Administrator authentication

- Administrator credentials are bootstrapped only from `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables when no administrator exists.
- Passwords are hashed server-side with PBKDF2-SHA512 before storage.
- Authentication uses signed server-validated session cookies with `HttpOnly` and `SameSite=Strict`; production cookies also use `Secure`.
- Configure a strong, random `SESSION_SECRET` in production so signed sessions remain valid across restarts/instances.
- Login attempts are rate-limited in memory.
- The legacy demo administrator is disabled during migration.
- Password changes require the current password, require at least 12 characters for the new password, rotate `sessionVersion`, and force re-authentication.

## CMS persistence and submissions

- Editable CMS data is stored through authenticated server endpoints (`/api/admin/cms`) rather than browser localStorage.
- Public CMS reads use `/api/cms` and never expose the `submissions` collection.
- Suggestions/contact submissions are sent to `/api/submissions` and stored server-side.
- `CMS_DATA_FILE` controls the CMS JSON location. `DATA_FILE` controls legacy/backend settings and administrator state.
- On Render or another host with an ephemeral filesystem, point both files at a persistent disk or migrate them to a managed database. Otherwise runtime edits can be lost during redeploys.

## Request and browser protections

- State-changing administrator endpoints reject obvious cross-site requests and use strict same-site cookies.
- Static file serving validates resolved paths before reading files.
- Security headers include `nosniff`, `DENY` framing, a restrictive permissions policy, and HSTS in production.
- API errors do not expose server stack traces.

## Secrets

Never commit a real `.env` file, GitHub token, API key, production password, or `SESSION_SECRET`. `.env.example` contains placeholders only.

## Remaining infrastructure recommendation

For production scale, use a managed database and shared rate-limit/session infrastructure instead of filesystem JSON and per-process rate-limit counters. The current signed-cookie sessions themselves are stateless, but administrator/CMS data still requires durable storage.
