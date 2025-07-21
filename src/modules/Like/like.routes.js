import express from "express";
import { likesController } from "./like.controller.js";

export const likesRouter = express.Router();
const likeCont = new likesController();
//http://localhost:5000/api/likes/:id
likesRouter.post("/:id",(req,res,next)=>{
    likeCont.likePost(req,res,next)
});
//http://localhost:5000/api/likes/unLikePost/:id
likesRouter.delete("/unLikePost/:id",(req,res,next)=>{
    likeCont.unLikePost(req,res,next);
});

