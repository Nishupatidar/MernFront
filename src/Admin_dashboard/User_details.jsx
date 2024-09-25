import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Sidebar from '../Admin_dashboard/Sidebar'
import Navbar from './Navbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBinFill } from "react-icons/ri";
import { MdModeEditOutline, MdPermDataSetting } from "react-icons/md"
import ReactPaginate from 'react-paginate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function User_details() {
    const navigate = useNavigate()
    const [initialAutoblog, setInitialAutoblog] = useState({});
    const [details, setdetails] = useState([])
    const [edituser, setedituser] = useState({
        "username":"",
        "email":"",
        "password":"",
        "role":"",
        "decription":""
    })
    useEffect(() => {
        axios.get('https://mernblog-5-56r6.onrender.com/userdetails',{ headers: {
            "Authorization": 'Bearer ' + localStorage.getItem("token")
        }
          }).then((res) => {
            if(res.data.success==false){
                navigate('/admin/login')
            }
            else{

                setdetails(res.data.userdetails)
            }
        })
    }, [details])
    const Edituser = async (eid) => {
        const res = await axios.get(`https://mernblog-5-56r6.onrender.com/useredit/${eid}`)
        console.log(res)
        setInitialAutoblog(res.data.useredit)
        setedituser(res.data.useredit)
    }
    const deleteUser =  (id) => {
         axios.get(`https://mernblog-5-56r6.onrender.com/userdelete/${id}`).then((res)=>{
        if (res.data.success == true) {
            toast.error(res.data.message)
        }
    })
    }
   
        const handleInputChange = (e) => {
            const {name,value} = e.target;
            setedituser((prevUser) => ({ ...prevUser, [name]: value }));
          };
    const updateUser = (e) =>{
        e.preventDefault();
        if (JSON.stringify(initialAutoblog) === JSON.stringify(edituser)) {
        toast.warning('No changes made. Please edit the data before saving.');
          return;
        }
    try {
    axios.put(`https://mernblog-5-56r6.onrender.com/userupdate/${edituser._id}`, edituser).then((res)=>{

     
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/userdetails')
        // Refresh the user details after successful update
        // axios.get('https://mernblog-5-56r6.onrender.com/userdetails').then((response) => {
        //   setdetails(response.data.userdetails);
        // });
      }
    });
      
    } catch (error) {
      console.error(error);
    toast.error('Error updating user');
    }
    }
    //  ----------------------------------------------------------Filter-------------------------------------
    const [filters, setFilters] = useState({
      name: "",
      email: "",
      password: "",
      startDate: "",
endDate:""

    });
    const [showfilterdata, setshowfilterdata] = useState(false)
    const [names, setnames] = useState([])
    const filterCategory = () => {
      console.log("Hello");
      try {
        const filteredList = details.filter((item) => {
          const lowerTitle = item.username.toLowerCase();
          const lowerTag = item.email.toLowerCase();
          const lowerCategory = item.password.toLowerCase();
          const newItemDate = new Date(item.created_at);
    
          // Check if filters exist and include corresponding checks
          const nameFilter = !filters.name || lowerTitle.includes(filters.name.toLowerCase());
          const emailFilter = !filters.email || lowerTag.includes(filters.email.toLowerCase());
          const passwordFilter = !filters.password || lowerCategory.includes(filters.password.toLowerCase());
          const dateFilter = (!filters.startDate || new Date(filters.startDate) <= newItemDate) &&
                            (!filters.endDate || new Date(filters.endDate || new Date()) >= newItemDate|| new Date());
    
          // Return true only if all applicable filters pass
          return nameFilter && emailFilter && passwordFilter && dateFilter;
        });
    
        console.log(filteredList);
        setnames(filteredList);
        setshowfilterdata(true);
      } catch (error) {
        console.error("Error in filtering:", error);
      }
    };
    
  // -----------------------------------search --------------------------------------------
  const searchall = (e) => {
    let newarr = details.filter((items, index) => {
      if (items.username.toLowerCase().includes(e.target.value.toLowerCase())) {

        return true
      }
      else if (items.email.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true
      }
      else if (items.password.includes(e.target.value)) {
        return true
      }
      else if (items.created_at.includes(e.target.value)) {
        return true
      }
     


      else {
        return false
      }
    })
    console.log(newarr)
    setnames(newarr)
    setshowfilterdata(true)
  }
  // ----------------------pagination -------------------------------------------------
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = showfilterdata === false ? Math.ceil(details.length / usersPerPage):Math.ceil(names.length / usersPerPage);
  const lastVisited = pagesVisited + usersPerPage;
  const displayuser = names.slice(pagesVisited, lastVisited)
  const displaydata = details.slice(pagesVisited, lastVisited)
  const changePage = ({ selected }) => {
    console.log(selected)
    setPageNumber(selected);
  };
const refreshCategory = ()=>{
  setFilters({
    name: "",
    email: "",
    password: "",
    startDate: "",
endDate:""
  })
  setshowfilterdata(false)
}
    return (
        <>
        <Navbar/>
            <Sidebar />
           <div className ="container mt-5">
            <ToastContainer position= 'top-center'/>
           <div className="row mb-3 d-flex justify-content-between " style={{ marginLeft: "120px", marginTop: "53px" }}>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-4 addblog" style={{ "width": "23%" }}>
            <input type='text' className='px-5' placeholder=' Enter Name' name='name' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, name: e.target.value })} value={filters.name}></input>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3  mt-4 addblog" style={{ "width": "23%" }}>
            <input type='text' className='' placeholder=' Enter Email' name='email' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, email: e.target.value })} value={filters.email}></input>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-4 addblog" style={{ "width": "23%" }}>
            <input type='text' className='px-5 py-2' placeholder=' Enter Password' name='password' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, password: e.target.value })} value={filters.password} ></input>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-4 addblog" style={{ "width": "23%" }}>
         <input type='date' className='px-5 py-2 rounded' placeholder=' Enter Password' name='password' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} value={filters.startDate}></input>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-4 addblog" style={{ "width": "23%" }}>
         <input type='date' className='px-5 py-2 rounded' placeholder=' Enter Password' name='password' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} value={filters.endDate} ></input>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 addblog " style={{ marginLeft: "20px", "width": "23%", "marginTop": "22px" }}>

            <button className='btn-md btn-info rounded px-5 py-1' onClick={filterCategory}>Find Result</button></div>
            <div className="col-12 col-md-6 col-sm-6 col-lg-3 addblog " style={{ marginLeft: "20px", "width": "23%", "marginTop": "22px" }}>

<button className='btn-md btn-danger rounded px-5 py-1' onClick={refreshCategory}>Refresh</button></div>
          <div className="col-12 col-md-6 mt-4 addblog" style={{ "width": "23%" }} >
            <input type='text' className='py-2' placeholder=' Enter search...' name='category' style={{ border: "2px solid black", "borderRadius": "30px" }} onChange={searchall} ></input>

          </div>
        </div>
       
            <div class="content-wrapper" style={{
          "marginLeft": "117px",
          "marginRight": "-80px",
          "marginTop":"53px"

        }}>
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>User Details</h1>
                </div>

              </div>
            </div>
          </section>
            <section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table id="example2" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Password</th>
                  {/* <th>Role_id</th> */}
                  {/* <th>Decreption</th> */}
                  <th>Created_at</th>
<th>Updated_at</th>
                  
                </tr>
              </thead>
              <tbody>
                { showfilterdata == false ? displaydata && displaydata.map((items, i) => {
                  return (
                    <tr>
                       <td style={{"width":"120px"}}>
                             <button className=' btn-sm btn-info rounded mr-2 text-center ' data-bs-toggle="modal" data-bs-target="#myModal"  onClick={() => Edituser(items._id)}><MdModeEditOutline /></button><button className=' btn-sm btn-danger rounded' onClick={() => deleteUser(items._id)}><RiDeleteBinFill /></button>
                             
                             </td>
                               
                      <td>{items.username}</td>
                      <td>{items.email}</td>
                      <td>{items.password.slice(0,15)}</td>
                      {/* <td>{items.role}</td> */}
                      {/* <td>{items.description}</td> */}
                      <td>{items.created_at}</td>
                      <td>{items.updated_at}</td>
                    </tr>
                  )
                }) :displayuser && displayuser.map((items, i) => {
                  return (
                    <tr>
                       <td style={{"width":"100px"}}>
                             <button className=' btn-sm btn-info rounded mr-2 ' data-bs-toggle="modal" data-bs-target="#myModal"  onClick={() => Edituser(items._id)}><MdModeEditOutline /></button>< button className=' btn-sm btn-danger rounded' onClick={() => deleteUser(items._id)}><RiDeleteBinFill /></button>
                             
                             </td>
                               
                      <td>{items.username}</td>
                      <td>{items.email}</td>
                      <td>{items.password.slice(0,15)}</td>
                      {/* <td>{items.role}</td> */}
                      {/* <td>{items.description}</td> */}
                      <td>{items.created_at}</td>
                      <td>{items.updated_at}</td>
                    </tr>
                  )
                })

            }
              </tbody>
              <tfoot>
                <tr>
                <th>Action</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Password</th>
                  {/* <th>Role_id</th> */}
                  {/* <th>Decreption</th> */}
                  <th>Created_at</th>
<th>Updated_at</th>
                </tr>
              </tfoot>
            </table>
            <div class="pagination mb-3">
                        <ReactPaginate

                          previousLabel={"Previous"}
                          nextLabel={"Next"}
                          pageCount={pageCount}
                          onPageChange={changePage}
                          containerClassName={"paginationBttns"}
                          previousLinkClassName={"previousBttn"}
                          nextLinkClassName={"nextBttn"}
                          disabledClassName={"paginationDisabled"}
                          activeClassName={"paginationActive"}
                        />

                      </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
</div>
<Footer/>
<div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">User Update</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        {/* Modal body */}
                        <div className="modal-body"><form onSubmit={updateUser}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    User name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name='username'
                                    value={edituser.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    value={edituser.email}
                                    name = "email"
                                    onChange={handleInputChange}

                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    value={edituser.password}
                                    onChange={handleInputChange}


                                />
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Role_id
                                </label>
                                <input
                                    type="text"
                                    name='role'
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    value={edituser.role}
                                    onChange={handleInputChange}


                                />
                            </div> */}
                            {/* <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Decription
                                </label>
                                <input
                                    type="text"
                                    
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    name='decripation'
                                    value={edituser.decription}
                                    onChange={handleInputChange}


                                />
                            </div> */}
                           
                            <button type="submit" className="btn-sm btn-success"  data-bs-dismiss="modal">
                                Update
                            </button>
                        </form>
                        </div>
                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn-sm btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="content" style={{"marginTop":"53px"}}>
                <div className="container">
                    <div className="row" style={{"marginTop":"20px"}}>
                        <h4 className='fw-bold'>User_details</h4>
                        <table class="table table-hover top-fixed">
                            <thead className='bg-dark'>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Role_id</th>
                                     <th>Decreption</th> 
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details && details.map((items, index) => {
                                    return (

                                        <tr>
                                            <td>{items.username}</td>
                                            <td>{items.email}</td>
                                            <td>{items.password}</td>
                                            <td>{items.role}</td>
                                            <td>{items.description}</td> 
                                            <td><span className='py-2 px-3 bg-info  rounded mr-1' data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => Edituser(items._id)}>Edit</span><span className='py-2 px-3 bg-danger rounded' onClick={() => deleteUser(items._id)}>Delete</span></td>
                                        </tr>

                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer/>
            </div> */}
        </>
    )
}

export default User_details
