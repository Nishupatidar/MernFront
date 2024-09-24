import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Knowledge_edit() {
  const xid = useParams()
  const navigate = useNavigate()
  const [knowledege,setknowledege] = useState({})
  const [initialAutoblog,setInitialAutoblog] = useState({})
  const handlechange = (e)=>{
    setknowledege({...knowledege,[e.target.name]:e.target.value})
  }
  useEffect(()=>{
    axios.get(`http://localhost:4000/knowledegeedit/${xid.kid}`).then((res)=>{
      setknowledege(res.data.knowledge)
      setInitialAutoblog(res.data.knowledge)
    })
  },[])
  const indexercreate = (e)=>{
e.preventDefault()
if(JSON.stringify(initialAutoblog)=== JSON.stringify(knowledege)){
  
  toast.warning('No changes made. Please edit the data before saving.');
  return;
}
axios.put('http://localhost:4000/knowledegeupdate',knowledege).then((res)=>{
  if(res.data.success){
  toast.success(res.data.message)
    navigate('/admin/knowledge')
  }
})
  }
  const knowledegedelete = (id)=>{
axios.get(`http://localhost:4000/knowledegedelete/${id}`).then((res)=>{
  if(res.data.success){
    setTimeout(() => {
      toast.error(res.data.message)
      
    }, 1000);
    navigate('/admin/knowledge')
    
  }
})
  }
  return (
    <div>
    <Sidebar/>
     <Navbar/>
     <div className="container mt-5" style={{"marginBottom": "245px"}}>
      <ToastContainer 
      position='top-center'
      autoblog = "1000"/>
             <div className="row " style={{ "marginLeft": "119px", "marginTop": "53px" }}>
                 <form className="form bg-light mt-2 p-5">
                     <h6 className='alert alert-light text-center'>Knowledge Base/Update</h6>
                     <label className='mt-2'> Knowledge Base Name</label>
                     <input type="text" name="knowledegename" id="" placeholder='My Software Business' onChange={handlechange} value={knowledege.knowledegename}/>
                     <small>You can always change this later.</small><br></br>
                     
                    </form> 
                    <div className='d-flex justify-content-end mb-3'>
                    <button className='btn btn-tranpret border-danger rounded btn-sm mt-5 mr-3 text-danger' type ="button" onClick={()=>knowledegedelete(xid.kid)}>
                      Delete
                 </button>
                <Link to="/admin/knowledge"> <button className='btn btn-transpret rounded btn-sm border border-primary mt-5 mr-3 text-primary'>
                      Cancel
                 </button>  </Link>
                 <button className='btn btn-transpret border border-success rounded btn-sm mt-5 text-success' onClick={indexercreate}>
                      Save
                 </button>
                 </div>
                    </div>
                    </div>
<Footer/>
  </div>
  )
}

export default Knowledge_edit
