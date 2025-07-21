import express from "express";// Import Express framework
import { errorHandler } from "./src/errorHandling/errorHandler.js";// Global error handler
import { notFound } from "./src/errorHandling/404notFound.js";// 404 handler
import { jwtAuth } from "./src/middlewares/jwtAuth.js";// JWT middleware for route protection
import { userRouter } from "./src/modules/user/user.routes.js";// User-related routes
import cookieParser from "cookie-parser";// Middleware to parse cookies
import { otpRouter } from "./src/modules/otpResetPassword/otp.routes.js";// OTP routes for password reset
import { postRouter } from "./src/modules/post/post.routes.js";// Post-related routes
import { likesRouter } from "./src/modules/Like/like.routes.js";// Like-related routes
import { commentRouter } from "./src/modules/comments/comment.routes.js";// Comment-related routes
import { friendRouter } from "./src/modules/friendRequest/friend.routes.js";// Friend request routes

export const app = express();// Initialize Express application

app.use(express.json());// Enable parsing of JSON bodies in requests
app.use(cookieParser());// Enable parsing cookies (useful for JWT stored in cookies)

// Public routes
app.use("/api/user", userRouter);// User auth/signup/login routes
app.use("/api/otp", otpRouter);// OTP and reset password routes

// Protected routes (require JWT auth)
app.use("/api/posts", jwtAuth, postRouter);// Post creation, update, delete, get
app.use("/api/likes", jwtAuth, likesRouter);// Like/unlike a post
app.use("/api/comments", jwtAuth, commentRouter);// Add/update/delete comments
app.use("/api/friend", jwtAuth, friendRouter);// Send/cancel/accept/reject friend requests

app.use(notFound);// Middleware for handling unmatched routes (404)
app.use(errorHandler);// Global error handler for all thrown errors
