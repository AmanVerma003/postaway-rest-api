import otpRepository from "./otp.respository.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bycrpt from "bcrypt";

export default class otpController {
  constructor() {
    this.otpRepo = new otpRepository();
  }
  // Send OTP to user's email
  async sendOtp(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) {// Validate email
        const error = new Error("Email is required.");
        error.statusCode = 400;
        throw error;
      } 
      // Send OTP and mail through repository function     
      const resp = await this.otpRepo.sendOPtandMail(email);
      // Respond with success and sent OTP (I'm returing otp just for checking purpose and for easy to use in verifyOtp route. Otherwise sending otp is not secure for prod. level.)
      res.status(200).json({ success: true, message: resp.otp });
    } catch (err) {
      next(err);
    }
  }
  // Verify the OTP user entered
  async verifyOpt(req, res, next) {
    try {
      const { email, otp } = req.body;
      // Validate inputs
      if (!email) {
        const error = new Error("Email is required.");
        error.statusCode = 400;
        throw error;
      }

      if (!otp) {
        const error = new Error("OTP is required.");
        error.statusCode = 400;
        throw error;
      }
      // Create a JWT token valid for 10 minutes for resetting password
      const resetToken = jwt.sign({ email }, process.env.JWT_SECRET_RESET_KEY, {
        expiresIn: "10m",
      });
       // Verify OTP from database using repository
      const resp = await this.otpRepo.verifyOptOfUser(email, otp, resetToken);
      // Send back success message and the reset token
      return res.status(200).json({ success: true, message: resp, resetToken });
    } catch (err) {
      next(err);
    }
  }
  // Reset password after verifying OTP
  async resetPassword(req, res, next) {
    try {
      const { password } = req.body;
      const email = req.email;// Extracted from decoded resetToken by middleware

      if (!password) {
        const error = new Error("password is required.");
        error.statusCode = 400;
        throw error;
      }
      
      if (!email) {
        const error = new Error("Email is required.");
        error.statusCode = 400;
        throw error;
      }
      // Hash the new password
      const hashedPassword = await bycrpt.hash(password, 12);
      // Call repository to update user password
      await this.otpRepo.resetPass(email, hashedPassword);
      // Respond with success
      res.status(200).json({ sucess: true, message: "Password updated succesfully." });

    } catch (err) {
      next(err);
    }
  }
}
