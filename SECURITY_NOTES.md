# Security Notes

This project no longer relies on hardcoded frontend admin passwords or a localStorage authentication flag.

## Admin authentication

- Admin credentials must be configured with `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables.
- Passwords are hashed server-side with PBKDF2-SHA512 before being stored.
- Authentication uses a server-side session cookie with `HttpOnly` and `SameSite=Strict`; production cookies also use `Secure`.
- Login attempts are rate-limited in memory.
- The legacy demo administrator (`admin@example.com` / known default password) is disabled during migration.
- A server endpoint is available for authenticated password changes and requires a minimum 12-character new password.

## Secrets

Never commit a real `.env` file, GitHub token, API key, or production password. `.env.example` contains placeholders only.

## Remaining production work

The editable front-end CMS content is still stored in browser localStorage. Before treating the admin dashboard as a multi-device production CMS, migrate that content to an authenticated server-side database/API. In-memory sessions also reset when the Node process restarts; use a durable session store for multi-instance production deployments.
