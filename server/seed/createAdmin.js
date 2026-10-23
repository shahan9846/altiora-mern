// Creates (or resets the password of) the dashboard admin from ADMIN_EMAIL / ADMIN_PASSWORD in .env.
// Run with `npm run create-admin` (from server/).
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../src/models/User.js';

const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in server/.env first');
if (ADMIN_PASSWORD.length < 12) throw new Error('ADMIN_PASSWORD must be at least 12 characters (use a long phrase)');
if (/^(password|admin|123456|qwerty)/i.test(ADMIN_PASSWORD)) throw new Error('ADMIN_PASSWORD is too easy to guess');

await mongoose.connect(process.env.MONGODB_URI);
const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
await User.findOneAndUpdate(
  { email: ADMIN_EMAIL.toLowerCase() },
  { email: ADMIN_EMAIL.toLowerCase(), passwordHash, name: 'Admin' },
  { upsert: true, new: true, setDefaultsOnInsert: true }
);
console.log(`Admin ready: ${ADMIN_EMAIL}`);
await mongoose.disconnect();
