import mongoose from 'mongoose';

// One document per submission of the contact form or the "Request a Consultation" popup.
const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    service: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, required: true, maxlength: 3000 },
    source: { type: String, enum: ['contact', 'consultation'], default: 'contact' },
    // Admin dashboard workflow
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new', index: true },
  },
  { timestamps: true }
);

export default mongoose.model('Enquiry', enquirySchema);
