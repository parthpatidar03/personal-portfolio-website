/* eslint-env node */
/* global process */
// Vercel Serverless Function (ESM): Send contact emails via Resend
// Docs: https://resend.com/docs/api-reference/emails/send

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = req.body || {};
    const { name, email, subject, message, website } = body;

    // Honeypot: if bot filled it, pretend success
    if (website) {
      return res.status(200).json({ ok: true });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server not configured: RESEND_API_KEY missing' });
    }

    const emailPayload = {
      from: 'Portfolio <onboarding@resend.dev>', // replace with your verified domain when ready
      to: 'parthpatidar202@gmail.com',
      reply_to: email,
      subject: subject ? `[Portfolio] ${subject}` : '[Portfolio] New message',
      html: `
        <div style="font-family:Inter,Segoe UI,Arial,sans-serif;line-height:1.6;">
          <h2>New portfolio contact</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ''}
          <hr />
          <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    };

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      return res.status(500).json({ error: data?.message || 'Failed to send email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}
