import mongoose from 'mongoose';

// Editable text and SEO for one page of the website (home, about, contact, ...) or the site settings (key "site").
// Which fields exist, and their default wording, is defined in client/src/content/schema.js.
// Only fields the admin has changed are stored; anything missing falls back to the default.
const pageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    content: { type: mongoose.Schema.Types.Mixed, default: {} }, // { "hero.title": "…", … }
    seo: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      keywords: { type: String, default: '' },
      image: { type: String, default: '' }, // /assets/… or /api/images/<id>
      imageAlt: { type: String, default: '' }, // alt text of the share image
      slug: { type: String, default: '' },      // custom web address of the page, e.g. "about-us" (empty = the default address)
      canonical: { type: String, default: '' }, // custom canonical address (empty = the page's own address)
    },
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model('Page', pageSchema);
