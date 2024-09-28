const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  LastName: String,
  FirstName: String,
  Email: String,
  Address: String,
  Password: String,
  Role: {
    type: String,
    default: "User",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Method to toggle the isActive state
UserSchema.methods.toggleActive = function () {
  this.isActive = !this.isActive;
  return this.save();
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
