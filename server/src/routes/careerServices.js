import { Router } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import CareerService, { CAREER_ICONS } from '../models/CareerService.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const careerServiceSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(120),
  description: z.string().trim().min(1, 'Description is required').max(300),
  icon: z.enum(CAREER_ICONS).optional(), // not sent by the dashboard form: new items get the default, edits keep theirs
  order: z.coerce.number().int().min(0).max(9999).optional(),
});

const validId = (req, res, next) =>
  mongoose.isValidObjectId(req.params.id) ? next() : res.status(404).json({ message: 'Not found' });

const invalid = (res, parsed) =>
  res.status(400).json({ message: 'Please check the highlighted fields.', errors: parsed.error.flatten().fieldErrors });

// Public: GET /api/career-services -> the Career Guidance cards in display order
router.get('/', async (req, res, next) => {
  try {
    res.json(await CareerService.find().sort({ order: 1, createdAt: 1 }).lean());
  } catch (err) {
    next(err);
  }
});

// Admin only below
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const parsed = careerServiceSchema.safeParse(req.body);
    if (!parsed.success) return invalid(res, parsed);
    const data = { ...parsed.data };
    if (data.order === undefined) {
      const last = await CareerService.findOne().sort({ order: -1 }).lean();
      data.order = last ? last.order + 1 : 1;
    }
    res.status(201).json(await CareerService.create(data));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', requireAuth, validId, async (req, res, next) => {
  try {
    const parsed = careerServiceSchema.safeParse(req.body);
    if (!parsed.success) return invalid(res, parsed);
    const doc = await CareerService.findByIdAndUpdate(req.params.id, parsed.data, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireAuth, validId, async (req, res, next) => {
  try {
    const doc = await CareerService.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
