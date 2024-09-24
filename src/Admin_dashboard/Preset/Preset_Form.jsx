import React, { useState } from 'react'
import './Preset_Form.css'
function Preset_Form({ integration }) {
  const [showFrom, setshowFrom] = useState("true")
  return (
    <div>
      <div>
        <form>
        <label>Generation Mode</label>
        <select className='form-control'>
          <option value="title">Title</option>
          <option value="keyword">Keyword</option>
          <option value="description">Description</option>
        </select>
        <span>Each option provides a different way to generate content.</span><br></br>
        <label>Titles (1 per line)</label>
        <textarea className='border w-12'></textarea>
        </form>
      </div>
      {/* content from  */}
      <div>
        <form>
        <label >Language</label>
        <select className='form-control'><option>Hindi</option>
          <option>English</option>
          <option></option></select>
        <label>Target Country</label>
        <select className='form-control'>
          <option value="unitedstates">United States</option>
          <option value="zambia">Zambia</option>
        </select>
        <label>Creativity</label><br />
        <input type="range" style={{ "paddingLeft": "300px", "paddingRight": "300px" }}></input>
       <div className='d-flex justify-content-between'><span >correct/Factual</span><span>Creative/Original</span></div>
       <label>Tone of Voice</label>
       <input  type='text'></input>
       <label>Point of View</label>
       <select className='form-control'>
        <option>Automatic</option>
        <option>First Person Plural (we, use, our ,ours)</option>
        <option>First Person singular(i, me,my, mine)</option>
       </select>
       {/* <label>Formality</label>
       <select className='form-control'>
        <option>Automatic</option>
        <option>Formal</option>
        <option>informal</option>
       </select> */}
       <label> Custom Instructions</label>
       <textarea name="" id="" cols="5" rows="1"></textarea>
       <label>Include Exact Keyword (1 per line)</label>
<textarea name="" id="" cols="5" rows="1"></textarea>
</form>
      </div>
      {/* Knowledge */}
      <div>
        <form>
        <label>Connect to web</label><br></br>
        <label class="switch">
  <input type="checkbox"/>
  <span class="slider"></span>
</label><br></br>
<label className='pt-2'>Knowledge Base</label>
<select className='form-control'>
  <option>No specific Knowledge base</option>

</select>
<span>We'll generate content inspired on the Knowledge base </span>
</form>   </div>
      
    {/* Formatting */}

<div className="row">
<div className="col-lg-4 col-md-6 col-sm-6">
<label>Bold</label><br></br>
        <label class="switch">
  <input type="checkbox"/>
  <span class="slider"></span>
</label>
{/* <span>We will bold important keyword in your article</span> */}
</div>
<div className="col-lg-4 col-md-6 col-sm-6">
<label>Italics</label><br></br>
        <label class="switch">
  <input type="checkbox"/>
  <span class="slider"></span>
</label>
</div>
<div className="col-lg-4 col-md-6 col-sm-6">
<label>Tables</label><br></br>
        <label class="switch">
  <input type="checkbox"/>
  <span class="slider"></span>
</label>
</div>
<div className="col-lg-4 col-md-6 col-sm-6">
<label>Quotes</label><br></br>
        <label class="switch">
  <input type="checkbox"/>
  <span class="slider"></span>
</label>
</div>
</div>
{/* Structure */}

    </div>

  )
}

export default Preset_Form
