import { postSchema } from "./post.schema.js";
import mongoose from "mongoose";

export const postModel = mongoose.model("posts", postSchema);

export class postRepository {
  // Create and save a new post document
  async uploadUserPost(data) {
    try {
      const newpost = new postModel(data);
      const savedPost = await newpost.save();
      return savedPost;
    } catch (err) {
      throw err;
    }
  }
  // Retrieve all posts from the collection
  async allPost() {
    try {
      const resp = await postModel.find().select("-__v");
      if (resp.length === 0) {
        const err = new Error("Posts not found");
        err.statusCode = 404;
        throw err;
      }
      return resp;
    } catch (err) {
      throw err;
    }
  }
  // Find and return a specific post by ID
  async getPost(id) {
    try {
      const post = await postModel.findById(id).select("-__v");
      if (!post) {
        const err = new Error("Post not found");
        err.statusCode = 404;
        throw err;
      }
      return post;
    } catch (err) {
      throw err;
    }
  }
  // Get all posts created by a specific user
  async userPosts(id) {
    try {
      const posts = await postModel.find({ userId: id }).select("-__v");
      console.log(id);
      if (!posts) {
        const err = new Error("User not found");
        err.statusCode = 404;
        throw err;
      }
      return posts;
    } catch (err) {
      throw err;
    }
  }
  // Update an existing post by ID with given object fields
  async postUpdate(id, obj) {
    try {
      const updatePost = await postModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      console.log(updatePost, "this is from repo of up");
      if (!updatePost) {
        const err = new Error("Post not found");
        err.statusCode = 404;
        throw err;
      }
      return updatePost;
    } catch (err) {
      throw err;
    }
  }
   // Check whether the post belongs to the given user (authorization check)
  async postOwner(userId, postId){
    try{
      const post = await postModel.findOne({_id:postId, userId});
      if(!post){
        const err = new Error("Post not found or does not belong to this user");
        err.statusCode = 404;
        throw err;
      }
      return post;
    }catch(err){
      throw err;
    }
  }
  // Delete a post by IDs
  async postDelete(id) {
    try {
      const deletedPost = await postModel.findByIdAndDelete(id).select("-__v");
      if (!deletedPost) {
        const err = new Error("Post not found or already deleted");
        err.statusCode = 404;
        throw err;
      }
      return deletedPost;
    } catch (err) {
      throw err;
    }
  }
  // Count the number of likes on a specific post
  async countPostLikes(id){
    try{
      const post = await postModel.findById(id).select("-__v");
      if(!post){
        const err = new Error("post not found");
        const stausCode = 404;
        throw err;
      }
      const numOfLikes = post.likes.length;
      const data = {post, numOfLikes};
      return data;
    }catch(err){
      throw err;
    }
  }
  // Count the number of comments on a specific post
  async countPostComments(id){
    try{
      const post = await postModel.findById(id).select("-__v");
      if(!post){
        const err = new Error("post not found");
        const stausCode = 404;
        throw err;
      }
      const numOfComments = post.Comments.length;
      const data = {post, numOfComments};
      return data;
    }catch(err){
      throw err;
    }
  }
}
