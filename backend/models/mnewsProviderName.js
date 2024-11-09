const mongoose = require('mongoose');

const newsProviderNameschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true
  }
},
  {
    timestamps: true
  });

const newsProviderNamemodel = mongoose.model('newsProviderName', newsProviderNameschema);

module.exports = newsProviderNamemodel;