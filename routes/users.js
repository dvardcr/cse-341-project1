const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

//Get All
router.get('/', usersController.getAll);

//Get Single by Id
router.get('/:id', usersController.getSingle);

// Add new user
router.post('/', usersController.createUser);

// Modify user
router.put('/:id', usersController.updateUser);

// Remove user
router.delete('/:id', usersController.deleteUser);

module.exports = router;