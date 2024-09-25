import React, { useState, useEffect } from 'react'

import Sidebar from './Sidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import { Modal } from "bootstrap"
import Navbar from './Navbar'
import Footer from './Footer'
import { CSVLink } from 'react-csv'
import ReactPaginate from 'react-paginate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Category() {
  const navigate = useNavigate()
  const [filters, setfilter] = useState({
    "category": "",
    "startDate": "",
    "endDate": ""
  })
  const [showfilterdata, setshowfilterdata] = useState(false)

  const [names, setnames] = useState([])
  const [category, setcategory] = useState({
    "category_name": "",
    "description": "",
  })
  const inputvalue = (e) => {
    setcategory({ ...category, [e.target.name]: e.target.value })
  }
  const addcategory = (e) => {

    e.preventDefault()
    //         if(category.category_name.length == 0){
    // // alert("category_name empty")
    //         }
    // else{
    axios.post("https://mernblog-5-56r6.onrender.com/category", category).then((res) => {
      if (res.data.success = true) {
        toast.success(res.data.message)
        navigate('/admin/category')
        //   const modalElement = document.getElementById("myModal");
        //   // modalElement.style.display = 'none';
        //   const modalInstance = this.Modal.getInstance(modalElement);
        //  this.modalInstance.hide();


      }
      else {
        toast.error(res.data.message)
      }
    })
    // }
    setcategory({
      "category_name": "",
      "description": ""
    })
  }
  const [showcategory, setshowcategory] = useState([])
  useEffect(() => {
    axios.get('https://mernblog-5-56r6.onrender.com/categories', {
      headers: {
        "Authorization": 'Bearer ' + localStorage.getItem("token")
      }
    }).then((res) => {
      if (res.data.success === false) {
        navigate('/admin/login')
      }
      else {

        setshowcategory(res.data.Categories)
      }
    })
  }, [showcategory])

  const deletecategory = (id) => {
    axios.get(`https://mernblog-5-56r6.onrender.com/categorydelete/${id}`).then((res) => {

      if (res.data.success === true) {
        toast.error(res.data.message)
      }
    })

  }

  const editcategory = async (eid) => {


    navigate(`/admin/editcategory/${eid}`)

  }
  const filtercategory = () => {
    try {
      const filteredList = showcategory.filter((item) => {
        const newItemDate = new Date(item.created_at);
        const lowerCategory = item.category_name.toLowerCase();

        // Check if filters exist and include corresponding checks
        const categoryFilter = !filters.category || lowerCategory.includes(filters.category.toLowerCase());
        const dateFilter = (!filters.startDate || new Date(filters.startDate) <= newItemDate) &&
          (!filters.endDate || new Date(filters.endDate) >= newItemDate || new Date());

        // Return true only if all applicable filters pass
        return categoryFilter && dateFilter;
      });

      console.log(filteredList);
      setnames(filteredList);
      setshowfilterdata(true);
    } catch (error) {
      console.error("Error in filtering:", error);
    }
  };

  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = showfilterdata === false ? Math.ceil(showcategory.length / usersPerPage) : Math.ceil(names.length / usersPerPage);
  const lastVisited = pagesVisited + usersPerPage;
  // console.log(displayuser)
  const displaydata = showcategory.slice(pagesVisited, lastVisited)
  const displayuser = names.slice(pagesVisited, lastVisited)
  const changePage = ({ selected }) => {
    // setnames(selected)
    setPageNumber(selected);
  };

  const statusvalue = async (id, isActive) => {
    // console.log(id)
    console.log(id, isActive)
    try {
      const response = await axios.put(`https://mernblog-5-56r6.onrender.com/categorupdateStatus/${id}`, {
        status: isActive,
      });

      console.log(response.data); // Updated blog data
      // You may want to update your local state or re-fetch the blog list here
    } catch (error) {
      console.error('Error updating status:', error);
    }


  }
  const csvDatas = [
    ["_id", "status", "category_name", "description"],
    ...showcategory.map(({ _id, status, category_name, description }) => ([
      _id, status, category_name, description

    ]))
  ];
  const csvData = [
    ["_id", "status", "category_name", "description"],
    ...names.map(({ _id, status, category_name, description }) => ([
      _id, status, category_name, description

    ]))
  ];
  const [csvfile, setcsvfile] = useState({
    "uploadfile": ""
  })
  const filechanges = (e) => {
    setcsvfile({ ...csvfile, [e.target.name]: e.target.files[0] })
  }
  const filesumbit = async (e) => {
    e.preventDefault()
    if (csvfile.uploadfile) {
      const form_data = new FormData()
      form_data.append("uploadfile", csvfile.uploadfile, csvfile.uploadfile.name)
      try {


        let res = await axios.post('https://mernblog-5-56r6.onrender.com/categoryfilesave', form_data)
        if (res.data.success) {
          toast.success(res.data.message)
        }
        else {
          toast.error(res.data.message)
        }
      }
      catch (error) {
        console.error('Error uploading file:', error);
        toast.info('Error uploading file. Please try again.');
      }
    }
    else {
      toast.warning('Please select a file');
    }
  }

  const refreshcategory = () => {
    setfilter({
      category: "",
      startDate: "",
      endDate: ""
    })
    setshowfilterdata(false)

  }
  return (
    <div>
      <Sidebar />
      <Navbar />
      {/* {showpoup && <Edit_category seteditcategory ={seteditcategory}   setshowpoup = {setshowpoup} showpoup={showpoup} editscategory = {editscategory}/>} */}
      <div className="container mt-5">
        <ToastContainer position='top-center' />
        <div className="row mb-3 d-flex justify-content-between" style={{ marginLeft: "120px", marginTop: "53px" }}>
          <div className=" col-sm-6 col-md-6 col-lg-3 mt-4" >
            <input type='text' className='px-2 py-1 rounded' placeholder=' Enter category Name' name='category' style={{ border: "2px solid " }} onChange={(e) => setfilter({ ...filters, category: e.target.value })} value={filters.category}></input>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 mt-4" >
            <input type='date' className='px-5 py-2 rounded' placeholder=' Enter category Name' name='startDate' onChange={(e) => setfilter({ ...filters, startDate: e.target.value })} value={filters.startDate} ></input>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 mt-4" >
            <input type='date' className='px-5 py-2 rounded' placeholder=' Enter category Name' name='endDate' onChange={(e) => setfilter({ ...filters, endDate: e.target.value })} value={filters.endDate} ></input>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 mt-5" >

            <button className=' btn-md btn-info px-5 py-1 rounded' onClick={filtercategory}>Find Result</button></div>
          <div className="col-sm-6 col-md-6 col-lg-3 mt-5" >

            <button className=' btn-md btn-danger px-5 py-1 rounded' onClick={refreshcategory}>Refresh</button></div>
          <div className="col-sm-6 col-md-6 col-lg-3 mt-5" >
            <button className='btn-md  btn-success px-3 py-1 rounded' data-bs-toggle="modal" data-bs-target="#myModal">Add Category</button></div>

          <div className="col-sm-6 col-md-6 col-lg-3 mt-5" >
            {showfilterdata == false ? <CSVLink className='btn-md btn-success px-5 py-1 rounded' data={csvDatas} target='_Blank' filename='category_data.csv'>Export</CSVLink> : <CSVLink className='btn-md btn-success px-5 py-1 rounded' data={csvData} target='_Blank' filename='category_data.csv'>Export</CSVLink>}</div>
          <div className="col-sm-6 col-md-6 col-lg-3 mt-5" >
            <form action="" enctype="multipart/form-data" method="post" onSubmit={filesumbit} style={{ "marginLeft": "0px" }} className='d-flex'>
              <input type="file" name="uploadfile" accept='.csv' onChange={filechanges} className='' style={{ "width": "70%" }} />
              {/* <button className='btn btn-danger btn-sm ' type="sumbit">Import</button> */}
              <input type="submit" value="Import" className=' btn-md btn-danger text-light border rounded px-3 ' />

            </form>
          </div>
        </div>
        <div className="row mb-5" style={{ marginLeft: "100px" }}>
          <div className="table-responsive">
          <table class="table" style={{ marginLeft: "30px" }}>
            <thead class="table-light">
              <tr>
                <th>Id</th>
                <th>Action</th>
                <th>Name</th>
                <th>Date</th>
                {/* <th>Description</th> */}
              </tr>
            </thead>
            <tbody>
              {showfilterdata === false ? displaydata && displaydata.map((items, index) => {
                return (
                  <tr key={index}>
                    <td>{items._id}</td>
                    <td>{items.status === 1 ? <button className='btn-sm btn-success rounded' style={{ "marginRight": "5px" }} onClick={() => statusvalue(items._id, 0)}>Active</button> : <button className='btn-sm btn-danger rounded' onClick={() => statusvalue(items._id, 1)} style={{ "marginRight": "5px" }} >Inactive</button>}<button className='btn-sm btn-info rounded' data-bs-toggle="modals" data-bs-target="#myModals" onClick={() => editcategory(items._id)} style={{ "marginRight": "5px" }}>Edit</button><button className='btn-sm rounded btn-danger' onClick={() => deletecategory(items._id)}>Delete</button></td>
                    <td>{items.category_name}</td>
                    <td>{items.created_at}</td>
                  </tr>
                )
              }) : displayuser && displayuser.map((items, index) => {
                return (
                  <tr key={index}>
                    <td>{items._id}</td>
                    <td>{items.status === 1 ? <button className='btn-sm btn-success rounded' style={{ "marginRight": "5px" }} onClick={() => statusvalue(items._id, 0)}>Active</button> : <button className='btn-sm btn-danger rounded' onClick={() => statusvalue(items._id, 1)} style={{ "marginRight": "5px" }} >Inactive</button>}<button className='btn-sm btn-info rounded' data-bs-toggle="modals" data-bs-target="#myModals" onClick={() => editcategory(items._id)} style={{ "marginRight": "5px" }}>Edit</button><button className='btn-sm rounded btn-danger' onClick={() => deletecategory(items._id)}>Delete</button></td>
                    <td>{items.category_name}</td>
                    <td>{items.created_at}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <th>Id</th>
                <th>Action</th>
                <th>Name</th>
                <th>Date</th>
              </tr>
            </tfoot>
          </table>
          </div> <div class="pagination d-flex justify-content-center">
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






      {/* Model Box */}
      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Category</h5>
              <span type="span" class="btn-close" data-bs-dismiss="modal"></span>
            </div>
            <div class="modal-body">
              <div className="row">
                <form className="form " onSubmit={addcategory}>
                  <div className="col-sm-12">
                    <label for="" className="">Name</label>
                    <input type="text" className="form-control" name='category_name' onChange={inputvalue} value={category.category_name} required />
                  </div>

                  <div className="col-sm-12">
                    {/* <label for="exampleInputEmail1" >Description</label> */}
                    {/* <input type="text" class="form-control" name='description' onChange={inputvalue} value={category.description} /> */}

                    <button className=" btn-sm btn-primary px-5 py-2 rounded" type='submit' data-bs-dismiss="modal">Submit</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <span type="span" class="btn-sm btn-danger px-5 py-2 rounded" data-bs-dismiss="modal">Close</span>
            </div>
          </div>
        </div>


      </div>
      <Footer />
    </div>



  )
}

export default Category
