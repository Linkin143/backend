import express from 'express';
import { createMessage } from '../controllers/message.controller.js';
import { messageValidation } from '../middlewares/validator.middleware.js';

const router = express.Router();

router.post('/', messageValidation, createMessage);

export default router;