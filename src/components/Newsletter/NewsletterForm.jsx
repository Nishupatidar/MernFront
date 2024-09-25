import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe";

const CustomForm = ({ status, message, onValidated }) =>{
    const [subscribe,setsubscribe] = useState({
        "name":"",
        "email":""
    })
    let email;
    const submit = (e) => {
        e.preventDefault();
        axios.post('https://mernblog-5-56r6.onrender.com/subscribe',subscribe)
       
    };
    // Change Handaler
    const inputChangedHandler = (e) => {

setsubscribe({...subscribe,[e.target.name]:e.target.value})
         console.log(e.target.value);
    }
    
    return (
        <div className="newsletter-form" data-aos="fade-up" data-aos-delay="300">
            <form method="Post" onSubmit={submit}>
                <input type="text" className="name mr-3" id="mc-form-name" onChange={(e)=>inputChangedHandler(e)} ref={node => (email = node)} placeholder="Ente your Name" name="name" required/>
                <input id="mc-form-email" className="email mr-3" type="email" onChange={(e)=>inputChangedHandler(e)} ref={node => (email = node)} placeholder="Ente your email" name="email" required />
                <button className="btn btn-primary btn-hover-secondary" type="submit">Subscribe</button>
            </form>
            {status === "sending" && (
                <div style={{ color: "#3498db", fontSize: "12px" }}>sending...</div>
            )}
            {status === "error" && (
                <div
                    style={{ color: "#e74c3c", fontSize: "12px" }}
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {status === "success" && (
                <div
                    style={{ color: "#2ecc71", fontSize: "12px" }}
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
        </div>
    )
}

CustomForm.propTypes = {
    status: PropTypes.oneOf(["sending", "error", "success"]),
    message: PropTypes.string,
    onValidated: PropTypes.func
}

const NewsletterForm = (props) => {
    return (
        <MailchimpSubscribe
            url={props.mailchimpUrl}
            render={({ subscribe, status, message }) => (
                <CustomForm
                    status={status}
                    message={message}
                    onValidated={formData => subscribe(formData)}
                />
            )}
        />
    )
}

NewsletterForm.propTypes = {
  mailchimpUrl: PropTypes.string
};

export default NewsletterForm;

