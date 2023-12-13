import Blog from "../models/blog.model.js"
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createBlog = async (req, res, next)=>{ 
    try {
        const blog = await Blog.create(req.body);
        return res.status(201).json(blog);        
    } catch (error) {
        next(error);
    }
}


export const deleteBlog = async (req, res, next)=>{
    const blog = await Blog.findById(req.params.id);

    if(!blog){
        return next(errorHandler(404, "Blog not found"));
    }

    if(blog.userRef !== req.user.id){
        return next(errorHandler(401, "you can only delete your own blog"));
    }

    try {
        await Blog.findByIdAndDelete(req.params.id);
        return res.status(200).json("listing is deleted successfully");
    } catch (error) {
        next(error);
    } 
}


export const updateBlog = async (req, res, next)=>{ 

    const blog = await Blog.findById(req.params.id);

    if(!blog){
        return next(errorHandler(404, "blog not found"));
    }

    if(blog.userRef !== req.user.id){
        return next(errorHandler(401, "you can only delete your own blog"));
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedBlog);       
    } catch (error) {
        next(error);
    }
}


export const likeDislikeBlog = async(req, res, next)=>{

    try {

        const currentUser = await User.findById(req.user.id);

        const blog = await Blog.findById(req.params.id);

        if(!blog){
            return next(errorHandler(403, "blog not found"));
        }

        const isLiked = blog.likes.includes(currentUser._id);

        if(isLiked) {
            await Blog.findByIdAndUpdate(blog._id, {$pull: {likes: currentUser._id}});
            return res.status(200).json({message: "blog disliked successfully"});
        }else{
            await Blog.findByIdAndUpdate(blog._id, {$addToSet: {likes: currentUser._id}});
            return res.status(200).json({message: "blog liked successfully"});
        }

    } catch (error) {
        next(error);
    }
}

export const getLikes = async(req, res, next)=>{

    try {

        const blog = await Blog.findById(req.params.id);

        if(!blog){
            return next(errorHandler(403, "blog not found"));
        }

        res.status(200).json(blog.likes);
        

    } catch (error) {
        next(error);
    }
}