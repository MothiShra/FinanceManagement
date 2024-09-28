import React, { useEffect, useState } from "react";
import axios from 'axios';

function Userdata() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3001/users')
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
                setLoading(false); // Set loading to false when data is available
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Mail</th>
                                    <th>Address</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                            {users.map(user => (
    <tr key={user._id}>
        <td>{user.FirstName}</td>
        <td>{user.Email}</td>
        <td>{user.Address}</td>
    </tr>
))}

                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
    
}

export default Userdata;
