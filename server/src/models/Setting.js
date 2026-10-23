import mongoose from 'mongoose';

// Private settings edited in the dashboard (not shown on the public website), e.g. who gets the enquiry emails.
const settingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    value: { type: mongoose.Schema.Types.Mixed, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Setting', settingSchema);
