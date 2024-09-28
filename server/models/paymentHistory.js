const mongoose = require('mongoose');

const paymentHistorySchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  amountPaid: Number,
  date: { type: Date, default: Date.now }
});

const PaymentHistoryModel = mongoose.model('PaymentHistory', paymentHistorySchema);

module.exports = PaymentHistoryModel;
