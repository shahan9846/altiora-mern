import { Router } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import Program from '../models/Program.js';
import Category from '../models/Category.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const programSchema = z.object({
  category: z.string().refine((v) => mongoose.isValidObjectId(v), 'Choose a category'),
  title: z.string().trim().min(1, 'Title is required').max(160),
  description: z.string().trim().min(1, 'Description is required').max(600),
  outcomes: z.array(z.string().trim().min(1).max(200)).max(10),
});

const validId = (req, res, next) =>
  mongoose.isValidObjectId(req.params.id) ? next() : res.status(404).json({ message: 'Not found' });

const invalid = (res, parsed) =>
  res.status(400).json({ message: 'Please check the highlighted fields.', errors: parsed.error.flatten().fieldErrors });

const noCategory = (res) =>
  res.status(400).json({ message: 'Please check the highlighted fields.', errors: { category: ['That category no longer exists'] } });

// Public: GET /api/programs                -> every training program (category is { _id, name })
//         GET /api/programs?category=<id>  -> only that category
router.get('/', async (req, res, next) => {
  try {
    const filter = mongoose.isValidObjectId(req.query.category) ? { category: req.query.category } : {};
    res.json(await Program.find(filter).populate('category', 'name').sort({ _id: 1 }).lean());
  } catch (err) {
    next(err);
  }
});

// Admin only below
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const parsed = programSchema.safeParse(req.body);
    if (!parsed.success) return invalid(res, parsed);
    if (!(await Category.exists({ _id: parsed.data.category }))) return noCategory(res);
    const doc = await Program.create(parsed.data);
    res.status(201).json(await doc.populate('category', 'name'));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', requireAuth, validId, async (req, res, next) => {
  try {
    const parsed = programSchema.safeParse(req.body);
    if (!parsed.success) return invalid(res, parsed);
    if (!(await Category.exists({ _id: parsed.data.category }))) return noCategory(res);
    const doc = await Program.findByIdAndUpdate(req.params.id, parsed.data, { new: true }).populate('category', 'name');
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireAuth, validId, async (req, res, next) => {
  try {
    const doc = await Program.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
