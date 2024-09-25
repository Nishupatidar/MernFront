import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import BlogClassicData from '../data/blog/BlogClassic.json';
import BlogDetailsContainer from '../container/BlogGrid/BlogDetailsContainer';
import CallToAction from '../container/CallToAction/CallToAction';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

const BlogDetails = () => {
    const [datas,setdatas] = useState([])
    let {sid} = useParams();

    // console.log("blogdetails",sid)
    const blogId = parseInt(sid, 10)
    const data = BlogClassicData.filter(blog => blog.id === blogId);
    useEffect(()=>{
        axios.get(`https://mernblog-5-56r6.onrender.com/singleblog/${sid}`).then((res)=>{
        //   console.log(res.data.singleblog.category.category_name)
          setdatas(res.data.singleblog)
        })
    
       },[datas])
    //    console.log(datas)
    // const xid = useParams()
    // const navigate = useNavigate()
//     const [blog,setblog] = useState("")
//    //  console.log(xid)
//     useEffect(()=>{
//      axios.get(`https://mernblog-5-56r6.onrender.com/singleblog/${xid.sid}`).then((res)=>{
//        console.log(res.data.singleblog)
//        setblog(res.data.singleblog)
//      })
 
//     },[])
    return (
        <React.Fragment>
            
            <SEO title={` ${datas.metatitle}`}/>
         
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-four.jpg"
                title={data[0]?.title}
                content="Home"
                contentTwo="Blog Classic"
            />
            <BlogDetailsContainer data={data[0]} />
            <CallToAction />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default BlogDetails;
