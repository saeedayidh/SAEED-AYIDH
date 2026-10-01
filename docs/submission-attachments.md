# Private feedback attachments

Attachments are optional. Feedback without attachments works while antivirus setup is pending.

## Automatic Render setup

`node server.js` now starts antivirus setup in the background whenever Render's `RENDER=true` environment variable is present. No root access, start-command change or external scanning service is required. The website continues serving requests during setup.

The installer downloads the official ClamAV 1.5.4 Linux package for x64/arm64, verifies its pinned SHA-256 before extracting it, and stores the engine and signatures beside `CMS_DATA_FILE` in `antivirus`. FreshClam downloads and cryptographically validates Cisco's official signature databases and checks for updates every six hours. Engine startup must pass both a clean-file test and detection of the harmless EICAR antivirus test string. The attachment control rechecks readiness without a page reload.

Missing tools (`dpkg-deb`, `/usr/bin/prlimit`), download errors, insufficient RAM, outdated signatures, failed self-tests and scan errors keep attachment ingestion closed. On Render, adequate RAM and outbound HTTPS to GitHub and the ClamAV database CDN are required. Full signatures consume significant memory; use at least 3 GiB of service RAM for reliable operation alongside the site. The scanner uses a process address-space limit and checks the cgroup memory budget to protect the website. The code does not change the hosting plan or create a paid service.

The packaged engine's version and digests must be maintained when Cisco releases security updates. `CLAMAV_AUTO_SETUP=0` disables automatic setup. `CLAMAV_SCAN_COMMAND` can select an independently managed scanner; that engine must already have fresh signatures and support all scan options. Never replace antivirus with an extension-only or client-side check. Antivirus reduces risk; it cannot guarantee detection of every threat.

## Upload handling

Allowlist: JPEG, PNG, WebP, MP4, MOV, PDF, UTF-8 TXT. Up to three files, 5 MiB each and 12 MiB total. Files also undergo name, encoding and signature validation. Archives, executables, HTML and SVG are excluded. Storage is capped at 250 MiB. Every uploaded file is scanned before its submission is saved; scan errors and encrypted/limit alerts fail closed.

Files live beside `CMS_DATA_FILE` in `submission-attachments`, outside public media. Only authenticated administrators can download them, as attachments with no inline rendering. Include the private attachment and antivirus directories in backups and apply an attachment retention policy through operational maintenance.

Run `node --test tests/submission-attachments.test.cjs tests/events.test.cjs tests/antivirus-runtime.test.cjs`. Scanner fixtures test rejection and cleanup paths; they do not substitute for a real engine and vendor database readiness test on Render.
