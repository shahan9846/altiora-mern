import { Router } from 'express';
import { z } from 'zod';
import Service, { SERVICE_ICONS } from '../models/Service.js';
import { requireAuth } from '../middleware/auth.js';
import { validId, invalid } from '../middleware/validate.js';
import { IMAGE_PATH, removeImageIfUnused } from '../utils/images.js';

const router = Router();

const serviceSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(120),
  description: z.string().trim().min(1, 'Description is required').max(1200),
  image: z.string().refine((v) => IMAGE_PATH.test(v), 'Please upload an image'),
  imageAlt: z.string().trim().max(160).optional().default(''),
  // optional SEO fields (empty = use the service title and description)
  seoTitle: z.string().trim().max(120).optional().default(''),
  seoDescription: z.string().trim().max(320).optional().default(''),
  icon: z.enum(SERVICE_ICONS).optional(), // not sent by the dashboard form: new services get the default, edits keep theirs
  order: z.coerce.number().int().min(0).max(9999).optional(),
});

const slugify = (text) =>
  text.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') || 'service';

async function uniqueSlug(title) {
  const base = slugify(title);
  let slug = base;
  for (let n = 2; await Service.exists({ slug }); n += 1) slug = `${base}-${n}`;
  return slug;
}

// Public: GET /api/services -> every service in display order
router.get('/', async (req, res, next) => {
  try {
    res.json(await Service.find().sort({ order: 1, createdAt: 1 }).lean());
  } catch (err) {
    next(err);
  }
});

// Public: GET /api/services/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const doc = await Service.findOne({ slug: req.params.slug }).lean();
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

// Admin only below
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const parsed = serviceSchema.safeParse(req.body);
    if (!parsed.success) return invalid(res, parsed);
    const data = { ...parsed.data, slug: await uniqueSlug(parsed.data.title) };
    if (data.order === undefined) {
      const last = await Service.findOne().sort({ order: -1 }).lean();
      data.order = last ? last.order + 1 : 1;
    }
    res.status(201).json(await Service.create(data));
  } catch (err) {
    next(err);
  }
});

// The slug is not editable, so existing links to the service keep working
router.put('/:id', requireAuth, validId, async (req, res, next) => {
  try {
    const parsed = serviceSchema.safeParse(req.body);
    if (!parsed.success) return invalid(res, parsed);
    const before = await Service.findById(req.params.id).lean();
    if (!before) return res.status(404).json({ message: 'Not found' });
    const doc = await Service.findByIdAndUpdate(req.params.id, parsed.data, { new: true, runValidators: true });
    if (before.image !== doc.image) await removeImageIfUnused(before.image); // the replaced picture is no longer needed
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireAuth, validId, async (req, res, next) => {
  try {
    const doc = await Service.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    await removeImageIfUnused(doc.image);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
