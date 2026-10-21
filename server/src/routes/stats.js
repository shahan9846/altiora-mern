import { Router } from 'express';
import Enquiry from '../models/Enquiry.js';
import Program from '../models/Program.js';
import Category from '../models/Category.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/admin/stats  -> numbers for the dashboard home page
router.get('/stats', requireAuth, async (req, res, next) => {
  try {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [byStatus, lastWeek, categories, programCounts, recent] = await Promise.all([
      Enquiry.aggregate([{ $group: { _id: { $ifNull: ['$status', 'new'] }, count: { $sum: 1 } } }]),
      Enquiry.countDocuments({ createdAt: { $gte: weekAgo } }),
      Category.find().sort({ order: 1, name: 1 }).lean(),
      Program.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]),
      Enquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const status = { new: 0, contacted: 0, closed: 0 };
    byStatus.forEach((s) => { status[s._id] = s.count; });
    const perCategory = new Map(programCounts.map((c) => [String(c._id), c.count]));

    res.json({
      enquiries: { total: status.new + status.contacted + status.closed, lastWeek, ...status },
      programs: {
        total: programCounts.reduce((n, c) => n + c.count, 0),
        byCategory: categories.map((c) => ({ category: c.name, count: perCategory.get(String(c._id)) || 0 })),
      },
      recent,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
