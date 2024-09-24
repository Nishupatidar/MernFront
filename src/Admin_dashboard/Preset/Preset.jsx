import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Footer from '../Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
function Preset() {
    const [preset, setpreset] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:4000/presetget').then((res) => {
            setpreset(res.data.preset)
        })
    }, [])
    const singelpreset = (id) => {
        navigate(`/admin/presetedit/${id}`)
        console.log(id)
    }
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className="container mt-5">
                <div className="row mb-3 d-flex justify-content-between " style={{ marginLeft: "120px", marginTop: "53px" }}>
                    <div className="col-sm-2 mt-5">
                        <Link to="/admin/presetcreate">  <button className='btn btn-success' >New Preset</button></Link>
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
                                    <h1>Preset</h1>
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

                                        <div className='table-responsive'>
                                            <table id="example2" class="table table-hover border-left border-right">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                    </tr>
                                                </thead>



                                                <tbody>
                                                    {preset && preset.map((items, index) => {
                                                        // const iconName = items.icon.toLowerCase();
                                                        // const IconComponent = iconComponents[iconName] || DefaultIcon;
                                                        return (
                                                            <tr>
                                                                <td onClick={() => singelpreset(items._id)}>{items.presetname}</td>
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
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Preset
