const mongoose = require('mongoose');

const postModal = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  state: { type: String },
})

module.exports = mongoose.model('State', postModal);
