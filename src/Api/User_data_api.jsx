import axios from 'axios'
import React, { useEffect } from 'react'

const User_data_api = () => {
    useEffect(()=>{
        axios.get('http://localhost:4000/userdata').then((res)=>{
            console.log(res.data.apidata)
        })
    })
    
  return (
    <div>User_data_api</div>
  )
}

export default User_data_api