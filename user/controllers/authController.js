const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.showRegister = (req, res) => {
  res.render('register');
};

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    await User.create({ username, password: hashedPassword });

    res.render('success', { username });
  } catch (err) {
    res.status(500).send('Registration failed');
  }
};

