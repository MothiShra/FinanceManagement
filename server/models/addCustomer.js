// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  accountNumber: String,
  name: String,
  areaName: String,
  amountToBePaid: Number,
  dueAmt: { type: Number, default: 0 }, // Default dueAmt to 0
  payments: [{
    date: { type: Date, default: Date.now }, // Date of the payment
    amount: Number, // Amount paid
  }],
});

const CustomerModel = mongoose.model('Customer', customerSchema);

module.exports = CustomerModel;
