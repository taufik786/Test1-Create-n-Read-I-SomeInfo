const mongoose = require('mongoose');

const ChildModal = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  state: { type: String },
  district: { type: String },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
})

module.exports = mongoose.model('Child', ChildModal);
