import React ,{useState,useEffect}from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Presetknowledge({setFormData,formData}) {
  const [knowledege,setknowledege] = useState([])
  useEffect(()=>{
axios.get('http://localhost:4000/knowledegeget').then((res)=>{
  setknowledege(res.data.knowledege)
})
  })
  const handleChange = (event)=>{
    const value = event.target.type === 'checkbox' ? (event.target.checked ? 1 : 0) : event.target.value;
    setFormData({...formData, [event.target.name]:value})
  }
  return (
    <div>
       <div>
        <form>
        <label>Connect to web</label><br></br>
        <label class="switch">
  <input type="checkbox" name='webconnect' onChange={handleChange} checked={formData.webconnect}/>
  <span class="slider"></span>
</label><br></br>
<div className="d-flex justify-content-between align-items-center">
    <label htmlFor="exampleDataList" className="form-label mt-2">
        Knowledge Base
    </label>
    <div className="">
    <Link to ="/admin/knowledge"  className=' btn-sm btn-tarnsparenet border border-primary  py-1 rounded text-primary'>
       + Create Knowledge Base
    </Link></div>
</div>
<select className='form-control' name='knowledgebase' onChange={handleChange} value={formData.knowledgebase}>
{knowledege && knowledege.map((items,index)=>{
  return(

    <option value = {items.knowledegename} onChange={handleChange}>{items.knowledegename}</option>
  )
})}

</select>
<span>We'll generate content inspired on the Knowledge base </span>
</form>   </div>
    </div>
  )
}

export default Presetknowledge
