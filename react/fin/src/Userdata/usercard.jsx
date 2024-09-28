import React, { useEffect, useState } from 'react';
import axios from 'axios';


function UserCard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false); // Set loading to false when data is available
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const toggleUserStatus = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:3001/users/${userId}/toggleStatus`);
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user._id === userId) {
            return { ...user, isActive: response.data.isActive };
          }
          return user;
        });
      });
    } catch (err) {
      console.error('Error toggling user status:', err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          users.map(user => (
            <div className="col-md-4 mb-4" key={user._id}>
              <div className={`card h-100 ${user.isActive ? 'bg-light' : 'bg-info'}`}>
                <div className="card-body">
                  <h5 className={`card-title ${user.isActive ? 'text-dark' : 'text-white'}`}>
                    {user.FirstName}
                  </h5>
                  <p className={`card-text ${user.isActive ? 'text-dark' : 'text-white'}`}>
                    <strong>Email:</strong> {user.Email}<br />
                    <strong>Address:</strong> {user.Address}
                  </p>
                  <button
                    className={`btn ${user.isActive ? 'btn-warning' : 'btn-success'}`}
                    onClick={() => toggleUserStatus(user._id)}
                  >
                    {user.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserCard;
