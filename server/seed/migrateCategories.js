// One-time migration: programs used to store their category as plain text. This creates the
// Category documents and points every existing program at one by id. Nothing is deleted.
// Run with `npm run migrate-categories` (from server/). Safe to run again.
import 'dotenv/config';
import mongoose from 'mongoose';
import { CATEGORIES } from './categories.data.js';
import { PROGRAMS } from './programs.data.js';

const REMOVED = ['Team Building & Collaboration', 'HR & People Management', 'Professional Development'];
const FALLBACK = 'Workplace Effectiveness';

await mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection.db;
const categories = db.collection('categories');
const programs = db.collection('programs');
const collation = { locale: 'en', strength: 2 };

await categories.createIndex({ name: 1 }, { unique: true, collation });
for (const c of CATEGORIES) {
  await categories.updateOne({ name: c.name }, { $setOnInsert: { ...c, createdAt: new Date(), updatedAt: new Date() } }, { upsert: true, collation });
}
const idByName = async (name) => (await categories.findOne({ name }, { collation }))?._id;
const titleToCategory = new Map(PROGRAMS.map((p) => [p.title, p.category]));

let moved = 0;
for (const p of await programs.find({ category: { $type: 'string' } }).toArray()) {
  let name = titleToCategory.get(p.title) || p.category;
  if (REMOVED.includes(name)) {
    console.log(`  "${p.title}" was in removed category "${name}" -> ${FALLBACK}`);
    name = FALLBACK;
  }
  let id = await idByName(name);
  if (!id) {
    const order = (await categories.countDocuments()) + 1;
    id = (await categories.insertOne({ name, description: '', order, createdAt: new Date(), updatedAt: new Date() })).insertedId;
    console.log(`  created category "${name}" (used by a program that isn't in the seed data)`);
  }
  await programs.updateOne({ _id: p._id }, { $set: { category: id } });
  console.log(`  ${p.title}: "${p.category}" -> "${name}"`);
  moved += 1;
}
console.log(`Migrated ${moved} programs. Categories: ${await categories.countDocuments()}`);
await mongoose.disconnect();
