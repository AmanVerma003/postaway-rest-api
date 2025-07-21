import mongoose from "mongoose";
/**
 * Friend Schema
 * Represents a friendship or friend request between two users.
 * `from` is the user who sent the request.
 * `to` is the user who receives the request.
 * `status` tracks the state of the request: pending, accepted, or rejected.
 * `timestamps` adds createdAt and updatedAt fields automatically.
 */
const friendSchema = new mongoose.Schema(
  {
    from: { // The user who sent the friend request
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    to: { // The user who received the friend request
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: { // Current status of the friend request
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);
// Model for storing friend requests and friendships
export const friendModel = mongoose.model("friend", friendSchema);
