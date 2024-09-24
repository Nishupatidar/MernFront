import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import './Edit_category.css'
import Sidebar from './Sidebar'
import NavBar from './Navbar'
import Footer from './Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 function Edit_title() {
    const xid = useParams()
    const [initialAutoblog, setInitialAutoblog] = useState({});
    console.log(xid)
    const[titles,settitles] = useState({
        "id":"",
        "title":"",
        "keyword":""
       })
    const [editblog,seteditblog] = useState('')
    useEffect(()=>{
      axios.get(`http://localhost:4000/titleedit/${xid.eid}`).then((res)=>{

          console.log(res.data.titleedits[0])
          settitles(res.data.titleedits[0])
          setInitialAutoblog(res.data.titleedits[0])
        })
    },[])
 const [editcategory,seteditcategory] = useState("")
 const navigate = useNavigate()
 


const inputvalue =(e)=>{
  settitles({...titles,[e.target.name]:e.target.value})
}
const categoryvalue = async(e)=>{
  e.preventDefault()
  if (JSON.stringify(initialAutoblog) === JSON.stringify(titles)) {
    toast.error('No changes made. Please edit the data before saving.');
    return;
  }
const res =   await axios.put('http://localhost:4000/updatetitle',titles)
if(res.data.success){
  toast.success(res.data.message)
  navigate('/admin/mastertitle')
}
}

  return (
    <div>
      <Sidebar/>
      <NavBar/>
      {/* <h1>hello</h1> */}
     <div className="container mt-5" >
      <ToastContainer position ='top-center'/>
      <div className="row " style={{"marginLeft":"119px","marginTop":"53px"}}>
        <div className="col-sm-12 mt-5 bg-light border rounded p-4  mb-5">
        <form className="bg-light pb-5 " onSubmit={categoryvalue}>
          <h5 className=' text-center'>Master Title Update</h5>
                                    
                                        <label for="" className="mt-2">Title</label>
                                        <input type="text" class="form-control mt-2" name='title' onChange={inputvalue} value={titles.title}  />
                                  
                                         <input type="hidden" name="_id" value={titles.id}/>
                                    
                                        <label for="exampleInputEmail1" class="mt-2">Keyword</label>
                                        <input type="text" class="form-control mt-2" name='keyword' onChange={inputvalue} value={titles.keyword}  />

                                   
                             <button className=" btn-md btn-success mt-5 px-5 py-2 rounded mb-5 " type='submit' >Update</button> 
                             <button className='btn-md btn-danger mt-5 px-5 py-2 rounded mb-5 ml-3'  type='button' onClick={()=>navigate('/admin/mastertitle')}>Cancel</button>

                                    </form>
        </div>
      </div>
     </div>
          <Footer/>
    </div>
  )
}

export default Edit_title
