const user = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');


//register form
exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

//register user
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create user
    await user.create({
      username: username,
      password: hashedPassword
    });
    req.flash('success_msg', 'You have registered successfully!');
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    req.flash('error_msg', 'Error creating user');
    res.redirect('/register');
  }
};

//login form
exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
}

//login user
exports.loginUser = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('error_msg', info.message || 'Invalid credentials');
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success_msg', 'You are logged in');
      req.session.user = user;
      return res.redirect('/dashboard');
    });
  })(req, res, next);
};

exports.dashboard = (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.render('dashboard', { username: req.user.username });
};

exports.logoutUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
}