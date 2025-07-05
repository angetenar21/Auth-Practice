const port = 3000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const layouts = require('express-ejs-layouts');
const userController = require('./controllers/userController');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(layouts);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/user1DB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});