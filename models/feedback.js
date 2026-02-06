import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    companyName: { type: String, required: true },
    industry: { type: String },
    feedback: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    consent: { type: Boolean, required: true }
}, { timestamps: true });

export default mongoose.model('Feedback', feedbackSchema);