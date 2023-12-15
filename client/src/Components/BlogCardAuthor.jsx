import React, { useEffect, useState } from 'react'
import './BlogCardAuthor.css'
import { Link } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa";


const BlogCardAuthor = ({blog}) => {

  const [isLiked, setIsLiked] = useState(false);

  const {currentUser, error} = useSelector((state)=>state.user);

  console.log(isLiked);

  useEffect(()=>{
    const getLikes = async()=>{
      try {
        const res = await fetch(`/api/blog/getLikes/${blog._id}`,{
          method: 'GET',
        })

        const data = await res.json();

        if(data.success === false){
          return;
        }
        setIsLiked(data.includes(currentUser._id));

      } catch (error) {
        console.log(error);
      }
    }

    getLikes();
  }, [])

  return (
<Link to={`/blog/${blog._id}`} style={{textDecoration:'none'}}>
    <div className='card' style={{backgroundColor:'#141E46'}}>
        <img src={blog.cover} alt="listing_pic" />
        <div className="details">
            <h2 id='name'>{blog.title}</h2>
            <div className="category">
              <p>{blog.category}</p>
            </div>
            <div className="summary">
              <p>{blog.summary}</p>  
            </div> 
            <div className="likesAndBookMarks" style={{display:'flex',flexDirection:'row', alignItems:'center', gap:'2rem'}}>
              <div className="likes" style={{display:'flex',flexDirection:'row', alignItems:'center', gap:'0.3rem'}}>
                {isLiked ? <FaHeart style={{fontSize:'1.3rem', color:'red'}}/> : <CiHeart style={{fontSize:'1.7rem', color:'red'}}/>}
                <p style={{fontSize:'1.3rem', fontWeight:'bold'}}>{blog.likes.length} Like{blog.likes.length > 1 && "s"}</p>
              </div>
            </div>   
        </div>          
    </div>
</Link>
  )
}

export default BlogCardAuthor