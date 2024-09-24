import React, { useEffect, useState } from 'react';
import {flatDeep, slugify, containsObject} from '../../utils';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import SidebarSearch from './SidebarSearch';

const SidebarCategories = () => {
    const [categories,setcategories] = useState([])
    const [filteredCategories, setFilteredCategories] = useState([]);

    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:4000/categories').then((res)=>{
            // console.log(res.data.Categories)
            setcategories(res.data.Categories)
    })
},[])
    const cats = categories.map(item => {
        return item._id;
    });
    // console.log(cats)
    let singleCatArray = flatDeep(cats);
    // console.log(singleCatArray)
    // // let categories = [];
    singleCatArray.forEach(cats => {
        // console.log(cats)
        const obj = {
            title: cats.trim(),
            slug: slugify(cats),
            count: 1
        }

        // const objIndex = containsObject(obj, categories);
        // if(objIndex !== -1){
        //     const prevCount = categories[objIndex].count;
        //     categories[objIndex] = {
        //         title: cats.trim(),
        //         // slug: slugify(cats),
        //         count: prevCount + 1
        //     }
        // } else {
        //     categories.push(obj);
        // }
    })
    const getcategory =(cid)=>{
        navigate(`/category/${cid}`)
    }
    const handleSearch = (searchQuery) => {
        // Search query ke anusaar categories ko filter karo
        const filteredCats = categories.filter(cat =>
          cat.category_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        console.log("filteredcategories",filteredCats)
        setFilteredCategories(filteredCats);

      };
    return (
        <>
            <SidebarSearch onSearch={handleSearch} /> 
        <div className="sidebar-widget-content">
            <ul className="sidebar-widget-cate-list">
                {filteredCategories && filteredCategories.length === 0 ?

               
                 categories.slice(0,8).map(cat => {
                    if(cat.status==1){

                    
                    return (
                        <li key={cat.slug}>
                            <Link to={process.env.PUBLIC_URL + `/category/${cat._id}`}>
                                <span className="text" onClick={()=>getcategory(cat._id)}>{cat.category_name}</span> 
                                <span className="count">{cat.count}</span>
                            </Link>
                        </li>
                    )
                    }
                }):
                filteredCategories.slice(0,8).map(cat => {
                    if(cat.status==1){

                    
                    return (
                        <li key={cat.slug}>
                            <Link to={process.env.PUBLIC_URL + `/category/${cat._id}`}>
                                <span className="text" onClick={()=>getcategory(cat._id)}>{cat.category_name}</span> 
                                <span className="count">{cat.count}</span>
                            </Link>
                        </li>
                    )
                    }
                })

                }
            </ul>
        </div>
        </>
    )
}



export default SidebarCategories;
