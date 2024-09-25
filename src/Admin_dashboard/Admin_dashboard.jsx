import React, { useEffect, useState } from 'react'
// import CanvasJSReact from '@canvasjs/react-charts';
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
// import { Chart } from 'react-charts'

// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function Admin_dashboard() {
  const [Blog,setBlog] = useState([])
  useEffect(()=>{
    axios.get('https://mernblog-5-56r6.onrender.com/blog').then((res)=>{
      setBlog(res.data.blog)
    })
  },[Blog])
  const [Users,setUsers] = useState([])
  useEffect(()=>{
    axios.get('https://mernblog-5-56r6.onrender.com/userdetails').then((res)=>{
      setUsers(res.data.userdetails)
    })
  },[Users])
  const [Comment,setComment] = useState([])
  useEffect(()=>{
    axios.get('https://mernblog-5-56r6.onrender.com/comment').then((res)=>{
      setComment(res.data.comment)
    })
  },[Comment])


  // --------------------------------canvas chart-------------------------------
  // const options = {
  //   theme: 'light2',
  //   animationEnabled: true,
  //   title: {
  //     text: 'CanvasJS Chart - React Functional Component',
  //   },
  //   data: [
  //     {
  //       type: 'column',
  //       dataPoints: [
  //         { x: 10, y: 71 },
  //         { x: 20, y: 55 },
  //         { x: 30, y: 50 },
  //         { x: 40, y: 65 },
  //         { x: 50, y: 92 },
  //         { x: 60, y: 68 },
  //         { x: 70, y: 38 },
  //         { x: 80, y: 71 },
  //         { x: 90, y: 54 },
  //         { x: 100, y: 60 },
  //       ],
  //     },
  //   ],
  // };
  return (
    <div>
      <Sidebar/>
      <Navbar/>
      <div className="conatiner">
        <div className="row d-flex justify-content-evenly" style={{ "marginLeft":"206px","marginTop":"50px"}}>
<h1 className='text-center mt-2'>Admin Dashboard</h1>
<div className="col-sm-6 col-lg-3 col-md-6 bg-success pt-3 pb-3 border rounded text-center">
  <strong className=''>{Blog.length}</strong>
<h4 className='text-light'>Blog</h4>
</div>
<div className="col-sm-6 col-lg-3 col-md-6  bg-danger pt-3 pb-3 border rounded text-center">
  <strong>{Users.length}</strong><br></br>
Users
</div>
<div className="col-sm-6 col-lg-3 col-md-6 mt-2 bg-primary pt-3 pb-3 border rounded text-center">
  <strong>{Comment.length}</strong><br></br>
Comment
</div>
        </div>
      </div>
      <div className="row d-flex justify-content-evenly" style={{ "marginLeft":"180px","marginTop":"50px"}}>
        <div className="col-lg-6 col-xs-12 col-sm-12 col-md-6">
        {/* <CanvasJSChart options={options} /> */}
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default Admin_dashboard

