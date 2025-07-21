import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    // Caption or description for the post
    caption:{
        type:String,
        required:[true, "Post content is required"],
        trim:true,
        required:true
    },
    // Array of media file names image uploaded via multer
    media:{
        type:[String],
        default:[]
    },
    // Reference to the user who created the post
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    // Array of like IDs referencing the 'likes' collection
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"likes"
    }],
    // Array of comment IDs referencing the 'comment' collection
    Comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }]
});