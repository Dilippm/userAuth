import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import '../pages/home.css'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../redux/userSlice'


function Home() {
  const user = useSelector((state) => state.user);
  const [cookies, setCookie, removeCookie] = useCookies([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const veryfyUser = async () => {
      if (!cookies.jwt) {
        navigate('/login')
      } else {

        const { data } = await axios.post('http://localhost:4000', { user: user }, { withCredentials: true })
        if (!data.status) {
          removeCookie('jwt')
          navigate('/login')
        } else {
          if (!data.user) {
            navigate('/admin')
          } else {
            if (data.user.image) {
              dispatch(
                setUserDetails({
                  id: data.user._id,
                  email: data.user.email,
                  phone: data.user.phone,
                  image: data.user.image
                })
              )
            }

          }

        }
      }
    }
    veryfyUser()
  }, [cookies, navigate, removeCookie])


  return (
    <>
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f8f8f8' }}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img
      onClick={() => {
        navigate('/profile');
      }}
      className='profile'
      src={
        user.image
          ? process.env.PUBLIC_URL + `/image/${user.image}`
          : 'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg'
      }
      alt=''
      style={{ cursor: 'pointer', marginRight: '10px', width: '40px', height: '40px', borderRadius: '50%' }}
    />
    
     
     <Link to='/'><h1>Home</h1> </Link>
    
  </div>
  <button
    id='logout'
    onClick={() => {
      removeCookie('jwt');
      navigate('/login');
    }}
    style={{ cursor: 'pointer', backgroundColor: 'red', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px' }}
  >
    Log out
  </button>
</nav>
<h1>Welcome  {user.email}</h1>
</>

  )
}

export default Home
