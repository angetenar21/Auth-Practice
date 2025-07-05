const port = 3000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const layouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(layouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase!')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Import routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
