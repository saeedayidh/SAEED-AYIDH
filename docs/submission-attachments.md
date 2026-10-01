# Private feedback attachments

Attachments are optional. Feedback without attachments works without an antivirus engine.

Install ClamAV and fresh signatures in the Render server runtime. Set `CLAMAV_SCAN_COMMAND` to the absolute path of `clamscan` if it is not on PATH. Keep signatures updated with `freshclam`; signatures older than seven days are rejected. A local version check is insufficient: the readiness endpoint scans a temporary probe, and every uploaded file is scanned independently before saving the submission. The runtime must support the configured ClamAV scan options.

On the current Node-only Render runtime, attachments stay disabled until this scanner is installed. Missing binaries, outdated signatures, scan errors, timeouts, encrypted files and scan-limit alerts fail closed. Do not replace this with a client-side or extension-only check. Antivirus reduces risk; it cannot guarantee detection of every threat.

Allowlist: JPEG, PNG, WebP, MP4, MOV, PDF, UTF-8 TXT. Up to three files, 5 MiB each and 12 MiB total. Files also undergo name, encoding and signature validation. Archives, executables, HTML and SVG are excluded. Storage is capped at 250 MiB.

Files live beside `CMS_DATA_FILE` in `submission-attachments`, outside public media. Only authenticated administrators can download them, as attachments with no inline rendering. Include this private directory in backups and apply a retention policy through operational maintenance.

Run `node --test tests/submission-attachments.test.cjs tests/events.test.cjs`. Scanner fixtures test rejection and cleanup paths; they do not substitute for testing a real ClamAV installation on Render.
