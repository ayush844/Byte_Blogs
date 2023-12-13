/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Following.css'
import FollowingCard from '../Components/FollowingCard'
import { useSelector } from 'react-redux';

const Following = () => {

  const {currentUser, error} = useSelector((state)=>state.user);

  const [followings, setFollowings] = useState(undefined);
  const [getFollowingSuccess, setGetFollowingSuccess] = useState(false);
  const [getFollowingError, setGetFollowingError] = useState(false);

  useEffect(()=>{
    const getUserFollowings = async()=>{
      setGetFollowingError(false);
      try {
        const res = await fetch(`/api/user/following/${currentUser._id}`,{
          method: 'GET',
        })

        const data = await res.json();


        if(data.success === false){
          setGetFollowingError(true);
          return;
        }

        setFollowings(data);

        setGetFollowingError(false);
        setGetFollowingSuccess(true);

        console.log(followings);

      } catch (error) {
        setGetFollowingSuccess(false);
        setGetFollowingError(true);
        console.log(error);
      }
    }

    getUserFollowings();
  },[getFollowingSuccess])


  return (
    <div className='followingPage'>
      <h2 className='heading'>your favourite <span style={{color: '#ED5AB3'}}>writers</span></h2>

      {getFollowingSuccess && followings.length === 0 && <div style={{width:'100vw', height:'100vh',display:'flex', alignItems:'flexStart', justifyContent:'center', flexWrap:'wrap'}}><p style={{textAlign:'center', marginTop:'3rem', fontSize:'1.6rem', color:'#ED5AB3'}}>YOU ARE NOT FOLLOWING ANYONE</p></div>}



      {
        getFollowingSuccess && followings.length > 0 && (
        <div className="followingCardBox">
        {
        followings.map(following => (
          <FollowingCard key={following._id} following={following} />
        ))
        }   
        </div>
        )
      }

      
    </div>
  )
}

export default Following
