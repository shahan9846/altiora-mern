import { Router } from 'express';
import { z } from 'zod';
import Enquiry from '../models/Enquiry.js';
import { requireAuth } from '../middleware/auth.js';
import { validId } from '../middleware/validate.js';
import { buildEnquiryEmail, getRecipients, mailConfigured, sendMail } from '../utils/mailer.js';

const router = Router();

const enquirySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('A valid email is required').max(200),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((v) => /^\+?[\d\s().-]{7,20}$/.test(v) && v.replace(/\D/g, '').length >= 7, 'A valid phone number is required'),
  company: z.string().trim().max(160).optional(),
  service: z.string().trim().max(160).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, 'Message is required').max(3000),
  source: z.enum(['contact', 'consultation']).optional(),
});

// Emails the team about a new enquiry and records whether it worked (in the background; errors are only logged)
async function notifyTeam(enquiry) {
  try {
    if (!mailConfigured()) {
      await Enquiry.updateOne({ _id: enquiry._id }, { emailStatus: 'not_configured' });
      return;
    }
    const result = await sendMail({ to: await getRecipients(), ...buildEnquiryEmail(enquiry) });
    if (!result.ok) console.error('Enquiry email failed:', result.error);
    await Enquiry.updateOne({ _id: enquiry._id }, { emailStatus: result.ok ? 'sent' : 'failed', emailError: result.ok ? '' : result.error });
  } catch (err) {
    console.error('Enquiry email error:', err.message);
  }
}

// Public: POST /api/enquiries (contact form + consultation popup)
router.post('/', async (req, res, next) => {
  try {
    const parsed = enquirySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: 'Please check the highlighted fields.',
        errors: parsed.error.flatten().fieldErrors,
      });
    }
    const enquiry = await Enquiry.create(parsed.data);
    res.status(201).json({ id: enquiry._id });
    notifyTeam(enquiry); // after the visitor has been answered; it never delays or breaks the form
  } catch (err) {
    next(err);
  }
});

// Admin only below
router.get('/', requireAuth, async (req, res, next) => {
  try {
    res.json(await Enquiry.find().sort({ createdAt: -1 }).lean());
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', requireAuth, validId, async (req, res, next) => {
  try {
    const parsed = z.object({ status: z.enum(['new', 'contacted', 'closed']) }).safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: 'Invalid status' });
    const doc = await Enquiry.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireAuth, validId, async (req, res, next) => {
  try {
    const doc = await Enquiry.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
