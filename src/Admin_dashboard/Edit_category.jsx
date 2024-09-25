import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Edit_category.css'
import Sidebar from './Sidebar'
import NavBar from './Navbar'
import Footer from './Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 function Edit_category() {
 const [editcategory,seteditcategory] = useState("")
 const [initialAutoblog, setInitialAutoblog] = useState({});
 const navigate = useNavigate()
 const {eid} = useParams()
 const[edit,setedit] = useState({
  "_id":"",
  "category_name":"",
  "description":""
 })
 useEffect(() => {
   axios.get(`https://mernblog-5-56r6.onrender.com/categoryedit/${eid}`).then((res)=>{

     setedit(res.data.useredit)
     setInitialAutoblog(res.data.useredit)
   })
},[eid])

const inputvalue =(e)=>{
  setedit({...edit,[e.target.name]:e.target.value})
}
const categoryvalue = async(e)=>{
  e.preventDefault()
  if (JSON.stringify(initialAutoblog) === JSON.stringify(edit)) {
  toast.error('No changes made. Please edit the data before saving.');
    return;
  }
const res =   await axios.put('https://mernblog-5-56r6.onrender.com/updatecategory',edit)
if(res.data.success){
  toast.success(res.data.message)
  navigate('/admin/category')
}
}

  return (
    <div>
      <Sidebar/>
      <NavBar/>
     <div className="container mt-5" >
      <ToastContainer position = 'top-center'/>
      <div className="row" style={{"marginLeft":"119px","marginTop":"53px"}}>
        <div className="col-sm-12 mt-5 bg-light border rounded p-4  mb-5">
        <form className=" bg-light " onSubmit={categoryvalue}>
          <h5 className='text-center'>Category Update</h5>
                                    
                                        <label for="" className="">Name</label>
                                        <input type="text" class="form-control mt-2" name='category_name' onChange={inputvalue} value={edit.category_name}  />
                                  
                                        <input type="hidden" name="_id" value={edit._id}/>
                                    
                                        {/* <label for="exampleInputEmail1" class="mt-1">Description</label>
                                        <input type="text" class="form-control mt-2" name='description' onChange={inputvalue} value={edit.description} /> */}

                                   
                             <button className=" btn-md btn-success mt-3 py-2 px-5 rounded " type='submit' >Update</button>   
                             <Link to="/admin/category" className=" btn-md  btn-danger mt-3 py-2 px-5 rounded ml-3" type='button'>Close</Link>
                                    </form>
        </div>
      </div>
     </div>
          <Footer/>
    </div>
  )
}

export default Edit_category
