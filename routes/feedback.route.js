import express from 'express';
import { getApprovedFeedback, submitFeedback } from '../controllers/feedbackController.js';
import { feedbackValidation } from '../middleware/validator.js';

const router = express.Router();

router.post('/', feedbackValidation, submitFeedback);
router.get('/', getApprovedFeedback);

export default router;