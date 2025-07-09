const port = 3000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const layouts = require('express-ejs-layouts');
const testerRoutes = require('./routes/router');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/passport'); // Passport configuration

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(layouts);
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', testerRoutes);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

mongoose.connect('mongodb://localhost:27017/testerDB')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});  