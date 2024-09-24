import React from 'react'

function Presetvideos({formData,setFormData}) {
  const handleChange = (event)=>{
    // const { name, checked,value } = event.target;
    const value = event.target.type === 'checkbox' ? (event.target.checked ? 1 : 0) : event.target.value;
    setFormData({ ...formData, [event.target.name]: value });
  }
  return (
    <div>
      <label>Automate Youtube Videos</label><br />
          <label className="switch">
            <input type="checkbox" onChange={handleChange} name="youtubevideo" checked={formData.youtubevideo}/>
            <span className="slider"></span>
          </label><br/>
          {!formData.youtubevideo && (
<>
          <label>Youtube Videos (1 link per line)</label>
          <textarea className='border border-info' name='youtubelink' value={formData.youtubelink} onChange={handleChange}></textarea>
          <small>We'll insert at least one youtube video and place it in your article</small>
          </>
          )}
    </div>
  )
}

export default Presetvideos
