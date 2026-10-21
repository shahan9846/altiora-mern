import mongoose from 'mongoose';

// Training program categories, managed from the admin dashboard.
// Programs link to a category by id, so renaming a category updates every program in it.
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    order: { type: Number, default: 0 }, // display order on the Training page (lowest first)
  },
  { timestamps: true }
);

// Names are unique regardless of upper/lower case
categorySchema.index({ name: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

export default mongoose.model('Category', categorySchema);
