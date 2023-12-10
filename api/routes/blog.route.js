import express from "express";
import { createBlog, deleteBlog } from "../controllers/blog.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();


router.post('/create', verifyToken, createBlog);

router.delete('/delete/:id', verifyToken, deleteBlog);


export default router;