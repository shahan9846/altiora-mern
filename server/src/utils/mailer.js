import Setting from '../models/Setting.js';

// Sends email through Brevo's web API (a plain HTTPS request, so it also works on hosts that block SMTP ports).
// Settings come from the server's environment: BREVO_API_KEY, MAIL_FROM_EMAIL, MAIL_FROM_NAME and, as a fallback,
// NOTIFY_EMAIL. The receiving address(es) can be changed in the dashboard (Notifications) and are kept in the database.

const EMAIL_RE = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/;
const MAX_RECIPIENTS = 5;

// "a@x.com, b@y.com" -> ['a@x.com', 'b@y.com'] (only valid addresses, no duplicates)
export function parseEmails(text = '') {
  const list = String(text).split(/[,;\n]/).map((e) => e.trim()).filter(Boolean);
  return [...new Set(list)];
}
export const allValid = (list) => list.length > 0 && list.length <= MAX_RECIPIENTS && list.every((e) => EMAIL_RE.test(e));

export const mailConfigured = () => !!(process.env.BREVO_API_KEY && process.env.MAIL_FROM_EMAIL);

// Who receives the enquiry emails: the dashboard setting, otherwise NOTIFY_EMAIL from the environment
export async function getRecipients() {
  const saved = await Setting.findOne({ key: 'notifyEmails' }).lean();
  const fromDashboard = parseEmails(saved?.value).filter((e) => EMAIL_RE.test(e));
  if (fromDashboard.length) return fromDashboard.slice(0, MAX_RECIPIENTS);
  return parseEmails(process.env.NOTIFY_EMAIL).filter((e) => EMAIL_RE.test(e)).slice(0, MAX_RECIPIENTS);
}

// Where the dashboard lives, for the "open in dashboard" button in the email
const dashboardUrl = () => {
  const first = (process.env.CLIENT_URL || '').split(',')[0].trim().replace(/\/+$/, '');
  return first ? `${first}/admin/enquiries` : '';
};

// Visitor text is shown inside an HTML email, so it is escaped first
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// A subject must be one line (line breaks could be used to inject extra email headers)
const oneLine = (v, max = 120) => String(v ?? '').replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim().slice(0, max);

/**
 * Sends one email. Never throws: returns { ok: true } or { ok: false, error: 'short reason' }.
 * `to` is a list of addresses taken from our own settings, never from the visitor.
 */
export async function sendMail({ to, subject, text, html, replyTo }) {
  if (!mailConfigured()) return { ok: false, error: 'Email is not set up on the server (BREVO_API_KEY / MAIL_FROM_EMAIL).' };
  if (!allValid(to)) return { ok: false, error: 'There is no valid receiving email address.' };

  const body = {
    sender: { name: process.env.MAIL_FROM_NAME || 'Altiora Website', email: process.env.MAIL_FROM_EMAIL },
    to: to.map((email) => ({ email })),
    subject: oneLine(subject),
    textContent: text,
    htmlContent: html,
  };
  if (replyTo && EMAIL_RE.test(replyTo.email)) body.replyTo = { email: replyTo.email, name: oneLine(replyTo.name, 80) || undefined };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': process.env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (res.ok) return { ok: true };
    const data = await res.json().catch(() => ({}));
    return { ok: false, error: oneLine(`Brevo said: ${data.message || res.status}`, 200) };
  } catch (err) {
    return { ok: false, error: err.name === 'AbortError' ? 'Brevo did not answer in time.' : oneLine(`Could not reach Brevo (${err.message})`, 200) };
  } finally {
    clearTimeout(timer);
  }
}

// ---- the two emails the site sends ----

const LABEL = { name: 'Name', company: 'Company', email: 'Email', phone: 'Phone', service: 'Service', subject: 'Subject' };

export function buildEnquiryEmail(e) {
  const kind = e.source === 'consultation' ? 'Consultation request' : 'New enquiry';
  const topic = e.service || e.subject || '';
  const subject = `${kind} from ${oneLine(e.name, 60)}${topic ? ` – ${oneLine(topic, 50)}` : ''}`;
  const fields = ['name', 'company', 'email', 'phone', 'service', 'subject'].filter((k) => e[k]);
  const when = new Date(e.createdAt || Date.now()).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Qatar' });
  const link = dashboardUrl();

  const text = [
    `${kind} (${when}, Qatar time)`,
    '',
    ...fields.map((k) => `${LABEL[k]}: ${e[k]}`),
    '',
    'Message:',
    e.message,
    '',
    ...(link ? [`Open in the dashboard: ${link}`] : []),
    'Reply to this email to answer the visitor directly.',
  ].join('\n');

  const rows = fields.map((k) => `<tr><td style="padding:6px 14px 6px 0;color:#7a7365;white-space:nowrap;vertical-align:top">${LABEL[k]}</td><td style="padding:6px 0;color:#17140F">${esc(e[k])}</td></tr>`).join('');
  const html = `<!doctype html><html><body style="margin:0;background:#f6f4ef;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e6dfcf;border-top:4px solid #b9924a;border-radius:8px">
<tr><td style="padding:24px 28px 8px"><div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#8e6e31">Altiora Business Advisory</div>
<h2 style="margin:6px 0 0;font-size:20px;color:#17140F">${esc(kind)}</h2><div style="margin-top:4px;font-size:12px;color:#7a7365">${esc(when)} (Qatar time)</div></td></tr>
<tr><td style="padding:12px 28px"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px">${rows}</table></td></tr>
<tr><td style="padding:4px 28px 8px"><div style="font-size:12px;color:#7a7365;margin-bottom:6px">Message</div>
<div style="font-size:14px;line-height:1.6;color:#17140F;background:#faf7ef;border-radius:6px;padding:14px 16px;white-space:pre-wrap">${esc(e.message)}</div></td></tr>
<tr><td style="padding:16px 28px 26px">${link ? `<a href="${esc(link)}" style="display:inline-block;background:#b9924a;color:#1a1408;text-decoration:none;font-size:13px;letter-spacing:.05em;text-transform:uppercase;padding:11px 20px;border-radius:6px">Open in dashboard</a>` : ''}
<div style="margin-top:14px;font-size:12px;color:#7a7365">Press Reply to answer ${esc(e.name)} directly.</div></td></tr>
</table></td></tr></table></body></html>`;

  return { subject, text, html, replyTo: { email: e.email, name: e.name } };
}

export function buildTestEmail() {
  return {
    subject: 'Test email from the Altiora website',
    text: 'This is a test. If you can read it, enquiry emails are working.\nNew enquiries will be sent to this address.',
    html: '<p style="font-family:Arial,sans-serif;font-size:15px;color:#17140F">This is a test. If you can read it, <strong>enquiry emails are working</strong>.<br>New enquiries will be sent to this address.</p>',
  };
}
