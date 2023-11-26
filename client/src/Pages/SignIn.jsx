/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './SignIn.css'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';


const SignIn = () => {

  const [formData, setFormData] = useState({});
  const {error, loading} = useSelector((state)=>state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }


  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {
    
      dispatch(signInStart());

      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();

      if(data.success === false){
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));

      navigate('/');

    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }



  return (
    <div style={{width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden'}}>
      <div className="signInBox">
        <h2>Sign In</h2>
        <form className="inputDiv" >
          <div className="inputRow">
            <MdEmail style={{fontSize:'2rem'}}/>
            <input placeholder='Email' type="email" className="inputArea" id='email' onChange={handleChange}/>
          </div>
          <div className="inputRow">
            <RiLockPasswordFill style={{fontSize:'2rem'}}/>
            <input placeholder='Password' type="password" className="inputArea" id='password' onChange={handleChange}/>
          </div>

          <button disabled={loading} type='submit' onClick={handleSubmit}>{loading ? "Loading..." : "Sign In"}</button>
        </form>  

        <div className="noAccount">
          <p>Not registered yet? <Link to='/sign-up'><span>SignUp</span></Link> </p>
        </div>

        {error && <p style={{color:'red', fontSize:'1rem', display:'flex', flexWrap:'wrap', whiteSpace:'wrap'}}>{error}</p>}


      </div>
    </div>
  )
}

export default SignIn
