import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './customerDisplay.css';

function CustomerDisplay() {
  const [customers, setCustomers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false); // State to toggle payment history visibility

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/customers');
        setCustomers(response.data.customers);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (customers.length > 0) {
        try {
          const response = await axios.get(`http://localhost:3001/customers/${customers[currentIndex]._id}/payment-history`);
          setPaymentHistory(response.data);
        } catch (error) {
          console.error('Error fetching payment history:', error);
        }
      }
    };

    fetchPaymentHistory();
  }, [currentIndex, customers]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % customers.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + customers.length) % customers.length);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePaid = async () => {
    try {
      const updatedCustomer = { ...customers[currentIndex] };
      const paymentAmount = updatedCustomer.amountToBePaid / 100; // Calculate the payment amount (1/100th of amountToBePaid)
  
      // Update dueAmt by subtracting the payment amount
      updatedCustomer.dueAmt -= paymentAmount;
  
      // Create the payment object
      const payment = {
        date: new Date(),
        amount: paymentAmount
      };
  
      // Push the payment object into the payments array
      updatedCustomer.payments.push(payment);
  
      // Update the customer data in the database
      const customerId = updatedCustomer._id; // Access the customerId
      const response = await axios.put(`http://localhost:3001/customers/${customerId}/pay`, { paymentAmount }); // Pass paymentAmount in the request body
      setCustomers((prevCustomers) => {
        const updatedCustomers = [...prevCustomers];
        updatedCustomers[currentIndex] = response.data.customer;
        return updatedCustomers;
      });
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const handleTogglePaymentHistory = () => {
    setShowPaymentHistory(!showPaymentHistory);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.accountNumber.includes(searchQuery) || customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">Customer Details</h2>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by Account Number or Name"
            value={searchQuery}
            onChange={handleSearch}
          />

          {filteredCustomers.length > 0 ? (
            <div>
              <div>
                <strong>Account Number:</strong> {filteredCustomers[currentIndex].accountNumber}
              </div>
              <div>
                <strong>Name:</strong> {filteredCustomers[currentIndex].name}
              </div>
              <div>
                <strong>Area Name:</strong> {filteredCustomers[currentIndex].areaName}
              </div>
              <div>
                <strong>Amount to Be Paid:</strong> {filteredCustomers[currentIndex].amountToBePaid}
              </div>
              <div>
                <strong>Due Amount:</strong> {filteredCustomers[currentIndex].dueAmt}
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                  className="btn btn-primary"
                  onClick={handlePrevious}
                  disabled={filteredCustomers.length <= 1 || currentIndex === 0}
                >
                  Previous
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={
                    filteredCustomers.length <= 1 || currentIndex === filteredCustomers.length - 1
                  }
                >
                  Next
                </button>
                <button className="btn btn-success" onClick={handlePaid}>
                  Pay {filteredCustomers[currentIndex].amountToBePaid / 100} {/* Display 1/100th of the amount to be paid */}
                </button>
                <button className="btn btn-info" onClick={handleTogglePaymentHistory}>
                  {showPaymentHistory ? 'Close History' : 'Payment History'}
                </button>
              </div>
            </div>
          ) : (
            <p>No matching customers found.</p>
          )}
        </div>
      </div>
      {showPaymentHistory && (
        <div className="mt-4">
          <h3>Payment History</h3>
          {paymentHistory.length > 0 ? (
            <ul className="list-group">
              {paymentHistory.map((payment) => (
                <li key={payment._id} className="list-group-item">
                  <strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}, <strong>Amount:</strong> ₹{payment.amount}
                </li>
              ))}
            </ul>
          ) : (
            <p>No payment history available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomerDisplay;
