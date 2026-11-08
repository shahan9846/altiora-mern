import { Router } from 'express';
import { z } from 'zod';
import Page from '../models/Page.js';
import { requireAuth } from '../middleware/auth.js';
import { IMAGE_PATH, isImageKey, removeImageIfUnused } from '../utils/images.js';

const router = Router();

const KEY = /^[a-z][a-z0-9-]{0,30}$/;

// The web address each page has until the admin gives it another one (home is always "/").
const DEFAULT_SLUGS = { about: 'about', why: 'why-altiora', services: 'services', training: 'training', career: 'career-guidance', contact: 'contact' };
const RESERVED_SLUGS = ['admin', 'api', 'assets', 'sitemap.xml', 'robots.txt'];
const FIELD_KEY = /^[A-Za-z0-9_.-]{1,80}$/;
// Social links must be full web addresses (or empty to hide the icon), never something like javascript:
const SOCIAL_KEYS = ['linkedin', 'instagram', 'facebook', 'x', 'tiktok'];
const WEB_ADDRESS = /^https?:\/\/\S+$/i;

const pageBody = z.object({
  // Each editor sends only its own part: the wording editor sends `content`, the SEO editor sends `seo`.
  // A part that is left out is not touched. Only wording that differs from the default is sent; every value is plain text.
  content: z.record(z.string().max(3000)).refine((c) => Object.keys(c).length <= 400, 'Too many fields')
    .refine((c) => Object.keys(c).every((k) => FIELD_KEY.test(k)), 'Invalid field name')
    .refine((c) => SOCIAL_KEYS.every((k) => !(k in c) || c[k] === '' || WEB_ADDRESS.test(c[k])), 'Social links must start with https://')
    // a field that holds a picture must be one of the website's photos or a picture uploaded from the dashboard
    .refine((c) => Object.entries(c).every(([k, v]) => !isImageKey(k) || v === '' || IMAGE_PATH.test(v)), 'Please upload an image')
    .optional(),
  seo: z.object({
    title: z.string().trim().max(120).default(''),
    description: z.string().trim().max(320).default(''),
    keywords: z.string().trim().max(300).default(''),
    image: z.union([z.literal(''), z.string().refine((v) => IMAGE_PATH.test(v), 'Please upload an image')]).default(''),
    imageAlt: z.string().trim().max(160).default(''),
    slug: z.string().trim().toLowerCase().max(60)
      .refine((v) => v === '' || /^[a-z0-9]+(-[a-z0-9]+)*$/.test(v), 'Use lowercase letters, numbers and single hyphens only (for example: about-us)')
      .default(''),
    canonical: z.string().trim().max(300)
      .refine((v) => v === '' || /^https?:\/\/[^\s]+$/i.test(v), 'Enter the full address, starting with https://')
      .default(''),
  }).optional(),
});

// Public: GET /api/pages -> { home: { content, seo }, about: { … }, … } for every page that has been edited
router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.find().lean();
    res.json(Object.fromEntries(pages.map((p) => [p.key, { content: p.content || {}, seo: p.seo || {} }])));
  } catch (err) {
    next(err);
  }
});

// Admin only: PUT /api/pages/:key  (creates the page record the first time it is saved)
router.put('/:key', requireAuth, async (req, res, next) => {
  try {
    if (!KEY.test(req.params.key)) return res.status(404).json({ message: 'Not found' });
    const parsed = pageBody.safeParse(req.body);
    if (!parsed.success) {
      // the problems are listed by field name (title, slug, canonical, ...), also for the fields inside "seo"
      const errors = {};
      for (const issue of parsed.error.issues) (errors[issue.path[issue.path.length - 1]] ||= []).push(issue.message);
      return res.status(400).json({ message: 'Please check the highlighted fields.', errors });
    }
    // a custom web address: only the pages that have one, never one that is taken
    if (parsed.data.seo?.slug) {
      const slug = parsed.data.seo.slug;
      const fail = (msg) => res.status(400).json({ message: 'Please check the highlighted fields.', errors: { slug: [msg] } });
      if (slug === DEFAULT_SLUGS[req.params.key]) parsed.data.seo.slug = ''; // same as the default address: nothing to store
      else if (!DEFAULT_SLUGS[req.params.key]) return fail('This page cannot have a custom web address.');
      else if (RESERVED_SLUGS.includes(slug)) return fail('That address is reserved. Please choose another.');
      else {
        const takenByDefault = Object.entries(DEFAULT_SLUGS).some(([k, d]) => k !== req.params.key && d === slug);
        const takenByCustom = await Page.exists({ key: { $ne: req.params.key }, 'seo.slug': slug });
        if (takenByDefault || takenByCustom) return fail('Another page already uses this address.');
      }
    }

    const update = { key: req.params.key };
    // The editor only sends texts that differ from the default wording. For most texts "empty" means "use the default",
    // so the editor never sends them; a link that was cleared on purpose (a hidden social icon) is sent as an empty text and kept.
    if (parsed.data.content) update.content = parsed.data.content;
    if (parsed.data.seo) update.seo = parsed.data.seo;

    const before = await Page.findOne({ key: req.params.key }).lean();
    const doc = await Page.findOneAndUpdate({ key: req.params.key }, update, { new: true, upsert: true, setDefaultsOnInsert: true });
    if (parsed.data.seo && before?.seo?.image && before.seo.image !== doc.seo.image) await removeImageIfUnused(before.seo.image);
    // pictures that were replaced on this page are deleted once nothing uses them any more
    if (parsed.data.content && before?.content) {
      for (const [field, oldValue] of Object.entries(before.content)) {
        if (isImageKey(field) && oldValue && oldValue !== doc.content?.[field]) await removeImageIfUnused(oldValue);
      }
    }
    res.json({ content: doc.content, seo: doc.seo });
  } catch (err) {
    next(err);
  }
});

export default router;
