import express from "express";
import { commentController } from "./comment.controller.js";

export const commentRouter = express.Router();
const commentCont = new commentController();
//http://localhost:5000/api/comments/:id
commentRouter.post("/:id",(req,res,next)=>{
    commentCont.makeComment(req,res,next)
});
//http://localhost:5000/api//delete/:id
commentRouter.delete("/delete/:id",(req,res,next)=>{
    commentCont.deleteComment(req,res,next);
});
//http://localhost:5000/api/update/:id
commentRouter.put("/update/:id",(req,res,next)=>{
    commentCont.updatePost(req,res,next);
});

