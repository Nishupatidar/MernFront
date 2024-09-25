import React, { useEffect, useState } from 'react'
// import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '../Admin_dashboard/Sidebar.css'
import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaMicroblog } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import { ImReply } from "react-icons/im";
import { MdTitle } from "react-icons/md";
import axios from 'axios';
// import User_details from '../Component/User_details';
function Sidebar() {
  const [sidebar,setsidebar] = useState([])
  useEffect(()=>{
    axios.get("https://mernblog-5-56r6.onrender.com/sidebar").then((res)=>{
      // console.log(res
    })
  })
  return (
    <>
  <div className="sidebar">
    
  <Link className="active" to="/"><spna className="pr-2"><MdHome /></spna>Home</Link>
  <Link className='' to="/admin/admindashboard"><span className='pr-2'><MdDashboardCustomize /></span>Dashboard</Link>
  <Link to="/admin/userdetails"> <span className='pr-2'><FaRegUserCircle /></span>User Details</Link>
  <Link to="/admin/addblogpost"><span className='pr-2'><FaMicroblog/></span>Blog Post</Link>
  <Link to="/admin/category"><span className='pr-2'><BiCategory/></span>Category</Link>
  <Link to="/admin/comment"><span className='pr-2'><FaComments/></span>Comment</Link>
  <Link to="/admin/reply"><span className='pr-2'><ImReply/></span>Reply</Link>
  <Link to='/admin/mastertitle'><span className='pr-2'><MdTitle/></span>MasterTitle</Link>
  
  {/* <Link to="/author">Author</Link> */}
</div>
{/* <div class="content">
   
  </div> */}
    </>
  )
}

export default Sidebar
