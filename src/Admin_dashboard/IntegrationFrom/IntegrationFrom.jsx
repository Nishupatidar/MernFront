import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const IntegrationForm = ({ integration ,isActive}) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        "Integrationtype":integration
    });

    const handleInputChange = (e) => {
        // const { name, value } = e.target;
        const value = e.target.type === "radio" ? (e.target.value =="2" ? 2 :0):e.target.value;
        console.log(value)
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 1 && formData.constructor === Object) {
            console.log(Object)
            toast.warning("Please fill out at least one form field");
            return; // Prevent submission if formData is empty
          }
        axios.post('http://localhost:4000/integrationcreate',formData).then((res)=>{
        if(res.data.success){
            toast.success(res.data.message)
            navigate('/admin/integration')
        }
        else{
            toast.error(res.data.message)
        }
        })
        console.log('Form submitted:', formData);
        
    };
const handleclear = (e)=>{
    navigate('/admin/integration')
    
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
                        value={formData.IntegrationName}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Wordpress Url</label>
                    <input
                        type="text"
                        name="url"
                        value={formData.url}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Application Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
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
                        value={formData.IntegrationName}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Shop Name</label>
                    <input
                        type="text"
                        name="shopname"
                        value={formData.shop_name}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Access Token</label>
                    <input
                        type="text"
                        name="token"
                        value={formData.token}
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
                        value={formData.IntegrationName}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Ghost Url</label>
                    <input
                        type="text"
                        name="url"
                        value={formData.url}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Admin Key</label>
                    <input
                        type="text"
                        name="Adminkey"
                        value={formData.Adminkey}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />
                    <label>Author</label>
                    <input
                        type="text"
                        name="Author"
                        value={formData.Author}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />
                    <label className='pr-3 mt-3'>Status</label><br></br>
                    <select
                        
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className='mb-3'
                        // style={{ padding: "5px 160px 5px 160px" }}
                    >
                        <option value="0">Draft</option>
                        <option value="1">Scheduled</option>
                        <option value="2">Published</option>
                    </select><br></br>
                    <label>Time gap between each post</label><br></br>
                    <select
                        name="timegap"
                        value={formData.timegap}
                        className=''
                        onChange={handleInputChange}
                        // style={{ padding: "10px 160px 10px 160px" }}
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
                        value={formData.IntegrationName}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Site ID</label>
                    <input
                        type="text"
                        name="siteid"
                        value={formData.siteid}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>API Key</label>
                    <input
                        type="text"
                        name="apikey"
                        value={formData.apikey}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />
                    <label>Author</label>
                    <input
                        type="text"
                        name="Author"
                        value={formData.Author}
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
                              checked={formData.status == "0"}
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
                  checked={formData.status == "2"}
                  onChange={handleInputChange}
                  />
                              <label className='form-check-label pl-3'>
                          Publish
                      </label>
                  
                  
                  </div>
                                     
                    <label>Time gap between each post</label><br></br>
                    <select
                        name="timegap"
                        value={formData.timegap}
                        className=''
                        onChange={handleInputChange}
                        // style={{ padding: "10px 160px 10px 160px" }}
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
                        value={formData.IntegrationName}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                    <label>Connect with Google</label><br></br>
                    <button className='btn btn-light rounded border-info '><a href='https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?gsiwebsdk=3&client_id=1004781796181-ridlp7kkgo56e8fr9p1verqb8g9onfjc.apps.googleusercontent.com&scope=openid%20profile%20email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fblogger&redirect_uri=storagerelay%3A%2F%2Fhttps%2Fapp.tryjournalist.com%3Fid%3Dauth849725&prompt=consent&access_type=offline&response_type=code&include_granted_scopes=true&enable_granular_consent=true&service=lso&o2v=2&theme=glif&ddm=0&flowName=GeneralOAuthFlow' target='_blank'>G Connect</a></button><br></br>

                    <label>Blog</label>
                    <input
                        type="text"
                        name="blog"
                        value={formData.blog}
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
                              checked={formData.status == "0"}
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
                  checked={formData.status == "2"}
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
                        value={formData.IntegrationName}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                   
                    <label>API Token</label>
                    <input
                        type="text"
                        name="token"
                        value={formData.token}
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
            checked={formData.status == "0"}
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
checked={formData.status == "2"}
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
                        value={formData.IntegrationName}
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
                        value={formData.IntegrationName}
                        onChange={handleInputChange}
                        // style={{ padding: "5px 80px 5px 160px" }}
                    />

                   
                   

                   
                </>

            )}
             <div className='d-flex justify-content-end mb-3'>
            <button
                className="btn btn-success mt-3"
                type="submit"
                onClick={handleSubmit}
            >
                Create
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

export default IntegrationForm;
