import React, { useEffect, useState } from 'react'
import './BlogPage.css'
import { useParams } from 'react-router-dom'
import { FaPenNib } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";



import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogFailure, fetchBlogStart, fetchBlogSuccess, likeBlogFailure, likeBlogStart, likeBlogSuccess } from '../redux/blog/blogSlice';
import { bookmarkBlogFailure, bookmarkBlogStart, bookmarkBlogSuccess } from '../redux/user/userSlice';

const BlogPage = () => {

  const params = useParams();

  const dispatch = useDispatch();

  const {currentUser, bookmarks} = useSelector((state)=>state.user);

  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(false);

  const [author, setAuthor] = useState(null);

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);


  const {currentBlog, likes} = useSelector((state)=>state.blog);

  // console.log(error);

  // console.log(isLiked);

  console.log(currentBlog);
  console.log(likes);
  console.log(bookmarks);

  useEffect(()=>{
    const fetchBlog = async () => {
      try {
        dispatch(fetchBlogStart());
        setLoading(true);
        const res = await fetch(`/api/blog/getBlog/${params.id}`,{
          method: 'GET',
        })
        const data = await res.json();
  
        if(data.success === false) {
          setError(true);
          console.log("hello1");
          setLoading(false);
          dispatch(fetchBlogFailure(data.message));
          return;
        }
  
        dispatch(fetchBlogSuccess(data));
        setBlog(data);
        setLoading(false);
        setError(false);

      } catch (error) {
        setError(true);
        console.log("hello2");
        setLoading(false);
        dispatch(fetchBlogFailure(error.message));
      }

    }



    fetchBlog();
    
  },[params.id])



  useEffect(() => {
    const getAuthor = async () => {
      try {
        setLoading(true);
  
        if (blog) { // Check if blog is available before making the request
          const res = await fetch(`/api/user/getAuthor/${blog.userRef}`, {
            method: 'GET',
          });
  
          const data = await res.json();
  
          if (data.success === false) {
            setError(true);
            console.log("hello3");
            setLoading(false);
            return;
          }
  
          setAuthor(data);
          setLoading(false);
          setError(false);

          const liked = likes.includes(currentUser._id)
          setIsLiked(liked);

          if(currentUser && bookmarks){
            const bookmarked = bookmarks.includes(blog._id);
            console.log(bookmarked);
            setIsBookmarked(bookmarked);
          }

  


        }
      } catch (error) {
        setError(true);
        console.log(error);
        console.log("hello4");
        setLoading(false);
      }
    };
  
    
    getAuthor();
    

  }, [blog]);





  const toggleIsLiked = async ()=>{
    
    try {
      if(blog){
        dispatch(likeBlogStart());
        const res = await fetch(`/api/blog/like/${blog._id}`,{
          method:'POST'
        })

        const data = await res.json();

        if(data.success == false){          
          dispatch(likeBlogFailure(data.message));
          return;
        } 
        
        setIsLiked((prevIsLiked) => !prevIsLiked);
        dispatch(likeBlogSuccess(data));
      }

    } catch (error) {
      console.log(error);
      dispatch(likeBlogFailure(error.message));
    }
  }


  const toggelIsBookmarked = async()=>{
    try {
      if(blog && currentUser && bookmarks){
        dispatch(bookmarkBlogStart());
        const res = await fetch(`/api/user/save/${blog._id}`,{
          method: 'POST'
        })
        const data = await res.json();
        if(data.success == false){
          dispatch(bookmarkBlogFailure(data.message));
          return;
        }
        setIsBookmarked(!isBookmarked);
        dispatch(bookmarkBlogSuccess(data));
      } 
    } catch (error) {
      console.log(error);
      dispatch(bookmarkBlogFailure(error.message));
    }
  }

  


  return (

    <main style={{padding: '0', }}>

      {loading && <div style={{width:'100vw', height:'100vh',display:'flex', alignItems:'flexStart', justifyContent:'center'}}><p style={{textAlign:'center', marginTop:'3rem', fontSize:'2rem', color:'#ED5AB3'}}>LOADING...</p></div>}


      {blog && author && (
        <div className='blogPage'>
          <h2>{blog.title}</h2>
          <div className='blogCategory'><p>{blog.category}</p></div>
          <div className="blogCover">
            <img src={blog.cover} alt="" />
          </div>
          <div className="blogBody"  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.blogBody) }}>
          </div>
          <div className="blogAuthor">
            <FaPenNib style={{color:'white', fontSize:'1.9rem'}}/>
            <p>by <span style={{color:'#ED5AB3', cursor:'pointer'}}>{author.username}</span></p>
          </div>
          <div className="blogOptions" style={{paddingBottom:'4rem'}}>

            {currentUser && (
            <>
            {isLiked ? (<FaHeart onClick={toggleIsLiked} style={{fontSize:'1.7rem', cursor:'pointer', color:'red'}} />) : (<FaRegHeart onClick={toggleIsLiked} style={{fontSize:'1.7rem', cursor:'pointer', color:'red'}} />)}
            
            {isBookmarked ? (<FaBookmark onClick={toggelIsBookmarked} style={{fontSize:'1.7rem', cursor:'pointer', color:'#00A9FF'}} />) : (<FaRegBookmark onClick={toggelIsBookmarked} style={{fontSize:'1.7rem', cursor:'pointer', color:'#00A9FF'}} />)}
            </>
            )
            }


            
          </div>
        </div>
      )}
    </main>





  )
}

export default BlogPage