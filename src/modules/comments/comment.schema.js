import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema(
  {// Reference to the user who made the comment
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // References the "users" collection
      required: true,
    },
    // Reference to the post on which the comment was made
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",  // References the "posts" collection
      required: true,
    },

    comment : {
      type:String,
      required:true
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
