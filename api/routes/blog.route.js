import express from "express";
import { createBlog } from "../controllers/blog.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();


router.post('/create', verifyToken, createBlog);


export default router;