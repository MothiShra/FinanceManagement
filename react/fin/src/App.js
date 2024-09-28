import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register/register';
import Browse from './browse';
import Home from './Home/home';
import Userdata from './Userdata/userdata';  
import UserCard from './Userdata/usercard';
import AddCustomer from './Customer/addCustomer';
import CustomerDisplay from './Customer/CustomerDiplay';
import Login from './login';
import Chat from './components/Chat';
import CustomerPaymentHistory from './components/paymentHistory';
import FeedbackForm from './components/feedback';
import FeedbackList from './components/backlist';



function App() {
  return (
    <div className="App">
      {/* <Login/>  */}
      {/* <Register /> */}
      {/* <Home/>   */}
      <Browse />
      {/* <FeedbackList/> */}
      {/* <FeedbackForm/> */}
      {/* <CustomerPaymentHistory/> */}
      {/* <Chat/> */}
      {/* <CustomerDisplay/> */}
      {/* <UserCard/> */}
      {/* <Userdata /> */}
    </div>
  );
}
 
export default App;
