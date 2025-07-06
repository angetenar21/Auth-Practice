const user = require('../models/user');
const bcrypt = require('bcrypt');

//register form

exports.registerForm = (req, res) => {
  res.render('register');
}

//register user

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.create({
      username: username,
      password: hashedPassword
    });

    res.render('success', { username });
  }
  catch (err) {
    console.log(err);
  }
}

//show login form
exports.showLogin = (req, res) => {
  res.render('login');
};

//login user

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const foundUser = await user.findOne({ username });
    if (!foundUser) {
      return res.status(404).send('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }
    res.render('success1', { username: foundUser.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal Server Error');

  }
};
