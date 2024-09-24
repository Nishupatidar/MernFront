import React, { useState } from 'react'

function Presetinternallink({setFormData,formData,onFileUpload}) {
    const [rows, setRows] = useState([{ id: 1 }]);
    const [url, setUrl] = useState([]);

    const addRow = () => {
        const newRow = { id: rows.length + 1 };
        setRows([...rows, newRow]);
        setUrl([...url, newRow]);
    };

    const removeRow = (id) => {
     
        const updatedRows = rows.filter(row => row.id !== id);
        setRows(updatedRows);
        const updatedUrl = url.filter(row => row.id !== id); // Remove corresponding row from url state
        setUrl(updatedUrl);
    };
 
    const handleChange = (event, id) => {
        const { name, value } = event.target;
        const updatedUrl = [...url];
        console.log(updatedUrl)
        const index = updatedUrl.findIndex(item => item.id === id);
        console.log(index)
        if (index !== -1) {
            updatedUrl[index][name] = value;
        } else {
            updatedUrl.push({ id, [name]: value });
        }

        setUrl(updatedUrl); 
       
        setFormData(prevFormData => ({
            ...prevFormData, 
            url: [...updatedUrl]
        }))
    };
// console.log("url",url)
    

   
  return (
    <div>
            <div className="row mt-2">
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <span className='text-center'>URL</span>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <span className='text-center'>Filter Pattern</span>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <span className='text-center'>Exclude Pattern</span>
                </div>
            </div>
            {rows.map(row => (
                <div className="row mt-2" key={row.id}>
                    
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <input type="text" name={`url_${row.id}`}  placeholder='https://' className='' onChange={(event) => handleChange(event, row.id)} value={url.find(item => item.id === row.id)?.[`url_${row.id}`] || ''} />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <input type="text" name={`filter_${row.id}`} placeholder='/blog/' onChange={(event) => handleChange(event, row.id)} value={url.find(item => item.id === row.id)?.[`filter_${row.id}`] || ''} />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <input type="text" name={`exclude_${row.id}`} placeholder='/about/' onChange={(event) => handleChange(event, row.id)} value={url.find(item => item.id === row.id)?.[`exclude_${row.id}`] || ''}/>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        {rows.length >= 0 && (
                            <button className=' btn-sm btn-light border border-primary px-2 mt-2 '  onClick={() => removeRow(row.id)}>
                                <span className='text-primary fw-blod'>-</span>
                            </button>
                        )}
                    </div>
                </div>
            ))
         
            }
            
            <button className=' btn-sm border border-primary pl-3 pr-3 rounded mb-5 mt-3' type='button' onClick={addRow} >
                <span className='text-primary pr-3'>+</span>
                <span>Add Sitemap</span>
            </button><br />
            <button className=' btn-sm border border-primary pl-3 pr-3 rounded mt-1' type='button' >
                <span>Test & Preview Links</span>
            </button><br />
            <small>We will give you a preview of all the internal links that will be placed in your article.</small><br />
            <label className='mt-2'>Link Density</label><br />
            <input type="range" className='px-5' onChange={handleChange} name='linkdensity' value={formData.linkdensity}></input><br />
            <small className='pr-5'>No link</small><small>Up to 4 links per section</small>
            <p><small>This also affects the External Links.</small></p>
{/* drag file */}
            
        </div>
  )
}

export default Presetinternallink
