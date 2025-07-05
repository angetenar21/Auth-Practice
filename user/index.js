const express = require('express');
const mongoose = require('mongoose');
const layouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

// DB Connection
mongoose.connect('mongodb://localhost:27017/authApp')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.log('❌ DB Error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(layouts);
app.set('view engine', 'ejs');

// Routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

// Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});