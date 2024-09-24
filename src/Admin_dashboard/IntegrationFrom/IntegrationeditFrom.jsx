import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const IntegrationeditForm = ({ integration ,isActive,setintegrtion,integartions,xid,initialAutoblog}) => {
    const navigate = useNavigate()
console.log(integration)
    const [FormData, setFormData] = useState({
        "Integrationtype":integration
    });

    const handleInputChange = (e) => {
        // const { name, value } = e.target;
        const value = e.target.type === "radio" ? (e.target.value == "2" ? 2 : 0):e.target.value;
        console.log(value)
        setintegrtion({ ...integartions, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (JSON.stringify(initialAutoblog) === JSON.stringify(integartions)) {
            toast.warning('No changes made. Please edit the data before saving.');
            return;
          }
        axios.put('http://localhost:4000/integrationfromupdate',integartions).then((res)=>{
        if(res.data.success){
            toast.success(res.data.message)
            navigate('/admin/integration')
        }
        })
        console.log('Form submitted:', integartions);
        
    };
const handleclear = (e)=>{
    navigate('/admin/integration')
    
}
const handleDelete = (id)=>{
    console.log(id)
    axios.get(`http://localhost:4000/integrationfromdelete/${id}`).then((res)=>{
        if(res.data.success){
            toast.error(res.data.message)
            navigate('/admin/integration')
        }
    })

}
    return (
        <div>
            <ToastContainer position= 'top-center'/>
            <div style={{ display: isActive ? 'block' : 'none' }}>
            {integration === 'Wordpress' && (
                <>
            
<input type = "hidden" name="Integrationtype" defaultvalue="wordpress"></input>
                    <label>Integration Name</label>
                    <input
                        type="text"
                        name="IntegrationName"
                        className='bg-whites'
                        value={integartions.IntegrationName}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Wordpress Url</label>
                    <input
                        type="text"
                        name="url"
                        value={integartions.url}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={integartions.username}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Application Password</label>
                    <input
                        type="text"
                        name="password"
                        value={integartions.password}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />
                </>
            )}

            {integration === 'Shopify' && (
                <>
                    <label>Integration Name</label>
                    <input
                        type="text"
                        name="IntegrationName"
                        value={integartions.IntegrationName}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Shop Name</label>
                    <input
                        type="text"
                        name="shopname"
                        value={integartions.shopname}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Access Token</label>
                    <input
                        type="text"
                        name="token"
                        value={integartions.token}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />
                </>
            )}
 {integration === 'Ghost' && (
                <>
                    <label>Integration Name</label>
                    <input
                        type="text"
                        name="IntegrationName"
                        value={integartions.IntegrationName}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Ghost Url</label>
                    <input
                        type="text"
                        name="url"
                        value={integartions.url}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Admin Key</label>
                    <input
                        type="text"
                        name="Adminkey"
                        value={integartions.Adminkey}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />
                    <label>Author</label>
                    <input
                        type="text"
                        name="Author"
                        value={integartions.Author}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />
                    <label>Status</label>
                    <select
                        name="status"
                        value={integartions.status}
                        onChange={handleInputChange}
                        style={{ padding: "7px 30px 7px 30px" }}
                        >
                        <option value="0">Draft</option>
                        <option value="1">Scheduled</option>
                        <option value="2">Published</option>
                    </select><br></br>
                        
                    <label>Time gap between each post</label>
                    <select
                        name="timegap"
                        value={integartions.timegap}
                        className=''
                        onChange={handleInputChange}
                        style={{ padding: "7px 30px 7px 30px" }}
                    >
                        <option value="nogap">No gap</option>
                        <option value="15min">15 minutes</option>
                        <option value="1hour">1 hour</option>
                        <option value="4hours">4 hours</option>
                        <option value="1day">1 day</option>
                        <option value="2days"> 2 days</option>


                    </select>
                    <br></br>
                </>

            )}
            {integration === 'Wix' && (
                <>
                    <label>Integration Name</label>
                    <input
                        type="text"
                        name="IntegrationName"
                        value={integartions.IntegrationName}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Site ID</label>
                    <input
                        type="text"
                        name="siteid"
                        value={integartions.siteid}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>API Key</label>
                    <input
                        type="text"
                        name="apikey"
                        value={integartions.apikey}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />
                    <label>Author</label>
                    <input
                        type="text"
                        name="Author"
                        value={integartions.Author}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />
                     <label>Published Immediately</label>
                  
                  <div className="form-check">
                          <input
                              type="radio"
                              name="status"
                              value="0"
                              className = "form-check-input"
                              checked={integartions.status === 0}
                              onChange={handleInputChange}
                          />
                      <label className='form-check-label pl-3'>
                          Draft
                      </label>
                          </div>
                      <div className="form-check">
                          <input
                  type="radio"
                  name="status"
                  value="2"
                  className = "form-check-input"
                  checked={integartions.status === 2}
                  onChange={handleInputChange}
                  />
                              <label className='form-check-label pl-3'>
                          Publish
                      </label>
                  
                  
                  </div>
                    <label>Time gap between each post</label>
                    <select
                        name="timegap"
                        value={integartions.timegap}
                        className=''
                        onChange={handleInputChange}
                        style={{ padding: "7px 30px 7px 30px" }}
                    >
                        <option value="nogap">No gap</option>
                        <option value="15min">15 minutes</option>
                        <option value="1hour">1 hour</option>
                        <option value="4hours">4 hours</option>
                        <option value="1day">1 day</option>
                        <option value="2days"> 2 days</option>


                    </select>
                    <br></br>
                </>

            )}
              {integration === 'Blogger' && (
                <>
                    <label>Integration Name</label>
                    <input
                        type="text"
                        name="IntegrationName"
                        value={integartions.IntegrationName}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Connect with Google</label><br></br>
                    <button className='btn btn-light rounded border-info '><a href='https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?gsiwebsdk=3&client_id=1004781796181-ridlp7kkgo56e8fr9p1verqb8g9onfjc.apps.googleusercontent.com&scope=openid%20profile%20email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fblogger&redirect_uri=storagerelay%3A%2F%2Fhttps%2Fapp.tryjournalist.com%3Fid%3Dauth849725&prompt=consent&access_type=offline&response_type=code&include_granted_scopes=true&enable_granular_consent=true&service=lso&o2v=2&theme=glif&ddm=0&flowName=GeneralOAuthFlow' target='_blank'>G Connect</a></button><br></br>

                    <label>Blog</label>
                    <input
                        type="text"
                        name="blog"
                        value={integartions.blog}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />
                    
                    <label>Published Immediately</label>
                  
                  <div className="form-check">
                          <input
                              type="radio"
                              name="status"
                              value="0"
                              className = "form-check-input"
                              checked={integartions.status === 0}
                              onChange={handleInputChange}
                          />
                      <label className='form-check-label pl-3'>
                          Draft
                      </label>
                          </div>
                      <div className="form-check">
                          <input
                  type="radio"
                  name="status"
                  value="2"
                  className = "form-check-input"
                  checked={integartions.status === 2}
                  onChange={handleInputChange}
                  />
                              <label className='form-check-label pl-3'>
                          Publish
                      </label>
                  
                  
                  </div>
                   
                </>

            )}
            {integration === 'Webflow' && (
                <>
                    <label>Integration Name</label>
                    <input
                        type="text"
                        name="IntegrationName"
                        value={integartions.IntegrationName}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                   
                    <label>API Token</label>
                    <input
                        type="text"
                        name="token"
                        value={integartions.token}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />
                    
                    <label>Published Immediately</label>
                  
                  <div className="form-check">
                          <input
                              type="radio"
                              name="status"
                              value="0"
                              className = "form-check-input"
                              checked={integartions.status === 0}
                              onChange={handleInputChange}
                          />
                      <label className='form-check-label pl-3'>
                          Draft
                      </label>
                          </div>
                      <div className="form-check">
                          <input
                  type="radio"
                  name="status"
                  value="2"
                  className = "form-check-input"
                  checked={integartions.status === 2}
                  onChange={handleInputChange}
                  />
                              <label className='form-check-label pl-3'>
                          Publish
                      </label>
                  
                  
                  </div>
                   
                </>

            )}
             {integration === 'Zapier' && (
                <>
                    <label>Integration Name</label>
                    <input
                        type="text"
                        name="IntegrationName"
                        value={integartions.IntegrationName}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                   
                </>

            )}
             {integration === 'External Api' && (
                <>
                    <label>Integration Name</label>
                    <input
                        type="text"
                        name="IntegrationName"
                        value={integartions.IntegrationName}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                   
                   

                   
                </>

            )}
            <div className="d-flex justify-content-start">
            <button
                className="btn btn-transprent border border-danger mt-3 mr-2"
                onClick={()=>handleDelete(xid)}
                type='button'
                >
                
                Delete
            </button>
            <button
                className="btn btn-success mt-3"
                type="submit"
                onClick={handleSubmit}
            >
                Save
            </button>
            <button
                className="btn btn-danger mt-3 ml-2"
                type="button"
                onClick={handleclear}
            >
                Cancel
            </button>
            </div>
        </div>
        </div>
    );
};

export default IntegrationeditForm;
