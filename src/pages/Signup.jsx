import React, { useState } from 'react'
// import '../Admin_dashboard/Signup.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar'
import Header from '../partials/header/Header'
import SEO from '../components/SEO'
import Breadcrumb from '../container/Breadcrumb/Breadcrumb'
const Signup = () => {
    const navigate = useNavigate()
    const [signupvalue, setsignupvalue] = useState({

    })


    const inputvalue = (e) => {
        console.log({ ...signupvalue, [e.target.name]: e.target.value })
        setsignupvalue({ ...signupvalue, [e.target.name]: e.target.value })
    }
    const submitform =  (e) => {
        e.preventDefault()
        if (signupvalue.password === signupvalue.confirmpwd) {
            console.log(signupvalue)
             axios.post("https://mernblog-5-56r6.onrender.com/signup", signupvalue).then((res)=>{

            

            // setsignupvalue("")
            if (res.data.success == true) {
                alert(res.data.message)
                setsignupvalue({"username":"",
            "email":"",
        "password":"",
        "confirmpwd":"",
       
        })
        navigate('/')
            }
            else {
                alert(res.data.message)
            }
        })
        }
        else {
            alert("Password Are not match")
            
        }
    }
   
    
    return (
        
        <React.Fragment>
            < SEO title="Blog || Signup" />
        <Header/>
        <Breadcrumb
                image="images/bg/breadcrumb-bg.jpg"
                title="We are an agency located in New York"
                content="Home"
                contentTwo="Signup"
            />
            {/* <div className="container mt-4">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-sm-9 mt-5 d-flex justify-content-center" >


                        <form className="form bg-dark" style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }} onSubmit={submitform}>
                            <h3 className="title text-light text-center">Register </h3>
                            {/* <p className="message">Signup now and get full access to our app. </p> */}
                            {/* <div className="flex"> */}
                            {/* <label>
            <input required="" placeholder="Firstname" type="text" onChange={inputvalue} className="input p-2" name='firstname' />
            {/* <span>Firstname</span> 
        </label> 

                            <label className='me-4' >
                                {/* <span>Lastname</span>
                                <input required placeholder="Username" type="text" onChange={inputvalue} className=" bg-light p-2 ml-2" name='username' value={signupvalue.username} />
                            </label>
                            {/* </div>   

                            <label className='' >
                                <input required placeholder="Email" type="email" onChange={inputvalue} className="input p-2 ml-2" name='email' value={signupvalue.email} /><br></br>
                                {/* <span>Email</span> 
                            </label><br></br>

                            <label className='me-4' >
                                <input required placeholder="Password" type="password" onChange={inputvalue} className="input p-2 ml-2" name='password' value={signupvalue.password} />
                                {/* <span>Password</span> 
                            </label>
                            <label className='' >
                                <input required placeholder="Confirm Password" type="password" onChange={inputvalue} className="input p-2 ml-2" name='confirmpwd' value={signupvalue.confirmpwd} />
                                {/* <span>Confirm password</span> 
                            </label><br></br>
                            {/* <label className='me-4'>
                                <input required  placeholder="Role" type="text" onChange={inputvalue} className="input p-2 ml-2" name='role' value={signupvalue.role}/>
                                {/* <span>Confirm password</span> 
                            </label> 
                            {/* <label className='' >
                                <input required  placeholder="Description" type="text" onChange={inputvalue} className="input p-2 ml-2 mr-2" name='description' value={signupvalue.description}/>
                                {/* <span>Confirm password</span> 
                            </label> *
                            <label>
                                <input type="hidden" value={new Date} name='create_at'></input>
                            </label><br></br>
                            <button className="submit btn btn-success me-auto" >Register</button>
                            <p className="signin">Already have an acount ? <Link to="/login">Signin</Link> </p>
                        </form>
                    </div>
                </div>
            </div> */}
          <section className="py-3 py-md-5 py-xl-8">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mb-5">
                <h2 className="display-5 fw-bold text-center">Sign up</h2>
                <p className="text-center m-0">Already have an account? <a href="#!" className="link-primary text-decoration-none">Sign in</a></p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="row gy-5 justify-content-center">
                <div className="col-12 col-lg-5">
                  <form action="#!" onSubmit={submitform}>
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control border-0 border-bottom rounded-0" name="username" id="username" placeholder="First Name" required onChange={inputvalue} value={signupvalue.username}/>
                          <label htmlFor="firstName" className="form-label">First Name</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="email" className="form-control border-0 border-bottom rounded-0" name="email" id="email" placeholder="name@example.com" required onChange={inputvalue} value={signupvalue.email}/>
                          <label htmlFor="email" className="form-label">Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control border-0 border-bottom rounded-0" name="password" id="password" defaultValue placeholder="Password" required onChange={inputvalue} value={signupvalue.password}/>
                          <label htmlFor="password" className="form-label">Password</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control border-0 border-bottom rounded-0" name="confirmpwd" id="lastName" placeholder="Confirm Password" required onChange={inputvalue} value={signupvalue.confirmpwd}/>
                          <label htmlFor="lastName" className="form-label">Confirm Password</label>
                        </div>
                      </div>
                      {/* <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultValue  id="iAgree" required />
                          <label className="form-check-label text-secondary" htmlFor="iAgree">
                            I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
                          </label>
                        </div>
                      </div> */}
                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-lg btn-dark rounded-0 fs-6" type="submit">Sign up</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-12 col-lg-2 d-flex align-items-center justify-content-center gap-3 flex-lg-column">
                  <div className="bg-dark h-100 d-none d-lg-block" style={{width: '1px', "-bsBgOpacity": '.1'}} />
                  <div className="bg-dark w-100 d-lg-none" style={{height: '1px', "-bsBgOpacity": '.1'}} />
                  <div>or</div>
                  <div className="bg-dark h-100 d-none d-lg-block" style={{width: '1px', "-bsBgOpacity": '.1'}} />
                  <div className="bg-dark w-100 d-lg-none" style={{height: '1px', "-bsBgOpacity": '.1'}} />
                </div>
                <div className="col-12 col-lg-5 d-flex align-items-center">
                  <div className="d-flex gap-3 flex-column w-100 ">
                    <a href="#!" className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-google text-danger" viewBox="0 0 16 16">
                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                      </svg>
                      <span className="ms-2 fs-6 flex-grow-1">Continue with Google</span>
                    </a>
                    <a href="#!" className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-apple text-dark" viewBox="0 0 16 16">
                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                      </svg>
                      <span className="ms-2 fs-6 flex-grow-1">Continue with Apple</span>
                    </a>
                    <a href="#!" className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-facebook text-primary" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                      </svg>
                      <span className="ms-2 fs-6 flex-grow-1">Continue with Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            </React.Fragment>
        
    )
}

export default Signup