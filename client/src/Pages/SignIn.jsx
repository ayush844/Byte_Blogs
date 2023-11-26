/* eslint-disable no-unused-vars */
import React from 'react'
import './SignIn.css'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';


const SignIn = () => {
  return (
    <div style={{width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden'}}>
      <div className="signInBox">
        <h2>Sign In</h2>
        <form className="inputDiv">
          <div className="inputRow">
            <MdEmail style={{fontSize:'2rem'}}/>
            <input placeholder='Email' type="email" className="inputArea" id='email'/>
          </div>
          <div className="inputRow">
            <RiLockPasswordFill style={{fontSize:'2rem'}}/>
            <input placeholder='Password' type="password" className="inputArea" id='password'/>
          </div>

          <button>Sign In</button>
      
        </form>  

        <div className="noAccount">
          <p>Not registered yet? <Link to='/sign-up'><span>SignUp</span></Link> </p>
        </div>

      </div>
    </div>
  )
}

export default SignIn
