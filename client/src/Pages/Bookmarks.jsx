/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Bookmarks.css'
import { useSelector } from 'react-redux'
import BlogCardAuthor from '../Components/BlogCardAuthor';

const Bookmarks = () => {

  const {currentUser, error} = useSelector((state)=>state.user);

  const [bookmarkedBlogs, setBookmarkedBlogs] = useState(undefined);
  const [getBookmarkedBlogSuccess, setGetBookmarkedBlogSuccess] = useState(false);
  const [getBookmarkedBlogError, setGetBookmarkedBlogError] = useState(false);

  useEffect(()=>{
    const getUserBookmarks = async() =>{
      try {
        const res = await fetch(`/api/user/getBookmarks`,{
          method:'GET',
        });
        const data = await res.json();
        if(data.success === false){
          setGetBookmarkedBlogError(true);
          return;
        }

        setBookmarkedBlogs(data);

        setGetBookmarkedBlogError(false);
        setGetBookmarkedBlogSuccess(true);

        console.log(bookmarkedBlogs);

      } catch (error) {
        setGetBookmarkedBlogError(true);
        setGetBookmarkedBlogSuccess(false);
        console.log(error); 
      }
    }

    getUserBookmarks();
  }, [getBookmarkedBlogSuccess]);

  return (
    <div className='followingPage'>
    <h2 className='heading'>your favourite <span style={{color: '#ED5AB3'}}>blogs</span></h2>

    {getBookmarkedBlogSuccess && bookmarkedBlogs.length === 0 && <div style={{width:'100vw', height:'100vh',display:'flex', alignItems:'flexStart', justifyContent:'center', flexWrap:'wrap'}}><p style={{textAlign:'center', marginTop:'3rem', fontSize:'1.6rem', color:'#ED5AB3'}}>YOU HAVE NO BOOKMARKS</p></div>}



    {
      getBookmarkedBlogSuccess && bookmarkedBlogs.length > 0 && (
      <div className="followingCardBox">
      {
      bookmarkedBlogs.map(blog => (
        <BlogCardAuthor key={blog._id} blog={blog} />
      ))
      }   
      </div>
      )
    }

    
  </div>
  )
}

export default Bookmarks
