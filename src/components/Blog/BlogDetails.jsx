import React, { useEffect, useState } from 'react';
import {slugify} from "../../utils";
import PropTypes from "prop-types";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import BlogItem from './BlogItem';
import Loader from './Loader';
import { FaCopy } from "react-icons/fa";

const BlogDetails = ({ data }) => {
    // console.log(Blog)
    const pageTitle = data[0]?.title || 'Default Title';
    const xid = useParams()
   const navigate = useNavigate()
   const [blog,setblog] = useState("")
   const [loading,setLoading] = useState(false)
   //  console.log(xid) 
   try{
   useEffect(()=>{
    setLoading(false)
    axios.get(`https://mernblog-5-56r6.onrender.com/singleblog/${xid.sid}`).then((res)=>{
        
        setblog(res.data.singleblog)
    }).finally(
        setLoading(true)
    )
    
   
},[blog])

}
catch(error){
    console.log(error)
}
const [showcomment,setcomments] = useState([])
useEffect(() => {
    try {
      axios.get('https://mernblog-5-56r6.onrender.com/comment').then((res) => {
        setcomments(res.data.comment)
      })
      
    }
    catch (error) {
      console.log(error)
    }
  }, [showcomment])
 const commentlength =  showcomment.length
    // const cate = Blog.categories.map((value, i) => {
    //     return (
    //         <Link to={process.env.PUBLIC_URL + `/category/${slugify(value)}`} key={i}>{value}{i !== Blog.categories.length - 1 && ","}</Link>
    //     )
        
    // });
    const [copys,setcopy] = useState("")
    const copytoclipboard = (htmlContent)=>{
       
            // Create a temporary textarea element
            const textField = document.createElement('textarea');
            
            // Set the text content of the textarea by creating a temporary element and extracting its text content
            const tempElement = document.createElement('div');
            tempElement.innerHTML = htmlContent;
            textField.textContent = tempElement.textContent;
            
            // Append the textarea element to the document body
            document.body.appendChild(textField);
            
            // Select the text inside the textarea
            textField.select();
            
            // Copy the selected text
            document.execCommand('copy');
            
            // Remove the temporary textarea element
            textField.remove();
            alert("Copied")
        } 
        

    
    return (
        <>
        {loading ? 
        <div className="blog-3 blog-details col" data-aos="fade-up">
            <div className="thumbnail">
                <img className="w-100" src={process.env.REACT_APP_IMAGE_PATH + blog.image} alt="Blog Image" />
            </div>
            <div className="info">
                <h3 className="title">{blog.title}</h3>
                <span className="textcopy"><i className="far fa-copy text-primary fs-5" onClick={()=>copytoclipboard(blog.decsription)}></i><div  dangerouslySetInnerHTML={{ __html: blog.decsription}} /></span><br></br>
                
                <ul className="meta mb-0 mt-12">
                    <li><i className="fa fa-pencil-alt"></i>{blog.tag}</li>
                    <li><i className="far fa-calendar"></i>{blog.created_at}</li>
                    <li><i className="fas fa-tags"></i>{blog.title}</li>
                    {/* <li><i className="fas fa-category"></i>{blog.category.category_name}</li> */}
                    
                 

                    <li><i className="fas fa-comments"></i>{commentlength} Comment</li>
                    <li className="media"><Link to={process.env.PUBLIC_URL + "/"}><i className="fas fa-share-alt"></i>Share this post</Link>
                        <div className="list">
                            <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://twitter.com/i/flow/login"><i className="fab fa-twitter"></i></a>
                            <a href="https://in.linkedin.com/"><i className="fab fa-linkedin"></i></a>
                            <a href="https://www.tumblr.com/register"><i className="fab fa-tumblr-square"></i></a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        :<div><Loader/></div>
    }
    </>
    )
}

BlogDetails.propTypes = {
    blog: PropTypes.object
};

export default BlogDetails

        
