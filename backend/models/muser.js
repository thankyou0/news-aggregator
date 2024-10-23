const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['READER', 'PROVIDER'],
    default: "READER"
  },
  certificate: {
    type: String,
    required: function () {
      return this.role === 'PROVIDER';
    }
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  age: {
    type: Number,
  },
  topics: [
    {
      type: String
    }
  ],
});

const usermodel = mongoose.model('user', userschema);

module.exports = usermodel;