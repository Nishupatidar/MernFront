import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Socialmediacreate() {
  const navigate = useNavigate()
    const [selectedType, setSelectedType] = useState('Facebook');
const [socialvalue,setsocialvalue] = useState({})
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setsocialvalue({...socialvalue,[event.target.name]:event.target.value})
    console.log(event.target.value)
  };
  const handleChange = (e)=>{
    setsocialvalue({...socialvalue,[e.target.name]:e.target.value})
  }
  const socialmedia = (e)=>{
    e.preventDefault()
    if (Object.keys(socialvalue).length === 0 && socialvalue.constructor === Object) {
      toast.warning("Please fill in all required fields.");
      return; // Prevent submission if formData is empty
    }
    axios.post('http://localhost:4000/socialmedia',socialvalue).then((res)=>{
      if(res.data.success){
        toast.success(res.data.message)
        navigate('/admin/socialmedia')
      }
      // alert(res.data)
    })
    console.log(socialvalue)
  }
  return (
    <div>
    <Sidebar/>
       <Navbar/>
       <div className="container mt-5">
        <ToastContainer position= 'top-center'/>
      <div className="row " style={{ "marginLeft": "119px", "marginTop": "53px" }}>
        <form className="form bg-light mt-2 p-5" onSubmit={socialmedia}>
          <h6 className='alert alert-light text-center'>Social Media / Create</h6>
          <label className='mt-2'> Socail Media Name</label>
          <input type="text" name="socailmedianame" id="" placeholder='please enter social media name.............'onChange={handleChange} required />
          <small>You can always change this later.</small>

          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor="exampleDataList" className="form-label mt-2">Type</label>
          </div>
          {/* <input
            className="form-control"
            list="datalistOption"
            id="exampleDataList"
            name='type'
            placeholder="Please select "
            onChange={handleTypeChange}
          /> */}
          <select onChange={handleTypeChange} name='type' className="form-control" required >
            <option value="Facebook">Facebook</option>
            <option value="X (Twitter)">X Twitter</option>

          </select>
          {/* <datalist id="datalistOption">
          </datalist> */}

          {selectedType === 'Facebook' && (
            <>
              <label className='mt-3'>Connect with Facebook</label>
              <button className='btn btn-light  btn-sm rounded border-info'style={{"width":"200px"}}>
                <a href='https://www.facebook.com/login/'
                  target='_blank'>
                  F Connect
                </a>
              </button>
              <span>Note:<small>We never post anything without your consent, nor share any data whatsoever.</small></span>
        
      
          
              <label htmlFor="exampleDataList" className="form-label mt-2">Facebook Page</label>
              <input
                className="form-control"
                list="datalistOptions1"
                id="exampleDataList"
                name='facebook page'
                onChange={handleChange}
                placeholder=" select a facebook page"
              />
              <datalist id="datalistOptions1">
                <option value="1"></option>
              </datalist>
              <small>The page your posts will be shared on.</small>
            </>
          )}
{selectedType === 'X (Twitter)' && ( 
    <>
     <label className='mt-3'>Connect with X</label>
     <button className='btn btn-light bg-dark btn-sm rounded' style={{"width":"200px"}}>
       <a href='https://twitter.com/i/flow/login'
         target='_blank'>
         X Connect
       </a>
     </button>
     <span>Note:<small>We never post anything without your consent, nor share any data whatsoever.</small></span>
     </>
)}
          {selectedType && (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="exampleDataList" className="form-label mt-2">Automatic Syndication</label>
              </div>
              {/* <input
                className="form-control"
                list="datalistOptions"
                id="exampleDataList"
                name='syndication'
                onChange={handleChange}
                placeholder="Please select a Syndication"
              /> */}
              <select id="datalistOptions" className="form-control" name='syndication' onChange={handleChange}>
                <option value="" disabled>Select Syndication</option>
                <option value="Syndication">Syndication</option>
                <option value="Integration">Integration</option>
              </select>
              <small>Select an integration so that whenever a Publication is created, we'll share it on Social Media.
                Leave blank to opt out of this feature.
              </small>
            </>
          )}

        <div className='d-flex justify-content-end mb-3'>
          <Link to="/admin/socialmedia">
            <button className='btn btn-transpret rounded btn-sm border border-primary mt-5 mr-3'>
              Cancel
            </button>
          </Link>
          <button type='submit' className='btn btn-primary rounded btn-sm mt-5' >
            Create Social Media
          </button>
        </div>
        </form>
      </div>
    </div>
<Footer/>

   </div>
  )
}

export default Socialmediacreate
