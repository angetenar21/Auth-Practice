const tester = require('../models/tester');
const bcrypt = require('bcrypt');
const passport = require('../config/passport');


//register form
exports.registerForm = (req, res) => {
  res.render('register');
}

//register tester
exports.registerTester = async (req, res) => {
  const { name, password } = req.body;
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  await tester.create({
    name,
    password: hashedPassword
  });

  try {
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/login');
  } catch (error) {
    console.error('Error registering tester:', error);
    req.flash('error_msg', 'Error registering tester');
    res.redirect('/register');
  }
}

//login form
exports.loginForm = (req, res) => {
  res.render('login');
}

//login tester
exports.loginTester = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
}

//dashboard
exports.dashboard = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.render('dashboard', { name: req.user.name });
}

//logout
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/login');
  });
}