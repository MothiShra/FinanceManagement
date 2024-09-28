import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [FirstName ,setFirstName ]=useState()
    const [LastName ,setLastName ]=useState()
    const [Phone ,setPhone ]=useState()
    const [Email ,setEmail ]=useState()
    const [Address ,setAddress ]=useState()
    const [Password ,setPassword ]=useState()


    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/Users',{FirstName,LastName,Phone,Email,Address,Password})
        .then(result=>{
            alert('Registered successfully');
            console.log(result);
            console.log("registered");
            // alert("ftgrfdkuyjy");
            // navigate('/login');
        })
        .catch(err=>console.log(err));
   
    }
  return (
    <div class="row d-flex justify-content-center">
    <div className='col-5'>
      <div style={{ width: '30rem', marginTop:'5rem' }} className="card">
        <div className="card-body">
          <h5  style={{padding:'1rem' , fontSize:'30px' ,marginLeft:'0rem', marginRight:'auto'}} className="card-title">Register</h5>

          <hr />
          <form onSubmit={handleSubmit}>

          <label className='card-label'>First Name </label>
          <input type='text' className='form-control' onChange={(e)=>setFirstName(e.target.value)} placeholder='Mothi'/>
          <label className='card-label'>Last Name </label>
          <input type='text' className='form-control' onChange={(e)=>setLastName(e.target.value)} placeholder='shri'/>
          <label className='card-label'>Phone </label>
          <input type='text' className='form-control' onChange={(e)=>setPhone(e.target.value)} placeholder='9420942020'/>
          <label className='card-label'>Email </label>
          <input type='email' className='form-control' onChange={(e)=>setEmail(e.target.value)} placeholder='Mothi@shri.ram'/>
          <label className='card-label'>Address </label>
          <input type='text' className='form-control' onChange={(e)=>setAddress(e.target.value)} placeholder='mothi circle'/>
          <label className='card-label'>Password </label>
          <input type='Password' className='form-control' onChange={(e)=>setPassword(e.target.value)} placeholder='mothi circle'/>
          <br/>
          <hr/>

            <div className='row d-flex justify-content-center' style={{margin:10}}>
                <div className='col-3'>
                    <button type="submit"  class="btn btn-outline-primary">Register</button>
                </div>
                <div className='col-3'>
                    <a href='/login' className='btn btn-outline-success'>Login</a>
                    {/* <button onClick={() => useNavigate('/login')} className='btn btn-outline-success'> */}
        {/* Login
      </button> */}
                    {/* <Link to='/login' className='btn btn-outline-success'>Login</Link> */}
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Register;