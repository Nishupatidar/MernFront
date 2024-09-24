import React ,{useEffect,useState}from 'react'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import axios from 'axios'
function Knowledge() {
    const navigate = useNavigate()
    const [knowledege,setknowledege] = useState([])
    useEffect(()=>{
axios.get('http://localhost:4000/knowledegeget').then((res)=>{
    setknowledege(res.data.knowledege)
})
    })
    const knowledegesingle = (id)=>{
        navigate(`/admin/knowledgeedit/${id}`)
    }
    return (
        <div>

            <Navbar />
            <Sidebar />

            <div className="container mt-5">
                <div className="row mb-3 d-flex justify-content-between " style={{ marginLeft: "120px", marginTop: "53px" }}>
                    <div className="col-sm-2 mt-5">
                        <Link to="/admin/knowledgecreate">  <button className='btn btn-success' > <span className='pr-2 autoblogspan'>+</span>New Knowledge</button></Link>
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
                                    <h1>Knowledge Base</h1>
                                    <small>You can upload documents, videos, websites, and any information to create a Knowledge Base.
                                        You can then instruct Journalist AI to generate articles for a specific knowledge base.</small>
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
                                                {knowledege && knowledege.map((items, index) => {
                                                    // const iconName = items.icon.toLowerCase();
                                                    // const IconComponent = iconComponents[iconName] || DefaultIcon;
                                                    return (
                                                        <tr>


                                                            <td onClick={()=>knowledegesingle(items._id)}>{items.knowledegename}</td>
                                                            {/* <td><spna className="pr-2">{IconComponent && <IconComponent />}</spna></td> 
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
                                                    {/* <th>Status</th>
                                                    <th>Next Batch</th> */}

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

export default Knowledge
