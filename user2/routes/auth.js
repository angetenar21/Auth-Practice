const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register route
router.get('/register', userController.registerForm);
// Handle registration form submission
router.post('/register', userController.registerUser);


module.exports = router;