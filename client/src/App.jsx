/* eslint-disable no-unused-vars */
import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import Sidebar from './Components/Sidebar';
import Explore from './Pages/Explore';
import Bookmarks from './Pages/Bookmarks';
import Following from './Pages/Following';

const App = () => {
  return (
    <BrowserRouter>
    <Sidebar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/bookmarks' element={<Bookmarks />} />
        <Route path='/following' element={<Following />} />
      </Routes>
    </Sidebar>
    </BrowserRouter>
  )
}

export default App
