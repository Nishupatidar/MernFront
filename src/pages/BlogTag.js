import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import { slugify } from "../utils"
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import BlogClassicData from '../data/blog/BlogClassic.json';
import BlogTagContainer from '../container/BlogGrid/BlogTagContainer';
import CallToAction from '../container/CallToAction/CallToAction';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';
import axios from 'axios';

const BlogTag = () => {
    let xid = useParams();
    console.log(xid)
    const[tags,settags] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:4000/tag/${xid.tid}`).then((res)=>{
            settags(res.data.alltages)

        })
    },[])
    // const data = tags.map(blog => {
    //     return {
    //         ...blog,
    //         tag: blog.tag.filter(tag => slugify(tag) === blog.slug)
    //     }
    // }).filter(blog => blog.tag.length > 0);
    // // const tagTitle = data[0].tag[0]
    return (
        <React.Fragment>
            <SEO title="Exomac || Blog" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-four.jpg"
                // title={tagTitle}
                content="Home"
                contentTwo="Blog Classic"
            />
            <BlogTagContainer/>
            <CallToAction />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default BlogTag;
