import express from "express";
import { deleteUser, followUnfollowUser, getAuthor, getBookmark, getFollowings, getUserBlog, saveUnsaveBlog, test, updateUserInfo } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();


router.get("/test", test);

router.post('/update/:id',verifyToken, updateUserInfo);

router.delete('/delete/:id',verifyToken, deleteUser);

router.get("/getBlogs/:id", getUserBlog);

router.post("/follow/:id", verifyToken, followUnfollowUser);

router.get("/following/:id", verifyToken, getFollowings);

router.get("/getAuthor/:id", getAuthor);
 
router.post("/save/:id", verifyToken, saveUnsaveBlog);

router.get('/getBookmarks', verifyToken, getBookmark);

export default router;