// One-time migration for databases that already hold services in the earlier, longer format
// (intro + who-it-is-for + 3 points + key benefits). Each service gets one `description`
// (intro and who-it-is-for as two paragraphs) and the old fields are removed.
// Run with `npm run migrate-services` (from server/). Safe to run again.
import 'dotenv/config';
import mongoose from 'mongoose';

await mongoose.connect(process.env.MONGODB_URI);
console.log(`Database: ${mongoose.connection.host}/${mongoose.connection.name}`);
const services = mongoose.connection.db.collection('services');

let migrated = 0;
for (const s of await services.find({ description: { $exists: false } }).toArray()) {
  const description = [s.lede, s.audience, s.cardText].filter(Boolean).slice(0, 2).join('\n\n') || s.title;
  await services.updateOne(
    { _id: s._id },
    { $set: { description }, $unset: { lede: '', audience: '', cardText: '', features: '', benefits: '' } }
  );
  migrated += 1;
  console.log(`  ${s.title}`);
}
console.log(`Migrated ${migrated} service(s).`);
await mongoose.disconnect();
