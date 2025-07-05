const user = require('../models/user');
const bcrypt = require('bcrypt');

//Register form

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    await user.create({
      username,
      password: passwordHash
    });
    res.render('success', { username });
  } catch (error) {
    res.send(error);
  }
};

