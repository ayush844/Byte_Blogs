/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './SignIn.css'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';


const SignIn = () => {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }



  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {
    
      setError(null);
      setLoading(true);

      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();

      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }

      console.log(data);

      setError(null);
      setLoading(false);

      navigate('/sign-in');

    } catch (error) {
      console.log("hello");
      setError(error.message);
      setLoading(false);

    }



  }


  return (
    <div style={{width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden'}}>
      <div className="signInBox">
        <h2>Sign Up</h2>
        <form className="inputDiv">
          <div className="inputRow">
            <FaUserCircle style={{fontSize:'2rem'}}/>
            <input placeholder='name' type="text" className="inputArea" id='username' onChange={handleChange}/>
          </div>
          <div className="inputRow">
            <MdEmail style={{fontSize:'2rem'}}/>
            <input placeholder='Email' type="email" className="inputArea" id='email' onChange={handleChange}/>
          </div>
          <div className="inputRow">
            <RiLockPasswordFill style={{fontSize:'2rem'}}/>
            <input placeholder='Password' type="password" className="inputArea" id='password' onChange={handleChange}/>
          </div>

          <button disabled={loading} type='submit' onClick={handleSubmit}>{loading ? "Loading..." : "Sign Up"}</button>
      
        </form>  

        <div className="noAccount">
          <p>Already have an account ? <Link to='/sign-in'><span>SignIn</span></Link> </p>
        </div>

        {error && <p style={{color:'red', fontSize:'1rem', display:'flex', flexWrap:'wrap', whiteSpace:'wrap'}}>{error}</p>}

      </div>
    </div>
  )
}

export default SignIn
