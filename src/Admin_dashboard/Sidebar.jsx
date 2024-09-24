import React, { useEffect, useState } from 'react'
// import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './Sidebar.css'
import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaMicroblog } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import { ImReply } from "react-icons/im";
import { MdTitle } from "react-icons/md";
import { MdHdrAuto } from "react-icons/md"
import { FaIntercom } from "react-icons/fa6";
import { PiSubtractSquareFill } from "react-icons/pi";
import { FaFacebook } from "react-icons/fa"
import { TfiMenuAlt } from "react-icons/tfi"
import { SiKnowledgebase } from "react-icons/si";
import axios from 'axios';
// import User_details from '../Component/User_details';
function Sidebar() {
  const [sidebar,setsidebar] = useState([])
  const iconComponents = {
    mdhome: MdHome,
    mddashboardcustomize:MdDashboardCustomize,
    faregusercircle: FaRegUserCircle,
     famicroblog:FaMicroblog,
     bicategory:BiCategory,
     facomments:FaComments,
     imreply:ImReply,
     mdtitle:MdTitle,
     mdhdrauto:MdHdrAuto,
     faintercom :FaIntercom,
     pisubtractsquarefill:PiSubtractSquareFill,
     fafacebook:FaFacebook,
    tfimenualt :TfiMenuAlt,
    siknowledgebase:SiKnowledgebase
    // Add more mappings as needed
  };
  const DefaultIcon = () => <span>Default Icon</span>;

  useEffect(()=>{
    axios.get("http://localhost:4000/sidebar").then((res)=>{
      // console.log(res.data.sidebar)
      setsidebar(res.data.sidebar)
    })
  },[])
  const [activeLink, setActiveLink] = useState(null);

  const handleClick = (link) => {
    setActiveLink(link);
    // if (activeLink === link) {
    //   setActiveLink(null); // Toggle off if clicked twice
    // } else {
    // }
  };
  return (
    <>
  <div className="sidebar">
    {sidebar.map((items,index)=>{
       const iconName = items.tab_icon.toLowerCase();
       const IconComponent = iconComponents[iconName] || DefaultIcon;
return(
<>
  <Link className={activeLink ===items._id ? "active" : ""} to={items.controller_name} onClick={()=>handleClick(items._id)}><spna className="pr-2">{IconComponent && <IconComponent/>}</spna>{items.tab_name}</Link>
  </>
)
    })}
  {/* <Link className='' to="/admin/admindashboard"><span className='pr-2'><MdDashboardCustomize /></span>Dashboard</Link>
  <Link to="/admin/userdetails"> <span className='pr-2'><FaRegUserCircle /></span>User Details</Link>
  <Link to="/admin/addblogpost"><span className='pr-2'><FaMicroblog/></span>Blog Post</Link>
  <Link to="/admin/category"><span className='pr-2'><BiCategory/></span>Category</Link>
  <Link to="/admin/comment"><span className='pr-2'><FaComments/></span>Comment</Link>
  <Link to="/admin/reply"><span className='pr-2'><ImReply/></span>Reply</Link>
  <Link to='/admin/mastertitle'><span className='pr-2'><MdTitle/></span>MasterTitle</Link> */}
  
  {/* <Link to="/author">Author</Link> */}
</div>
{/* <div class="content">
   
  </div> */}
    </>
  )
}

export default Sidebar
