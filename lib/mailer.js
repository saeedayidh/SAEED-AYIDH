// Sends emails via the Resend HTTP API (https://resend.com) using built-in fetch.
// Configure "Notification Email" and "Resend API Key" from the admin Settings tab.

async function sendEmail({ apiKey, from, to, subject, html }) {
  if (!apiKey || !to) {
    console.log('[mailer] Email not sent (missing API key or recipient). Subject:', subject);
    return { skipped: true };
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: from || 'onboarding@resend.dev',
        to: [to],
        subject,
        html
      })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('[mailer] Resend error:', data);
      return { error: data };
    }
    return { ok: true, data };
  } catch (err) {
    console.error('[mailer] Failed to send email:', err.message);
    return { error: err.message };
  }
}

module.exports = { sendEmail };
