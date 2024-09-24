import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { BiSolidSquare } from "react-icons/bi";
import { IoChatboxEllipses, IoChevronDownCircle } from "react-icons/io5";
import { IoChevronUpCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import Preset_Form from './Preset_Form';
import Presetbaseform from './Presetbaseform';
import Presetcontentform from './Presetcontentform';
import Presetknowledge from './Presetknowledge';
import Presetformatting from './Presetformatting';
import Presetstructure from './Presetstructure';
import Presetinternallink from './Presetinternallink';
import axios from 'axios'

import './Preset_Form.css'
import Presetexternallink from './Presetexternallink';
import PresetImage from './PresetImage';
import Presetvideos from './Presetvideos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Preset_create() {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState();
  const [activeForm, setActiveForm] = useState(null);
  const [formData, setFormData] = useState({})

  const toggleForm = (e) => {
    console.log(e)
    // setShowForm(true);

  };
  const toggleForm1 = (e) => {
    console.log(e)
     setShowForm(false);

  };
  const handelchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const presetcreate = (e) => {
    e.preventDefault()
    if (Object.keys(formData).length === 0 && formData.constructor === Object) {
      console.log(formData)
      toast.warning("Please fill out at least one form field");
      return; // Prevent submission if formData is empty
    }
   
    axios.post('http://localhost:4000/presetcreate', formData).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/preset')
      }
      else{
        toast.error(res.data.message)
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="container mt-5">
        <ToastContainer postiton = "top-center"/>
        <div className="row " style={{ "marginLeft": "119px", "marginTop": "53px" }}>
          <form className="form bg-light mt-2 p-5" onSubmit={presetcreate}>
            <h6 className='alert alert-light text-center'>Preset/Create</h6>
            <label>Name</label>
            <input type="text" name="presetname" id="" placeholder='My Special Preset' className='border border-info bg-white' onChange={handelchange} required />
            {/* <div className="col-lg-12 col-md-6 col-sm-6 d-flex justify-content-center mt-3" > */}
            
           <div className="" style={{"width":"95%","margin":"0 auto"}}>
            <div className="row d-flex justify-content-between border p-2 mt-3 rounded">
              <div className="col-3 col-sm-3 col-lg-4 col-md-3">
                <span><BiSolidSquare className='text-primary' /></span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
                <span className='text-dark fw-bold'>Base</span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
              <a class="" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    {showForm === false ? (<IoChevronDownCircle className='text-primary fs-4' onClick={() => toggleForm(true)} />) : (<IoChevronUpCircleSharp className='text-primary fs-4' onClick={() => toggleForm1(false)} />)}
                  </a>
              </div>
              <div class="collapse" id="collapseExample">
                  <div class="card card-body">
                    <Presetbaseform formData={formData} setFormData={setFormData} />
                  </div>
                </div>
            </div>
            <div className="row d-flex justify-content-between border p-2 rounded">
              <div className="col-3 col-sm-3 col-lg-4 col-md-3">
                <span><BiSolidSquare className='text-primary' /></span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
                <span className='text-dark fw-bold'>Content</span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
              <a class="" data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample">
                    {showForm === false ? (<IoChevronDownCircle className='text-primary fs-4' onClick={() => toggleForm(true)} />) : (<IoChevronUpCircleSharp className='text-primary fs-4' onClick={() => toggleForm1(false)} />)}
                  </a>
              </div>
              <div class="collapse" id="collapseExample1">
                  <div class="card card-body">
                    <Presetcontentform formData={formData} setFormData={setFormData} />
                  </div>
                </div>
            </div>
            <div className="row d-flex justify-content-between border p-2 rounded">
              <div className="col-3 col-sm-3 col-lg-4 col-md-3">
                <span><BiSolidSquare className='text-primary' /></span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
                <span className='text-dark fw-bold'>Knowledge</span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
              <a class="" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample">
                    {showForm === false ? (<IoChevronDownCircle className='text-primary fs-4' onClick={() => toggleForm(true)} />) : (<IoChevronUpCircleSharp className='text-primary fs-4' onClick={() => toggleForm1(false)} />)}
                  </a>
              </div>
              <div class="collapse" id="collapseExample2">
                  <div class="card card-body">
                    <Presetknowledge formData={formData} setFormData={setFormData} />
                  </div>
                </div>
            </div>
            <div className="row d-flex justify-content-between border p-2 rounded">
              <div className="col-3 col-sm-3 col-lg-4 col-md-3">
                <span><BiSolidSquare className='text-primary' /></span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
                <span className='text-dark fw-bold'>ForMating</span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
              <a class="" data-bs-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample">
                    {showForm === false ? (<IoChevronDownCircle className='text-primary fs-4' onClick={() => toggleForm(true)} />) : (<IoChevronUpCircleSharp className='text-primary fs-4' onClick={() => toggleForm1(false)} />)}
                  </a>
              </div>
              <div class="collapse" id="collapseExample3">
                  <div class="card card-body">
                    <Presetformatting formData={formData} setFormData={setFormData} />
                  </div>
                </div>
            </div>
            <div className="row d-flex justify-content-between border p-2 rounded">
              <div className="col-3 col-sm-3 col-lg-4 col-md-3">
                <span><BiSolidSquare className='text-primary' /></span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
                <span className='text-dark fw-bold'>Structure</span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
              <a class="" data-bs-toggle="collapse" href="#collapseExample4" role="button" aria-expanded="false" aria-controls="collapseExample">
                    {showForm === false ? (<IoChevronDownCircle className='text-primary fs-4' onClick={() => toggleForm(true)} />) : (<IoChevronUpCircleSharp className='text-primary fs-4' onClick={() => toggleForm1(false)} />)}
                  </a>
              </div>
              <div class="collapse" id="collapseExample4">
                  <div class="card card-body">
                  <Presetstructure formData={formData} setFormData={setFormData} />
                  </div>
                </div>
            </div>
            <div className="row d-flex justify-content-between border p-2 rounded">
              <div className="col-3 col-sm-3 col-lg-4 col-md-3">
                <span><BiSolidSquare className='text-primary' /></span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
                <span className='text-dark fw-bold'>Internal Linking</span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
              <a class="" data-bs-toggle="collapse" href="#collapseExample5" role="button" aria-expanded="false" aria-controls="collapseExample">
                    {showForm === false ? (<IoChevronDownCircle className='text-primary fs-4' onClick={() => toggleForm(true)} />) : (<IoChevronUpCircleSharp className='text-primary fs-4' onClick={() => toggleForm1(false)} />)}
                  </a>
              </div>
              <div class="collapse" id="collapseExample5">
                  <div class="card card-body">
                  <Presetinternallink formData={formData} setFormData={setFormData} />
                  </div>
                </div>
            </div>
            {/* <div className="row d-flex justify-content-between border p-2 rounded">
              <div className="col-3 col-sm-3 col-lg-4 col-md-3">
                <span><BiSolidSquare className='text-primary' /></span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
                <span className='text-dark fw-bold'>External Linking</span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
              <a class="" data-bs-toggle="collapse" href="#collapseExample9" role="button" aria-expanded="false" aria-controls="collapseExample">
                    {showForm === false ? (<IoChevronDownCircle className='text-primary fs-4' onClick={() => toggleForm(true)} />) : (<IoChevronUpCircleSharp className='text-primary fs-4' onClick={() => toggleForm1(false)} />)}
                  </a>
              </div>
              <div class="collapse" id="collapseExample9">
                  <div class="card card-body">
                  <Presetexternallink formData={formData} setFormData={setFormData} />
                  </div>
                </div>
            </div> */}
            <div className="row d-flex justify-content-between border p-2 rounded">
              <div className="col-3 col-sm-3 col-lg-4 col-md-3">
                <span><BiSolidSquare className='text-primary' /></span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
                <span className='text-dark fw-bold'>Image</span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
              <a class="" data-bs-toggle="collapse" href="#collapseExample6" role="button" aria-expanded="false" aria-controls="collapseExample">
                    {showForm === false ? (<IoChevronDownCircle className='text-primary fs-4' onClick={() => toggleForm(true)} />) : (<IoChevronUpCircleSharp className='text-primary fs-4' onClick={() => toggleForm1(false)} />)}
                  </a>
              </div>
              <div class="collapse" id="collapseExample6">
                  <div class="card card-body">
                  <PresetImage formData={formData} setFormData={setFormData} />
                  </div>
                </div>
            </div>
            <div className="row d-flex justify-content-between border p-2 rounded">
              <div className="col-3 col-sm-3 col-lg-4 col-md-3">
                <span><BiSolidSquare className='text-primary' /></span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
                <span className='text-dark fw-bold'>Video</span>
              </div>
              <div className="col-3 col-sm-3 col-lg-3 col-md-3">
              <a class="" data-bs-toggle="collapse" href="#collapseExample7" role="button" aria-expanded="false" aria-controls="collapseExample">
                    {showForm === false ? (<IoChevronDownCircle className='text-primary fs-4' onClick={() => toggleForm(true)} />) : (<IoChevronUpCircleSharp className='text-primary fs-4' onClick={() => toggleForm1(false)} />)}
                  </a>
              </div>
              <div class="collapse" id="collapseExample7">
                  <div class="card card-body">
                  <Presetvideos formData={formData} setFormData={setFormData} />
                  </div>
                </div>
            </div>
            </div>
            <div className='d-flex justify-content-end'>
              <Link to="/admin/preset"> <button className='btn btn-transpret rounded btn-sm border border-primary mt-5 mr-3'>
                Cancel
              </button>  </Link>
              <button className='btn btn-primary rounded btn-sm mt-5'  type='submit'>
                Create New Preset
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Preset_create
