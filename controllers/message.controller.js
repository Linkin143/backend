import Message from '../models/message.js';
import { sendContactEmails } from '../utils/emailService.js';

export const createMessage = async (req, res) => {
    try {
        const newMessage = await Message.create(req.body);
        // Fire and forget email service so it doesn't block the response
        sendContactEmails(req.body).catch(err => console.error("Email Error:", err));
        
        res.status(201).json({ success: true, message: "Inquiry sent successfully" });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};