/* eslint-disable no-unused-vars */
import React from 'react'
import './Profile.css'
import { useSelector } from 'react-redux'
import { MdDelete } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";

const Profile = () => {

  const {currentUser} = useSelector((state)=>state.user);


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

      <button>UPDATE PROFILE</button>

      <div className="others">
        <div className="otherCompnents">
          <MdDelete style={{fontSize:'2.5rem', color:'red', cursor:'pointer'}}/>
          <span>DELETE ACCOUNT</span>
        </div>
        <div className="otherCompnents">
          <FaSignOutAlt style={{fontSize:'2.5rem', color:'red', cursor:'pointer'}}/>
          <span>SIGN OUT</span>
        </div>
        
      </div>



    </div>
  )
}

export default Profile
