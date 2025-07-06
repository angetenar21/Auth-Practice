const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register routes
router.get('/register', authController.registerForm);
router.post('/register', authController.registerUser);
router.get('/login', authController.loginForm);
router.post('/login', authController.loginUser);

module.exports = router;