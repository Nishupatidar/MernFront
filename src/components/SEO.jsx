import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";

const SEO = ({ title,description }) => {
    const [blog, setBlog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/blog')
            .then((res) => {
                setBlog(res.data.blog);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // Fetch data only once when the component mounts

    return (
        <>
         
               <Helmet>
               {/* <meta charSet="utf-8" /> */}
               <title>{title}</title>
               {/* <meta name="robots" content="follow" /> */}
               {/* <meta name="description" content={description} /> */}
               {/* <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> */}
           </Helmet>
        

            
        </>
    );
}

SEO.propTypes = {
    title: PropTypes.string
};

export default SEO;

