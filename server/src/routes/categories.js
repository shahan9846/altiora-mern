import { Router } from 'express';
import { z } from 'zod';
import Category from '../models/Category.js';
import Program from '../models/Program.js';
import { requireAuth } from '../middleware/auth.js';
import { validId, invalid } from '../middleware/validate.js';

const router = Router();

const categorySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  description: z.string().trim().max(600).optional().default(''),
  order: z.coerce.number().int().min(0).max(9999).optional(),
});

const duplicate = (res) => res.status(409).json({ message: 'A category with this name already exists.', errors: { name: ['Already exists'] } });

// Public: GET /api/categories -> every category in display order, with how many programs it holds
router.get('/', async (req, res, next) => {
  try {
    const [categories, counts] = await Promise.all([
      Category.find().sort({ order: 1, name: 1 }).lean(),
      Program.aggregate([{ $group: { _id: '$category', n: { $sum: 1 } } }]),
    ]);
    const byId = new Map(counts.map((c) => [String(c._id), c.n]));
    res.json(categories.map((c) => ({ ...c, programCount: byId.get(String(c._id)) || 0 })));
  } catch (err) {
    next(err);
  }
});

// Admin only below
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const parsed = categorySchema.safeParse(req.body);
    if (!parsed.success) return invalid(res, parsed);
    const data = { ...parsed.data };
    if (data.order === undefined) {
      const last = await Category.findOne().sort({ order: -1 }).lean();
      data.order = last ? last.order + 1 : 1;
    }
    res.status(201).json(await Category.create(data));
  } catch (err) {
    if (err.code === 11000) return duplicate(res);
    next(err);
  }
});

router.put('/:id', requireAuth, validId, async (req, res, next) => {
  try {
    const parsed = categorySchema.safeParse(req.body);
    if (!parsed.success) return invalid(res, parsed);
    const doc = await Category.findByIdAndUpdate(req.params.id, parsed.data, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) {
    if (err.code === 11000) return duplicate(res);
    next(err);
  }
});

// A category that still has programs can't be deleted (move or delete those programs first)
router.delete('/:id', requireAuth, validId, async (req, res, next) => {
  try {
    const inUse = await Program.countDocuments({ category: req.params.id });
    if (inUse > 0) {
      return res.status(409).json({
        message: `This category still has ${inUse} program${inUse === 1 ? '' : 's'}. Move or delete ${inUse === 1 ? 'it' : 'them'} first.`,
      });
    }
    const doc = await Category.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
