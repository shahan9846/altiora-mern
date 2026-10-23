import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Setting from '../models/Setting.js';
import { requireAuth } from '../middleware/auth.js';
import { allValid, buildTestEmail, getRecipients, mailConfigured, parseEmails, sendMail } from '../utils/mailer.js';

const router = Router();
router.use(requireAuth);

const status = async () => {
  const saved = await Setting.findOne({ key: 'notifyEmails' }).lean();
  return {
    emails: typeof saved?.value === 'string' ? saved.value : '',   // what the admin typed
    recipients: await getRecipients(),                              // who really receives (dashboard value, or NOTIFY_EMAIL)
    usingFallback: !(saved && parseEmails(saved.value).length),
    configured: mailConfigured(),                                   // is the Brevo key + sender set on the server?
    sender: mailConfigured() ? process.env.MAIL_FROM_EMAIL : '',
  };
};

// GET /api/admin/notifications
router.get('/', async (req, res, next) => {
  try { res.json(await status()); } catch (err) { next(err); }
});

// PUT /api/admin/notifications  { emails: "a@x.com, b@y.com" }  (empty = use NOTIFY_EMAIL from the server settings)
router.put('/', async (req, res, next) => {
  try {
    const raw = typeof req.body?.emails === 'string' ? req.body.emails : '';
    const list = parseEmails(raw);
    if (list.length && !allValid(list)) {
      return res.status(400).json({ message: 'Please check the highlighted fields.', errors: { emails: ['Enter valid email addresses separated by commas (up to 5).'] } });
    }
    await Setting.findOneAndUpdate({ key: 'notifyEmails' }, { key: 'notifyEmails', value: list.join(', ') }, { upsert: true, setDefaultsOnInsert: true });
    res.json(await status());
  } catch (err) { next(err); }
});

// POST /api/admin/notifications/test  -> sends a test email to the receiving address(es)
router.post('/test', rateLimit({ windowMs: 60 * 1000, max: 5 }), async (req, res, next) => {
  try {
    const to = await getRecipients();
    const result = await sendMail({ to, ...buildTestEmail() });
    if (!result.ok) return res.status(502).json({ message: result.error });
    res.json({ ok: true, sentTo: to });
  } catch (err) { next(err); }
});

export default router;
