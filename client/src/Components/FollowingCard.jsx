import React from 'react'
import './FollowingCard.css'
import { MdOutlineEmail } from "react-icons/md";

const FollowingCard = ({following}) => {
  return (
    <div className="authorCard">
        <div className="content">
            <div className="imgBox"><img src={following.avatar} alt='author image'/></div>
            <div className="contentBox">
                <h3><span style={{color: '#ED5AB3'}}>@</span>{following.username}</h3>
                <p><MdOutlineEmail style={{color: '#ED5AB3', marginRight: '3px'}} /> {following.email}</p>
            </div>
        </div>

        <div className="button">
            <button>VIEW PROFILE</button>
        </div>
        
    </div>
  )
}

export default FollowingCard