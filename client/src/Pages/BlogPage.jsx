import React, { useEffect, useState } from 'react'
import './BlogPage.css'
import { useParams } from 'react-router-dom'
import { FaPenNib } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";



import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';

const BlogPage = () => {

  const params = useParams();

  const {currentUser} = useSelector((state)=>state.user);

  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(false);

  const [author, setAuthor] = useState(null);

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);


  console.log(error);

  console.log(isLiked);

  useEffect(()=>{
    const fetchBlog = async () => {
      try {

        setLoading(true);
        const res = await fetch(`/api/blog/getBlog/${params.id}`,{
          method: 'GET',
        })
        const data = await res.json();
  
        if(data.success === false) {
          setError(true);
          console.log("hello1");
          setLoading(false);
          return;
        }
  
        setBlog(data);
        setLoading(false);
        setError(false);

        const liked = blog.likes.includes(currentUser._id)
        setIsLiked(liked);


        if(currentUser.bookmarks.includes(blog._id)){
          setIsBookmarked(true);
        }



      } catch (error) {
        setError(true);
        console.log("hello2");
        setLoading(false);
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




        }
      } catch (error) {
        setError(true);
        console.log("hello4");
        setLoading(false);
      }
    };
  
    
    getAuthor();
    

  }, [blog]);





  const toggleIsLiked = async (e)=>{
    e.preventDefault();
    try {
      if(blog){
        await fetch(`/api/blog/like/${blog._id}`,{
          method:'POST'
        })
        setIsLiked((prevIsLiked) => !prevIsLiked);
      }

    } catch (error) {
      console.log(error);
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
            {isLiked ? <FaHeart onClick={toggleIsLiked} style={{fontSize:'1.7rem', cursor:'pointer', color:'red'}} /> : <FaRegHeart onClick={toggleIsLiked} style={{fontSize:'1.7rem', cursor:'pointer', color:'red'}} />}
            
            <FaRegBookmark  style={{fontSize:'1.7rem', cursor:'pointer', color:'#00A9FF'}} />
          </div>
        </div>
      )}
    </main>





  )
}

export default BlogPage