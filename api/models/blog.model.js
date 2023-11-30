import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    cover:{
        type: String,
        default: "https://media.istockphoto.com/id/157482029/photo/stack-of-books.jpg?s=612x612&w=0&k=20&c=ZxSsWKNcVpEzrJ3_kxAUuhBCT3P_dfnmJ81JegPD8eE="
    },
    blogBody:{
        type: String,
        required: true        
    },
    category:{
        type: String,
        required: true
    },
    userRef:{
        type: String,
        required: true
    }


}, {timestamps: true});


const Blog = mongoose.model("Blog", blogSchema);


export default Blog;