import express from 'express';
import { createMessage } from '../controllers/messageController.js';
import { messageValidation } from '../middleware/validator.js';

const router = express.Router();

router.post('/', messageValidation, createMessage);

export default router;