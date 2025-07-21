import mongoose from "mongoose";

export const likeSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the user who liked the post
    ref: "users",                          // References "users" collection
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the post that is liked
    ref: "posts",                          // References "posts" collection
    required: true,
  },
}, { timestamps: true });                 // Automatically adds createdAt and updatedAt timestamps
// Ensure a user can only like a specific post once
likeSchema.index({ postId: 1, userId: 1 }, { unique: true });
// This compound index prevents duplicate likes (ex:- no multiple likes from same user on the same post)