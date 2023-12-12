import React from 'react'
import './Author.css'
import { useParams } from 'react-router-dom'


const Author = () => {
    const params = useParams();
  return (
    <div>{params.id}</div>
  )
}

export default Author