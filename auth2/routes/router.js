const express = require('express');
const router = express.Router();
const testerController = require('../controllers/testerController');

// Register routes
router.get('/register', testerController.registerForm);
router.post('/register', testerController.registerTester);

// Login routes
router.get('/login', testerController.loginForm);
router.post('/login', testerController.loginTester);

// Dashboard route
router.get('/dashboard', testerController.dashboard);

// Logout route
router.get('/logout', testerController.logout);

module.exports = router;