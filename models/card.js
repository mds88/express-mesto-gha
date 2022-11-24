const mongoose = require('mongoose');

const urlRegexp = /https?:\/{2}\b[^\.][\w\-\.]{1,}\.[a-z]{2,6}([\w\S]{1,})?/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator: function(url) {
        return urlRegexp.test(url);
      },
      message: props => `${props.value} is not a valid url!`
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
