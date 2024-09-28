const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: Number,
    name: String,
    mobile: Number,
    openingDate: Date,
    dueAmt: Number,
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
