import express from "express";
import upload from "../../middlewares/multer.middleware.js";
import { postController } from "./post.controller.js";

export const postRouter = express.Router();
const postCont = new postController;
//http://localhost:5000/api/posts/uploadPost
postRouter.post("/uploadPost", upload.array("mediaUrl",5),(req,res,next)=>{
    postCont.uploadPost(req,res,next);
});
//http://localhost:5000/api/posts/getAllPost
postRouter.get("/getAllPost",(req,res,next)=>{
    postCont.getAllPost(req,res,next);
});
//http://localhost:5000/api/posts/getOnePost/:id
postRouter.get("/getOnePost/:id",(req,res,next)=>{
    postCont.getonePost(req,res,next);
});
//http://localhost:5000/api/posts/getUserPosts/:id
postRouter.get("/getUserPosts/:id",(req,res,next)=>{
    postCont.getUserPosts(req,res,next);
});
//http://localhost:5000/api/posts/updatePosts/:id
postRouter.put("/updatePosts/:id", upload.array("mediaUrl",5), (req,res,next)=>{
    postCont.updatePost(req,res,next);
});
//http://localhost:5000/api/posts/deletePost/:id
postRouter.delete("/deletePost/:id", (req,res,next)=>{
    postCont.deletePost(req,res,next);
});
//http://localhost:5000/api/posts/Likes/:id
postRouter.get("/Likes/:id",(req,res,next)=>{
    postCont.countPostLikes(req,res,next);
});
//http://localhost:5000/api/posts/Comments/:id
postRouter.get("/Comments/:id",(req,res,next)=>{
    postCont.countPostComments(req,res,next);
});