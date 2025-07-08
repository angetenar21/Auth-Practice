const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const layouts = require('express-ejs-layouts');
const userRoutes = require('./routes/route');
const passport = require('passport');
require('./config/passport'); // Just to run the config
const flash = require('connect-flash');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(layouts);
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// Middleware to set flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userAuth')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use user routes
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});