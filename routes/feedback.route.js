import express from 'express';
import { getApprovedFeedback, submitFeedback } from '../controllers/feedback.controller';

const router = express.Router();

// @route   POST /api/feedback
// @desc    Submit new client feedback
router.post('/', submitFeedback);

// @route   GET /api/feedback
// @desc    Get all feedback to display on the frontend
router.get('/', getApprovedFeedback);

export default router;