const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    companyName: { type: String, required: true },
    industry: { type: String },
    feedback: { type: String, required: true },
    isApproved: { type: Boolean, default: false }, // Useful for moderation
    consent: { type: Boolean, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);