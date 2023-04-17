import React,{useEffect, useState} from 'react'
import {ToastContainer , } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'



function AdminLoginComponenet({handlesubmit,setValue,value}) {
  const [cookies,setCookie,removeCookie] = useCookies([])
  const navigate = useNavigate()
  useEffect(() => {
    const verifyAdmin = async () => {
        if (!cookies.adminjwt) { // Update to use 'adminjwt' instead of 'jwt'
            navigate('/login'); // Update to the appropriate route for admin login
        } else {
            console.log('cookies', cookies.adminjwt); // Update to use 'adminjwt' instead of 'jwt'
            try {
                const { data } = await axios.post('http://localhost:4000/verify', {}, { withCredentials: true });
                if (!data.status) {
                    removeCookie('adminjwt'); // Update to use 'adminjwt' instead of 'jwt'
                    navigate('/login'); // Update to the appropriate route for admin login
                } else {
                    console.log('elseeeeee');
                    if (data.role === 'admin') { // Update to check for 'admin' role
                        console.log('admin true');
                        navigate('/admin'); // Update to the appropriate route for admin dashboard
                    }
                    // else {
                    //     console.log('admin falsee');
                    //     navigate('/');
                    // }
                }
            } catch (error) {
                console.error(error);
                removeCookie('adminjwt'); // Update to use 'adminjwt' instead of 'jwt'
                navigate('/login'); // Update to the appropriate route for admin login
            }
        }
    }
    verifyAdmin();
}, [cookies, navigate, removeCookie]);

  return (
    <div className='top'>
      <div className="container">
      <h2>Login to your Account</h2>
      <form className='form' onSubmit={(e)=>{
       handlesubmit(e)
      }}>
        <div>
          <label htmlFor="email">Email</label>
          <input
          className='input'
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e)=>{
                setValue({...value,[e.target.name]:e.target.value})
            }}
            />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
          className='input'
            type="password"
            name="password"
            placeholder="password"
            onChange={(e)=>{
                setValue({...value,[e.target.name]:e.target.value})
            }}
            />
        </div>
       
        <button className='button' type="submit">Submit</button>
        <span className='span'>
          Don't have an account ?<Link to="/register"> Register </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
    </div>
  )
}

export default AdminLoginComponenet
