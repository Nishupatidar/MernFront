import React from 'react';

function Presetformatting({ setFormData, formData }) {
  const handleChange = (event) => {
    // Convert checkbox value to number (0 or 1)
    const value = event.target.checked ? 1 : 0;
    setFormData({ ...formData, [event.target.name]: value });
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 col-8">
          <label>Bold</label><br />
          <label className="switch">
            <input type="checkbox" onChange={handleChange} name="blod" checked={formData.blod} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 col-8">
          <label>Italics</label><br />
          <label className="switch">
            <input type="checkbox" onChange={handleChange} name="italics" checked={formData.italics}/>
            <span className="slider"></span>
          </label>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 col-8">
          <label>Tables</label><br />
          <label className="switch">
            <input type="checkbox" onChange={handleChange} name="tables" checked={formData.tables}/>
            <span className="slider"></span>
          </label>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 col-8">
          <label>Quotes</label><br />
          <label className="switch">
            <input type="checkbox" onChange={handleChange} name="quotes" checked={formData.quotes} />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Presetformatting;
