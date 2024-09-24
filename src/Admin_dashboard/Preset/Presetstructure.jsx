import React from 'react'

function Presetstructure({setFormData,formData}) {
  const handleChange = (event)=>{
    const value = event.target.type === 'checkbox' ? (event.target.checked ? 1 : 0) : event.target.value;
    setFormData({...formData, [event.target.name]:value})
  }
  return (
    <div>
      <label>Call-To-Action</label>
      <input type='text' placeholder='https://mywebsite.com/' onChange={handleChange} name='calltoaction' value={formData.calltoaction}></input>
      <span>We'll add an extra h3 to your articles with a call-to-action to this URL. 
Leave blank to opt-out.</span>
<div className="row">
<div className="col-lg-4 col-md-6 col-sm-6">
<label>Key Takeaways</label><br></br>
        <label class="switch">
  <input type="checkbox" onChange={handleChange} name='key' checked={formData.key}/>
  <span class="slider"></span>
</label>
{/* <span>We will bold important keyword in your article</span> */}
</div>
<div className="col-lg-4 col-md-6 col-sm-6">
<label>Conclusion</label><br></br>
        <label class="switch">
  <input type="checkbox" onChange={handleChange} name='conclusion' checked={formData.conclusion}/>
  <span class="slider"></span>
</label>
</div>
<div className="col-lg-4 col-md-6 col-sm-6">
<label>FAQs</label><br></br>
        <label class="switch">
  <input type="checkbox" onChange={handleChange} name='FAQs' checked={formData.FAQs}/>
  <span class="slider"></span>
</label>
</div>
<div className="col-lg-4 col-md-6 col-sm-6">
<label>Article Size</label><br></br>
        <select className='border border-primary pl-5 pr-5 pt-2 pb-2 rounded'  onChange={handleChange} name='articlesize' value={formData.articlesize}>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
        </select>
</div>
</div>
<div className="row">
    <div className="col-lg-4 col-md-6 col-sm-6">
    <label>Automate Headings</label><br></br>
        <label class="switch">
  <input type="checkbox" onChange={handleChange} name='automateheadings' checked={formData.automateheadings}/>
  <span class="slider"></span>
</label>
    </div>
</div>
    </div>
  )
}

export default Presetstructure
