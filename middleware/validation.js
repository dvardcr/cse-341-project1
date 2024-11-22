const { body } = require('express-validator');

const validateUserCreation = [
    body('firstName').trim().escape().notEmpty().withMessage('First name is required'),
    body('lastName').trim().escape().notEmpty().withMessage('Last name is required'),
    body('email').trim().escape().notEmpty().isEmail().withMessage('Please provide a valid email address'),
    body('favoriteColor').trim().escape().notEmpty().withMessage('Favorite color is required'),
    body('birthday')
        .notEmpty().withMessage('Birthday is required')
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Birthday must be in yyyy-mm-dd format')
        .isISO8601().withMessage('Invalid date')
        .toDate()
];

const validateUserUpdate = [
    body('firstName').trim().escape().optional().notEmpty().withMessage('First name cannot be empty if provided'),
    body('lastName').trim().escape().optional().notEmpty().withMessage('Last name cannot be empty if provided'),
    body('email').trim().escape().optional().notEmpty().isEmail().withMessage('Please provide a valid email address'),
    body('favoriteColor').trim().escape().optional().notEmpty().withMessage('Favorite color cannot be empty if provided'),
    body('birthday')
        .optional()
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Birthday must be in yyyy-mm-dd format')
        .isISO8601().withMessage('Invalid date')
        .toDate()
];

module.exports = { validateUserCreation, validateUserUpdate };