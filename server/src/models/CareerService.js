import mongoose from 'mongoose';

// One of the support cards on the Career Guidance page ("Practical Support for Your Next Step"),
// managed from the admin dashboard.
const careerServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, default: 'target' }, // key of a ready-made icon (not edited in the dashboard)
    order: { type: Number, default: 0 },       // display order (lowest first)
  },
  { timestamps: true }
);

export const CAREER_ICONS = ['target', 'document', 'chat', 'linkedin', 'building', 'swap', 'award', 'shield', 'chart', 'book', 'people'];

export default mongoose.model('CareerService', careerServiceSchema);
