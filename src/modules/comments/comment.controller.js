import mongoose from "mongoose";
import { commentRepository } from "./comment.repository.js";

export class commentController {

  constructor() {
    this.commentRepo = new commentRepository();
  };
  // Create a new comment on a specific post
  async makeComment(req, res, next) {
    try {
      const userId = req.userId;// Logged-in user's ID from JWT
      if (!userId) {
        const error = new Error("Unauthorized: User not logged in")
        const statusCode = 401;
        throw error;
      };
      const postId = new mongoose.Types.ObjectId(req.params.id);  
      if (!postId) {
         const error = new Error("Invalid post ID format")
        const statusCode = 404;
        throw error;
      };
      const textCmnt = req.body.comment;// Comment text from request body
      if (!textCmnt) {
        const error = new Error("Comment is required")
        const statusCode = 404;
        throw error;
      };
       // Call repo to save comment
      const resp = await this.commentRepo.makeComment({ userId, postId, comment:textCmnt});
      // Send successful response
      res.status(201).json({success:true, message:"You have commented on this post!", post:resp});
    } catch (err) {
      next(err);
    }
  }
  // Delete a comment by comment ID
  async deleteComment(req,res,next){
    try{
      const userId = req.userId;// ID of the user requesting deletion
      if (!userId) {
        const error = new Error("Unauthorized: User not logged in")
        const statusCode = 401;
        throw error;
      };
      const commentId = new mongoose.Types.ObjectId(req.params.id);
      if (!commentId) {
         const error = new Error("Invalid comment ID format")
        const statusCode = 404;
        throw error;
      };
      // Call repo to delete comment
      const resp = await this.commentRepo.deleteComment({userId, commentId});
      // Respond after deletion
      res.status(200).json({ success:true, message:"Comment has been deleted", post:resp})
    }catch(err){
      next(err)
    };
  };
  // Update an existing comment
  async updatePost(req,res,next){
    try{
      const commentId = new mongoose.Types.ObjectId(req.params.id);// Comment ID to update
      if (!commentId) {
        const error = new Error("Invalid comment ID format")
        const statusCode = 404;
        throw error;
      };
      const data = req.body.comment;// New comment text
      if (!data) {
        const error = new Error("Comment is required")
        const statusCode = 404;
        throw error;
      };
      // Call repo to update the comment
      const resp = await this.commentRepo.updatePost(commentId,data);
      // Respond after update
      res.status(200).json({success:true, message:"Your have just commented on this updated", updatedPost:resp});
    }catch(err){
      next(err);
    };
  };
};
