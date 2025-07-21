import mongoose from "mongoose";
import { likesRepository } from "./like.repository.js";
export class likesController {
  constructor() {
    this.likeRepo = new likesRepository();
  }
  // POST /like/:id → Like a post
  async likePost(req, res, next) {
    try {
      const userId = req.userId;// Extract logged-in user's ID from middleware
      if (!userId) {
        const error = new Error("Unauthorized: User not logged in")
        const statusCode = 401;
        throw error;
      };
      const postId = new mongoose.Types.ObjectId(req.params.id);  // Extract post ID from URL
      if (!postId) {
         const error = new Error("Invalid post ID format")
        const statusCode = 404;
        throw error;
      };
      // Call repository to like the post
      const resp = await this.likeRepo.likePost({ userId, postId });
       // Respond with success
      res.status(201).json({success:true, message:"You liked this post!", Like:resp});
    } catch (err) {
      next(err);
    }
  }
  // DELETE /unlike/:id → Unlike a post
  async unLikePost(req,res,next){
    try{
      const userId = req.userId; // Get logged-in user's ID
      if (!userId) {
        const error = new Error("Unauthorized: User not logged in")
        const statusCode = 401;
        throw error;
      };
      const postId = new mongoose.Types.ObjectId(req.params.id); // Get post ID from URL
      if (!postId) {
         const error = new Error("Invalid post ID format")
        const statusCode = 404;
        throw error;
      };
      // Call repository to unlike the post
      const resp = await this.likeRepo.unLikePost({userId, postId});
      // Respond with success
      res.status(200).json({ success:true, message:"post Unlike", Unlike:resp})
    }catch(err){
      next(err)
    };
  };
};
