// routes/customers.js

const express = require('express');
const router = express.Router();
const CustomerModel = require('../models/Customer');

// Route to handle customer payments and store payment history
router.put('/:customerId/pay', async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const updatedCustomer = req.body;
    // Update the customer in the database
    const customer = await CustomerModel.findByIdAndUpdate(customerId, updatedCustomer, { new: true });

    res.json({ message: 'Payment successful', customer });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
