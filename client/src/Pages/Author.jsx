import React, { useEffect, useState } from 'react'
import './Author.css'
import { useParams } from 'react-router-dom'

import BlogCardAuthor from '../Components/BlogCardAuthor.jsx';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSelector } from 'react-redux';



const Author = () => {

    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [author, setAuthor] = useState(null);
    const [error, setError] = useState(false);

    const [authorBlogError, setAuthorBlogError] = useState(false);
    const [authorBlogSuccess, setAuthorBlogSuccess] = useState(false);
    const [authorBlog, setAuthorBlog] = useState(undefined);

    const [isFollowingAuthor, setIsFollowingAuthor] = useState(false);

    const {currentUser} = useSelector((state)=>state.user);


    console.log(loading);
    console.log(error);

    author && console.log(author);
    
    console.log(authorBlog);

    console.log(isFollowingAuthor);

    useEffect(()=>{
        const fetchAuthor = async()=>{
            try {
                setLoading(true);
                const res = await fetch(`/api/user/getAuthor/${params.id}`,{
                    method: 'GET',
                  });

                const data = await res.json();

                if(data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                setAuthor(data);
                setLoading(false);
                setError(false);

                const isFollowing = currentUser.following.includes(params.id);
                setIsFollowingAuthor(isFollowing);

            } catch (error) {

                setError(true);
                setLoading(false);

            }
        }

        fetchAuthor();
    },[params.id])

    useEffect(()=>{
        const getAuthorsBlog = async()=>{
          setAuthorBlogError(false);
          try {
            const res = await fetch(`/api/user/getBlogs/${params.id}`,{
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

    },[author]);
    

    const sameUser = currentUser._id === params.id;


    const handleFollowUnfollow = async () => {
    
      await fetch(`/api/user/follow/${author._id}`,{
        method: 'POST',
      })

      setIsFollowingAuthor(!isFollowingAuthor);
    }

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


    
  return (
    <main style={{padding: '0'}}>
    {loading && <div style={{width:'100vw', height:'100vh',display:'flex', alignItems:'flexStart', justifyContent:'center'}}><p style={{textAlign:'center', marginTop:'3rem', fontSize:'2rem', color:'#ED5AB3'}}>LOADING...</p></div>}

    {error && <div style={{width:'100vw', height:'100vh',display:'flex', alignItems:'flexStart', justifyContent:'center'}}><p style={{textAlign:'center', marginTop:'3rem', fontSize:'2rem', color:'red'}}>SOMETHING WENT WRONG !</p></div>}

    
    {
        author && authorBlogSuccess && 
      <div className='profilePage'>        

        <div className="userInfo">
          <img src={author.avatar} alt="profile-pic" />
          <h2>{author.username}</h2>
        </div>

        { !(sameUser) && (
          <button className='followUnfollowBtn' onClick={handleFollowUnfollow}>{isFollowingAuthor ? "Unfollow":"Follow"}</button>
        )}
  
        <div className="follows">
          <div className="following">
            <h4>FOLLOWING</h4>
            <h3>{author.following.length}</h3>
          </div>
          <div className="following">
            <h4>FOLLOWERS</h4>
            <h3>{author.followers.length}</h3>
          </div>
        </div>
  
        {authorBlogSuccess && (
          <div className="articles">
            <h4>articles published: <span>{authorBlog.length}</span></h4>
          </div>
        )}
  
  
        {authorBlogSuccess && authorBlog.length > 0 && 
          <div className="personalBlogs" style={{width:'80%'}}>
            <Carousel responsive={responsive}>
            {authorBlog.map(blog => (
              <BlogCardAuthor key={blog._id} blog={blog} />
            ))}
            </Carousel>
          </div>
        }
  
  
        <p style={{fontSize:'1.2rem', fontWeight:'bold', color:'red'}}>{error ? error : ""}</p>
  
      </div> 
    }


    </main>
  )
}

export default Author