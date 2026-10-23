import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import programRoutes from './routes/programs.js';
import categoryRoutes from './routes/categories.js';
import serviceRoutes from './routes/services.js';
import pageRoutes from './routes/pages.js';
import careerServiceRoutes from './routes/careerServices.js';
import imageRoutes from './routes/images.js';
import enquiryRoutes from './routes/enquiries.js';
import authRoutes from './routes/auth.js';
import statsRoutes from './routes/stats.js';
import notificationRoutes from './routes/notifications.js';

export function createApp() {
  const app = express();

  // On Render the app sits behind a proxy; trust it so rate limits count each visitor's real IP
  app.set('trust proxy', 1);

  // CLIENT_URL may hold several website addresses separated by commas (no trailing slash needed)
  const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim().replace(/\/+$/, ''))
    .filter(Boolean);

  app.use(helmet());
  app.use(cors({ origin: allowedOrigins }));
  app.use(express.json({ limit: '10kb' }));

  // A general limit on API use per visitor (the login and enquiry routes below have stricter ones)
  app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 1200, standardHeaders: true, legacyHeaders: false }));

  app.get('/api/health', (req, res) => res.json({ ok: true }));
  app.use('/api/auth', authRoutes);
  app.use('/api/admin', statsRoutes);
  app.use('/api/admin/notifications', notificationRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/pages', pageRoutes);
  app.use('/api/career-services', careerServiceRoutes);
  app.use('/api/images', imageRoutes);
  app.use('/api/programs', programRoutes);
  // Limit form spam: 20 submissions per IP every 15 minutes
  app.post('/api/enquiries', rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }));
  app.use('/api/enquiries', enquiryRoutes);

  app.use('/api', (req, res) => res.status(404).json({ message: 'Not found' }));

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // bad requests (broken JSON, body too large) are the sender's mistake, not a server fault
    if (err.type === 'entity.parse.failed') return res.status(400).json({ message: 'Invalid request' });
    if (err.type === 'entity.too.large') return res.status(413).json({ message: 'Request is too large' });
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  });

  return app;
}
