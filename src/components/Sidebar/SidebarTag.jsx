import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {flatDeep, slugify, containsObject} from '../../utils';
import BlogClassicData from '../../data/blog/BlogClassic.json';
import axios from 'axios';

const SidebarTag = () => {
    const [allTages,setalltages] = useState([])
    useEffect(()=>{
        axios.get('https://mernblog-5-56r6.onrender.com/blog').then((res)=>{
            setalltages(res.data.blog)
        })
    })
    const tags = allTages.map(item => {
        return item.tags;
    });
    let singleTagArray = flatDeep(tags);
    // let allTags = [];
    // singleTagArray.forEach(tag => {
    //     const obj = {
    //         title: tag.trim(),
    //         slug: slugify(tag)
    //     }
    //     const objIndex = containsObject(obj, allTags);
    //     if(objIndex !== -1){
    //         allTags[objIndex] = {
    //             title: tag.trim(),
    //             slug: slugify(tag)
    //         }
    //     } else {
    //         allTags.push(obj);
    //     }
    // })
    return (
        <div className="sidebar-widget-content">
            <div className="tagcloud">
                {allTages.slice(0,9).map((tag) => {
                    return(
                        <Link key={tag.slug} to={process.env.PUBLIC_URL + `/tag/${tag.slug}`}>{tag.tag}</Link>
                    )
                })}
            </div>
        </div>
    )
}




export default SidebarTag;
