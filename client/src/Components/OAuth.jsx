/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    
    const dispatch = useDispatch();

    const naviugate = useNavigate();

    const handleGoogleAuth = async ()=>{
         try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL})
            })

            const data = await res.json();

            dispatch(signInSuccess(data));

            naviugate("/");


         } catch (error) {
            console.log("could not sign in with google", error);
         }
    }


  return (
    <button onClick={handleGoogleAuth} type='button' style={{backgroundColor:'#D80032', color:'black', textTransform:'uppercase'}}>
      CONTINUE WITH GOOGLE
    </button>
  )
}

export default OAuth
