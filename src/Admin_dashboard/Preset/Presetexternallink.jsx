import React ,{useState,useEffect}from 'react'
import axios from 'axios'
function Presetexternallink({setFormData,formData}) {
    const [rows, setRows] = useState([{ id: 1 }]);
    const [webrows,setRows1] = useState([{id: 1}])
    const [url, setUrl] = useState([]);

    const addRow = () => {
        const newRow = { id: rows.length + 1 };
        // console.log(newRow)
        setRows([...rows, newRow]);
        // console.log(rows)
    };

    const removeRow = (id) => {
        const updatedRows = rows.filter(row => row.id !== id);
        setRows(updatedRows);
    };
    const addRow1 = () => {
        const newRows = { id: webrows.length + 1 };
        console.log(newRows)
        setRows1([...webrows, newRows]);
        console.log(webrows)
    };

    const removeRow1 = (id) => {
        const updatedRows = webrows.filter(row => row.id !== id);
        setRows1(updatedRows);
    };
// console.log(rows1)
    const handleChange = (event, id) => {
        const { name, value } = event.target;
        const updatedUrl = [...url];
        const index = updatedUrl.findIndex(item => item.id === id);
        if (index !== -1) {
            updatedUrl[index][name] = value;
        } else {
            updatedUrl.push({ id, [name]: value });
        }
        setUrl(updatedUrl);
        
        const combinedData = [...url];

        console.log(updatedUrl)
        setFormData(prevFormData => ({
            ...prevFormData, 
            url: [...updatedUrl]
        }))
    };
  return (
    <div>
    <div className="row mt-2">
        <label>Include Links</label>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <span className='text-center'>Page Url</span>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <span className='text-center'>Anchor</span>
                </div>
               
            </div>
            {rows.map(row => (
                <div className="row mt-2" key={row.id}>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <input type="text" name={`url_${row.id}`} placeholder='https://tryjournalist.com' className='' onChange={(event) => handleChange(event, row.id)} />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <input type="text" name={`filter_${row.id}`} placeholder='Leave blank to auto-generate.' onChange={(event) => handleChange(event, row.id)} />
                    </div>
                    {/* <div className="col-lg-3 col-md-6 col-sm-12">
                        <input type="text" name={`exclude_${row.id}`} placeholder='/about/' onChange={(event) => handleChange(event, row.id)} />
                    </div> */}
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        {rows.length >= 0 && (
                            <button className='btn-light border border-primary px-2 mt-2 ' onClick={() => removeRow(row.id)}>
                                <span className='text-primary fw-blod'>-</span>
                            </button>
                        )}
                    </div>
                </div>
            ))}
            <button className='border border-primary pl-3 pr-3 rounded mb-5 mt-3' type='button' onClick={addRow}>
                <span className='text-primary pr-3'>+</span>
                <span>Add Link</span>

            </button><br></br>
            <small>We'll include these exact links as: <a href="[Page URL]">[Anchor]</a> 
We'll randomly select up to 1 link per paragraph.</small><br></br>
<label>Automatic External Links</label>
<div className="col-lg-4 col-md-6 col-sm-6">
          {/* <label>Automatic External Links</label><br /> */}
          <label className="switch">
            <input type="checkbox" onChange={handleChange} name="externallink"  />
            <span className="slider"></span>
          </label>
        </div>
        <small>We'll scrape the internet for relevant articles in your niche & language.</small><br></br>
        <div className="row mt-2">
        <label>Include External Sources</label>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <span className='text-center'>Website Url</span>
                </div>
                {/* <div className="col-lg-3 col-md-6 col-sm-12">
                    <span className='text-center'>Anchor</span>
                </div> */}
               
            </div>
            {webrows.map(row => (
                <div className="row mt-2" key={row.id}>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <input type="text" name={`weburl_${row.id}`} placeholder='https://tryjournalist.com' className='' onChange={(event) => handleChange(event, row.id)} />
                    </div>
                    {/* <div className="col-lg-3 col-md-6 col-sm-12">
                        <input type="text" name={`filter_${row.id}`} placeholder='Leave blank to auto-generate.' onChange={(event) => handleChange(event, row.id)} />
                    </div> */}
                    {/* <div className="col-lg-3 col-md-6 col-sm-12">
                        <input type="text" name={`exclude_${row.id}`} placeholder='/about/' onChange={(event) => handleChange(event, row.id)} />
                    </div> */}
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        {webrows.length >= 0 && (
                            <button className='btn-light border border-primary px-2 mt-2 ' onClick={() => removeRow1(row.id)}>
                                <span className='text-primary fw-blod'>-</span>
                            </button>
                        )}
                    </div>
                </div>
            ))}
            <button className='border border-primary pl-3 pr-3 rounded mb-5 mt-3' type='button' onClick={addRow1}>
                <span className='text-primary pr-3'>+</span>
                <span>Add Website</span>

            </button><br></br>
                <small>ONLY links from these websites will be included. 
Leave blank to include ALL websites.</small>

    </div>
  )

  }
export default Presetexternallink
