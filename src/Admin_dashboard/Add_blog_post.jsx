import React, { useEffect, useRef, useState } from 'react'
import '../Admin_dashboard/Add_blog_post.css'
import Sidebar from './Sidebar'
import axios from 'axios'
import '../index.css'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { RiDeleteBinFill } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import NavBar from './Navbar'
import Footer from './Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Modal } from "bootstrap"
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,

  EditorProvider,
  HtmlButton,
  Toolbar
} from 'react-simple-wysiwyg';
// import { Select } from 'antd'




function Add_blog_post() {
  const navigate = useNavigate()

  const [showfilterdata, setshowfilterdata] = useState(false)
  const [filters, setFilters] = useState({
    title: "",
    tag: "",
    category: "",
    startDate: "",
    endDate: ""
  });

  const [category, setcategory] = useState([])
  const [blog, setblog] = useState([])
  const [names, setnames] = useState([])

  useEffect(() => {
    try {
      axios.get('https://mernblog-5-56r6.onrender.com/categories').then((res) => {
        setcategory(res.data.Categories)
      }).then((data) => {
        const userData = data.map((item) => ({
          label: item.category_name,
          value: item._id,
          text: item.category_name
        }));
        setcategory(userData);
      }).catch((err) => {
        console.log(err)
      })
    }
    catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    try {
      axios.get('https://mernblog-5-56r6.onrender.com/blog', {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem("token")
        }
      }).then((res) => {
        if (res.data.success === false) {

          navigate('/admin/login')
        }
        else {
          setblog(res.data.blog)
          // searchall()
          // setnames()
          // setnames(res.data.blog)
          // console.log(res.data.blog)
        }

      })
    }
    catch (error) {
      console.log(error)
    }
  }, [blog,names])
  const filterCategory = () => {
    console.log("Hello")
    try {
      const filteredList = blog.filter((item) => {
        const lowerTitle = item.title.toLowerCase();
        const lowerTag = item.tag.toLowerCase();
        const lowerCategory = item.category.category_name.toLowerCase();
        const newDate = new Date(item.created_at);

        // Check if filters exist and include corresponding checks
        const titleFilter = !filters.title || lowerTitle.includes(filters.title.toLowerCase());
        const tagFilter = !filters.tag || lowerTag.includes(filters.tag.toLowerCase());
        const categoryFilter = !filters.category.category_name || lowerCategory.includes(filters.category.toLowerCase());
        const dateFilter = (!filters.startDate || new Date(filters.startDate) <= newDate) &&
          (!filters.endDate ||  newDate <= new Date(filters.endDate) || new Date());

        // Return true only if all applicable filters pass
        return titleFilter && tagFilter && categoryFilter && dateFilter;
      });

      console.log(filteredList);
      setnames(filteredList);
      setshowfilterdata(true);
    } catch (error) {
      console.error("Error in filtering:", error);
    }
  };

  const editorRef = useRef(null);

  const [addblog, setaddblog] = useState({
    "image": "",
    "title": "",
    "tag": "",
    "slug": "",
    "decsription": "",
    // "decsription": "",
    "category": "",
    "blogstatus": "",
    "metatitle": "",
    "metadescription": "",
    "categoryid": "",


  })
  const [decreption, setdecreption] = useState([])
  // const handleEditorChange = (contents, editor) => {
  //   console.log(contents)
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  //   const editorBlocks = contents.blocks.map(block => ({
  //     text: block.text

  //   }));

  //   console.log("editor", editorBlocks)
  //   setdecreption(editorBlocks)
  // };
  const [value, setValue] = useState('');

  function onChange(e) {
    setValue(e.target.value);

  }

  const [files, setFiles] = useState([]);
  const inputvalue = (e) => {
    setaddblog({ ...addblog, [e.target.name]: e.target.value })
  }
  const filechange = (event) => {
    // console.log(e)
    const output = document.getElementById('output')
    const buttons = document.getElementById('button').style.display = "block"
    console.log(buttons)
    output.src = URL.createObjectURL(event.target.files[0])
    output.style.height = "200px"
    output.style.marginTop = "10px"
    output.style.width = "250px"

    // const style = document.getElementById('output').style.height = "200px"
    // handleDelete(output.src)
    console.log(output.src)
    // output.onload = function(){

    //   URL.revokeObjectURL(output.src)
    // }
    setFiles(Array.from(event.target.files));
    console.log(Array.from(event.target.files))

  }
  const handleDelete = (e) => {
    e.preventDefault()
    const output = document.getElementById('output');
    output.src = "";
    output.style.height = "0px"
    output.style.marginTop = "0px"
    output.style.width = "0px"
    const buttons = document.getElementById('button').style.display = "none"
    setFiles([]); // Clearing files state
    // Clearing input field value
    const inputField = document.getElementById('fileInput');
    inputField.value = "";
  }
  const blogsubmit =  (e) => {
    try {

      e.preventDefault()
      let form_data = new FormData
      if (Object.keys(addblog).length === 0 && addblog.constructor === Object) {
        toast.warning("Please fill in all required fields.");
        return; // Prevent submission if formData is empty
      }
      form_data.append("title", addblog.title)
      form_data.append("tag", addblog.tag)

      form_data.append("slug", addblog.slug)
      form_data.append("category", addblog.category)
      form_data.append("blogstatus", addblog.blogstatus)

      form_data.append("metatitle", addblog.metatitle)

      form_data.append("categoryid", addblog.categoryid)
      form_data.append("decsription", value)
      if (files.length > 0) {
        files.forEach((file, index) => {
          form_data.append(`images`, file);
        });
      } else {
        // Handle case where no image is selected
        // For example, you can append a placeholder image here
        const placeholderImage = new File(["images/blog/370/dummy.jpg"], "dummy.jpg");
      form_data.append(`images`, placeholderImage);
      }
      console.log(form_data.get("images"))
      axios.post('https://mernblog-5-56r6.onrender.com/addblog', form_data).then((res)=>{

        if (res.data.success) {
          setaddblog({ 
            "image": "",
          "title": "",
          "tag": "",
          "slug": "",
          "decsription": "",
          // "decsription": "",
          "category": "",
          "blogstatus": "",
          "metatitle": "",
          "metadescription": "",
          "categoryid": "",})
         
          toast.success(res.data.message)
          navigate('/admin/addblogpost')
      //     const modalElement = document.getElementById("myModal");
      //     // modalElement.style.display = "none"
      //     const modalInstance = this.Modal.getInstance(modalElement);
      // modalInstance.hide();
        }
      })

    }
    catch (error) {
      console.log(error)
    }
  }
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = showfilterdata === false ? Math.ceil(blog.length / usersPerPage): Math.ceil(names.length/usersPerPage);
  const lastVisited = pagesVisited + usersPerPage;
  const displayuser = names.slice(pagesVisited, lastVisited)
  const displaydata = blog.slice(pagesVisited, lastVisited)
  const changePage = ({ selected }) => {
    console.log(selected)
    setPageNumber(selected);
  };
  const deleteblog = async (did) => {
    console.log(did)
    await axios.get(`https://mernblog-5-56r6.onrender.com/blogdelete/${did}`).then((res) => {
      toast.error(res.data.message)
    })
  }

  const blogedit = (eid) => {

    navigate(`/admin/editblog/${eid}`)
  }

  const statusvalue = async (id, isActive) => {
    // console.log(id)
    console.log(id, isActive)
    try {
      const response = await axios.put(`https://mernblog-5-56r6.onrender.com/updateStatus/${id}`, {
        status: isActive,
      })
      
      if (response.data.status === 200) {
        toast.success(response.data.message)
      }



    } catch (error) {
      console.log(error)
      
    }
  }


 

 
  const searchall = (e) => {
    let newarr = blog.filter((items, index) => {
      if (items.title.toLowerCase().includes(e.target.value.toLowerCase())) {

        return true
      }
      else if (items.tag.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true
      }
      else if (items.decsription.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true
      }
      else if (items.category.category_name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true
      }
      else if (items.slug.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true
      }


      else {
        return false
      }
    })
    
    setnames(newarr)
    setshowfilterdata(true)
   
  }
  // searchall()




  const exportcsv = () => {
    axios.get('https://mernblog-5-56r6.onrender.com/export-csv').then(({ data }) => {
      console.log(data)
      window.open(`https://mernblog-5-56r6.onrender.com/${data.downloadUrl}`, 'blank')
    }).catch((error) => {
      console.log(error)
    })
  }


  const [csvfile, setCsvFile] = useState({
    uploadfile: null,
  });
  const [fileContent, setFileContent] = useState(null);

  const filechanges = (e) => {
    const fileInput = e.target;
    const uploadedFile = fileInput.files[0];

    if (uploadedFile) {
      const fileName = uploadedFile.name;
      const fileType = uploadedFile.type;
      console.log("filecontent",fileType)

      if (fileType) {
        toast.success(`File '${fileName}' (CSV) uploaded successfully!`);
        readFileContent(uploadedFile);
        setCsvFile({ uploadfile: uploadedFile });
      } else {
        toast.error(`File '${fileName}' is not a valid CSV file.`);
        setFileContent(null);
      }
    } else {
      toast('Please select a file.');
      setFileContent(null);
    }
  };
  // Preview file data csv file
  const readFileContent = (file) => {
    console.log(file)
    const reader = new FileReader();

    reader.onload = (event) => {
      // console.log(event) 
      // Display file content preview
      setFileContent(event.target.result);
    };

    reader.readAsText(file);
  };
  // console.log(fileContent)

  const filesumbit = async (e) => {
    e.preventDefault();
    if (csvfile.uploadfile) {
      const form_data = new FormData();
      form_data.append('uploadfile', csvfile.uploadfile, csvfile.uploadfile.name);

      try {
        const res = await axios.post('https://mernblog-5-56r6.onrender.com/filesave', form_data);

        if (res.data.success) {
         toast.success(res.data.message);
          setFileContent(null)
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      toast.info('Error uploading file. Please try again.');
      }
    } else {
      toast.warning('Please select a file');
    }
  };
  // const textAreaRef = useRef()
// useEffect(()=>{
//   searchall()
// },[blog])
const refreshCategory = ()=>{
  setFilters({
    "title":"",
    "tag":"",
    "category":"",
    "startDate":"",
    "endDate":""
  })
  setshowfilterdata(false)
}
  return (
    <div>
      <Sidebar />
      <NavBar />
      <div className="container mt-5">

      <ToastContainer
    	position="top-center"
      autoClose = "1000"
    	/>
        <div className="row mb-3 d-flex justify-content-between " style={{ marginLeft: "120px", marginTop: "53px" }}>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-4 addblog" style={{ "width": "23%" }}>
            <input type='text' className='px-5' placeholder=' Enter Title' name='title' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, title: e.target.value })} value={filters.title} ></input>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3  mt-4 addblog" style={{ "width": "23%" }}>
            <input type='text' className='' placeholder=' Enter Tag' name='tag' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, tag: e.target.value })} value={filters.tag}></input>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-4 addblog" style={{ "width": "23%" }}>
            <input type='text' className='py-1' placeholder=' Enter category' name='category' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, category: e.target.value })} value={filters.category}></input>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-4 addblog" style={{ "width": "23%" }}>
            <input type='date' className='py-2 px-5 rounded ' placeholder=' Enter category' name='category' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} value={filters.startDate} ></input>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mt-4 addblog" style={{ "width": "23%" }}>
            <input type='date' className='py-2 px-5 rounded' placeholder=' Enter category' name='category' style={{ border: "1px solid black" }} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} value={filters.endDate} ></input>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 addblog " style={{ marginLeft: "20px", "width": "23%", "marginTop": "22px" }}>

            <button className='btn-md btn-info rounded py-1 px-5 rounded' onClick={filterCategory}>Find Result</button></div>

        
        <div className="col-12 col-md-6 col-sm-6 col-lg-3 addblog " style={{ marginLeft: "20px", "width": "23%", "marginTop": "22px" }}>

            <button className='btn-md btn-danger rounded py-1 px-5 rounded' onClick={refreshCategory}>Refresh</button></div>

        </div>
        <div className="row mt-3 d-flex justify-content-between" style={{ marginLeft: "120px" }}>
          <div className="col-12 col-md-6 mt-4 addblog" style={{ "width": "23%" }}>
            <button className=' btn-md btn-success px-5 py-1  rounded' data-bs-toggle="modal" data-bs-target="#myModal">Add blog list</button></div>
          <div className="col-12 col-md-6 mt-4 addblog" style={{ "width": "23%", "marginTop": "" }}>
            <button className=" btn-md btn-success py-1 px-5 rounded" onClick={exportcsv}>Export</button>
          </div>
          <div className='col-sm-3'>
            <form action="" enctype="multipart/form-data" method="post" className='d-flex' onSubmit={filesumbit} style={{ "marginLeft": "0px", "marginTop": "18px" }}>
              <input type="file" name="uploadfile" accept='.csv' onChange={filechanges} className='' style={{ "width": "100%" }} />
              <input type="submit" value="Import" className=' btn-md btn-danger text-light border rounded  py-1' />
            </form>
          </div>

          <div className="col-12 col-md-6 mt-3 addblog" style={{ "width": "23%" }} >
            <input type='text' className='py-2' placeholder=' Enter search...' name='category' style={{ border: "2px solid black", "borderRadius": "30px" }} onChange={searchall} ></input>

          </div>
        </div>
        {/* {fileContent.map((items,index)=>{
  return items
})} */}

        <div class="content-wrapper" style={{
          "marginLeft": "117px",
          "marginRight": "-80px"
        }}>
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Blog List</h1>
                </div>

              </div>
            </div>
          </section>


          <section class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="card"> 


                  <div class="card-body">
                    <div className="table-responsive">
                      <table id="example2" class="table table-bordered table-hover mb-5">
                        <thead>
                          <tr>
                            <th>Image </th>
                            <th>Action</th>
                            <th>Title</th>
                            <th>Tag</th>
                            <th>Content</th>
                            <th>Slug</th>
                            <th>Category</th>
                            <th>Meta Title</th>
                            <th>Meta Decsription </th>
                            <th>Created_at</th>

                          </tr>
                        </thead>
                        <tbody>
                          {showfilterdata === true ? displayuser && displayuser.map((items, index) => {
                            console.log(items.length)
                            if(items.length != 0){
                            const description = typeof items.decsription === 'string' ? items.decsription : '';
                            const truncatedDescription = description.split(' ').slice(0, 10).join(' ')
                            return (
                              <tr>
                                <td className='' ><img src={process.env.REACT_APP_IMAGE_PATH + items.image} alt="" srcset="" style={{ "width": "50px", "height": "50px", "borderRadius": "50%" }} className='' /></td>
                                {/* <td><img src={items.image}/></td> */}
                                <td style={{ "width": "200px" }}>{items.status ? <button className=' btn-sm btn-success mb-2 rounded ' onClick={() => statusvalue(items._id, 0)} > Active</button> : <button className='btn-danger btn-sm mb-2 rounded' onClick={() => statusvalue(items._id, 1)}>Inactive</button>}<button className='btn-info ml-1 mr-1 btn-sm  rounded' onClick={() => blogedit(items._id)}><MdModeEditOutline /></button><button className='btn-danger btn-sm rounded ' onClick={() => deleteblog(items._id)}><RiDeleteBinFill /></button></td>

                                <td>{items.title}</td>
                                <td>{items.tag}</td>
                                <td key={index} dangerouslySetInnerHTML={{ __html: truncatedDescription }}></td>



                                <td>{items.slug}</td>
                                <td>{items.category.category_name}</td>
                                <td>{items.metatitle}</td>
                                <td name='textcopy'>{items.metadescription}</td>
                                <td>{items.created_at}</td>

                              </tr>
                            )
                          } 
                          else{
                            return(
                            <tr className='d-flex justify-content-center'>
                              <td className='text-center'>No Data</td>
                            </tr>

                            )
                          }
                          }) : displaydata.map((items, index) => {
                            const description = typeof items.decsription === 'string' ? items.decsription : '';
                            const truncatedDescription = description.split(' ').slice(0, 10).join(' ')

                            console.log("typeof",typeof items.description)
                            return (
                              <tr>

                                <td>
                                  <img src={process.env.REACT_APP_IMAGE_PATH + items.image} alt="" srcset="" style={{ "width": "50px", "height": "50px", "borderRadius": "50%" }} className='' />

                                </td>

                                {/* <td><img src={items.image}/></td> */}
                                <td style={{ "width": "200px" }}>{items.status ? <button className=' btn-sm btn-success mb-2 rounded ' onClick={() => statusvalue(items._id, 0)} > Active</button> : <button className='btn-danger btn-sm mb-2 rounded' onClick={() => statusvalue(items._id, 1)}>Inactive</button>}<button className='btn-info ml-1 mr-1 btn-sm  rounded' onClick={() => blogedit(items._id)}><MdModeEditOutline /></button><button className='btn-danger btn-sm rounded ' onClick={() => deleteblog(items._id)}><RiDeleteBinFill /></button></td>

                                <td>{items.title}</td>
                                <td>{items.tag}</td>
                                <td key={index} dangerouslySetInnerHTML={{ __html: truncatedDescription }}></td>

                                <td>{items.slug}</td>
                                <td>{items.category.category_name}</td>

                                <td>{items.metatitle}</td>
                                <td>{items.metadescription}</td>
                                <td>{items.created_at}</td>

                              </tr>
                            )
                          })}

                        </tbody>
                        <tfoot>
                          <tr>
                            <th>Image</th>
                            <th>Action</th>
                            <th>Title</th>
                            <th>Tag</th>
                            <th>Content</th>
                            <th>Slug</th>
                            <th>Category</th>
                            <th>Meta Title</th>
                            <th>Meta Decsription</th>
                            <th>Created_at</th>
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






        <div className="modal" id="myModal">
          <div className="modal-dialog" >
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title">Blog list</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" />
              </div>
              {/* Modal body */}
              <div className="modal-body">
                <form onSubmit={blogsubmit} >
                  <div className="row px-3">
                    <label> Blog Image</label>
                    <input type="file" name="images" id="fileInput" className='form-control' onChange={filechange} required value={addblog.images} />
                    <img id="output" alt='Preview' />
                    {/* <button onClick={handleDelete} className=' btn-none border-none text-dark text-center mt-3' id='button' style={{"display":"none","width":"30px","height":"30px"}}>x</button> */}
                    <button type="button" className="btn-close mt-2" onClick={handleDelete} style={{ "display": "none" }} id='button' />
                  </div>
                  <div class="row mt-3 px-3">

                    {/* <div class="col"> */}
                      <label>select Category</label><br />

                      <select style={{"height": "40px" }} onChange={inputvalue} name='category' value={addblog.category} className="form-control" required>
                        {category && category.map((items, index) => {
                          <>
                            <input type='hidden' value={category && category.length > 0 ? category[0]._id : ''} name='categoryid' onChange={inputvalue} />
                          </>

                          return (
                            <>

                              <option value={items._id} key={items._id}>{items.category_name}</option>


                              {/* <option key={items._id} value={items._id}>{items.category_name}</option> */}
                            </>
                          )
                        })}
                      </select>
                    {/* </div> */}
                    {/* <div class="col">
                      <label>select Status</label><br />
                      <select className=' form-control' style={{ "paddingLeft": "65px", "paddingRight": "65px" }} onChange={inputvalue} name='blogstatus' value={addblog.blogstatus}><option>Publish</option><option>Draft</option></select>
                    </div> */}
                  </div>
                  <div class="row mt-3">
                    <div class="col">
                      <label>Blog Title*</label>
                      <input type="text" class="form-control" placeholder="" name="title" onChange={inputvalue} value={addblog.title} required />
                    </div>
                    <div class="col">
                      <label> Blog Tag*</label>


                      <input type="text" class="form-control" placeholder="" name="tag" onChange={inputvalue} value={addblog.tag} />
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col">
                      <label>Meta Title*</label>
                      <input type="text" class="form-control" placeholder="" name="metatitle" onChange={inputvalue} value={addblog.metatitle} />
                    </div>
                    <div class="col">
                      <label> Meta Description*</label>
                      <input type="text" class="form-control" placeholder="" name="metadescription" onChange={inputvalue} value={addblog.metadescription} />
                    </div>
                  </div>

                  <div className='row mt-3'>
                    <label>Blog Description</label>
                    <div><EditorProvider >
                      <Editor value={value} onChange={onChange}>
                        <Toolbar>
                          <BtnBold />
                          <BtnItalic />
                          <BtnLink />
                          <BtnUnderline />
                          <BtnRedo />
                          <BtnUndo />
                          <BtnNumberedList />
                          <BtnBulletList />
                          <BtnClearFormatting />
                          <BtnStrikeThrough />
                          <HtmlButton />


                          <BtnStyles />
                        </Toolbar>
                      </Editor>
                    </EditorProvider></div>


                  </div>

                  <button
                    type="submit"
                    className="btn-md px-5 btn-primary py-1 rounded mt-3"
                    id="blocksumbit"
                    // onClick={notify}
                  // onClick={blogsubmit}
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
                  className="btn-md px-5 btn-danger py-1 rounded"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>

              </div>
            </div>
          </div>
        </div>



      </div>
      <Footer />
    </div>







  )
}

export default Add_blog_post
