import 'dotenv/config';
import { connectDB } from './config/db.js';
import { createApp } from './app.js';

if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not set (see server/.env.example)');
// a short secret can be guessed; on the live server it must be long and random
if (process.env.JWT_SECRET.length < 32) {
  if (process.env.NODE_ENV === 'production') throw new Error('JWT_SECRET is too short: use at least 32 random characters');
  console.warn('Warning: JWT_SECRET is shorter than 32 characters. Use a long random value before going live.');
}

await connectDB();
const port = process.env.PORT || 5000;
createApp().listen(port, () => console.log(`API running on http://localhost:${port}`));
