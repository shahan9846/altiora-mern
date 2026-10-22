import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import programRoutes from './routes/programs.js';
import categoryRoutes from './routes/categories.js';
import enquiryRoutes from './routes/enquiries.js';
import authRoutes from './routes/auth.js';
import statsRoutes from './routes/stats.js';

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

  app.get('/api/health', (req, res) => res.json({ ok: true }));
  app.use('/api/auth', authRoutes);
  app.use('/api/admin', statsRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/programs', programRoutes);
  // Limit form spam: 20 submissions per IP every 15 minutes
  app.post('/api/enquiries', rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }));
  app.use('/api/enquiries', enquiryRoutes);

  app.use('/api', (req, res) => res.status(404).json({ message: 'Not found' }));

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  });

  return app;
}
