// One-off script: loads the categories (categories.data.js) and training programs (programs.data.js)
// into MongoDB. Run with `npm run seed` (from server/).
// It WIPES the programs collection first; categories that already exist are kept as they are.
import 'dotenv/config';
import mongoose from 'mongoose';
import Category from '../src/models/Category.js';
import Program from '../src/models/Program.js';
import { CATEGORIES } from './categories.data.js';
import { PROGRAMS } from './programs.data.js';

await mongoose.connect(process.env.MONGODB_URI);

for (const c of CATEGORIES) {
  await Category.updateOne({ name: c.name }, { $setOnInsert: c }, { upsert: true, collation: { locale: 'en', strength: 2 } });
}
const ids = new Map((await Category.find().lean()).map((c) => [c.name, c._id]));

await Program.deleteMany({});
await Program.insertMany(PROGRAMS.map((p) => ({ ...p, category: ids.get(p.category) })));
console.log(`Seeded ${CATEGORIES.length} categories and ${PROGRAMS.length} programs`);
await mongoose.disconnect();
