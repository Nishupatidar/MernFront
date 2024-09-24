import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { DiscussionEmbed } from 'disqus-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha'
const Comment = () => {
  const xid = useParams()
  // console.log(xid.sid)
  const [showcomment, setshowcomment] = useState([])
  useEffect(() => {
    try {
      axios.get('http://localhost:4000/comment').then((res) => {
        setshowcomment(res.data.comment)
      })
    }
    catch (error) {
      console.log(error)
    }
  }, [showcomment])
  const [captchaValue, setCaptchaValue] = useState(null)
  const [comments, setcomments] = useState({
    "name": "",
    "email": "",
    "content": "",
    "ipAddress":"",
    "postid": xid.sid,
    "cid":""
  })
  const handleCaptchaChange = (value) => {
    // Called when the user solves the captcha
    console.log(value)
    setCaptchaValue(value);
  };
  const inputvalue = (e) => {
    setcomments({ ...comments, [e.target.name]: e.target.value })
  }
  const submitcomment = async (e) => {
    try {
      e.preventDefault()
      if (captchaValue != null) {

        let res = await axios.post("http://localhost:4000/commentblog", comments)
        console.log(res)
        if (res.data.success == true) {
          alert(res.data.message)
        }
        setcomments({
          "name": "",
          "email": "",
          "content": ""
          
        });
        setCaptchaValue(null);


        //   frm.reset()
      }
      else {
        // Display an error or prevent the comment submission
        alert('Captcha not solved. Please solve the captcha.');
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  const [rcomments, setrcomments] = useState({
    "name": "",
    "email": "",
    "content": "",
    "ipAddress":"",
     
  })
  const [replyBoxVisible, setReplyBoxVisible] = useState(false)
  const [replyBoxId ,setreplyBoxId] = useState('')
  const [visibleReplies, setVisibleReplies] = useState({});

  const toggleReplies = (commentId) => {
    setVisibleReplies((prevVisibleReplies) => ({
      ...prevVisibleReplies,
      [commentId]: !prevVisibleReplies[commentId],
    }));
  };
  const toggleReplyBox = (id) => {
    setreplyBoxId(id)
    setReplyBoxVisible(!replyBoxVisible);
  };
  const inputreplyvalue = (e)=>{
    console.log(e.target.value)
    setrcomments({ ...rcomments, [e.target.name]: e.target.value })
  }
  // console.log(rcomments)
  // console.log(comments)
  const submitreply = async(id)=>{
try{
if (captchaValue != null) {
const res =  await axios.post('http://localhost:4000/replycomment',{
  "rcomments": rcomments,
  "rid":id
})
if (res.data.success == true) {
  alert(res.data.message)
  setReplyBoxVisible(false)
  setrcomments({
    "name":"",
    "email":"",
    "content":""
  })
}
setCaptchaValue(null);
}
else {
  // Display an error or prevent the comment submission
  alert('Captcha not solved. Please solve the captcha.');
}
}
catch(error){
  console.log(error)
}
  }
  const [replycomment,setreplycomment] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:4000/reply").then((res)=>{
      setreplycomment(res.data.reply)
  })
  },[replycomment])
  return (
    <>
      <div className="div">

<ul className="review-list add">
  <li className='' style={{"listStyle":"none"}}>
        {showcomment && showcomment.map((items, i) => {
console.log("Xid Sid",xid.sid)
console.log(items.Post_id)
          if (xid.sid == items.Post_id.slug) {
            if(items.status==1){


            return (
              <>
  {/* <li> */}
    <div className="frame">
      <img src="/images/author/img109.jpg" alt="image" className="img" />
     
          <span className="name fw-blod pl-5 pr-5 text-dark">{items.name}</span>
          <span className="time">{items.created_at}</span>
          <a  className="pull-right reply text-success" onClick={()=>toggleReplyBox(items._id)}>
            <i className="fa fa-reply" aria-hidden="true" /> Reply
          </a>
        {/* </div> */}
        <p>
          {items.content}
        </p>
        <button className="btn btn-link" onClick={() => toggleReplies(items._id)}>
                      {visibleReplies[items._id] ? 'Hide Replies' : 'Show Replies'}
                    </button>
          { replyBoxVisible && replyBoxId == items._id &&
          <form name='frm'>
            {/* <h1>{items._id}</h1> */}
        <h4>Leave a Reply</h4>
        <div class="row">
          <div class="col mt-3">
            <input type="text" class="form-control" placeholder="Enter Name" name="name" onChange={inputreplyvalue} required value={rcomments.name}/>
          </div>
          <input type="hidden" class="form-control" placeholder="Enter Name" name="cid" onChange={inputreplyvalue}  value={items._id} required />

          <div class="col mt-3">
            <input type="email" class="form-control" placeholder="Enter Email" name="email" onChange={inputreplyvalue} required value={rcomments.email}/>
          </div>
        </div>
        <div>
          <label for="content" className='mt-3'>Comments:</label>
          <textarea class="form-control" rows="5" id="content" name="content" onChange={inputreplyvalue} value={rcomments.content}></textarea>
          {/* <input type="Date"  class="form-control" placeholder="Enter Email" type="hidden" name="date" onChange={inputvalue}/> */}
        </div>

        <button className='btn btn-primary mt-3' type='button' onClick={()=>submitreply(items._id)}>Submit your Reply</button>
        <div className='mt-3'>
          <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} onChange={handleCaptchaChange} />
        </div>
      </form>
      }
      {/* </div> */}
    </div>
    <hr></hr>
   
  
                         <ul class="review-list">
														<li className='' style={{"listStyle":"none"}}>
                              { visibleReplies[items._id] && replycomment && replycomment.map((item,index)=>{
                                console.log(items._id)
                                console.log(item.Comment_id._id)
                                if(items._id== item.Comment_id._id){
                                  console.log("match id")
                                  // console.log(item.cid.length)
                                  
                                  if(item.status == 1){
                                  
                                return(
                                  <>
                                 
															<div class="frame">
																<img src="/images/author/img108.jpg" alt="image" className="img" />
																<div class="holder">
																	<div class="top">
																		<span class="name fw-blod pl-5 pr-5 text-dark">{item.name}</span>
																		<span class="time">{item.created_at.slice(0,24)}</span>
																		<a  class="pull-right reply text-success"><i class="fa fa-reply" aria-hidden="true"></i> Reply</a>
																	</div>
																	<p>{item.content}</p>
																</div>
															</div>
                              <hr></hr>
                              </>
                                )
                                }
                              }
                                else{
                                  <span>No Reply</span>
                                 console.log("no reply")
                                  // <span>No Reply</span>
                                  
                                }
                              })}
														</li>
													</ul>       
                          
                      </>

            )
          }
        }
        else {
          <span className=''>No Comment</span>
        }
        
      })}
     
      </li>
      </ul>
      
      </div>
      <form onSubmit={submitcomment} name='frm'>
        <h4>Leave a Comment</h4>
        <div class="row">
          <div class="col mt-3">
            <input type="text" class="form-control" placeholder="Enter Name" name="name" onChange={inputvalue} value={comments.name} required />
          </div>
          <div class="col mt-3">
            <input type="email" class="form-control" placeholder="Enter Email" name="email" onChange={inputvalue}  value={comments.email} required />
          </div>
        </div>
        <div>
          <label for="content" className='mt-3'>Comments:</label>
          <textarea class="form-control" rows="5" id="content" name="content" onChange={inputvalue} value={comments.content}></textarea>
          {/* <input type="Date"  class="form-control" placeholder="Enter Email" type="hidden" name="date" onChange={inputvalue}/> */}
        </div>

        <button className='btn btn-primary mt-3' type='submit'>Submit your Comment</button>
        <div className='mt-3'>
          <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} onChange={handleCaptchaChange} />
        </div>
      </form>

    </>                                                                                                                                                    
  )
};

export default Comment
