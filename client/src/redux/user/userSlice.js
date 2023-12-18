/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  following: null,
  bookmarks: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state)=>{
        state.loading = true;
    },
    signInSuccess: (state, action)=>{
        state.loading=false;
        state.currentUser = action.payload;
        state.following = action.payload.following;
        state.bookmarks = action.payload.bookmarks;
        state.error=null;
    },
    signInFailure: (state, action)=>{
        state.loading=false;
        state.error=action.payload;
        state.currentUser=null;
        state.following = null;
        state.bookmarks = null;
    },
    updateUserStart: (state)=>{
        state.loading = true;
    },
    updateUserSuccess: (state, action)=>{
        state.loading=false;
        state.currentUser = action.payload;
        state.following = action.payload.following;
        state.bookmarks = action.payload.bookmarks;
        state.error=null;
    },
    updateUserFailure: (state, action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    deleteUserStart: (state)=>{
        state.loading = true;
    },
    deleteUserSuccess: (state, action)=>{
        state.loading=false;
        state.currentUser = null;
        state.following = null;
        state.bookmarks = null;
        state.error=null;
    },
    deleteUserFailure: (state, action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    signOutUserStart: (state)=>{
        state.loading = true;
    },
    signOutUserSuccess: (state, action)=>{
        state.loading=false;
        state.currentUser = null;
        state.following = null;
        state.bookmarks = null;
        state.error=null;
    },
    signOutUserFailure: (state, action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    followUserStart: (state)=>{
        state.loading = true;
    },
    followUserSuccess: (state, action)=>{
        state.loading=false;
        state.following = action.payload;
        state.error=null;
    },
    followUserFailure: (state, action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    bookmarkBlogStart: (state)=>{
        state.loading = true;
    },
    bookmarkBlogSuccess: (state, action)=>{
        state.loading=false;
        state.following = action.payload;
        state.bookmarks = action.payload;
        state.error=null;
    },
    bookmarkBlogFailure: (state, action)=>{
        state.loading=false;
        state.error=action.payload;
    },

  },
})


export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserSuccess, signOutUserFailure, followUserStart, followUserSuccess, followUserFailure, bookmarkBlogStart, bookmarkBlogSuccess, bookmarkBlogFailure } = userSlice.actions

export default userSlice.reducer