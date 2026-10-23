// One-time load of the five starting services into MongoDB. Run with `npm run seed-services` (from server/).
// Safe to run again: a service is only added if none with the same slug or title exists, nothing is overwritten or deleted.
import 'dotenv/config';
import mongoose from 'mongoose';
import Service from '../src/models/Service.js';
import { SERVICES } from './services.data.js';

await mongoose.connect(process.env.MONGODB_URI);
console.log(`Database: ${mongoose.connection.host}/${mongoose.connection.name}`);

let added = 0;
for (const s of SERVICES) {
  const result = await Service.updateOne({ $or: [{ slug: s.slug }, { title: s.title }] },{ $setOnInsert: s }, { upsert: true });
  if (result.upsertedCount) { added += 1; console.log(`+ ${s.title}`); }
}
console.log(`Done: ${added} added, ${SERVICES.length - added} already existed`);
await mongoose.disconnect();
