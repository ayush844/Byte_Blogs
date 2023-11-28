/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './UpdateProfile.css'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice.js'


const UpdateProfile = () => {
  const {currentUser, loading, error} = useSelector((state)=>state.user);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const [formData, setFormData] = useState({});

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const fileRef = useRef(null);

  const dispatch = useDispatch()

  useEffect(()=>{
    if(file){
        handleFileUpload(file);
    }
  }, [file]);

  console.log(formData);


  const handleFileUpload = ()=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
        (snapshot)=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePerc(Math.round(progress));
        },
    (error)=>{
        setFileUploadError(true);
    },
    ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setFormData({...formData, avatar: downloadURL});
        })
    })
  }




  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {

      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/JSON',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if(data.success == false){
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);


      
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }



  }


  return (
    <div className='updateProfilePage'>

        <h1>UPDATE YOUR PROFILE</h1>

        <form onSubmit={handleSubmit}>

        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile-pic" />

        <p>{fileUploadError ? <span style={{fontSize:'1.1rem', fontWeight:'bold', color:'red'}}>Error in uploading image (image must be leass than 5mb)</span> : filePerc>0 && filePerc<100 ?(<span style={{fontSize:'1.1rem', fontWeight:'bold', color:'green'}}>{`uploading ${filePerc}%`}</span>) : filePerc===100 ? (<span style={{fontSize:'1.1rem', fontWeight:'bold', color:'green'}}>successfully uploaded image</span>) : ""}</p>

        <input type="text" id='username' onChange={handleChange} defaultValue={currentUser.username} className='inputArea' placeholder='username'/>

        <input type="email" id='email' onChange={handleChange} defaultValue={currentUser.email} className='inputArea' placeholder='email'/>

        <input type="password" id='password' onChange={handleChange} className='inputArea' placeholder='password'/>

        <button disabled={loading} type='submit'>{loading ? "LOADING..." : 'UPDATE'}</button>

        <p style={{fontSize:'1.2rem', fontWeight:'bold', color:'red'}}>{error ? error : ""}</p>

        <p style={{fontSize:'1.2rem', fontWeight:'bold', color:'green'}}>{updateSuccess ? "User is updated successfully": ""}</p>

        </form>

      
        
    </div>

  )
}

export default UpdateProfile
