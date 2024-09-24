import React, { useEffect, useState } from 'react';
import { slugify } from "../../utils"
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import ReactPaginate from 'react-paginate'

const BlogClassic = () => {
    let xid = useParams();
    // console.log(xid)

    const [categories, setcategories] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:4000/allcategory/${xid.cid}`).then((res) => {
            // console.log(res.data.allcategory)
            console.log(res.data.allcategory)
            setcategories(res.data.allcategory)
        })
    }, [categories])
    const cate = categories.map((value, i) => {
        return (
            <Link to={process.env.PUBLIC_URL + `/category/${slugify(value)}`} key={i}>{value}{i !== value.category.length - 1 && ","}</Link>
        )
    });
    // let xid = useParams()
    const [tags, settags] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:4000/tag/${xid.tid}`).then((res) => {
            // console.log(res.data.alltages)
            settags(res.data.alltages)
        })
    }, [tags])
    const [pageNumber, setPageNumber] = useState(0);
const usersPerPage = 2
const pagesVisited = pageNumber * usersPerPage;
const pageCount = Math.ceil(categories.length / usersPerPage);
const lastVisited = pagesVisited + usersPerPage;
// const displayuser = names.slice(pagesVisited, lastVisited)
const displaydata = categories.slice(pagesVisited, lastVisited)
const changePage = ({ selected }) => {
  console.log(selected)
  setPageNumber(selected);
};

    return (
        <>
            {/* {tags && tags.map((value,i)=>{
            return( */}


            {tags != null ?
                <div className="blog-3 col">
                    <div className="thumbnail">
                        <Link to={process.env.PUBLIC_URL + `/blog-details/${tags.slug}`} className="image"><img src={process.env.REACT_APP_IMAGE_PATH + tags.image} alt="Blog Image" /></Link>
                    </div>
                    <div className="info">
                        <ul className="meta">
                            <li><i className="fa fa-pencil-alt"></i>{tags.title}</li>
                            <li><i className="far fa-calendar"></i>{tags.tag}</li>
                            <li><i className="fas fa-tags"></i>{tags.title}</li>
                            <li><i className="fas fa-comments"></i>4 Comments</li>
                        </ul>
                        <h3 className="title"><Link to={process.env.PUBLIC_URL + `/blog-details/${tags.slug}`}>{tags.title}</Link></h3>
                        <div className="desc">
                         
                        </div>
                        <Link to={process.env.PUBLIC_URL + `/blog-details/${tags.slug}`} className="btn btn-primary btn-hover-secondary mt-6">Read More</Link>
                    </div>
                </div>

                :
                displaydata && displaydata.map((value, i) => {
                    return (
                        <div className="blog-3 col">
                            <div className="thumbnail">
                                <Link to={process.env.PUBLIC_URL + `/blog-details/${value.slug}`} className="image"><img src={process.env.REACT_APP_IMAGE_PATH + value.image} alt="Blog Image" /></Link>
                            </div>
                            <div className="info">
                                <ul className="meta">
                                    <li><i className="fa fa-pencil-alt"></i>{value.title}</li>
                                    <li><i className="far fa-calendar"></i>{value.tag}</li>
                                    <li><i className="fas fa-tags"></i>{value.slug}</li>
                                    <li><i className="fas fa-comments"></i>4 Comments</li>
                                </ul>
                                <h3 className="title"><Link to={process.env.PUBLIC_URL + `/blog-details/${value.slug}`}>{value.title}</Link></h3>
                                <div className="desc">
                               
                                </div>
                                <Link to={process.env.PUBLIC_URL + `/blog-details/${value.slug}`} className="btn btn-primary btn-hover-secondary mt-6">Read More</Link>
                            </div>
                        </div>
                    )
                })
}

            <div className="row">
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
    )
}
BlogClassic.propTypes = {
    data: PropTypes.object
};
export default BlogClassic;
