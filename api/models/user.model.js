import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: "https://img.freepik.com/premium-photo/man-with-beard-smile-that-says-he039s-smiling-pixar-cartoon-cute-friendly-healthy-man_954932-2134.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1699315200&semt=ais"
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    }]

}, {timestamps: true});



const User = mongoose.model("User", userSchema);


export default User;