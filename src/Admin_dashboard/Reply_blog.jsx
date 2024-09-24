import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import axios from 'axios'
import { RiDeleteBinFill } from "react-icons/ri";
import { MdModeEditOutline, MdPermDataSetting } from "react-icons/md"
import ReactPaginate from 'react-paginate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Reply_blog() {
    const [comments,setcomments] = useState([])
    const [initialAutoblog, setInitialAutoblog] = useState({});
    useEffect(()=>{
        try{
        axios.get("http://localhost:4000/reply").then((res)=>{
            setcomments(res.data.reply)
        })
    }
    catch(error){
        console.log(error)
    }
    },[comments])
    const deletecomment = (did)=>{
        try{
        const res = axios.get(`http://localhost:4000/replydelete/${did}`)
        }
        catch(error){
            console.log(error)
        }
        
    }
    const [editcomment,seteditcomment] = useState('')
    const commentedit = async(eid)=>{
        const res = await axios.get(`http://localhost:4000/replyedit/${eid}`)
        seteditcomment(res.data.blogedit)
        setInitialAutoblog(res.data.blogedit)
    }
// Filter Data 
const [showfilterdata, setshowfilterdata] = useState(false)
const [names, setnames] = useState([])

const [filters, setFilters] = useState({
  name: "",
  email: "",
  comment: "",
 
});

  // console.log(startDate,endDate)
  const filterCategory = () => {
    const filteredList = comments.filter((item) => {
      const lowerTitle = item.name.toLowerCase();
      const lowerTag = item.email.toLowerCase();
      const lowerCategory = item.content.toLowerCase();
      const newItemDate = new Date(item.created_at);
  
      // Check if filters exist and include corresponding checks
      const nameFilter = !filters.name || lowerTitle.includes(filters.name.toLowerCase());
      const emailFilter = !filters.email || lowerTag.includes(filters.email.toLowerCase());
      const commentFilter = !filters.comment || lowerCategory.includes(filters.comment.toLowerCase());
      const dateFilter = (!filters.startDate || new Date(filters.startDate) <= newItemDate) &&
                        (!filters.endDate || new Date(filters.endDate) >= newItemDate || new Date());
  
      // Return true only if all applicable filters pass
      return nameFilter && emailFilter && commentFilter && dateFilter;
    });
  
    console.log(filteredList);
    setnames(filteredList);
    setshowfilterdata(true);
  };
  
  const searchall = (e) => {
    let newarr = comments.filter((items, index) => {
      if (items.name.toLowerCase().includes(e.target.value.toLowerCase())) {

        return true
      }
      else if (items.email.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true
      }
      else if (items.Comment_id.email.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true
      }
      else if (items.content.toLowerCase().includes(e.target.value.toLowerCase())) {
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
  // useEffect(()=>{
  //   searchall()
  //   setshowfilterdata(true)
  // })
 
    const inputvalue = (event)=>{
seteditcomment({...editcomment,[event.target.name]:event.target.value})
    }
    const blogsubmit = (e)=>{
        e.preventDefault()
        if (JSON.stringify(initialAutoblog) === JSON.stringify(editcomment)) {
          toast.warning('No changes made. Please edit the data before saving.');
          return;
        }
axios.put('http://localhost:4000/replyupdate',editcomment)
    }
    const statusvalue = async(id,isActive)=>{
        console.log(id,isActive)
        try {
            const response = await axios.put(`http://localhost:4000/replyStatus/${id}`, {
              status: isActive,
            });
      
            console.log(response.data); 
          } catch (error) {
            console.error('Error updating status:', error);
          }
    }
    const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = showfilterdata === false ? Math.ceil(comments.length / usersPerPage): Math.ceil(names.length/usersPerPage);
  const lastVisited = pagesVisited + usersPerPage;
//   const displayuser = names.slice(pagesVisited, lastVisited)
  const displaydata = comments.slice(pagesVisited, lastVisited)
  const displayuser = names.slice(pagesVisited,lastVisited)
  const changePage = ({ selected }) => {
    console.log(selected)
    setPageNumber(selected);
  };
  const refreshCategory = ()=>{
    setFilters({
      name:'',
      email:'',
      comment:"",
      startDate:"",
      endDate:""


    })
    setshowfilterdata(false)
  }
  return (
    <div>
        <Sidebar/>
        <Navbar/>
        <div className="container mt-5">
          <ToastContainer position = 'top-center'/>
        <div className="row mb-3 d-flex justify-content-between  " style={{ marginLeft: "120px", marginTop:"53px"}}>
          <div className="col-sm-2 mt-4 addblog" style={{"width":"23%"}}>
            <input type='text' className='px-5' placeholder=' Enter Name' name='name' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, name: e.target.value })} value={filters.name} ></input>
          </div>
          <div className="col-sm-2 mt-4 addblog" style={{"width":"23%"}}>
            <input type='text' className='' placeholder=' Enter Email' name='email' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, email: e.target.value })} value={filters.email}></input>
          </div>
          <div className="col-sm-2 mt-4 addblog" style={{"width":"23%"}}>
            <input type='text' className='py-1' placeholder=' Enter Comment ' name='comment' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, comment: e.target.value })} value={filters.comment} ></input>
          </div>
       
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-4 addblog" style={{ "width": "23%" }}>
            <input type='date' className='py-2 px-5 rounded ' placeholder=' Enter category' name='startDate' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} value={filters.startDate}></input>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-4 addblog" style={{ "width": "23%" }}>
            <input type='date' className='py-2 px-5 rounded' placeholder=' Enter category' name='endDate' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} value={filters.endDate} ></input>
          </div>
          <div className="col-sm-2 addblog" style={{ marginLeft: "20px","width":"23%","marginTop":"22px" }}>

            <button className=' btn-md btn-info rounded px-5 py-1' onClick={filterCategory}>Find Result</button></div>
            <div className="col-sm-2 addblog" style={{ marginLeft: "20px","width":"23%","marginTop":"22px" }}>

<button className=' btn-md btn-danger rounded px-5 py-1' onClick={refreshCategory}>Refresh</button></div>
            <div className="col-sm-2 mt-4 addblog"style={{"width":"23%"}} >
            <input type='text' className='py-2' placeholder='Search...' name='category' style={{ border: "2px solid black", "borderRadius": "30px" }} onChange={searchall} ></input>

          </div>
</div>
        
      {/* <h1>Comment</h1> */}
      <div class="content-wrapper" style={{
          "marginLeft": "117px",
          "marginRight": "-80px"
        }}>
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Blog Reply</h1>
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Comment</th>
                  <th>Cid</th>
                  <th>Ip Address</th>
                  <th>Create Date</th>
                  <th>Update Date</th>
                </tr>
              </thead>
              <tbody>
                {showfilterdata == false ? displaydata && displaydata.map((items, i) => {
                  return (
                    <tr>
                     <td style={{"width":"200px"}}>{items.status ? <button className=' btn-sm btn-success mb-2 rounded addblog' onClick={() => statusvalue(items._id, 0)} > Active</button> : <button className=' btn-sm btn-danger mb-2 rounded '  onClick={() => statusvalue(items._id, 1)}>Inactive</button>}
                             
                             <button className=' btn-sm btn-info rounded ml-1 mr-1 'data-bs-toggle="modal" data-bs-target="#myModal"  onClick={() => commentedit(items._id)}><MdModeEditOutline /></button><button className=' btn-sm btn-danger  rounded' onClick={() => deletecomment(items._id)}><RiDeleteBinFill /></button>
                             </td>
                      <td>{items.name}</td>
                      <td>{items.email}</td>
                      <td>{items.content.slice(0, 20)}</td>
                      <td>{items.Comment_id.email.slice(0, 10)}</td>
                      <td>{items.ipAddress}</td>
                      <td>{items.created_at}</td>
                      <td>{items.updated_at}</td>
                    </tr>
                  )
                }) : displayuser && displayuser.map((items, i) => {
                  return (
                    <tr>
                     <td style={{"width":"200px"}}>{items.status ? <button className=' btn-sm btn-success mb-2 rounded addblog' onClick={() => statusvalue(items._id, 0)} > Active</button> : <button className=' btn-sm btn-danger mb-2 rounded '  onClick={() => statusvalue(items._id, 1)}>Inactive</button>}
                             
                             <button className=' btn-sm btn-info rounded ml-1 mr-1 'data-bs-toggle="modal" data-bs-target="#myModal"  onClick={() => commentedit(items._id)}><MdModeEditOutline /></button><button className=' btn-sm btn-danger  rounded' onClick={() => deletecomment(items._id)}><RiDeleteBinFill /></button>
                             </td>
                      <td>{items.name}</td>
                      <td>{items.email}</td>
                      <td>{items.content.slice(0, 20)}</td>
                      <td>{items.Comment_id.email.slice(0, 10)}</td>
                      <td>{items.ipAddress}</td>
                      <td>{items.created_at}</td>
                      <td>{items.updated_at}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
    <div class="pagination">
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
      <div className="modal" id="myModal">
          <div className="modal-dialog" >
            <div className="modal-content" style={{ "width": "700px" }}>
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title"> Update Comment</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" />
              </div>
              {/* Modal body */}
              <div className="modal-body">
                <form >
                 
                
                  <div class="row mt-3">
                    <div class="col">
                      <label>Name</label>
                      <input type="text" class="form-control" placeholder="" value={editcomment.name}name="name" onChange={inputvalue} />
                    </div>
                    <div class="col">
                      <label> Email</label>
                 
                      <input type="text" class="form-control" placeholder="" value={editcomment.email} name="email" onChange={inputvalue} />
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col">
                      <label>Comment</label>
                      <input type="text" class="form-control" placeholder="" value={editcomment.content}name="content" onChange={inputvalue} />
                    </div>
                    {/* <div class="col">
                      <label> Post Title</label>
                      <input type="text" class="form-control" placeholder="" value={editcomment.Post_id} name="metadescription" onChange={inputvalue} />
                    </div> */}
                  </div>

                 
                </form>

              </div>
              {/* Modal footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-md px-5 py-1 btn-success rounded"
                  onClick={blogsubmit}
                  data-bs-dismiss="modal"

                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn-md btn-danger px-5 py-1 rounded "
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

export default Reply_blog
