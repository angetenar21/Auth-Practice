const bcrypt = require('bcrypt');
const User = require('../models/user');

// register form

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

// register user
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      password: hashedPassword
    });
    res.render('success');
  } catch (error) {
    console.error('Error registering user:', error);
    res.render('error', { title: 'Registration Error', message: 'An error occurred while registering the user.' });
  }
};