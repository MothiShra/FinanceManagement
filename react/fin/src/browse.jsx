import React, { Component } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Finance from './Finance/finance';
import Navbar from './navbar';
import Collections from './Collections/collections';
import Home from './Home/home';
import Login from './login';
import Register from './Register/register';
import Userdata from './Userdata/userdata';
import UserCard from './Userdata/usercard';
import AddCustomer from './Customer/addCustomer';
import CustomerDisplay from './Customer/CustomerDiplay';

import UserList from './components/userList';
import FeedbackForm from './components/feedback';
import ChatPage from './components/Chat'; // Import ChatPage component
import FeedbackList from './components/backlist';

class browse extends Component { 
    render(){
        return( 
            <Router>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/Finance/finance" element={<Userdata/>} />
                        {/* <Route path="/Userdata/usercard" element={<Usercard/>} /> */}
                        <Route path="/Collections/collections" element={<AddCustomer/>} />
                        <Route path="/Userdata/usercard" element={<UserCard/>} />
                        <Route path="/Home/home" element={<Home/>} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/Customer/CustomerDisplay" element={<CustomerDisplay />} />
                        <Route path="/Register/register" element={<Register />} />
                        <Route path="/components/Chat" element={<UserList />} />
                        <Route path="/components/feedback" element={<FeedbackForm />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/components/backlist" element={<FeedbackList />} />
                        {/* Add the route for ChatPage with dynamic userId parameter */}
                        <Route path="/chat/:userId/:firstName" element={<ChatPage />} />
                    </Routes>       
                </div>
            </Router>
        );
    }
}

export default browse;