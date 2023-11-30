/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {AnimatePresence, motion} from 'framer-motion'
import './Sidebar.css'

import { FaHome } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import { SiWpexplorer } from "react-icons/si";
import { FaBookmark } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import { FaSignInAlt } from "react-icons/fa";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaFeather } from "react-icons/fa";


import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import {useSelector} from 'react-redux'
import { useEffect } from 'react';



const routes = [
    {
        path: "/",
        name: "Home",
        icon: <FaHome  style={{fontSize:'1.75rem'}}/>
    },
    {
        path: "/about",
        name: "About",
        icon: <IoInformationCircleSharp style={{fontSize:'1.75rem'}} />
    },
    {
        path: "/explore",
        name: "Explore",
        icon: <SiWpexplorer style={{fontSize:'1.75rem'}}/>
    },
    {
        path: "/sign-in",
        name: "Sign In",
        icon: <FaSignInAlt style={{fontSize:'1.75rem'}}/>
    }
]


let loggedInRoutes = [
    {
        path: "/createBlog",
        name: "Write",
        icon: <FaFeather style={{fontSize:'1.75rem'}}/>
    },
    {
        path: "/bookmarks",
        name: "Bookmarks",
        icon: <FaBookmark  style={{fontSize:'1.75rem'}}/>
    },
    {
        path: "/following",
        name: "Following",
        icon: <RiUserFollowFill style={{fontSize:'1.75rem'}} />
    },
        {
        path: "/profile",
        name: "Profile",
        icon: <FaRegUserCircle style={{fontSize:'1.75rem'}} />
    },

]


const Sidebar = ({children}) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = ()=>setIsOpen(!isOpen);

    const {currentUser} = useSelector((state)=>state.user);

    let updatedRoutes = Array.from(routes);

    if(currentUser){
        updatedRoutes.pop();
        updatedRoutes = [...updatedRoutes, ...loggedInRoutes];
    }

    const inputAnimation = {
        hidden:{
            width: 0,
            padding: 0,
            opacity:0,
            transition: {
                duration: 0.2
            }
        },
        show:{
            width: "100%",
            padding: "13px 18px",
            opacity:1,
            transition: {
                duration: 0.2
            }
        }
    }

    const showAnimation = {
        hidden:{
            width: 0,
            opacity:0,
            transition: {
                duration: 0.5
            }
        },
        show:{
            width: "auto",
            opacity:1,
            transition: {
                duration: 0.2
            }
        }
    }

  return (
    
    <div className="main-container">
        <motion.div animate={{width: isOpen ? "21.875rem" : "3.75rem", transition:{duration:0.5, type: 'spring', damping:11}}} className='sidebar'>
            <div className="top_section">
                {isOpen && <Link to="/"><motion.h1 variants={showAnimation} initial="hidden" animate="show" exit="hidden"  className='logo' onClick={toggle}>Byte Blogs</motion.h1></Link>}
                <div className="bars">
                    <HiMiniBars3CenterLeft style={{fontSize:'2.5rem', cursor:'pointer'}} onClick={toggle} />
                </div>
            </div>
            <div className="searchSection">
                <div className="search_icon">
                    <FaSearch style={{fontSize:'1.75rem', cursor:'pointer'}} onClick={!isOpen ? toggle : null}/>
                </div>
                <AnimatePresence>
                    {isOpen && <motion.input initial='hidden' animate='show' exit='hidden' variants={inputAnimation} placeholder='Search' />}
                </AnimatePresence>
            </div>
            <section className='routes'>
                {
                    updatedRoutes.map((route)=>(
                        <NavLink activeClassName="active" to={route.path} key={route.name} className="navOptions" >
                            <div className="icons">
                                {route.icon}
                            </div>
                            <AnimatePresence>
                                {isOpen && 
                                    <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="link_text">
                                        {route.name}
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </NavLink>
                    ))
                }
            </section>
            
        </motion.div>
        <main className='main_children'  onClick={isOpen ? toggle : null}>{children}</main>

    </div>
  )
}

export default Sidebar
