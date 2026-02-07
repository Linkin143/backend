import express from 'express';
import { getApprovedFeedback, submitFeedback } from '../controllers/feedback.controller.js';
import { feedbackValidation } from '../middlewares/validator.middleware.js';

const router = express.Router();

router.post('/', feedbackValidation, submitFeedback);
router.get('/', getApprovedFeedback);

export default router;