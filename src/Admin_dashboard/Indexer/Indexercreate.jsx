import React,{useState,useEffect} from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Indexercreate() {
  const navigate = useNavigate()
  const [integration,setintegration] = useState([])
  
  useEffect(()=>{
    try{
axios.get('http://localhost:4000/integrationget').then((res)=>{
  setintegration(res.data.Integration)
})
    }
    catch(error){
      console.log(error)
    }
  },[])
  const [indexer,setindexer] = useState({})
  const handlechange = (e)=>{
setindexer({...indexer,[e.target.name]:e.target.value})
  }
const indexercreate = (e)=>{
e.preventDefault()
if (Object.keys(indexer).length === 0 && indexer.constructor === Object) {
  toast.warning("Please fill out at least one form field");
  return; // Prevent submission if formData is empty
}
// console.log(indexer)
axios.post('http://localhost:4000/indexercrate',indexer).then((res)=>{
  if(res.data.success){
    toast.success(res.data.message)
    navigate('/admin/indexer')
  }
}).catch((error)=>{
  console.log(error)
})
}
  return (
    <div>
    <Sidebar/>
       <Navbar/>
       <div className="container mt-5">
        <ToastContainer position = 'top-center'/>
               <div className="row " style={{ "marginLeft": "119px", "marginTop": "53px" }}>
                   <form className="form bg-light mt-2 p-5" onSubmit={indexercreate}>
                       <h6 className='alert alert-light text-center'>Indexer/create</h6>
                       <label className='mt-2'> Indexer Name</label>
                       <input type="text" name="indexername" id="" placeholder='My Indexer' onChange={handlechange} required/>
                       <small>You can always change this later.</small>
                       <>
                      
                       <label className='mt-3'>Connect with Google</label>
                    <button className='btn btn-light  btn-sm rounded border-info ' style={{"width":"200px"}}><a href='https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?gsiwebsdk=3&client_id=1004781796181-ridlp7kkgo56e8fr9p1verqb8g9onfjc.apps.googleusercontent.com&scope=openid%20profile%20email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fblogger&redirect_uri=storagerelay%3A%2F%2Fhttps%2Fapp.tryjournalist.com%3Fid%3Dauth849725&prompt=consent&access_type=offline&response_type=code&include_granted_scopes=true&enable_granular_consent=true&service=lso&o2v=2&theme=glif&ddm=0&flowName=GeneralOAuthFlow' target='_blank'>G Connect</a></button>
<span>Note:<small> We can only index articles on websites linked to this Google account.</small></span>
</>
<label className='mt-3'>Compatible Integrations</label>
<div className="name">
    <h6>Name</h6>
    <select onChange={handlechange} name="integration" className='py-3 px-5 '>
      <option value="" disabled>Select Integration name</option>
      {integration && integration.map((items,index)=>{
        return(
          <option value={items.IntegrationName}>{items.IntegrationName}</option>
        )
      }) }

    </select>
</div>
<small> Publishing articles to these integrations will trigger indexing.
Only integrations that act on websites linked to your Google account are displayed here.
</small>

{/* <label className='mt-2'>Status</label><br></br>
       <label class="switch">
 <input type="checkbox" onChange={handleToggle} id="toggleButton" checked={isChecked}/>
 <label htmlFor="toggleButton">
 {/* <span class="slider"></span> 
       {isChecked ? "Active" : "Paused"}
     </label> 
{/* </label><br></br> */}

                       <div className='d-flex justify-content-end mb-3'>
                  <Link to="/admin/indexer"> <button className='btn btn-transpret rounded btn-sm border border-primary mt-5 mr-3'>
                        Cancel
                   </button>  </Link>
                   <button className='btn btn-primary rounded btn-sm mt-5' type="submit" >
                        Create New Indexer
                   </button>
                   </div>
                       </form>
                       </div>
                     
                       </div>

                       <Footer/>
   </div>
  )
}

export default Indexercreate
