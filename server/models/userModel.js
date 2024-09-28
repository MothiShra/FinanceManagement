const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  openingDate: Date,
  dueAmt: Number,
});

const UserSchema = mongoose.model('userdata', userSchema);

module.exports = UserSchema;
