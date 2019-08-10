const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  displayName: { type: String, required: true, index: true },
  bnet: {
    id: { type: Number, required: true, index: true },
    tag: { type: String, required: true, index: true },
    token: { type: String, required: true }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
