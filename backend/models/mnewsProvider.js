const mongoose = require('mongoose');

const newsProviderschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  baseURL: {
    type: String,
    required: true,
    unique: true
  },
  logo: {
    type: String,
    required: true,
  },
  followers: {
    type: [String],
  },
  provider_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
},
  {
    timestamps: true
  });

const newsProvidermodel = mongoose.model('newsProvider', newsProviderschema);

module.exports = newsProvidermodel;