import React,{useState} from 'react'

function Presetbaseform({formData,setFormData}) {
  const [selectedType, setSelectedType] = useState("title");
  // const [formdata,setformData] = useState({})
  // console.log(formData)
  const handleTypeChange = (event)=>{
    setSelectedType(event.target.value);
    setFormData({...formData, [event.target.name]:event.target.value})
  }
  const handleChange = (event)=>{
    setFormData({...formData, [event.target.name]:event.target.value})
  }
  return (
    <div>
       <div>
        <form>
        <label>Generation Mode</label>
        <select className='form-control' onChange={handleTypeChange} name="generationmode" value={formData.generationmode}>
          <option value="title">Title</option>
          <option value="keyword">Keyword</option>
          <option value="description">Description</option>
        </select>
        {selectedType === "title" && (
          <>
        <span>Each option provides a different way to generate content.</span><br></br>
        <label>Titles (1 per line)</label>
        <textarea className='border w-12' name="title" onChange={handleChange} placeholder="How to bake bread"  value={formData.title}></textarea>
        </>
        )}
        {selectedType === "keyword" && (
          <>
          <label>Keyword (1 per line)</label>
        <textarea className='border w-12'name="keyword" onChange={handleChange} placeholder="How to bake bread" value={formData.keyword}></textarea>
        <small>We'll generate an article for each keyword.</small>
          </>
        )}
        {selectedType === "description" && (
          <>
          <label>Context Description</label>
        <textarea className='border w-12' name = "description" placeholder='Space x is a company that produces rockets' onChange={handleChange} value={formData.description}></textarea>
        
          </>
        )}
        </form>
      </div>
    </div>
  )
}

export default Presetbaseform
