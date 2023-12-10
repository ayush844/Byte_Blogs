import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js"
import User from "../models/user.model.js";
import Blog from "../models/blog.model.js";

export const test = (req, res)=>{
    res.json({
        message: "hello ji"
    })
}

export const updateUserInfo = async(req, res, next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(403, "you can only update your account"));

    try {
        if(req.body.password){
            req.body.password = await bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, {new: true});

        const {password, ...rest} = updatedUser._doc;

        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
}


export const deleteUser = async(req, res, next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(403, "you can only delete your own account"));

    try {

        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json("User has been deleted successfully");

    } catch (error) {
        next(error);
    }
}


export const getUserBlog = async(req, res, next)=>{
    try {
        const blogs = await Blog.find({userRef: req.params.id});
        res.status(200).json(blogs);
    } catch (error) {
        next(error);
    }
}


export const followUnfollowUser = async(req, res, next)=>{


    if(req.user.id === req.params.id) return next(errorHandler(403, "you can not follow your own account"));

    try {

        const currentUser = await User.findById(req.user.id);

        const userToFollowUnfollow = await User.findById(req.params.id);

        if(!userToFollowUnfollow){
            return next(errorHandler(403, "user account not found"));
        }

        const isFollowing = currentUser.following.includes(req.params.id);

        if(isFollowing){
            await User.findByIdAndUpdate(currentUser._id, {$pull: {following: userToFollowUnfollow._id}});
            await User.findByIdAndUpdate(userToFollowUnfollow._id, {$pull: {followers: currentUser._id}});
            return res.status(200).json({message: "user unfollowed successfully"});
        }else{
            await User.findByIdAndUpdate(currentUser._id, {$addToSet: {following: userToFollowUnfollow._id}});
            await User.findByIdAndUpdate(userToFollowUnfollow._id, {$addToSet: {followers: currentUser._id}});
            return res.status(200).json({message: "user followed successfully"});
        }

    } catch (error) {
        next(error);
    }
}


export const getFollowings = async(req, res, next) => {

    const currentUser = await User.findById(req.params.id);

    try {
        const updatedCurrentUser = await currentUser.populate('following', "_id username email avatar");

        res.status(200).json(updatedCurrentUser.following);

    } catch (error) {
        next(error);
    }
    
}