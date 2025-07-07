const user = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

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

exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.render('error', { message: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.render('loginSuccess', { username: user.username });
    });
  })(req, res, next);
};


exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
};

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};