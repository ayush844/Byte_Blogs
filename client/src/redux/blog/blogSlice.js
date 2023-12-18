/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentBlog: null,
  error: null,
  loading: false,
  likes: null
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    fetchBlogStart: (state)=>{
        state.loading = true;
    },
    fetchBlogSuccess: (state, action)=>{
        state.loading=false;
        state.currentBlog = action.payload;
        state.likes = action.payload.likes;
        state.error=null;
    },
    fetchBlogFailure: (state, action)=>{
        state.loading=false;
        state.error=action.payload;
        state.currentBlog=null;
        state.likes = null;
    },  
    likeBlogStart: (state)=>{
        state.loading = true;
    },
    likeBlogSuccess: (state, action)=>{
        state.loading=false;
        state.currentBlog = action.payload;
        state.likes = action.payload.likes;
        state.error=null;
    },
    likeBlogFailure: (state, action)=>{
        state.loading=false;
        state.error=action.payload;
        state.currentBlog=null;
        state.likes = null;
    },
  },
})


export const {fetchBlogStart, fetchBlogSuccess, fetchBlogFailure, likeBlogStart, likeBlogSuccess, likeBlogFailure} = blogSlice.actions

export default blogSlice.reducer