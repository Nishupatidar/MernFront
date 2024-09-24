import React,{useState,useEffect} from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Indexer() {
    const navigate = useNavigate()
    const [indexer,setindexer] = useState([])
    useEffect(()=>{
axios.get('http://localhost:4000/indexerget').then((res)=>{
    setindexer(res.data.Indexer)
})
    })
  const  indexeredit = (id)=>{
    navigate(`/admin/indexcreate/${id}`)
  }
  return (
    <div>
      <Navbar/>
            <Sidebar/>
            <div className="container mt-5">
                <div className="row mb-3 d-flex justify-content-between " style={{ marginLeft: "120px", marginTop: "53px" }}>
                    <div className="col-sm-2 mt-5">
                      <Link to="/admin/indexcreate">  <button className='btn btn-success' >New Indexer</button></Link>
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
                                    <h1>Indexer</h1>
                                    <small>An indexer is a service that will continuously submit your articles to Google for indexing.</small>
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
                                                    <th >Indexer Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {indexer && indexer.map((items, index) => {
                                                    
                                                    return (
                                                        <tr>
                                                            <td onClick={()=>indexeredit(items._id)}>{items.indexername}</td>
                                                            {/* <td><spna className="pr-2">{IconComponent && <IconComponent />}</spna></td> */}
                                                            {/* <td>{items.icon}</td> 
                                                             <td>{items.keyword}</td> 
                                                    <td style={{ "width": "210px" }}>{items.status ? <span className='bg-success px-2 py-2 rounded' style={{ "marginRight": "2px" }} onClick={() => statusvalue(items._id, 0)} > Active</span> : <span className='bg-danger px-2 py-2 rounded' style={{ "marginRight": "5px" }} onClick={() => statusvalue(items._id, 1)}>Inactive</span>}<span className='bg-info px-2 py-2 rounded' style={{ "marginRight": "2px" }} onClick={() => blogedit(items._id)}><MdModeEditOutline /></span><span className='bg-danger px-2 py-2 rounded' onClick={() => deleteblog(items._id)}><RiDeleteBinFill /></span></td>*/}
                                                        </tr> 
)
})} 
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                <th>Indexer Name</th>
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

export default Indexer
