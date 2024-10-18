const mongoose = require('mongoose');

const likeschema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: String,
    required: true
  }

},
  {
    timestamps: true
  });


const like_model = mongoose.model('like', likeschema);

module.exports = like_model;