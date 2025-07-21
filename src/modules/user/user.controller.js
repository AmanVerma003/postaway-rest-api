import userRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loggerFunction } from "../../middlewares/logger.middleware.js";
import mongoose from "mongoose";

export default class userController {
  constructor() {
    this.userRep = new userRepository();
  }

  async signUp(req, res, next) { // Register a new user
    try {
      let { password } = req.body;
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,12}$/;
      if (!passwordRegex.test(password)) {// Validate password complexity
        const error = new Error(
          "Password must be 6-12 characters long and include at least one letter, one number, and one special character"
        );
        error.statusCode = 400;
        throw error;
      }
      password = await bcrypt.hash(password, 12);// Hash the password
      const resp = await this.userRep.userSignUp({ ...req.body, password });// Save user to database
      res
        .status(201)
        .json({ success: true, msg: "User Registration Successful", user:resp});
      loggerFunction("signUp", resp.email);// Log signup event
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {// Log in an existing user
    try {
      const { email, password } = req.body;
      const user = await this.userRep.findbyEmail(email);// Find user by email
      if (!user) {
        const error = new Error("User Not Found");
        error.statusCode = 404;
        throw error;
      }
      const id = new mongoose.Types.ObjectId(user._id);
      const cond = await bcrypt.compare(password, user.password);// Validate password
      if (!cond) {
        const error = new Error("Password is invalid");
        error.statusCode=401;
        throw error;
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });// Generate JWT token

      res.cookie("jwtToken", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      console.log(token, "this is from controller");
      await this.userRep.pushTokenInUser(id, token); // Save token to user document
      loggerFunction("signIn", user.email);// Log signin event
      return res
        .status(200)
        .json({ success: true, message: "Sign in Successful", token });
    } catch (err) {
      next(err);
    }
  }

  async logOutOne(req, res, next) {  // Log out user from current device
    try {
      const logOutToken = req.userToken;
      const id = new mongoose.Types.ObjectId(req.userId);
      const resp = await this.userRep.pullSelectedToken(id, logOutToken);// Remove token from DB
      if (!resp) {
        const error = new Error(
          "May be user is not Authorised or token didn't find."
        );
        error.statusCode = 401;
        throw error;
      }
      res
        .clearCookie("jwtToken")// Clear cookie
        .status(200)
        .json({ success: true, message: "Logged Out from current device." });
    } catch (err) {
      next(err);
    }
  }

  async logOutAll(req, res, next) {// Log out user from all devices
    try {
      const id = new mongoose.Types.ObjectId(req.userId);
      const resp = await this.userRep.allLOgOut(id);// Clear all tokens
      if (!resp) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
      }
      res
        .clearCookie("jwtToken")
        .status(200)
        .json({ success: true, message: "Logged Out from all devices." });
    } catch (err) {
      err.statusCode = 404;
      next(err);
    }
  }

  async getuserDetail(req, res, next) {// Get user details by ID
    try {
      const { userId } = req.params;
      const id = new mongoose.Types.ObjectId(userId);
      const user = await this.userRep.userDetail(id);// Find user by ID
      if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(user);// Return user data
    } catch (err) {
      next(err);
    };
  };

  async getAllUserDetails(req, res, next){// Get all users
    try{
     const allUsers = await this.userRep.allUserDetails();// Fetch all users
     if (!allUsers) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(allUsers);// Return all users
    }catch(err){
      next(err);
    };
  };

  async updateUserData (req,res,next){// Update user profile data
    try{
      const {userId} = req.params;
      const id = new mongoose.Types.ObjectId(userId);
      let {name, age, gender} = req.body;
      const updateField = {};
      if(name) updateField.name = name;// Update name if provided
      if(age) updateField.age = age;// Update age if provided
      if(gender) updateField.gender = gender;// Update gender if provided
      if(Object.keys(updateField).length===0){// No field provided
        const error = new Error("No valid fields to update.");
        error.statusCode = 400;
        throw error;
      }
      const updatedUser = await this.userRep.updateData(id,updateField); // Update DB
      if (!updatedUser) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
      };
      res.status(200).json(updatedUser);// Return updated user
    }catch(err){
      next(err);
    }
  }
}
