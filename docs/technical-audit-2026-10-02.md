# Technical audit — 2026-10-02

Baseline: main at 4471d4f4561ec0a169a77bb0d01074a9ddb0b8fc.

## Changes

- Product and service card navigation now uses React Router rather than a full document reload.
- Search section links retain their hash through the router; removed the arbitrary 120 ms timeout.
- Page changes reset scrolling immediately; section anchors have space for the fixed header.
- Product and content rails advance smoothly by a card every 4.6 seconds instead of issuing subpixel scroll commands every animation frame against mandatory snapping.
- Rails yield to dragging, focus, hovering, reduced motion, offscreen state and hidden browser tabs. Mouse drags suppress unintended card clicks. Native vertical touch scrolling remains available.
- Resource autoplay also yields to interaction and visibility. Filtered wallpaper results no longer render repeated keys when fewer than five images match.
- Unknown URLs show a return-to-home page rather than an empty main area.
- Admin components are loaded on demand instead of being included in the initial page module.
- Repaired three malformed template literals in the inactive legacy ComprehensiveAdminDashboard file. No stored CMS data or deferred sections were removed.

## Verification

- 26 Node tests passed, including three new motion lifecycle tests. These use controlled DOM/event simulations, not a real browser.
- Production build passed. Initial JS module fell from 1,069.34 kB (gzip 276.99 kB) to 1,027.89 kB (gzip 267.23 kB); total assets include the deferred admin chunks. This measures file size, not load time or FPS.
- Local HTTP smoke check: 29 static route URLs returned the React HTML shell successfully; GET /api/cms returned 200. This does not prove that each route renders or functions in a browser.
- git diff --check passed.

## Remaining findings and limitations

- Full TypeScript checking still reports 23 existing type errors after the legacy JSX syntax repair. They concern legacy tool models, CMS defaults and translation fields, CSS declarations, and indexing in several admin versions. No errors were reported in the new motion hooks. Vite building does not replace full type checking.
- Main JS remains above 1 MB before compression. Further page/data splitting is a separate optimization requiring route-level browser verification.
- The production URL returned a Site Unavailable page in the audit environment. This is not evidence that it is unavailable for the owner or that Render deployment failed.
- A local Chromium download failed in this environment, and the cloud browser could not open localhost. Actual Safari/iPhone gestures, visual layout, navigation histories, FPS, downloads and production behavior remain unverified.
- Render deployment completion has not been verified. GitHub success alone is insufficient.
