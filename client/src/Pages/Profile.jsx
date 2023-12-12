/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { FaFeather } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import { deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserFailure, signOutUserSuccess,  } from '../redux/user/userSlice.js';
import BlogCardAuthor from '../Components/BlogCardAuthor.jsx';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Profile = () => {

  const {currentUser, error} = useSelector((state)=>state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [authorBlogError, setAuthorBlogError] = useState(false);

  const [authorBlogSuccess, setAuthorBlogSuccess] = useState(false);

  const [authorBlog, setAuthorBlog] = useState(undefined);

//................................................................
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 700 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1
    }
  };
//.....................................................................

  console.log(currentUser.following.length);


  const handleDeletUser = async ()=>{
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      })

      const data = await res.json();

      if(data.success == false){
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data))


    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }


  const handleSignOut = async ()=>{
    try {
      dispatch(signOutUserStart());

      const res = await fetch(`/api/auth/sign-out`,{
        method: 'POST',
      })

      const data = await res.json();

      if(data.success == false){
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess(data))


    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  useEffect(()=>{
    const getAuthorsBlog = async()=>{
      setAuthorBlogError(false);
      try {
        const res = await fetch(`/api/user/getBlogs/${currentUser._id}`,{
          method: 'GET',
        })

        const data = await res.json();

        if(data.success === false){
          setAuthorBlogError(true);
          return;
        }

        setAuthorBlogError(false);
        setAuthorBlogSuccess(true);
        setAuthorBlog(data);

        console.log(authorBlog);

      } catch (error) {

        console.log(error);
        setAuthorBlogError(true);  
        setAuthorBlogSuccess(false);

      }
    }

    getAuthorsBlog();
  },[authorBlogSuccess]);


  return (
    <div className='profilePage'>

      <div className="userInfo">
        <img src={currentUser.avatar} alt="profile-pic" />
        <h2>{currentUser.username}</h2>
      </div>

      <div className="follows">
        <div className="following">
          <h4>FOLLOWING</h4>
          <h3>{currentUser.following.length}</h3>
        </div>
        <div className="following">
          <h4>FOLLOWERS</h4>
          <h3>{currentUser.followers.length}</h3>
        </div>
      </div>

      {authorBlogSuccess && (
        <div className="articles">
          <h4>articles published: <span>{authorBlog.length}</span></h4>
        </div>
      )}

      <div className="blogsPublished">
      
      </div>

      {authorBlogSuccess && authorBlog.length > 0 && 
        <div className="personalBlogs" style={{width:'80%'}}>
          <Carousel responsive={responsive}>
          {authorBlog.map(blog => (
            <BlogCardAuthor key={blog._id} blog={blog} />
          ))}
          </Carousel>
        </div>
      }



      <button className='create' onClick={()=> navigate('/createBlog')}><FaFeather style={{fontSize:'2rem', color:'#ED5AB3'}} /> CREATE A BLOG</button>   

      <button onClick={()=> navigate('/updateProfile')}>UPDATE PROFILE</button>   

      <div className="others">
        <div className="otherCompnents">
          <MdDelete onClick={handleDeletUser} style={{fontSize:'1.8rem', color:'red', cursor:'pointer'}}/>
          <span onClick={handleDeletUser}>DELETE ACCOUNT</span>
        </div>
        <div className="otherCompnents">
          <FaSignOutAlt onClick={handleSignOut} style={{fontSize:'1.8rem', color:'red', cursor:'pointer'}}/>
          <span onClick={handleSignOut}>SIGN OUT</span>
        </div>  
      </div>

      <p style={{fontSize:'1.2rem', fontWeight:'bold', color:'red'}}>{error ? error : ""}</p>



    </div>
  )
}

export default Profile
