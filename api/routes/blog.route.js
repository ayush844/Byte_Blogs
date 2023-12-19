import express from "express";
import { createBlog, deleteBlog, getBlog, getLikes, likeDislikeBlog, updateBlog } from "../controllers/blog.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();


router.post('/create', verifyToken, createBlog);

router.delete('/delete/:id', verifyToken, deleteBlog);

router.post('/update/:id', verifyToken, updateBlog);

router.post('/like/:id', verifyToken, likeDislikeBlog);

router.get('/getLikes/:id', getLikes);

router.get('/getBlog/:id', getBlog);



export default router;