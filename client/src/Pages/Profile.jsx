/* eslint-disable no-unused-vars */
import React from 'react'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { FaFeather } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import { deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserFailure, signOutUserSuccess,  } from '../redux/user/userSlice.js';


const Profile = () => {

  const {currentUser, error} = useSelector((state)=>state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();


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


  return (
    <div className='profilePage'>

      <div className="userInfo">
        <img src={currentUser.avatar} alt="profile-pic" />
        <h2>{currentUser.username}</h2>
      </div>

      <div className="follows">
        <div className="following">
          <h4>FOLLOWING</h4>
          <h3>132</h3>
        </div>
        <div className="following">
          <h4>FOLLOWERS</h4>
          <h3>546</h3>
        </div>
      </div>

      <div className="articles">
        <h4>articles published: <span>6</span></h4>
      </div>


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
