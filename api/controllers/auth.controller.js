import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";


export const signUp = async(req, res)=>{
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
        res.status(500).json(error.message);
    }
}