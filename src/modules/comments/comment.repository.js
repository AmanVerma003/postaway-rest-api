import { postModel } from "../post/post.repository.js";
import { commentSchema } from "./comment.schema.js";
import mongoose from "mongoose";
/** @type {import("mongoose").Model<any>} */

const commentModel = mongoose.model("comments", commentSchema);

export class commentRepository {
  // Create and attach a comment to a post
  async makeComment(data) {
    try {
      const createCmnt = new commentModel(data); // Create new comment document
      const savedCmnt = await createCmnt.save();// Save the comment to DB
      // Add the comment's ID to the associated post's Comments array
      const findPost = await postModel.findOneAndUpdate(
        { _id: data.postId },
        { $push: { Comments: createCmnt._id } },{new:true}
      );
      if (!findPost) {
        const err = new Error("Post not found");
        err.statusCode = 404;
        throw err;
      };
      return findPost;// Return updated post with comment added
    } catch (err) {
      throw err;
    };
  };
  // Delete a comment and remove its reference from the post
  async deleteComment(data){
    try{
      // Delete the comment document if it belongs to the user
      const deletedPost = await commentModel.findOneAndDelete({userId:data.userId, _id:data.commentId},{new:true});
      if (!deletedPost) {
        const err = new Error("comment not found");
        err.statusCode = 404;
        throw err;
      };
      // Remove comment ID from the post's Comments array
      const deleteCmnt = await postModel.findByIdAndUpdate(deletedPost.postId, {$pull:{Comments:deletedPost._id}},{new:true})
      if (!deleteCmnt) {
        const err = new Error("post not found");
        err.statusCode = 404;
        throw err;
      };
      return deleteCmnt;// Return updated post
    }catch(err){
      throw err;
    };
  };
   // Update an existing comment by ID
  async updatePost(id,data){
    try{
      const resp = await commentModel.findByIdAndUpdate(id,{comment:data},{new:true}).select("-__v -createdAt -updatedAt");
      if (!resp) {
        const err = new Error("post not found");
        err.statusCode = 404;
        throw err;
      };
      return resp;// Return updated comment
    }catch(err){
        throw err;
    }
  }
}
