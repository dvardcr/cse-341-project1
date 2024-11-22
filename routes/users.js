// routes/users.js
const express = require('express');
const router = express.Router();

// Import the controller and validation middleware
const usersController = require('../controllers/users');
const { validateUserCreation, validateUserUpdate } = require('../middleware/validation');
const { validationResult } = require('express-validator');

// Get All users
router.get('/', usersController.getAll);

// Get Single user by Id
router.get('/:id', usersController.getSingle);

// Add new user
router.post('/', validateUserCreation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, usersController.createUser);

// Modify user
router.put('/:id', validateUserUpdate, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, usersController.updateUser);

// Remove user
router.delete('/:id', usersController.deleteUser);

module.exports = router;