import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';



export const signUp = async(req, res, next)=>{
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try {
        await newUser.save();
        res.status(201).json({
            message: "user signed up successfully",
            newUser
        });

    } catch (error) {
        next(error);
    }
}


export const signIn = async(req, res, next)=>{
    const {email, password} = req.body;

    try {
        const validUser = await User.findOne({email});

        if(!validUser){return next(errorHandler(404, "User not found"))};

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if(!validPassword){return next(errorHandler(401, "wrong credentials"))};

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);

        const {password:pass, ...rest} = validUser._doc;

        res.cookie("access_token", token, {httpOnly: true}).send(rest).status(200);

    } catch (error) {
        console.log("he he he")
        next(error);
    }
}