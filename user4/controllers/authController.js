const user = require('../models/user');
const bcrypt = require('bcrypt');

//register form

exports.registerForm = (req, res) => {
  res.render('register');
}

//register user
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.create({
      username: username,
      password: hashedPassword
    });
    res.render('success', { username });
  }
  catch (err) {
    console.error(err);
    res.render('error', { message: 'Registration failed. Please try again.' });
  }
};

//login form
exports.loginForm = (req, res) => {
  res.render('login');
}

//login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const foundUser = await user.findOne({ username });
    if (foundUser && await bcrypt.compare(password, foundUser.password)) {
      res.render('loginSuccess', { username });
    }
    else {
      res.render('error', { message: 'Invalid username or password.' });
    }
  }
  catch (err) {
    console.error(err);
    res.render('error', { message: 'Login failed. Please try again.' });
  }
};