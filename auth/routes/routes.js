const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Register routes
router.get('/', userController.homePage);
router.get('/register', userController.registerForm);
router.post('/register', userController.registerUser);
router.get('/login', userController.loginForm);
router.post('/login', userController.loginUser);
// Logout user
router.get('/logout', userController.logoutUser);

// Dashboard (protected)
router.get('/dashboard', userController.dashboard);

module.exports = router;