import mongoose from 'mongoose';

// A service shown on the home slider, the Services page, its own page and the contact form.
// `slug` is the web address (/services/<slug>) and never changes after the service is created.
const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    // Shown on the service page; a blank line starts a new paragraph. The cards show the first paragraph.
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },                // e.g. /assets/svc-training-new.jpg
    imageAlt: { type: String, default: '' },                // alt text of the image; empty = use the title
    icon: { type: String, default: 'building' },          // key of a ready-made icon (not edited in the dashboard)
    seoTitle: { type: String, default: '' },        // optional; empty = use the title
    seoDescription: { type: String, default: '' },  // optional; empty = use the description
    order: { type: Number, default: 0 },                    // display order (lowest first)
  },
  { timestamps: true }
);

export const SERVICE_ICONS = ['building', 'book', 'people', 'target', 'shield', 'chart', 'award'];

export default mongoose.model('Service', serviceSchema);
