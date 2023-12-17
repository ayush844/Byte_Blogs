/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  following: null
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
        state.error=null;
    },
    signInFailure: (state, action)=>{
        state.loading=false;
        state.error=action.payload;
        state.currentUser=null;
        state.following = null;
    },
    updateUserStart: (state)=>{
        state.loading = true;
    },
    updateUserSuccess: (state, action)=>{
        state.loading=false;
        state.currentUser = action.payload;
        state.following = action.payload.following;
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

  },
})


export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserSuccess, signOutUserFailure, followUserStart, followUserSuccess, followUserFailure } = userSlice.actions

export default userSlice.reducer