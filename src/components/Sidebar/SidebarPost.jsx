import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import BlogClassicData from '../../data/blog/BlogClassic.json';
import axios from 'axios';

const SidebarPost = () => {
    const [blogtag,setblogtag] = useState([])
    useEffect(()=>{
        axios.get('https://mernblog-5-56r6.onrender.com/blog').then((res)=>{
            // console.log(res.data.blog)
setblogtag(res.data.blog)
        })
    },[blogtag])
    return (
        <div className="sidebar-widget-content">
            <ul className="sidebar-widget-list-post">
                {blogtag && blogtag.slice(0,4).map((value) => {
                    return(
                        <li key={value.id}>
                            <span className="cate">{value.category.category_name}</span>
                            <Link to={process.env.PUBLIC_URL + `/blog-details/${value.slug}`}>{value.title.slice(0,50)}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}



export default SidebarPost;
