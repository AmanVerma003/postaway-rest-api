import mongoose from "mongoose";

import { postRepository } from "./post.repository.js";

export class postController {
  constructor() {
    this.postRepo = new postRepository();
  }

  async uploadPost(req, res, next) {// Handle creating a new post with media
    try {
      const userId = req.userId;
      if (!userId) {// Check if user is authenticated
        const error = new Error("User is Unauthorized");
        error.statusCode = 401;
        throw error;
      }

      const caption = req.body.caption;
      if (!caption) {// Validate presence of caption
        const error = new Error("Caption is required");
        error.statusCode = 400;
        throw error;
      }
      const media = req.files.map((file) => file.filename);// Extract uploaded filenames

      if (media.length === 0) {// At least one media file required
        const error = new Error("At least one media file is required");
        error.statusCode = 400;
        throw error;
      }
      const postData = { caption, media, userId };
      const post = await this.postRepo.uploadUserPost(postData); // Save post
      res.status(201).json(post); // Respond with created post
    } catch (err) {
      next(err);
    }
  }

  async getAllPost(req, res, next) {// Fetch all posts
    try {
      const resp = await this.postRepo.allPost();
      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  }

  async getonePost(req, res, next) {// Fetch one specific post by ID
    try {
      const postId = new mongoose.Types.ObjectId(req.params);// Extract post ID from route params
      const resp = await this.postRepo.getPost(postId);// Find post
      return res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  }

  async getUserPosts(req, res, next) { // Fetch all posts by a specific user
    try {
      const userId = new mongoose.Types.ObjectId(req.params);
      const posts = await this.postRepo.userPosts(userId);
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }

  async updatePost(req, res, next) {// Update caption and/or media for a post
    try {
      const caption = req.body.caption;
      const media = req.files.map((file) => file.filename);
      const obj = {};
      if (caption) obj.caption = caption;// Update caption if provided
      if (media.length > 0) obj.media = media;// Update media if files exist
      const postId = new mongoose.Types.ObjectId(req.params.id);
      const post = await this.postRepo.postUpdate(postId, obj);// Save updated post
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  async deletePost(req, res, next) {// Delete a post owned by the logged-in user
    try {
      const ownerId = new mongoose.Types.ObjectId(req.userId);
      const postId = new mongoose.Types.ObjectId(req.params.id)
      const checkOwner = await this.postRepo.postOwner(ownerId, postId);// Optional: check post ownership
      const resp = await this.postRepo.postDelete(postId);// Delete post
      res
        .status(200)
        .json({
          success: true,
          message: "Post has deleted successfully",
          deletedPost: resp,
        });
    } catch (err) {
      next(err);
    };
  };

  async countPostLikes(req,res,next){// Get number of likes for a specific post
    try{
      const postId = new mongoose.Types.ObjectId(req.params.id);
      const resp = await this.postRepo.countPostLikes(postId);
      res.status(200).json({success:true, message:`This post has ${resp.numOfLikes} likes`, post:resp.post})
    }catch(err){
      next(err);
    };
  };

  async countPostComments(req,res,next){// Get number of comments for a specific post
    try{
      const postId = new mongoose.Types.ObjectId(req.params.id);
      const resp = await this.postRepo.countPostComments(postId);
      res.status(200).json({success:true, message:`This post has ${resp.numOfComments} comments`, post:resp.post})
    }catch(err){
      next(err);
    };
  }
};
