import { postModel } from "../post/post.repository.js";
import { likeSchema } from "./like.schema.js";
import mongoose from "mongoose";
/** @type {import("mongoose").Model<any>} */

const likeModel = mongoose.model("likes", likeSchema);

export class likesRepository {
  // Function to like a post
  async likePost(data) {
    try {
      // First, check if the post exists
      const existLike = await postModel.findById(data.postId);
      // Check if the user has already liked this post
      const alreadyLiked = existLike.likes.some((id)=>id.toString()===data.userId.toString());
      if(alreadyLiked){
        const error = new Error("You have already liked this post");
        error.statusCode = 400;
        throw error;
      };
      // Create a new like document in the likes collection
      const createPost = new likeModel(data);
      const savedPost = await createPost.save();// Save the like to DB
      // Add the like ID to the corresponding post's `likes` array
      const findPost = await postModel.findOneAndUpdate(
        { _id: data.postId },
        { $push: { likes: createPost._id } }, {new:true}// Push like ID into the post
      );
      // If post not found, throw error
      if (!findPost) {
        const err = new Error("Post not found");
        err.statusCode = 404;
        throw err;
      };
      // Return updated post with new like included
      return findPost;
    } catch (err) {
      throw err;
    };
  };
  // Function to unlike a post
  async unLikePost(data){
    try{
       // Find and delete the like document from the likes collection
      const deletedPost = await likeModel.findOneAndDelete({userId:data.userId, postId:data.postId});
       // If like doesn't exist, user is trying to unlike without liking first
      if (!deletedPost) {
        const err = new Error("You need to like first for unliking the post.");
        err.statusCode = 404;
        throw err;
      };
      // Remove like reference from the corresponding post's `likes` array
      const deleteLike = await postModel.findByIdAndUpdate({_id:data.postId}, {$pull:{likes:deletedPost._id}},{new:true});
      // If post doesn't exist, throw error
      if (!deleteLike) {
        const err = new Error("post not found");
        err.statusCode = 404;
        throw err;
      };
       // Return updated post without the like
      return deleteLike;
    }catch(err){
      throw err;
    };
  };
}
