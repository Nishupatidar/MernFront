import PropTypes from "prop-types";
import React from 'react';


const Testimonial = ({ data }) => {
    return (
        <div className="static-testimonial mb-6">
            <div className="testimonial-image">
                <img src={process.env.REACT_APP_IMAGE_PATH + data.image} alt="" style={{"width":"150px" , "height":"150px"}} />
            </div>
            <div className="testimonial-content">
                <p>{data.title}</p>
            </div>
            <div className="author-info">
                <div className="cite">
                    <h6 className="name">{data.tag}</h6>
                    <span className="position">{data.slug}</span>
                </div>
            </div>
        </div>
    )
}

Testimonial.propTypes = {
    data: PropTypes.object
};

export default Testimonial;
