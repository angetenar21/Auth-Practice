const user = require('../models/user');
const bcrypt = require('bcrypt');

//home page
exports.homePage = (req, res) => {
  res.render('home', { title: 'Home' });
}

//register form

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
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
    res.render('registerSuccess', { username });
  }
  catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
}

//login form
exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
}

//login user (using passport)
const passport = require('passport');
exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error logging in user:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (!user) {
      return res.status(401).send(info ? info.message : 'Invalid username or password');
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Error logging in user:', err);
        return res.status(500).send('Internal Server Error');
      }
      // Redirect to dashboard after successful login
      return res.redirect('/dashboard');
    });
  })(req, res, next);
}

// Dashboard (protected route)
exports.dashboard = (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.render('dashboard', { username: req.user.username });
}

// Logout user
exports.logoutUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
}