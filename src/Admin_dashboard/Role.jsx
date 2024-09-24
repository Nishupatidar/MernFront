import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Role() {
    const inputvalue =()=>{
    }
    useEffect(()=>{
      // axios.get()
    })
    const blogsubmit = ()=>{

    }
  return (
    <div>
         <Navbar/> 
        <Sidebar/>
        <div className="container mt-5">
        <div className="row mb-3 d-flex justify-content-between " style={{ marginLeft: "120px", marginTop:"53px"}}>
      <div className="col-sm-2 mt-5">
        <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#myModal">Add</button>
      </div>
    </div>
    </div>
    <div className="modal" id="myModal">
          <div className="modal-dialog" >
            <div className="modal-content" style={{ "width": "700px" }}>
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title">Role</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" />
              </div>
              {/* Modal body */}
              <div className="modal-body">
                <form >
                  
                 
                   <div class="row mt-3">
                    <div class="col">
                      <label>UserId</label>
                      <input type="text" class="form-control" placeholder="" name="userid" onChange={inputvalue} />
                    </div>
                    <div class="col">
                      <label>Role</label>
                     
        
                      <input type="text" class="form-control" placeholder="" name="role" onChange={inputvalue} />
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

export default Role

