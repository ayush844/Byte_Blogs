import express from "express";
import { google, signIn, signOut, signUp } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();


router.post("/sign-up", signUp);

router.post("/sign-in", signIn);

router.post("/google", google);

router.post("/sign-out",verifyToken, signOut);


export default router;