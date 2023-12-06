import React from 'react'
import './BlogCardAuthor.css'
import { Link } from 'react-router-dom'

const BlogCardAuthor = ({blog}) => {
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
        </div>          
    </div>
</Link>
  )
}

export default BlogCardAuthor