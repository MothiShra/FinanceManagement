// NavbarComponent.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const NavbarComponent = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        // Function to fetch the user's data from the local storage
        const fetchUserData = () => {
            const userData = localStorage.getItem('loggedInUser');
            if (userData) {
                setLoggedInUser(JSON.parse(userData));
            }
        };

        // Call the function to fetch user data when the component mounts
        fetchUserData();
    }, []);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">DailyFin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto flex-grow-1">
                    {loggedInUser && loggedInUser.Role === 'Admin' && (
                        <>
                            <Nav.Link href="/Finance/finance">Admin Data</Nav.Link>
                            <Nav.Link href="/Register/register">Add Admin</Nav.Link>
                            <Nav.Link href="/Userdata/usercard">Activate Admin</Nav.Link>
                            <Nav.Link href="/Collections/collections">Add Customer</Nav.Link>
                            <Nav.Link href="/components/backlist">View Feedback</Nav.Link>
                        </>
                    )}
                    {loggedInUser && (
                        <>
                            <Nav.Link href="/Home/home">Home</Nav.Link>
                            <Nav.Link href="/Customer/CustomerDisplay">View Customer</Nav.Link>
                            <Nav.Link href="/components/Chat">Chat</Nav.Link>
                            <Nav.Link href="/components/feedback">Feedback</Nav.Link>
                        </>
                    )}
                </Nav>
                <Nav>
                    <Nav.Link href="/login" className="ml-0">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            {loggedInUser && <span>Welcome, {loggedInUser.FirstName}</span>}
        </Navbar>
    );
}

export default NavbarComponent;
