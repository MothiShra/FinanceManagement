// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { Email, Password });
            if (response.data === 'Incorrect password') {
                alert('Incorrect password');
            } else if (response.data === 'User not found') {
                alert('User not found');
            } else {
                alert(response.data);
                // Clear previous user data from local storage
                localStorage.removeItem('loggedInUser');
                // Fetch user data from the database
                const usersResponse = await axios.get('http://localhost:3001/users');
                // Check if the response data is not undefined before parsing
                if (usersResponse.data) {
                    const loggedInUser = usersResponse.data.find(user => user.Email === Email);
                    // Store user data in local storage
                    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                    // Redirect to home after successful login
                    navigate('/Home/home');
                } else {
                    // Stay on the same page if no user is found
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure here
        }
    };

    return (
        <div className="row d-flex justify-content-center">
            <div className='col-5'>
                <div style={{ width: '30rem', marginTop: '5rem' }} className="card">
                    <div className="card-body">
                        <h5 style={{ padding: '1rem', fontSize: '30px', marginLeft: '0rem', marginRight: 'auto' }} className="card-title">Login</h5>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <label className='card-label'>Email </label>
                            <input type='email' className='form-control' onChange={(e) => setEmail(e.target.value)} placeholder='Mothi@shri.ram' />
                            <label className='card-label'>Password </label>
                            <input type='password' className='form-control' onChange={(e) => setPassword(e.target.value)} placeholder='' />
                            <br />
                            <hr />
                            <div className='row d-flex justify-content-center' style={{ margin: 10 }}>
                                <div className='col-3'>
                                    <button type="submit" className="btn btn-outline-primary">Login</button>
                                </div>
                                <div className='col-5'>
                                    <a href='/login' className='btn btn-outline-success'>Forgot Password</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
