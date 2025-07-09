const mongoose = require('mongoose');

const testerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false, // Exclude password from queries by default
  }
});

const Tester = mongoose.model('Tester', testerSchema);