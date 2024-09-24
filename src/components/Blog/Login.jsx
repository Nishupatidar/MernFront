import React, { useState } from 'react'
import '../../Admin_dashboard/Signup.css'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../Admin_dashboard/Navbar'
import Footer from '../../Admin_dashboard/Footer'
import Sidebar from '../../Admin_dashboard/Sidebar'
function Login() {
    const navigate = useNavigate("")
    const [loginvalue,setloginvalue] = useState({
        "email":"",
        "password":"",
        "status":true
    })
    const inputvalue = (e)=>{
        setloginvalue({...loginvalue, [e.target.name]:e.target.value})
    }
    const submitform =async (e)=>{
e.preventDefault()
const response =  await axios.post("http://localhost:4000/login",loginvalue)
if(response.data.success == true){
    alert(response.data.message)
    localStorage.setItem("status", true);
    sessionStorage.setItem("token", response.data.token);
    navigate('/admin/addblogpost')
    setloginvalue({
        "email":"",
        "password":""
    })
}
else if(response.data.success == null){
    alert(response.data.message)
}
else{
    alert(response.data.message)
}
setloginvalue({"email":""},
{"password":""})
    }
  return (
    <>
    
    <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
            <div className="col-sm-6 mt-5 d-flex justify-content-center" >

          
    <form className="form bg-light p-5" style={{boxShadow:"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}} onSubmit={submitform}>
    <h3 className="title text-center">Login </h3>
    {/* <p className="message">Signup now and get full access to our app. </p> */}
       
            
    <label>
        <input required="" placeholder="Email" type="email" onChange={inputvalue} className="input" name='email' value={loginvalue.email}/>
        {/* <span>Email</span> */}
    </label> 
        
    <label>
        <input required="" placeholder="Password" type="password" onChange={inputvalue} className="input" name='password' value={loginvalue.password}/>
    </label>
    
    <button className="submit">Login</button>
    {/* <p className="signin">Forget Password ? <Link to="">resiter</Link> </p> */}
</form>
</div>
        </div>
    </div>
    {/* <Footer/> */}
    </>
  )
}

export default Login
