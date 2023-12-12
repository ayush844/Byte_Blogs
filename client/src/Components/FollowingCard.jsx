import React from 'react'
import './FollowingCard.css'
import { MdOutlineEmail } from "react-icons/md";
import { Link } from 'react-router-dom';

const FollowingCard = ({following}) => {
  return (
    <div className="authorCard">
        <div className="content">
            <div className="imgBox" style={{width:'100%', height:'20rem'}}><img src={following.avatar} alt='author image'/></div>
            <div className="contentBox">
                <h3><span style={{color: '#ED5AB3'}}>@</span>{following.username}</h3>
                <p><MdOutlineEmail style={{color: '#ED5AB3', marginRight: '3px'}} /> {following.email}</p>
            </div>
        </div>

        <div className="button">
            <Link to={`/author/${following._id}`} style={{textDecoration:'none'}}><button>VIEW PROFILE</button></Link>
        </div>
        
    </div>
  )
}

export default FollowingCard