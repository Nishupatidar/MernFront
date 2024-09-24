import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import {Link, useParams} from "react-router-dom";
import BlogClassic from '../../components/Blog/BlogClassic.jsx';
import SidebarWrap from '../../components/Sidebar/SidebarWrap.jsx';
import SidebarWidget from '../../components/Sidebar/SidebarWidget.jsx';
import SidebarBanner from '../../components/Sidebar/SidebarBanner.jsx';
import SidebarTitle from '../../components/Sidebar/SidebarTitle';
import SidebarSearch from '../../components/Sidebar/SidebarSearch.jsx';
import SidebarCategories from '../../components/Sidebar/SidebarCategories.jsx';
import SidebarPost from '../../components/Sidebar/SidebarPost.jsx';
import SidebarTag from '../../components/Sidebar/SidebarTag.jsx';
import axios from "axios";

const BlogCategoryContainer = () => {
    let xid = useParams();
    console.log(xid)

    const [categories,setcategories] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:4000/allcategory/${xid.cid}`).then((res)=>{
setcategories(res.data.category)
        })
    },[categories])

    return (
        <div className="section section-padding fix">
            <div className="container">
                <div className="row mb-n10">

                    <div className="col-lg-8 col-12 order-lg-1 mb-10">
                        <div className="row row-cols-1 no-gutters">

                                    <BlogClassic  />
                        {/* {categories.map((single, key) => { */}
                            {/* return(
                                <div key={key} className="col mb-6">
                                </div>
                            );  */}
                        {/* })} */}



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

BlogCategoryContainer.propTypes = {
    data: PropTypes.array
};

export default BlogCategoryContainer;
