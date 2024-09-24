import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import BlogDetails from '../../components/Blog/BlogDetails.jsx';
import Comment from '../../components/Comment/Comment.jsx';
import SidebarWrap from '../../components/Sidebar/SidebarWrap.jsx';
import SidebarWidget from '../../components/Sidebar/SidebarWidget.jsx';
import SidebarBanner from '../../components/Sidebar/SidebarBanner.jsx';
import SidebarTitle from '../../components/Sidebar/SidebarTitle';
import SidebarSearch from '../../components/Sidebar/SidebarSearch.jsx';
import SidebarCategories from '../../components/Sidebar/SidebarCategories.jsx';
import SidebarPost from '../../components/Sidebar/SidebarPost.jsx';
import SidebarTag from '../../components/Sidebar/SidebarTag.jsx';
import axios from "axios";

const BlogDetailsContainer = () => {
    const xid = useParams()
   const navigate = useNavigate()
   const [blog,setblog] = useState("")
   const [loading,setloading] = useState(false)
  //  console.log(xid)
   useEffect(()=>{
    axios.get(`http://localhost:4000/singleblog/${xid.sid}`).then((res)=>{
      console.log(res.data.singleblog)
      setblog(res.data.singleblog)
    })

   },[])
const [realted,setrealted] = useState([])
useEffect(()=>{
    setloading(false)
    axios.get('http://localhost:4000/blog').then((res)=>{
        console.log(res.data.blog)
        setrealted(res.data.blog)
        setloading(true)
    })
},[realted])
const [showcomment,setshowcomment] = useState([])
useEffect(()=>{
  try{
  axios.get('http://localhost:4000/comment').then((res)=>{
setshowcomment(res.data.comment)
  })
}
catch(error){
  console.log(error)
}
},[Comment])
    return (
        <div className="section section-padding fix">
            <div className="container">
                <div className="row mb-n10">

                    <div className="col-lg-8 col-12 order-lg-1 mb-10">
                        <div className="row row-cols-1 no-gutters">
                            
                            <BlogDetails data={blog} loading={loading}/>
                            <div className="entry-author">
                                <div className="author-info">
                                    <div className="author-avatar">
                                        <img src={process.env.PUBLIC_URL + "/images/author/blog-author.png"} alt="" />
                                    </div>
                                    <div className="author-description">
                                        <h6 className="author-name">Eloise Smith</h6>
                                        <span className="designation">CEO at Flow</span>
                                        <div className="author-biographical-info">
                                            She is a lawyer, podcaster, speaker, and writer. As an educational content director, she helps develop HasThemes  premium training products.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="blog-nav-links">
                                <h4 className="title">Related Posts </h4>
                                <div className="nav-list">
                                            {realted && realted.slice(0,2).map((items,index)=>{
                                                return(
                                              <>
                                    <div className="nav-item prev">
                                        <div className="inner">
                                             
                                            <Link to={process.env.PUBLIC_URL + `/blog-details/${items.slug}`}>
                                                <div className="hover-bg has-thumbnail" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/pagination/blog-pagination.jpg)`}}></div>
                                                
                                                <h6>{items.title}</h6>
                                            </Link>
                                        </div>
                                    </div>
                                            </>
                                            )})}

                                    {/* <div className="nav-item next">
                                        <div className="inner">
                                            <Link to={process.env.PUBLIC_URL + `/blog-details/${blog.id}`}>
                                                <div className="hover-bg has-thumbnail" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/pagination/blog-pagination-2.jpg)`}}></div>
                                                <span className="cate">Startup</span>
                                                <h6>Growing a startup involves balancing out the financial stack</h6>
                                            </Link>
                                        </div>
                                    </div> */}
                                </div>
                            </div>


                            <div className="comment-form-wrap">
                                <div className="comment-respond">
                                    <h3 className="title">Leave a Reply</h3>
                                    {showcomment && showcomment.map((items,i)=>{
                                        if(xid.sid == items.Post_id){
                                            return(
                                                <span>{items.content}</span>
                                            )
                                        }
                                    })}
                                    <Comment 
                                        url=""
                                        id={blog.id}
                                        title={blog.title}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-lg-4 col-12 order-lg-2 mb-10">
                        <SidebarWrap>
                            <SidebarWidget>
                                {/* <SidebarSearch /> */}
                            </SidebarWidget>
                            <SidebarWidget>
                                <SidebarTitle title="Categories" />
                                <SidebarCategories />
                            </SidebarWidget>
                            <SidebarWidget>
                                <SidebarTitle classOption="mb-2" title="Popular Posts" />
                                <SidebarPost />
                            </SidebarWidget>
                            <SidebarWidget>
                                <SidebarBanner />
                            </SidebarWidget>
                            <SidebarWidget>
                                <SidebarTitle title="Popular tags" />
                                <SidebarTag />
                            </SidebarWidget>
                        </SidebarWrap>
                    </div>

                </div>
            </div>
        </div>
    )
}
BlogDetailsContainer.propTypes = {
    data: PropTypes.object
};

export default BlogDetailsContainer;
