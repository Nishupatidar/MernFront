import React, { useState,useEffect } from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Social_media_edit() {
    const navigate = useNavigate()
    const xid = useParams()
    const [selectedType, setSelectedType] = useState('');
    const [socialvalue,setsocialvalue] = useState({})
    const [initialAutoblog,setInitialAutoblog] = useState({})
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
        if (JSON.stringify(initialAutoblog) === JSON.stringify(socialvalue)) {
          toast.warning('No changes made. Please edit the data before saving.');
          return;
        }
        axios.put('http://localhost:4000/socialupdate',socialvalue).then((res)=>{
          if(res.data.success){
            toast.success(res.data.message)
            navigate('/admin/socialmedia')
          }
          // alert(res.data)
        })
        console.log(socialvalue)
      }
      useEffect(()=>{
        axios.get(`http://localhost:4000/socialmediaedit/${xid.sid}`).then((res)=>{
            setsocialvalue(res.data.socialedit)
            setInitialAutoblog(res.data.socialedit)
            if (res.data.socialedit && res.data.socialedit.type) {
              setSelectedType(res.data.socialedit.type);
            }
        })
            },[])
      const deletesocialmedia = async(did)=>{
        console.log(did)
        const res =  await axios.get(`http://localhost:4000/socialdelete/${did}`)
           if(res.data.success){
               toast.error(res.data.message)
               navigate('/admin/socialmedia')
           }
        }
  return (
    <div>
    <Sidebar/>
       <Navbar/>
       <div className="container mt-5">
        <ToastContainer position = 'top-center'/>
      <div className="row " style={{ "marginLeft": "119px", "marginTop": "53px" }}>
        <form className="form bg-light mt-2 p-5">
          <h5 className='text-center'>Social Media/Update</h5>
          <label className='mt-2'> Socail Media Name</label>
          <input type="text" name="socailmedianame" id="" placeholder='My Facebook page'onChange={handleChange} value={socialvalue.socailmedianame} />
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
            // value={socialvalue.type}
          /> */}
          <input type="hidden" name="_id" onChange={handleChange} value={socialvalue._id} ></input>
          {/* <datalist id="datalistOption">
           
          </datalist> */}
<select onChange={handleTypeChange} name='type' className="form-control" value={socialvalue.type}>
<option value="Facebook">Facebook</option>
            <option value="X (Twitter)"> X Twitter</option>
</select>
          {selectedType === 'Facebook' && (
            <>
              <label className='mt-3'>Connect with Facebook</label>
              <button className='btn btn-light  btn-sm rounded border-info ' style={{"width":"200px"}}>
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
                name='facebook_page'
                onChange={handleChange}
                value={socialvalue.facebook_page}
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
     <button className='btn btn-light bg-dark btn-sm rounded ' style={{"width":"200px"}}>
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
                name='syndiication'
                onChange={handleChange}
                placeholder="Please select a Syndication"
                value={socialvalue.syndiication}
              /> */}
              <select  className="form-control" name='syndication' onChange={handleChange} value={socialvalue.syndication}>
                <option value="Syndication">Syndication</option>
                <option value="Integration">Integration</option>
              </select>
              <small>Select an integration so that whenever a Publication is created, we'll share it on Social Media.
                Leave blank to opt out of this feature.
              </small>
            </>
          )}

        </form>
        <div className='d-flex justify-content-end mb-3'>
        <button className='btn btn-transpret text-danger rounded btn-sm border border-danger mt-5 mr-3' onClick={()=>deletesocialmedia(xid.sid)}>
            Delete
          </button>
          <Link to="/admin/socialmedia">
            <button className='btn btn-transpret rounded btn-sm border border-primary mt-5 mr-3'>
              Cancel
            </button>
          </Link>
          <button className='btn btn-primary rounded btn-sm mt-5' onClick={socialmedia}>
            save
          </button>
        </div>
      </div>
    </div>

                       <Footer/>
   </div>
  )
}

export default Social_media_edit
