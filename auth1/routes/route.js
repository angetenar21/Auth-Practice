const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register routes
router.get('/register', userController.registerForm);
router.post('/register', userController.registerUser);

// Login routes
router.get('/login', userController.loginForm);
router.post('/login', userController.loginUser);

// Dashboard route
router.get('/dashboard', userController.dashboard);

// Logout route
router.get('/logout', userController.logoutUser);

module.exports = router;