import { Router } from 'express';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import User from '../models/User.js';
import { requireAuth, signToken } from '../middleware/auth.js';

const router = Router();

const loginSchema = z.object({ email: z.string().trim().email(), password: z.string().min(1) });

// 10 attempts per IP every 15 minutes
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    const invalid = () => res.status(401).json({ message: 'Incorrect email or password' });
    if (!parsed.success) return invalid();

    const user = await User.findOne({ email: parsed.data.email.toLowerCase() });
    const ok = user && (await bcrypt.compare(parsed.data.password, user.passwordHash));
    if (!ok) return invalid();

    res.json({ token: signToken(user), user: { name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.sub).lean();
    if (!user) return res.status(401).json({ message: 'Account no longer exists' });
    res.json({ name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
});

export default router;
