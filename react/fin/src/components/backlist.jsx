// FeedbackList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/feedbacks');
        setFeedbackList(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Feedback List</h2>
      <ul className="list-group">
        {feedbackList.map((feedback, index) => (
          <li key={index} className="list-group-item">
            <strong>Name:</strong> {feedback.name} <br />
            <strong>Email:</strong> {feedback.email} <br />
            <strong>Message:</strong> {feedback.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
