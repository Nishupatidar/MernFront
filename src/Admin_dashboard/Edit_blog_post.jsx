import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { 
  BtnBold,
  BtnItalic,
  BtnLink,
  BtnRedo,
  BtnStyles,
  BtnUnderline,
  Editor,
  
  EditorProvider,
  Toolbar} from 'react-simple-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate, useParams } from 'react-router-dom';
import './Sidebar'
import Footer from '../Admin_dashboard/Footer'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Edit_blog_post() {
    // const [blog,setblog] = useState("")
    const {eid} = useParams()
    const [category, setcategory] = useState([])
    const [initialAutoblog, setInitialAutoblog] = useState({});
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:4000/blogedit/${eid}`).then((res)=>{

          console.log(res.data.blogedit)
          setblog(res.data.blogedit)
          setInitialAutoblog(res.data.blogedit)
        })
      },[eid])
      useEffect(() => {
        axios.get('http://localhost:4000/categories').then((res) => {
          setcategory(res.data.Categories)
        })
      }, [])
      const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const [blog, setblog] = useState({
    "_id":"",
    "image": "",
    "title": "",
    "tag": "",
    "slug": "",
    // "content": "",
    "decsription": "",
    "category": "",
    "newimage":"",
    "metadescription":"",
    "metatitle":""
  })
  // const [decreption,setdecreption] = useState("")
  // const handleEditorChange = (content, editor) => {
  //   // Update the state or perform any other actions
  //   console.log(content.blocks[0].text)
  //   setdecreption(content);
  // };
  const inputvalue = (e) => {
    setblog({ ...blog, [e.target.name]: e.target.value })
    setValue(e.target.value)
  }
  const filechange = (e) => {
    const output = document.getElementById('output')
    const buttons = document.getElementById('button').style.display = "block"
    console.log(buttons)
    output.src = URL.createObjectURL(e.target.files[0])
    const output1 = document.getElementById('previousimage').style.display = "block"
   
    output.style.height = "200px"
    output.style.marginTop = "10px"
    output.style.width = "250px"
    setblog({ ...blog, [e.target.name]: e.target.files[0] })
  }
  const [value, setValue] = useState({});

  // function onChange(e) {
  //   setblog({...blog,[e.target.name]:e.target.value});

  // }
  const handleDelete = (e) => {
    e.preventDefault()
    const output = document.getElementById('output');
    output.src = "";
    output.style.height = "0px"
    output.style.marginTop = "0px"
    output.style.width = "0px"
    const buttons = document.getElementById('button').style.display = "none"
    setblog({
      "image":""
    }); // Clearing files state
    // Clearing input field value
    const inputField = document.getElementById('fileInput');
    inputField.value = "";
  }
  const blogsubmit = (e) => {
    // console.log(addblog)
    e.preventDefault()
    let form_data = new FormData
    if (JSON.stringify(initialAutoblog) === JSON.stringify(form_data)) {
      toast.warning('No changes made. Please edit the data before saving.');
      return;
    }
    form_data.append("_id",blog._id)
    form_data.append("title", blog.title)
    form_data.append("tag", blog.tag)
    form_data.append("decsription", blog.decsription)
    //  form_data.append("decsription", value)
    form_data.append("slug", blog.slug)
    form_data.append("category", blog.category)
    form_data.append("image",blog.image)
    form_data.append("newimage", blog.newimage,blog.newimage.name)
    form_data.append("metatitle",blog.metatitle)
    form_data.append("metadescription",blog.metadescription)
    // const descriptionObject = addblog.decscription;
    // console.log(descriptionObject)

    // // Serialize the "description" object before appending it to FormData
    // for (const key in descriptionObject) {
    //   if (descriptionObject.hasOwnProperty(key)) {
    //     form_data.append(`description[${key}]`, descriptionObject[key]);
    //   }
    // }
    // console.log(form_data)
    
    axios.put('http://localhost:4000/updatess', form_data).then((res)=>{

      if(res.data.success){
        toast.success(res.data.message)
        navigate('/admin/addblogpost')
  
      }
    })
    
  }
 const getdelete = ()=>{
  navigate('/admin/addblogpost')
 }
    //   console.log(blog)
  return (
    <div>
      <Sidebar/>
      <Navbar/>
      <ToastContainer
      position='top-center' 
      autoClose ='1000'/>
      <div className="container" style={{"marginTop":"52px", "marginBottom":"100px"}}>
        <div className="row justify-content-center" style={{"marginTop":"53px" ,"marginLeft":"60px"}}>
            <div className="col-sm-10 bg-light pb-5 ">
            <form onSubmit={blogsubmit} >
              <h4 className='alert alert-light text-center mt-3'>Blog/Update</h4>
            <input type="hidden" name="image" id="" className='form-control' value={blog.image} />

                  <div className="row px-3">
                    <label> Blog Image</label>
                    <input type="file" name="newimage" id="fileInput" className='form-control' onChange={filechange} />
                    <img src={process.env.REACT_APP_IMAGE_PATH + blog.image} style={{"width":"250px","height":"250px"}} className='mt-3' id="previousimage"/>
                    <img id="output" alt='Preview' />
                    {/* <button onClick={handleDelete} className=' btn-none border-none text-dark text-center mt-3' id='button' style={{"display":"none","width":"30px","height":"30px"}}>x</button> */}
                    <button type="button" className="btn-close mt-2" onClick={handleDelete} style={{ "display": "none" }} id='button' />
                
                  </div>
                  <input type='hidden' value={blog._id} name='_id'></input>
                  <div class="row mt-3 px-3">

                    {/* <div class="col"> */}
                    <label>select Category</label><br />
                    <select className='form-control' onChange={inputvalue} name='category' value={blog.category}>
                      {category && category.map((items, index) => {
                        return (
                          <option value={items._id}>{items.category_name}</option>
                        )
                      })}
                    </select>
                    {/* <input type="text" class="form-control" placeholder="Enter Blog Title" name="title"/> */}
                    {/* </div> */}
                    {/* <div className="col"></div> */}
                    {/* <div class="col">
      <label>select Author</label>
      <select className='py-1' style={{"paddingLeft":"65px","paddingRight":"65px"}}><option>1</option><option>2</option></select>
      {/* <input type="text" class="form-control" placeholder="Enter Blog Title" name="title"/> 
    </div> */}
                  </div>
                  <div class="row mt-3">
                    <div class="col">
                      <label>Meta Title*</label>
                      <input type="text" class="form-control" placeholder="" name="metatitle" onChange={inputvalue} value={blog.metatitle}/>
                    </div>
                    <div class="col">
                      <label> Meta Description*</label>
                      <input type="text" class="form-control" placeholder="" name="metadescription" onChange={inputvalue} value={blog.metadescription}/>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col">
                      <span>Blog Title*</span>
                      <input type="text" class="form-control" placeholder="" name="title" onChange={inputvalue} value={blog.title} />
                    </div>
                    <div class="col">
                      <span> Blog Tag</span>
                      <input type="text" class="form-control" placeholder="" name="tag" onChange={inputvalue} value={blog.tag} />
                    </div>
                  </div>
                  <div class="row mt-3">
                    {/* <div class="col">
                      <span>Blog Content*</span>
                      <textarea type="text" class="form-control" placeholder="" name="content" onChange={inputvalue}  value={blog.content}/>
                    </div> */}
                    <div class="col">
                      <span> Blog Slug</span>
                      <input type="text" class="form-control" placeholder="" name="slug" onChange={inputvalue}  value={blog.slug}/>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <spna>Blog Description</spna>
                    <div className="" name="">
                    <div><EditorProvider>
      <Editor value={blog.decsription} onChange={inputvalue} name='decsription'>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnLink/>
          <BtnUnderline/>
          <BtnRedo/>
          <BtnStyles/>
        </Toolbar>
      </Editor>
    </EditorProvider></div>
                    
                  </div>
                  </div>
                <button
                  type="submit"
                  className="btn-md btn-primary px-5 py-2 rounded mt-3"
                  

                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn-md btn-danger px-5 py-2 rounded mt-3 ml-3"
                  onClick={getdelete}>
                  close
                </button>
                </form>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
} 

export default Edit_blog_post
