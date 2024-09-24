import React, { useState } from 'react'

function PresetImage({formData,setFormData}) {
  const [selectedType,setSelectedType] = useState('')
  const handleTypeChange =(event)=>{
   
      setSelectedType(event.target.value);
      setFormData({...formData, [event.target.name]:event.target.value})
    
  }
  const handleChange = (event)=>{
    const value = event.target.type === 'checkbox' ? (event.target.checked ? 1 : 0) : event.target.value;
    setFormData({...formData, [event.target.name]:value})

  }
  return (
    <div>
       <form>
        <label>Image Provider</label>
        <select className='form-control' onChange={handleTypeChange} name="imageprovider" value={formData.imageprovider}>
          <option value="Organic Image">Organic Image</option>
          <option value="Stock Image">Stock Image</option>
          <option value="Custom Image">Custom Image</option>
        </select>
        {selectedType === "Custom Image" && (
          <>
           <label>Filter Custom Images</label>
        <select className='form-control' onChange={handleChange} name="customimage" value={formData.customimage}>
          <option value="tagSelect Custom Images with specified tags. Leave blank to include al1">Select Custom Images with specified tags. Leave blank to include al</option>
          <option value="StockImage">Stock Image</option>
          <option value="CustomImage">Custom Image</option>
        </select>
           </>
          ) }
        <label>Image Prompt</label>
        <input type='text' placeholder='black and white' name='promptimage' onChange={handleChange} value={formData.promptimage}></input>
        <label>Featured Image</label><br />
          <label className="switch">
            <input type="checkbox" onChange={handleChange} name="featuredimage" checked={formData.featuredimage}/>
            <span className="slider"></span>
          </label><br/>
          <label>In Article Image</label><br />
          <label className="switch">
            <input type="checkbox" onChange={handleChange} name="articleimage" checked={formData.articleimage}/>
            <span className="slider"></span>
          </label>
         
        </form>

    </div>
  )
}

export default PresetImage
