import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Sidebar from './Sidebar'
import axios from 'axios'
import { CSVLink } from 'react-csv'
import ReactPaginate from 'react-paginate'
import { RiDeleteBinFill } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Modal } from "bootstrap"
function Add_title_post() {
  const navigate = useNavigate()
  const [names, setnames] = useState([])
  const [showfilterdata, setshowfilterdata] = useState(false)
  const [filters, setFilters] = useState({
    "title": "",
    "keyword": ""
  })
  const [newvalue, setnewvalue] = useState({
    "title": "",
    "keyword": ""
  })
  const inputvalue = (e) => {
    setnewvalue({ ...newvalue, [e.target.name]: e.target.value })
  }
  const blogsubmit = (e) => {
    e.preventDefault()
    // console.log(newvalue)
    axios.post('https://mernblog-5-56r6.onrender.com/addtitle', newvalue).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/mastertitle')
        // const modalElement = document.getElementById("myModal");
        // const modalInstance = new bootstrap.Modal(modalElement); // Create modal instance
        // modalInstance.hide();
      }
      else {
        toast.error(res.data.message)
      }
    })
  }
  //  ------------------------------------
  const [gettitle, setgettitle] = useState([])
  useEffect(() => {
    axios.get('https://mernblog-5-56r6.onrender.com/gettitle').then((res) => {
      setgettitle(res.data.titlevalue)
      // filtercategory();
    })

  }, [gettitle])
  const filtercategory = () => {
    try {
      const filteredList = gettitle.filter((item) => {
        console.log(new Date(item.created_at))
        const newDate = new Date(item.created_at);
        const lowerCategory = item.title.toLowerCase();
        const lowerkeyword = item.keyword.toLowerCase();

        // Check if filters exist and include corresponding checks
        const categoryFilter = !filters.title || lowerCategory.includes(filters.title.toLowerCase());
        const keyword = !filters.keyword || lowerkeyword.includes(filters.keyword.toLowerCase());
        // const statusFilter = (filters.status === undefined) || (filters.status === 'All') || (item.status === (filters.status === 'Active' ? 1 : 0));
        console.log("startDate", new Date(filters.startDate))
        console.log("endDate", new Date(filters.endDate))
        const dateFilter = (!filters.startDate || new Date(filters.startDate) <= newDate) &&
          (!filters.endDate || new Date(filters.endDate) >= newDate|| new Date());


        // Return true only if all applicable filters pass
        return categoryFilter && keyword && dateFilter;
      });
      // if (filteredList.length === 0) {
      //   setnames([]);
      //   setshowfilterdata(false);
      //   setPageNumber(0); // Reset page number to display from the beginning
      // } else {
      setnames(filteredList);
      setshowfilterdata(true);
      // }
      // console.log(filteredList);
      // setnames(filteredList);
      // setshowfilterdata(true);
    } catch (error) {
      console.error("Error in filtering:", error);
    }
  };
  // -----------------------------
  const Csvdata = [["_id", "status", "title", "keyword", "created_at"],
  ...gettitle.map(({ _id, status, title, keyword, created_at }) => [
    _id, status, title, keyword, created_at
  ])
  ]
  const Csvdatas = [["_id", "status", "title", "keyword", "created_at"],
  ...names.map(({ _id, status, title, keyword, created_at }) => [
    _id, status, title, keyword, created_at
  ])
  ]
  const statusvalue = async (id, isActive) => {
    // setFilters({ ...filters, status: isActive })
    console.log(id, isActive)
    try {
      // setgettitle(gettitle.map(item => item._id === id ? { ...item, status: isActive } : item));
      const response = await axios.put(`https://mernblog-5-56r6.onrender.com/updatetitleStatus/${id}`, {
        status: isActive,
      });

      // console.log(response.data);

    } catch (error) {
      console.error('Error updating status:', error);
    }


  }
  const deleteblog = (did) => {
    console.log(did)
    axios.get(`https://mernblog-5-56r6.onrender.com/titledelete/${did}`).then((res) => {
      if (res.data.success) {
        toast.error(res.data.message)
      }
    })
  }
  const blogedit = async (eid) => {
    // console.log(eid)

    navigate(`/admin/edittitle/${eid}`)
  }
  const [csvfile, setcsvfile] = useState({
    "uploadfile": ""
  })
  const filechanges = (e) => {
    setcsvfile({ ...csvfile, [e.target.name]: e.target.files[0] })
  }
  const filesumbit = async (e) => {
    e.preventDefault()
    if (csvfile.uploadfile) {
      const form_data = new FormData();
      form_data.append('uploadfile', csvfile.uploadfile, csvfile.uploadfile.name);
    
      try{

      
    // const form_data = new FormData()
    // form_data.append("uploadfile", csvfile.uploadfile, csvfile.uploadfile.name)
    let res = await axios.post('https://mernblog-5-56r6.onrender.com/mastertitlefilesave', form_data)
    if (res.data.success == true) {
      toast.success(res.data.message)
    }
    else{
      toast.error(res.data.message)
    }
  }
  catch(error){
    console.error('Error uploading file:', error);
      toast.info('Error uploading file. Please try again.');
  }
}
else {
  toast.warning('Please select a file');
}
  }
  //  --------------------------------------------pagination -----------------------------------------------
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = showfilterdata === false ? Math.ceil(gettitle.length / usersPerPage) : Math.ceil(names.length / usersPerPage);
  // const pagesCount = Math.ceil(names.length/usersPerPage)
  const lastVisited = pagesVisited + usersPerPage;
  const displayuser = names.slice(pagesVisited, lastVisited)
  const displaydata = gettitle.slice(pagesVisited, lastVisited)
  // console.log(displayuser)
  // console.log(displaydata)
  const changePage = ({ selected }) => {
    console.log(selected)
    setPageNumber(selected);
  };
 const  refreshcategory = () =>{
  setFilters({
    title: "",
    keyword: "",
    startDate: "",
    endDate: ""
  })
  setshowfilterdata(false)
 }
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="container mt-5">
        <ToastContainer position="top-center" />
        <div className="row mb-3 d-flex justify-content-between " style={{ marginLeft: "120px", marginTop: "53px" }}>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-4 addblog" style={{ "width": "23%" }}>
            <input type='text' className='px-5' placeholder=' Enter Title' name='title' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, title: e.target.value })} value={filters.title} ></input>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3  mt-4 addblog" style={{ "width": "23%" }}>
            <input type='text' className='' placeholder=' Enter keyWord' name='keyword' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, keyword: e.target.value })} value={filters.keyword}></input>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-4 addblog" style={{ "width": "23%" }}>
            <input type='date' className='py-2 px-5 rounded ' placeholder=' Enter category' name='startDate' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} value={filters.startDate} ></input>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-4 addblog" style={{ "width": "23%" }}>
            <input type='date' className='py-2 px-5 rounded' placeholder=' Enter category' name='endDate' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} value={filters.endDate} ></input>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 addblog " style={{ marginLeft: "20px", "width": "23%", "marginTop": "22px" }}>

            <button className='btn-md btn-info rounded py-1 px-5 rounded' onClick={filtercategory}>Find Result</button>

            </div>
            <div className="col-12 col-md-6 col-sm-6 col-lg-3 addblog " style={{ marginLeft: "20px", "width": "23%", "marginTop": "22px" }}>
            <button className='btn-md btn-danger rounded py-1 px-5 rounded' onClick={refreshcategory}>Refresh</button>
</div>

          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-5 addblog" style={{ "width": "23%" }}>
            <button className='btn-md  btn-success rounded py-1 px-5' data-bs-toggle="modal" data-bs-target="#myModal">Add Title</button>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-5 addblog " style={{ "width": "23%" }}>

          {showfilterdata === false ?  <CSVLink className='btn-md btn-success rounded py-1 px-5 text-center' filename="title.csv" target="_blank" data={Csvdata}>Export </CSVLink>
           : <CSVLink className='btn-md btn-success rounded py-1 px-5 text-center' filename="title.csv" target="_blank" data={Csvdatas}>Export </CSVLink>
  }
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-5 addblog" style={{ "width": "23%" }}>
            <form action="" enctype="multipart/form-data" method="post" onSubmit={filesumbit} style={{ "marginLeft": "0px" }} className="d-flex">
              <input type="file" name="uploadfile" accept='.csv' onChange={filechanges} className='input-upload' style={{ "width": "100%" }} />
              <input type="submit" value="Import" className='  btn-sm btn-danger text-light border px-5 py-1 rounded' />

            </form>
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
                  <h1>Master Title</h1>
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

                          <th>Title</th>
                          <th>Keyword</th>
                          <th>Action</th>
                          <th> Create Date</th>
                          <th>Update Date</th>

                        </tr>
                      </thead>
                      <tbody>
                        {showfilterdata === true ? displayuser && displayuser.map((items, index) => {
                          // console.log("filterdata", items)
                          return (
                            <tr>


                              <td>{items.title}</td>
                              <td>{items.keyword}</td>
                              <td style={{ "width": "210px" }}>{items.status ? <button className=' btn-sm btn-success  rounded' style={{ "marginRight": "2px" }} onClick={() => statusvalue(items.id, 0)}  > Active</button> : <button className=' btn-sm btn-danger rounded' style={{ "marginRight": "5px" }} onClick={() => statusvalue(items.id, 1)} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>Inactive</button>}<button className=' btn-sm btn-info px-2 p5-2 rounded' style={{ "marginRight": "2px" }} onClick={() => blogedit(items.id)}><MdModeEditOutline /></button><button className=' btn-sm btn-danger px-25py-2 rounded' onClick={() => deleteblog(items.id)}><RiDeleteBinFill /></button></td>
                              <td>{items.created_at}</td>
                              <td>{items.updated_at}</td>
                            </tr>
                          )
                        }) : displaydata && displaydata.map((items, index) => {
                          // console.log("alldata", items)
                          return (
                            <tr>


                              <td>{items.title}</td>
                              <td>{items.keyword}</td>
                              <td style={{ "width": "210px" }}>{items.status ? <button className=' btn-sm btn-success  rounded' style={{ "marginRight": "2px" }} onClick={() => statusvalue(items.id, 0)} > Active</button> : <button className=' btn-sm btn-danger rounded' style={{ "marginRight": "5px" }} onClick={() => statusvalue(items.id, 1)}>Inactive</button>}<button className=' btn-sm btn-info px-2 p5-2 rounded' style={{ "marginRight": "2px" }} onClick={() => blogedit(items.id)}><MdModeEditOutline /></button><button className=' btn-sm btn-danger px-25py-2 rounded' onClick={() => deleteblog(items.id)}><RiDeleteBinFill /></button></td>
                              <td>{items.created_at}</td>
                              <td>{items.updated_at}</td>
                            </tr>
                          )
                        })
                        }

                      </tbody>
                      <tfoot>
                        <tr>

                          <th>Title</th>
                          <th>Keyword</th>
                          <th>Action</th>
                          <th> Create Date</th>
                          <th>Update Date</th>

                        </tr>
                      </tfoot>
                    </table>
                    <div class="pagination mb-3 mt-3">
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
                    {/* <div class="pagination mb-3 mt-3">
                        <ReactPaginate

                          previousLabel={"Previous"}
                          nextLabel={"Next"}
                          pageCount={pagesCount}
                          onPageChange={SelectedPage}
                          containerClassName={"paginationBttns"}
                          previousLinkClassName={"previousBttn"}
                          nextLinkClassName={"nextBttn"}
                          disabledClassName={"paginationDisabled"}
                          activeClassName={"paginationActive"}
                        />

                      </div> */}
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
              <h4 className="modal-title">Blog Title</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form onSubmit={blogsubmit} >


                <div class="row mt-3">
                  <div class="col">
                    <label>Title*</label>
                    <input type="text" class="form-control" placeholder="" name="title" value={newvalue.title} onChange={inputvalue} required />
                  </div>
                  <div class="col">
                    <label>KeyWord*</label>


                    <input type="text" class="form-control" placeholder="" name="keyword" value={newvalue.keyword} onChange={inputvalue} required />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn-md px-5 py-1 btn-primary rounded mt-4"

                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </form>

            </div>
            {/* Modal footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn-md btn-danger px-5 py-1 rounded"
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

export default Add_title_post
