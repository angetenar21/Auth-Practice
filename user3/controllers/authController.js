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