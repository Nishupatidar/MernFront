import React ,{useState,useEffect}from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Auto_blog = () => {
    const[autoblog,setautoblog] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:4000/autoblog').then((res)=>{
            setautoblog(res.data.Autoblog)
        })
    },[])
    const autoblogsingle = (id)=>{
        navigate(`/admin/autoblog/${id}`)
    }
  return (
    <div>
      <Navbar/>
            <Sidebar />
            <div className="container mt-5">
                <div className="row mb-3 d-flex justify-content-between autoblog-row" style={{ marginLeft: "120px", marginTop: "53px" }}>
                    <div className="col-sm-2 mt-5">
                      <Link to="/admin/autoblogcreate">  <button className='btn btn-success' > <span className='pr-2 autoblogspan'>+</span>New Autoblog</button></Link>
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
                                    <h1>Autoblogs</h1>
                                    <small>An Autoblog allows Journalist AI to generate articles in a certain schedule and send them to one of your integrations.</small>
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
                                        <div className="table-responsive">
                                        <table id="example2" class="table border-left border-right table-hover">
                                            <thead>
                                                <tr>

                                                    <th >Name</th>
                                                    <th >Status</th>
                                                    <th >Next Batch</th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                {autoblog && autoblog.map((items, index) => {
                                                    // const iconName = items.icon.toLowerCase();
                                                    // const IconComponent = iconComponents[iconName] || DefaultIcon;
                                                    return (
                                                        <tr onClick={()=>autoblogsingle(items._id)}>


                                                            <td >{items.autoblogname}</td>
                                                         <td>  {items.status === 0 ? 'Paused' : "Active"}</td> 
                                                            <td></td>
                                                            {/* <td><spna className="pr-2">{IconComponent && <IconComponent />}</spna></td> */}
                                                            {/* <td>{items.icon}</td> 
                                                            {/* <td>{items.keyword}</td> 
                                                            {/* <td style={{ "width": "210px" }}>{items.status ? <span className='bg-success px-2 py-2 rounded' style={{ "marginRight": "2px" }} onClick={() => statusvalue(items._id, 0)} > Active</span> : <span className='bg-danger px-2 py-2 rounded' style={{ "marginRight": "5px" }} onClick={() => statusvalue(items._id, 1)}>Inactive</span>}<span className='bg-info px-2 py-2 rounded' style={{ "marginRight": "2px" }} onClick={() => blogedit(items._id)}><MdModeEditOutline /></span><span className='bg-danger px-2 py-2 rounded' onClick={() => deleteblog(items._id)}><RiDeleteBinFill /></span></td>*/}
                                                        </tr> 
                                                    )
                                                })} 
                                            

                                            </tbody>
                                            <tfoot>
                                                <tr>

                                                <th>Name</th>
                                                    <th>Status</th>
                                                    <th>Next Batch</th>
                                                    
                                                </tr>
                                            </tfoot>
                                        </table>
                                        </div>
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

export default Auto_blog