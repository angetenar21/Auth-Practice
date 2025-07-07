const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register routes
router.get('/register', authController.registerForm);
router.post('/register', authController.registerUser);
router.get('/login', authController.loginForm);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logout);
router.get('/session-test', (req, res) => {
  res.send(req.session);
});

router.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('User is authenticated');
  } else {
    res.send('User is NOT authenticated');
  }
});

module.exports = router;