// FeedbackForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/feedbacks', formData);
      console.log(response.data);
      // Clear form data after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="row d-flex justify-content-center">
      <div className='col-5'>
        <div className="card mt-5 shadow">
          <div className="card-body">
            <h5 className="card-title mb-4">Feedback Form</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Message:</label>
                <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" required />
              </div>
              <button type="submit" className="btn btn-primary">Submit Feedback</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
