import React, { useState } from 'react';
import axios from 'axios';

function AddCustomer() {
  const [accountNumber, setAccountNumber] = useState('');
  const [name, setName] = useState('');
  const [areaName, setAreaName] = useState('');
  const [amountToBePaid, setAmountToBePaid] = useState('');
  const [dueAmt, setDueAmt] = useState('');
  const [alertMsg, setAlertMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!accountNumber || !name || !areaName || !amountToBePaid || !dueAmt) {
      setAlertMsg('Please fill in all fields');
      return;
    }

    try {
      console.log('Submitting:', { accountNumber, name, areaName, amountToBePaid, dueAmt });
      const response = await axios.post('http://localhost:3001/customers/add', {
        accountNumber,
        name,
        areaName,
        amountToBePaid,
        dueAmt
      });
      console.log('Customer details added successfully');
      if (response.data.alreadyExists) {
        setAlertMsg('Account number already exists. Please change the account number.');
      } else {
        window.alert('Customer added successfully');
        // You can redirect or update state as needed
      }
    } catch (error) {
      console.error('Error adding customer details:', error);
    }
  };

  return (
    <div className="row d-flex justify-content-center">
      <div className='col-5'>
        <div style={{ width: '30rem', marginTop:'5rem' }} className="card">
          <div className="card-body">
            <h5 style={{padding:'1rem' , fontSize:'30px' ,marginLeft:'0rem', marginRight:'auto'}} className="card-title">Add Customer Details</h5>
            {alertMsg && <div className="alert alert-danger">{alertMsg}</div>}
            <hr />
            <form onSubmit={handleSubmit}>
              <label className='card-label'>Account Number </label>
              <input type='text' className='form-control' onChange={(e) => setAccountNumber(e.target.value)} placeholder='Account Number'/>
              <label className='card-label'>Name </label>
              <input type='text' className='form-control' onChange={(e) => setName(e.target.value)} placeholder='Name'/>
              <label className='card-label'>Area Name </label>
              <input type='text' className='form-control' onChange={(e) => setAreaName(e.target.value)} placeholder='Area Name'/>
              <label className='card-label'>Amount to Be Paid </label>
              <input type='number' className='form-control' onChange={(e) => setAmountToBePaid(e.target.value)} placeholder='Amount to Be Paid'/>
              <label className='card-label'>Due Amount </label>
              <input type='number' className='form-control' onChange={(e) => setDueAmt(e.target.value)} placeholder='Due Amount'/>
              <br/>
              <hr/>
              <div className='row d-flex justify-content-center' style={{margin:10}}>
                <div className='col-3'>
                  <button type="submit"  className="btn btn-outline-primary">Add Customer</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCustomer;
