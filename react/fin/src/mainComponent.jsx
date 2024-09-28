import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from './NavbarComponent'; // Adjust the path based on your file structure

function MainComponent() {
  const [isAdmin, setIsAdmin] = useState(false); // Assuming isAdmin state is managed here
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user role from the server or local storage
    const userRole = localStorage.getItem('userRole'); // For example, 'admin' or 'user'
    setIsAdmin(userRole === 'admin');
  }, []);

  // This function should handle logout
  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem('userRole'); // Clear user role from local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <NavbarComponent isAdmin={isAdmin} />
      {/* Your other content */}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default MainComponent;
