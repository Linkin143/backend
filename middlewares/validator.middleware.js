import { body, validationResult } from 'express-validator';

// Helper to handle the response if validation fails
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false, 
            errors: errors.array().map(err => ({ field: err.path, message: err.msg })) 
        });
    }
    next();
};

// Validation for "Send Us a Message" form
export const messageValidation = [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters long'),
    validate
];

// Validation for "Share Your Experience" (Feedback) form
export const feedbackValidation = [
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('companyName').trim().notEmpty().withMessage('Company name is required'),
    body('feedback').isLength({ min: 5 }).withMessage('Feedback cannot be empty'),
    body('consent').equals('true').withMessage('You must give consent to display feedback'),
    validate
];