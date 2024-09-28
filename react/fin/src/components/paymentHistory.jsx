// CustomerPaymentHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CustomerPaymentHistory() {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const { customerId } = useParams();

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/customers/${customerId}/payment-history`);
        setPaymentHistory(response.data);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };

    fetchPaymentHistory();
  }, [customerId]);

  return (
    <div>
      <h2>Payment History</h2>
      {paymentHistory.length > 0 ? (
        <ul>
          {paymentHistory.map((payment) => (
            <li key={payment._id}>
              <strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}, <strong>Amount:</strong> ₹{payment.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No payment history available.</p>
      )}
    </div>
  );
}

export default CustomerPaymentHistory;
