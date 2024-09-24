import React,{useState,useEffect} from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Social_media() {
    const [Social,setSocial] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        try{
            axios.get('http://localhost:4000/socialmediaget').then((res) => {
                setSocial(res.data.Socialmedia)
            })
          }
          catch(error){
            console.log(error)
          }
          }, [])
          const socailmedia = (id)=>{
            navigate(`/admin/socialmedia/${id}`)
          }
  return (
    <div>
    <Navbar/>
          <Sidebar/>
          <div className="container mt-5">
              <div className="row mb-3 d-flex justify-content-between " style={{ marginLeft: "120px", marginTop: "53px" }}>
                  <div className="col-sm-2 mt-5">
                    <Link to="/admin/socialmediacreate">  <button className='btn btn-success' > <span className='pr-2 autoblogspan'>+</span>New Social Media</button></Link>
                  </div>
                  </div>
              <div class="content-wrapper" style={{
                  "marginLeft": "117px",
                  "marginRight": "-80px"
              }}>
                  <section class="content-header">
                      <div class="container-fluid">
                          <div class="row mb-2">
                              <div class="col-sm-6">
                                  <h1>Social Media</h1>
                                  <small>You can syndicate your Publications to one of your Social Medias.</small>
                              </div>

                          </div>
                      </div>
                  </section>


                  <section class="content">
                      <div class="container-fluid">
                          <div class="row">
                              {/* <div class="col-12"> */}
                              <div class="card">


                                  <div class="card-body">
                                      <table id="example2" class="table table-bordered table-hover">
                                          <thead>
                                              <tr>

                                                  <th >Name</th>
                                                  {/* <th >Status</th>
                                                  <th >Next Batch</th> */}


                                              </tr>
                                          </thead>
                                          <tbody>
                                              {Social && Social.map((items, index) => {
                                                //   const iconName = items.icon.toLowerCase();
                                                //   const IconComponent = iconComponents[iconName] || DefaultIcon;
                                                  return (
                                                      <tr>


                                                          <td onClick={()=>socailmedia(items._id)}>{items.socailmedianame}</td>
                                                          {/* <td><spna className="pr-2">{IconComponent && <IconComponent />}</spna></td> */}
                                                         </tr>
                                                  )
                                              }) }
                                             

                                          </tbody>
                                          <tfoot>
                                              <tr>

                                              <th>Name</th>
                                                  
                                                  
                                              </tr>
                                          </tfoot>
                                      </table>
                                  </div>


                              </div>


                          </div>
                      </div>
                  </section>
              </div>
          </div>
          <Footer />
  </div>
  )
}

export default Social_media
