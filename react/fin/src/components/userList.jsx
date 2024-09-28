import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./userList.css";

function UserDetails() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    useEffect(() => {
        axios.get('http://localhost:3001/users')
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setLoading(false);
            });
    }, []);

    const filteredUsers = users.filter(user => user.FirstName !== loggedInUser.FirstName);

    return (
        <div className="container">
            <h1>Chat</h1>
            <ul className="chat-list">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    filteredUsers.map(user => (
                        <li key={user._id} className="chat-item">
                            <div className="chat-avatar"></div>
                            <div className="chat-content">
                                <Link to={`/chat/${user._id}/${user.FirstName}`} className="chat-name">{user.FirstName}</Link>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );    
}

export default UserDetails;
