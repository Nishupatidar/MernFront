import React, { useState ,useEffect} from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import Footer from '../Footer'
import axios from 'axios'
import { Link,useNavigate,useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Autoblogcreate() {
    const navigate = useNavigate()
    const [preset,setpreset] = useState([])
    const [integration,setintegration] = useState([])
    const [initialAutoblog, setInitialAutoblog] = useState({});
    const [autoblog,setautoblog] = useState({})
    useEffect(()=>{
        axios.get('http://localhost:4000/presetget').then((res)=>{
          setpreset(res.data.preset)
        })
      },[])
      useEffect(()=>{
        axios.get('http://localhost:4000/integrationget').then((res)=>{
          setintegration(res.data.Integration)
        })
      },[])
      const [isChecked, setIsChecked] = useState(false);

      const handleToggle = (e) => {
    
        setIsChecked(!isChecked);
        const value = e.target.checked ? 1 : 0;
        setautoblog({...autoblog,[e.target.name]:value})
      };
      const handleChange = (e)=>{
        setautoblog({...autoblog,[e.target.name]:e.target.value})
      }
      const autoblogs = (e)=>{
           e.preventDefault()
           console.log(autoblog)
        //    if (JSON.stringify(initialAutoblog) === JSON.stringify(autoblog)) {
        //     toast.warning('No changes made. Please edit the data before saving.');
        //     return;
        //   }
           axios.post('http://localhost:4000/autoblogadd',autoblog).then((res)=>{
            if(res.data.success){
              toast.success(res.data.message)
              navigate('/admin/autoblog')
            }
           })
    console.log(autoblog)
      }
  return (
   <>
   <div>
     <Sidebar/>
        <Navbar/> 
        <div className="container mt-5">
          <ToastContainer position = 'top-center'/>
                <div className="row " style={{ "marginLeft": "119px", "marginTop": "53px" }}>
                    <form className="form bg-light mt-2 p-5">
                        <h6 className='alert alert-light text-center'>Autoblog/Create</h6>
                        <label className='mt-2'>Name</label>
                        <input type="text" name="autoblogname" id="" placeholder='Weekly Cake Recipes' onChange={handleChange} value={autoblog.autoblogname}/>
                        <>
                        <div className="d-flex justify-content-between align-items-center">
    <label htmlFor="exampleDataList" className="form-label mt-2">
        Preset
    </label>
    <Link to = "/admin/presetcreate"className='text-end border border-primary px-4 py-1 rounded text-primary'>
     Create Preset
    </Link>
</div>
  {/* <input
    className="form-control"
    list="datalistOptions"
    id="exampleDataList"
    placeholder="Please select a preset"
    name="preset"
    value={autoblog.preset}
    onChange={handleChange}
  /> */}
    <select id="datalistOptions" className="form-control" name="preset" value={autoblog.preset} onChange={handleChange}>
  {preset && preset.map((items,index)=>{
    return (

      <option value={items.presetname}>{items.presetname}</option>
    )
  })}
  </select>
    
</>
<>
  {/* <div className="row"> */}
  <label htmlFor="exampleDataList" className="form-label mt-2" >
    Quantity
  </label>
    {/* <div className="col-lg-6 col-sm-12 col-md-2"> */}
  
    <div class="input-group mb-3">
  <input
    className="form-control"
    list="datalistOptions1"
    id="exampleDataList"
    placeholder="Please select a preset"
    name="quantity"
    value={autoblog.quantity}
    onChange={handleChange}
  />
  <datalist id="datalistOptions1">
    <option value="1"></option>
    <option value="2"></option>
    <option value="5"></option>
    <option value="10"></option>
    <option value="20"></option>
    <option value="40"></option>
    <option value="50"></option><option value="60"></option><option value="100"></option><option value="200"></option>
  </datalist>
    {/* </div> */}
    {/* <div className="col-lg-6 col-sm-12 col-md-2"> */}

  <input
    className="form-control"
    list="datalistOptionss"
    id="exampleDataList"
    placeholder="Please select a preset"
    name='timedelay'
    value={autoblog.timedelay}
    onChange={handleChange}
  />
  <datalist id="datalistOptionss">
    <option value="Every 6 Hours"></option>
    <option value="Every 12 Hours"></option>
    <option value="Every 6 week"></option>
    <option value="Every 6 day"></option>
    <option value="Every 6 Month"></option>
  </datalist>
    </div>
    <small style={{"fontSize":"small"}}>All articles will be generated at once in the selected interval.
Example: If you choose 10 articles every week, 10 articles will be generated at once every week.</small>
  {/* </div> */}
</>
<>
<div className="d-flex justify-content-between align-items-center">
    <label htmlFor="exampleDataList" className="form-label mt-2">
        Integration
    </label>
    <Link to = "/admin/integration"className='text-end border border-primary px-4 py-1 rounded text-primary' style={{"fontSize":"small"}}>
       Create Integration
    </Link>
</div>
  {/* <input
    className="form-control"
    list="datalistOptionsin"
    id="exampleDataList"
    placeholder="Please select a preset"
    name='integration'
    // value={autoblog.integration}
    onChange={handleChange}
  /> */}

  <select id="datalistOptionsin" value={autoblog.integration} className="form-control"  name='integration' onChange={handleChange}>
    {integration && integration.map((items,index)=>{
      return(

        <option value={items.IntegrationName}>{items.IntegrationName}</option>
      )
    })}
   
  </select>
</>
<label className='mt-2'>Status</label>
        <label class="switch">
  <input type="checkbox" onChange={handleToggle} id="toggleButton" checked={autoblog.status} name='status'/>
  <label htmlFor="toggleButton">
  {/* <span class="slider"></span> */}
        {isChecked ? "Active" : "Paused"}
      </label>
</label>

                        </form>
                        <div className='d-flex justify-content-end mb-3'>
                        {/* <button className='btn btn-transpret rounded btn-sm border border-danger mt-5 mr-3' type='submit' onClick={()=>autoblogsdelete(xid.aid)}>
                         Delete
                    </button> */}
                   <Link to="/admin/autoblog"> <button className='btn btn-transpret rounded btn-sm border border-primary mt-5 mr-3'>
                         Cancel
                    </button>  </Link>
                    <button className='btn btn-primary rounded btn-sm mt-5 ml-2' type='submit' onClick={autoblogs}>
                         Create a Autoblog
                    </button>
                    </div>
                        </div>
                      
                        </div>

                        <Footer/>
    </div>
   </>
  )
}

export default Autoblogcreate