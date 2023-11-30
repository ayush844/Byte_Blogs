import Blog from "../models/blog.model.js"

export const createBlog = async (req, res, next)=>{ 
    try {
        const blog = await Blog.create(req.body);
        return res.status(201).json(blog);        
    } catch (error) {
        next(error);
    }
}
