// One-time load of the eight starting Career Guidance cards. Run with `npm run seed-career-services` (from server/).
// Safe to run again: a card is only added if none with the same title exists; nothing is overwritten or deleted.
import 'dotenv/config';
import mongoose from 'mongoose';
import CareerService from '../src/models/CareerService.js';
import { CAREER_SERVICES } from './careerServices.data.js';

await mongoose.connect(process.env.MONGODB_URI);
console.log(`Database: ${mongoose.connection.host}/${mongoose.connection.name}`);

let added = 0;
for (const c of CAREER_SERVICES) {
  const result = await CareerService.updateOne({ title: c.title }, { $setOnInsert: c }, { upsert: true });
  if (result.upsertedCount) { added += 1; console.log(`+ ${c.title}`); }
}
console.log(`Done: ${added} added, ${CAREER_SERVICES.length - added} already existed`);
await mongoose.disconnect();
