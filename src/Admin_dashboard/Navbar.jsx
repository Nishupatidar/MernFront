import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Preset/Preset_Form.css'
const Navbar = () => {
  const getstatus = ()=>{
    // setlogin("false")
    sessionStorage.removeItem("token")
  }
  const [login,setlogin] = useState('')
  useEffect(()=>{
  let localdata =   sessionStorage.getItem("token")
  console.log(localdata)
  setlogin(localdata)
  },[login])
  // console.log(login)
  return (
    <> 
    <div className="container-fulid">
 
    <nav className="navbar navbar-expand-sm  bg-light fixed-top " style={{boxShadow:"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}>
  <div className="container-fluid">
    <Link className="navbar-brand ">
      Blog Platform
    </Link>
    <button
      className="navbar-toggler btnnavbar"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#mynavbar"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="mynavbar">
      <ul className="navbar-nav  d-flex justify-content-between">
        {/* <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        */}
        <li className="nav-item">
          {login!== "" ?<Link className="nav-link" onClick={getstatus}>
            Logout
          </Link>:<Link className="nav-link" to="/admin/login">
            Login
          </Link>}
          
        </li>
        {/* <li className="nav-item">
        {/* <label>Dark Mode</label><br></br> 
        <label class="switch">
  <input type="checkbox" name='webconnect'/>
  <span class="slider"></span>
</label>
          
        </li> */}
      </ul>
      
    </div>
  </div>
</nav>

</div>
    </>
  )
}

export default Navbar