import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = (props) => {
    const { Component } = props
    const navigate = useNavigate()
    useEffect(() => {
        const logindata = sessionStorage.getItem("token");
        console.log(logindata)

        if (!logindata) {
            navigate('/admin/login')
        }
    })
    return (
        <div>
            <Component />
        </div>
    )
}

export default Protected