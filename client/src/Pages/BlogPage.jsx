import React, { useEffect, useState } from 'react'
import './BlogPage.css'
import { useParams } from 'react-router-dom'
import { FaPenNib } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";


import DOMPurify from 'dompurify';

const BlogPage = () => {

  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(false);

  const [author, setAuthor] = useState(null);

  console.log(blog);
  console.log(author);

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
          setLoading(false);
          return;
        }
  
        setBlog(data);
        setLoading(false);
        setError(false);

      } catch (error) {
        setError(true);
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
            setLoading(false);
            return;
          }
  
          setAuthor(data);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
  
    getAuthor();
  }, [blog]);




  


  return (

    <main style={{padding: '0', }}>
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
            <FaRegHeart  style={{fontSize:'1.7rem', cursor:'pointer', color:'red'}} />
            <FaRegBookmark  style={{fontSize:'1.7rem', cursor:'pointer', color:'#00A9FF'}} />
          </div>
        </div>
      )}
    </main>





  )
}

export default BlogPage