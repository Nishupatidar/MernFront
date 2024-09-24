import React from 'react'

function Presetcontentform({formData ,setFormData }) {
  const handleChange = (event)=>{
    setFormData({...formData, [event.target.name]:event.target.value})
  }
  return (
    <div>
       <div>
        <form>
        <label >Language</label>
        <select className='form-control' onChange={handleChange} name='language'  value={formData.language}><option value="hindi">Hindi</option>
          <option value="English">English</option>
          <option></option></select>
        <label>Target Country</label>
        <select className='form-control' onChange={handleChange} name='country' value={formData.country}>
          <option value="unitedstates">United States</option>
          <option value="zambia">Zambia</option>
        </select>
        <label>Creativity</label><br />
        <input type="range"  name='creativity' onChange={handleChange} value={formData.creativity} style={{"width":"100%"}}></input>
       <div className='d-flex justify-content-between'><span className='text-responsive' >correct/Factual/</span><span>Creative/Original</span></div>
       <label>Tone of Voice</label>
       <input  type='text'onChange={handleChange} name='voice' value={formData.voice}></input>
       <label>Point of View</label>
       <select className='form-control'onChange={handleChange} name='pointofview' value={formData.pointofview}>
        <option value="Automatic">Automatic</option>
        <option value="First Person Plural (we, use, our ,ours)">First Person Plural (we, use, our ,ours)</option>
        <option value="First Person singular(i, me,my, mine)">First Person singular(i, me,my, mine)</option>
       </select>
       {/* <label>Formality</label>
       <select className='form-control'>
        <option>Automatic</option>
        <option>Formal</option>
        <option>informal</option>
       </select> */}
       <label> Custom Instructions</label>
       <textarea name="costominstruction" id="" cols="5" rows="1" onChange={handleChange} value={formData.costominstruction}></textarea>
       <label>Include Exact Keyword (1 per line)</label>
<textarea name="exactkeyword" id="" cols="5" rows="1" onChange={handleChange} value={formData.exactkeyword}></textarea>
</form>
      </div>
    </div>
  )
}

export default Presetcontentform
