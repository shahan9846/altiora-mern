// Sets the description and display order of the training areas to the wording in categories.data.js.
// Run with `npm run update-category-text` (from server/). Only categories with a matching name are touched;
// programs, other categories and category names are left as they are.
import 'dotenv/config';
import mongoose from 'mongoose';
import Category from '../src/models/Category.js';
import { CATEGORIES } from './categories.data.js';

await mongoose.connect(process.env.MONGODB_URI);
console.log(`Database: ${mongoose.connection.host}/${mongoose.connection.name}`);

let changed = 0;
for (const c of CATEGORIES) {
  const doc = await Category.findOne({ name: c.name }).collation({ locale: 'en', strength: 2 });
  if (!doc) { console.log(`- not found, skipped: ${c.name}`); continue; }
  if (doc.description !== c.description || doc.order !== c.order) {
    doc.description = c.description;
    doc.order = c.order;
    await doc.save();
    changed += 1;
    console.log(`~ ${c.name}`);
  }
}
console.log(`Done: ${changed} updated`);
await mongoose.disconnect();
