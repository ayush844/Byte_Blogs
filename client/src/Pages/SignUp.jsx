/* eslint-disable no-unused-vars */
import React from 'react'
import './SignIn.css'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';


const SignIn = () => {
  return (
    <div style={{width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden'}}>
      <div className="signInBox">
        <h2>Sign Up</h2>
        <form className="inputDiv">
          <div className="inputRow">
            <FaUserCircle style={{fontSize:'2rem'}}/>
            <input placeholder='name' type="text" className="inputArea" id='username'/>
          </div>
          <div className="inputRow">
            <MdEmail style={{fontSize:'2rem'}}/>
            <input placeholder='Email' type="email" className="inputArea" id='email'/>
          </div>
          <div className="inputRow">
            <RiLockPasswordFill style={{fontSize:'2rem'}}/>
            <input placeholder='Password' type="password" className="inputArea" id='password'/>
          </div>

          <button>Sign Up</button>
      
        </form>  

        <div className="noAccount">
          <p>Already have an account ? <Link to='/sign-in'><span>SignIn</span></Link> </p>
        </div>

      </div>
    </div>
  )
}

export default SignIn
