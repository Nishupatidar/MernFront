import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import { Helmet } from "react-helmet";
import SEO from '../../components/SEO'
import Loader from "./Loader";
const BlogItem = () => {
    const navigate = useNavigate()
    const [Blog, setBlog] = useState([])
    const [loading, setLoading] = useState(true);

    
    
    useEffect(() => {
        try{
            setLoading(true);
        axios.get('https://mernblog-5-56r6.onrender.com/blog').then((res) => {
            // console.log(res.data.Categories)
            setBlog(res.data.blog)
            // console.log(res.data.blog)
           
        })
    }
    catch(error){
    console.log(error)
    }
    finally{
        setLoading(false)
    }
    }, [Blog])
const getvalue = (slug)=>{
    navigate(`/blog-details/${slug}`)
}
const [pageNumber, setPageNumber] = useState(0);
const usersPerPage = 9
const pagesVisited = pageNumber * usersPerPage;
const pageCount = Math.ceil(Blog.length / usersPerPage);
const lastVisited = pagesVisited + usersPerPage;
// const displayuser = names.slice(pagesVisited, lastVisited)
const displaydata = Blog.slice(pagesVisited, lastVisited)
const changePage = ({ selected }) => {
  console.log(selected)
  setPageNumber(selected);
};
    return (
        <>
            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 mb-n6">
                {loading ? (
                  <Loader/>
                ):
                displaydata && displaydata.map((items, index) => {
                    if (items.status == 1) {
                        return (
                           <>
                                
                    
                            <div key={index} className="col mb-6" data-aos="fade-up">
                                <div className="blog">
                                    <div className="thumbnail" style={{ "height": "250px" }}>
                                        <Link to={process.env.PUBLIC_URL + `/blog-details/${items.slug}`} className="image"><img src={process.env.REACT_APP_IMAGE_PATH + items.image} alt="Blog Image" style={{ "width": "100%", "height": "250px" }} /></Link>
                                    </div>
                                    <div className="info">
                                        <ul className="meta">
                                            <li><i className="far fa-calendar"></i>{items.created_at}</li>
                                            <li><i className="far fa-eye"></i>{items.metatitle}</li>
                                            <li><i className="far fa-sun-o"></i>{items.category.category_name}</li>

                                        </ul>
                                        <h3 className="title" onClick={()=>getvalue(items.slug)}>{items.title}</h3>
                                        <Link to={process.env.PUBLIC_URL + `/blog-details/${items.slug}`} className="link"> <mark>Read More</mark> </Link>
                                    </div>
                                </div>
                            </div>
                            </>
                        )
                    };
                })}
            
            </div>
            <div className="row mt-10">
                    <div className="col d-flex justify-content-center">

                    <div class="pagination">
                    <ReactPaginate

                      previousLabel={"Previous"}
                      nextLabel={"Next"}
                      pageCount={pageCount}
                      onPageChange={changePage}
                      containerClassName={"paginationBttns"}
                      previousLinkClassName={"previousBttn"}
                      nextLinkClassName={"nextBttn"}
                      disabledClassName={"paginationDisabled"}
                      activeClassName={"paginationActive"}
                    />

                  </div>

                    </div>
                </div>
        </>
        // {Blog && Blog.map((items,index)=>{
        //     if(items.status == 1){
        //         return(
        //             <>

        //             <div className="blog">
        //         <div className="thumbnail">
        //             <Link to={process.env.PUBLIC_URL + `/blog-details/${items._id}`} className="image"><img src={process.env.REACT_APP_IMAGE_PATH + items.image} alt="Blog Image" /></Link>
        //         </div>
        //         <div className="info">
        //             <ul className="meta">
        //                 <li><i className="far fa-calendar"></i>{items.created_at}</li>
        //                 <li><i className="far fa-eye"></i>{items.metatitle}</li>
        //             </ul>
        //             <h3 className="title"><Link to={process.env.PUBLIC_URL + `/blog-details/${items.slug}`}>{items.slug}</Link></h3>
        //             <Link to={process.env.PUBLIC_URL + `/blog-details/${items._id}`} className="link"> <mark>Read More</mark> </Link>
        //         </div>
        // </div>
        // </div>
        //     </>
        //     )}
        // })}
    )
}

BlogItem.propTypes = {
    Blog: PropTypes.object
};

export default BlogItem
