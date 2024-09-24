import React from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import Footer from '../Footer'
import '../Preset/Preset_Form.css'

function Articel() {
  return (
    <div>
        <Sidebar/>
        <Navbar/>
      <div className="container mt-5">
        <div className="row" style={{ "marginLeft": "119px", "marginTop": "53px" }}>
            <h3 className='mt-5 mb-4'>All Article</h3>
<span className='mb-5'>Browse through all articles that you've generated so far. </span>
        </div>
        <div className="row mb-4"  style={{ "marginLeft": "119px"}}>
            <div className="col-lg-2 col-md-3 col-sm-2">
<input type="text" name="title" id=""  placeholder='Filter by title'/>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-2">
                <input type="text" name="" id="" placeholder='Filter by AutoBlog' />
                </div>
                <div className="col-lg-2 col-md-3 col-sm-2">
                <input type="text" name="" id="" placeholder='Filter by tags' />
                </div>
                <div className='col-lg-2 col-md-3 col-sm-2'>
                    <button type='button' className='btn btn-primary'>Apply</button>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-2">
                <label className="switch">
            <input type="checkbox" name="Archived" />
            <span className="slider"></span>
          </label>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-2">
                <label className="switch">
            <input type="checkbox" name="Archived" />
            <span className="slider"></span>
          </label>
                </div>
        </div>
        <div class="content-wrapper" style={{
                    "marginLeft": "117px",
                    "marginRight": "-80px"
                }}>
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

                                                    <th >Title </th>
                                                    <th >Autoblog</th>
                                                    <th >Date</th>
                                                    <th>Cost</th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                <small className='text-center'>Your articles will show up here. </small>
                                                {/* {autoblog && autoblog.map((items, index) => {
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
                                                            {/* <td style={{ "width": "210px" }}>{items.status ? <span className='bg-success px-2 py-2 rounded' style={{ "marginRight": "2px" }} onClick={() => statusvalue(items._id, 0)} > Active</span> : <span className='bg-danger px-2 py-2 rounded' style={{ "marginRight": "5px" }} onClick={() => statusvalue(items._id, 1)}>Inactive</span>}<span className='bg-info px-2 py-2 rounded' style={{ "marginRight": "2px" }} onClick={() => blogedit(items._id)}><MdModeEditOutline /></span><span className='bg-danger px-2 py-2 rounded' onClick={() => deleteblog(items._id)}><RiDeleteBinFill /></span></td>
                                                        </tr> 
                                                    )
                                                })} 
                                             */}

                                            </tbody>
                                            {/* <tfoot>
                                                <tr>

                                                <th>Title</th>
                                                    <th>Autoblog</th>
                                                    <th>Date</th>
                                                    <th>Cost</th>
                                                    
                                                </tr>
                                            </tfoot> */}
                                        </table>
                                        </div>
                                    </div>


                                </div>


                            </div>
                        </div>
                    </section>
                    </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Articel
