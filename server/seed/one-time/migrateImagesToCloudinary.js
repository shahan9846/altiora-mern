// One-time migration: moves every picture that is stored in MongoDB to Cloudinary and updates the links.
//   1. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to server/.env
//   2. npm run migrate-images            -> shows what would happen, changes nothing
//   3. npm run migrate-images -- --apply -> uploads the pictures and updates pages, SEO pictures and services
// The old copies stay in MongoDB (nothing is deleted), so the website keeps working while you check the result.
// Safe to run again: pictures that were already moved are skipped.
import 'dotenv/config';
import mongoose from 'mongoose';
import Image from '../../src/models/Image.js';
import Page from '../../src/models/Page.js';
import Service from '../../src/models/Service.js';
import { cloudinaryConfigured, uploadToCloudinary } from '../../src/utils/cloudinary.js';

const apply = process.argv.includes('--apply');
if (!cloudinaryConfigured()) {
  console.error('Cloudinary is not set up: add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to server/.env');
  process.exit(1);
}

await mongoose.connect(process.env.MONGODB_URI);
console.log(`Database: ${mongoose.connection.host}/${mongoose.connection.name}`);
console.log(apply ? 'Mode: APPLY (uploading and updating)' : 'Mode: preview only (add --apply to really do it)');

const OLD = /^\/api\/images\/[a-f0-9]{24}$/i;
const pages = await Page.find();
const services = await Service.find();

// every old picture address that is still used somewhere
const used = new Set();
for (const p of pages) {
  for (const v of Object.values(p.content || {})) if (OLD.test(v)) used.add(v);
  if (OLD.test(p.seo?.image || '')) used.add(p.seo.image);
}
for (const s of services) if (OLD.test(s.image || '')) used.add(s.image);
console.log(`${used.size} stored picture(s) are in use.`);

// upload each one and remember its new address
const moved = new Map();
for (const oldUrl of used) {
  const doc = await Image.findById(oldUrl.split('/').pop()).lean();
  if (!doc) { console.log(`  ${oldUrl}  -> missing in the database, skipped`); continue; }
  if (!apply) { console.log(`  ${oldUrl}  (${Math.round(doc.size / 1024)} KB) would be uploaded`); continue; }
  const newUrl = await uploadToCloudinary(Buffer.from(doc.data.buffer ? doc.data.buffer : doc.data));
  moved.set(oldUrl, newUrl);
  console.log(`  ${oldUrl}  -> ${newUrl}`);
}

if (apply) {
  for (const p of pages) {
    let changed = false;
    for (const [field, value] of Object.entries(p.content || {})) {
      if (moved.has(value)) { p.content[field] = moved.get(value); changed = true; }
    }
    if (moved.has(p.seo?.image)) { p.seo.image = moved.get(p.seo.image); changed = true; }
    if (changed) { p.markModified('content'); await p.save(); console.log(`Updated page "${p.key}"`); }
  }
  for (const s of services) {
    if (moved.has(s.image)) { s.image = moved.get(s.image); await s.save(); console.log(`Updated service "${s.title}"`); }
  }
  console.log(`Done. ${moved.size} picture(s) moved. Check the website, then the old copies can be removed from MongoDB.`);
}
await mongoose.disconnect();
