import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    message: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);