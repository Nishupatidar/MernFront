import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Knowledge_create() {
  const navigate = useNavigate()
  const [knowledege,setknowledege] = useState({})
  const handlechange = (e)=>{
    setknowledege({...knowledege,[e.target.name]:e.target.value})
  }
  const indexercreate = (e)=>{
e.preventDefault()

axios.post('http://localhost:4000/knowledege',knowledege).then((res)=>{
  if(res.data.success){
   toast.success(res.data.message)
   navigate('/admin/knowledge')
    }
    else{
      toast.error(res.data.message)
    }
})
  }
  return (
    <div>
      <Sidebar/>
       <Navbar/>
       <ToastContainer/>
       <div className="container mt-5" style={{"marginBottom": "245px"}}>
               <div className="row " style={{ "marginLeft": "119px", "marginTop": "53px" }}>
                   <form className="form bg-light mt-2 p-5" onSubmit={indexercreate}>
                       <h6 className='alert alert-light text-center'>Knowledge Base/create</h6>
                       <label className='mt-2'> Knowledge Base Name</label>
                       <input type="text" name="knowledegename" id="" placeholder='My Software Business' onChange={handlechange} required/>
                       <small>You can always change this later.</small><br></br>
                       
                      <div className='d-flex justify-content-end mb-3'>
                  <Link to="/admin/knowledge"> <button className='btn btn-transpret rounded btn-sm border border-primary mt-5 mr-3'>
                        Cancel
                   </button>  </Link>
                   <button className='btn btn-primary rounded btn-sm mt-5' type='submit'>
                        Create New Knowledge
                   </button>
                   </div>
                      </form> 
                      </div>
                      </div>
<Footer/>
    </div>
  )
}

export default Knowledge_create

