import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import BlogClassicData from '../../data/blog/BlogClassic.json';
import BlogItem from '../../components/Blog/BlogItem';



const PageBlog = () => {
  
    return (
        <div className="section section-padding fix">
            <div className="container">

                    <BlogItem/> 
                {/* <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 mb-n6">
                    {/* {BlogClassicData && BlogClassicData.map((single, key) => {
                            return(
                                <div key={key} className="col mb-6" data-aos="fade-up">
                                </div>
                            ); 
                    })} 
                </div> */}

               

            </div>
        </div>
    )
}

export default PageBlog;
