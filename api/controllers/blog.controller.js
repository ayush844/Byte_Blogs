import Blog from "../models/blog.model.js"
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
        return res.status(404).json("Blog not found");
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