/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Sidebar from "./Components/Sidebar";
import Explore from "./Pages/Explore";
import Bookmarks from "./Pages/Bookmarks";
import Following from "./Pages/Following";
import PrivateRoute from "./Components/PrivateRoute";
import UpdateProfile from "./Pages/UpdateProfile";
import CreateBlog from "./Pages/CreateBlog";
import Author from "./Pages/Author";
import BlogPage from "./Pages/BlogPage";
import UpdateBlog from "./Pages/UpdateBlog";
import Error from "./Pages/Error";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/author/:id" element={<Author />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/createBlog" element={<CreateBlog />} />
            <Route path="/updateBlog/:id" element={<UpdateBlog />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/following" element={<Following />} />
          </Route>
          <Route path="/search" element={<Explore />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
