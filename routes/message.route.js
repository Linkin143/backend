import express from 'express';
import { createMessage } from '../controllers/messageController.js';

const router = express.Router();

// @route   POST /api/messages
// @desc    Send a message and trigger automated emails
router.post('/', createMessage);

export default router;