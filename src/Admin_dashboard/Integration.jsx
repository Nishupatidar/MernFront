import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Sidebar from './Sidebar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Integration() {
    const navigate = useNavigate()

    const [newvalue, setnewvalue] = useState({
        "name": ""

    })
    const inputvalue = (e) => {
        setnewvalue({ ...newvalue, [e.target.name]: e.target.value })
    }
    const blogsubmit = (e) => {
        e.preventDefault()
        console.log(newvalue)
        axios.post('https://mernblog-5-56r6.onrender.com/integration', newvalue).then((res) => {

        })
    }
    const [gettitle, setgettitle] = useState([])
    useEffect(() => {
        axios.get('https://mernblog-5-56r6.onrender.com/integrationget').then((res) => {
            setgettitle(res.data.Integration)
        })

    }, [gettitle])
    const singleintergation = (id) => {
        navigate(`/admin/integartionedit/${id}`)
    }


    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className="container mt-5">
                <div className="row mb-3 d-flex justify-content-between " style={{ marginLeft: "120px", marginTop: "53px" }}>
                    <div className="col-sm-2 mt-5">
                        <Link to="/admin/integration/create">  <button className='btn btn-success' >New Integration</button></Link>
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
                                    <h1>Integration</h1>
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

                                                    <th>Name</th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                {gettitle && gettitle.map((items, index) => {

                                                    return (
                                                        <tr>


                                                            <td onClick={() => singleintergation(items._id)}>{items.IntegrationName}</td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                            <tfoot>
                                                <tr>

                                                    <th>Name</th>
                                                    {/* <th>Keyword</th> */}

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
            <div className="modal" id="myModal">
                <div className="modal-dialog" >
                    <div className="modal-content" style={{ "width": "700px" }}>
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Integration</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        {/* Modal body */}
                        <div className="modal-body">
                            <form >


                                <div class="row mt-3">
                                    <div class="col">
                                        <label>Name</label>
                                        <input type="text" class="form-control" placeholder="" name="name" onChange={inputvalue} />
                                    </div>

                                </div>
                            </form>

                        </div>
                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={blogsubmit}
                                data-bs-dismiss="modal"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Integration







