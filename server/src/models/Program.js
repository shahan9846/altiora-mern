import mongoose from 'mongoose';

const programSchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    outcomes: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('Program', programSchema);
