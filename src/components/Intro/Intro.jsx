import React, { useEffect } from 'react'
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import axios from 'axios';

const Intro =  ({data}) => {
    // useEffect(()=>{
    //     axios.get('')
    // })
    return (
        
        <div className="intro-section overlay section" style={{backgroundImage: `url(${process.env.REACT_APP_IMAGE_PATH + data.image})`}}>

            <div className="container">
                <div className="row row-cols-lg-1 row-cols-1">

                    <div className="col align-self-center">
                        <div className="intro-content mt-xl-8 mt-lg-8 mt-md-8 mt-sm-8 mt-xs-8">
                            <h2 className="title">{data.title.slice(0,60)}</h2>
                            <div className="desc">
                                {/* <p>{data.category}</p> */}
                            </div>
                            <Link to={process.env.PUBLIC_URL + `/blog-details/${data.slug}`} className="btn btn-primary btn-hover-secondary">Get Started</Link>
                            <Link to={process.env.PUBLIC_URL + `/blog-details/${data.slug}`} className="btn btn-outline-white btn-hover-primary"> Learn More </Link>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        
    )
}

Intro.propTypes = {
    data: PropTypes.object
};
  

export default Intro
