import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import './Edit_category.css'
import Sidebar from './Sidebar'
import NavBar from './Navbar'
import Footer from './Footer'
 function Edit_integration() {
    const xid = useParams()
    console.log(xid)
    const[titles,settitles] = useState({
        "_id":"",
        "name":"",
        
       })
    const [editblog,seteditblog] = useState('')
    useEffect(()=>{
      axios.get(`http://localhost:4000/editintegration/${xid.eid}`).then((res)=>{

          console.log(res.data.titleedits)
          settitles(res.data.titleedits)
        })
    },[])
 const [editcategory,seteditcategory] = useState("")
 const navigate = useNavigate()
 


const inputvalue =(e)=>{
  settitles({...titles,[e.target.name]:e.target.value})
}
const categoryvalue = async(e)=>{
  e.preventDefault()
const res =   await axios.put('http://localhost:4000/updateintegration',titles)
if(res.data.success){
  alert(res.data.message)
  navigate('/admin/integration')
}
}

  return (
    <div>
      <Sidebar/>
      <NavBar/>
      {/* <h1>hello</h1> */}
     <div className="container mt-5" >
      <div className="row d-flex justify-content-center align-items-center" style={{"marginLeft":"119px","marginTop":"53px"}}>
        <div className="col-sm-6 mt-5 bg-light border rounded p-4 d-flex justify-content-center align-items-center mb-5">
        <form className="form bg-light " onSubmit={categoryvalue}>
          <h6 className='alert alert-light'>Master Title Update</h6>
                                    
                                        <label for="" className="">Name</label>
                                        <input type="text" class="" name='name' onChange={inputvalue} value={titles.name} style={{ padding: "5px 80px 5px 160px", }} />
                                  
                                         <input type="hidden" name="_id" value={titles._id}/>
                                    
                                       
                             <button className=" btn btn-success mt-3 " type='submit' >Update</button>   

                                    </form>
        </div>
      </div>
     </div>
          <Footer/>
    </div>
  )
}

export default Edit_integration
