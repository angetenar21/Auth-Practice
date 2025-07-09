const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Tester = require('../models/tester');

// Configure Passport Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
}, async (name, password, done) => {
  try {
    // Find tester by name
    const tester = await Tester.findOne({ name });
    if (!tester) {
      return done(null, false, { message: 'Incorrect name.' });
    } else {
      // Compare password
      const isMatch = await bcrypt.compare(password, tester.password);
      if (isMatch) {
        return done(null, tester);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    return done(error);
  }
}));

// Serialize user
passport.serializeUser((tester, done) => {
  done(null, tester.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const tester = await Tester.findById(id);
    done(null, tester);
  } catch (error) {
    done(error, null);
  }
});