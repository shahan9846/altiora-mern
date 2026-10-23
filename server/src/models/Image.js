import mongoose from 'mongoose';

// Photos uploaded from the admin dashboard. They are stored in MongoDB (not on the server's disk,
// which is wiped on free hosting) and served from /api/images/:id.
const imageSchema = new mongoose.Schema(
  {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    originalName: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Image', imageSchema);
