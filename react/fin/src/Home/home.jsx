import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  return (
    <div className="container mt-5">
      <div className="jumbotron text-center">
        {loggedInUser ? (
          <div>
            <h2>Hi, {loggedInUser.FirstName}!</h2>
            <p>Welcome back to the Financial Franchise Management System</p>
          </div>
        ) : (
          <h2>Welcome to the Financial Franchise Management System</h2>
        )}
        <img src="https://static.vecteezy.com/system/resources/thumbnails/000/609/739/small/3-19.jpg" alt="Company Logo" className="img-fluid mb-4" />
        <h1 className="display-4">Welcome to the Financial Franchise Management</h1>
        <p className="lead">
          Empowering financial branch management for a successful franchise network.
        </p>
        <hr className="my-4" />
        <p>
        
        </p>
        <p className="lead">
          <Link className="btn btn-primary btn-lg" to="/features" role="button">Explore Features</Link>
        </p>
        <img src="https://storage.googleapis.com/5paisa-prod-storage/files/2022-07/Finance_2.jpg" alt="Franchise Network" className="img-fluid mt-4" />
      </div>
    </div>
  );
}

export default Home;
