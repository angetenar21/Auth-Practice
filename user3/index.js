const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const layouts = require('express-ejs-layouts');
const routes = require('./routes/routes');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(layouts);

//connect to mongoDB

mongoose.connect('mongodb://localhost:27017/userAuth')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));




// Use routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 