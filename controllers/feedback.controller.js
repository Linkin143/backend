import Feedback from '../models/feedback';

export const submitFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.create(req.body);
        res.status(201).json({ success: true, data: feedback });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

export const getApprovedFeedback = async (req, res) => {
    try {
        // Fetch only if consent is given; sorted by newest first
        const feedBacks = await Feedback.find({ consent: true }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: feedBacks });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};