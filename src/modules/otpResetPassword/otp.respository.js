import { userModel } from "../user/user.repository.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

export default class otpRepository {
   // Generate and send OTP to user's email
  async sendOPtandMail(email) {
    try {
      // Generate 4-byte random OTP in hexadecimal format (8 characters)
      let otp = crypto.randomBytes(4).toString("hex");
      // Save OTP and expiry time in the user's document
      const user = await userModel.findOneAndUpdate(
        {email:email},
        { otp: otp,
          otpExpiresAt: Date.now() + 5 * 60 * 1000 },// OTP valid for 5 minutes
        { new: true }
      );

      if(!user){
       const error = new Error("User not Found.");
       error.statusCode = 404;
       throw error;
      };
       // Set up email transporter using Gmail and credentials
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODE_EMAIL,
          pass: process.env.NODE_EMAIL_PASS, 
        },
      });
      // Email content with OTP and user greeting
      const mailOptions = {
        from:'"<postAway044@gmail.com>',
        to: email,
        subject: "Reset your Password",
        html:`
          <p>Hey ${user.name},</p>
          <p>We received a request to reset your password. Use the OTP below to proceed:</p>
          <h2>${otp}</h2>
          <p>This OTP will expire in 5 minutes.</p>
          <p>If you didn't request this, you can safely ignore this email.</p>
        `,
      };
      // Send the email
      await transporter.sendMail(mailOptions);
      return user;

    }catch (err) {
      throw err;
    }
  }
   // Verifies OTP and sets the reset token
  async verifyOptOfUser(email,otp, resetToken){
    try{
     // Find user by email 
     const user = await userModel.findOne({email});

     if(!user){
      const error = new Error("User not Found.");
      error.statusCode = 404;
      throw error;
     }
      // Check if OTP has expired
     if(user.otpExpiresAt < Date.now()){
      const error = new Error("OTP has expired. Please request a new one.");
      error.statusCode = 410; //means the OTP used to exist, but is no longer valid or available.
      throw error;
     }
      // Compare submitted OTP with stored OTP
     if(user.otp !== otp){
      const error = new Error("Otp didn't match");
      error.statusCode = 401;
      throw error;
     }
    // Save reset token in user document for further verification
    user.latestResetToken = resetToken;
    await user.save();

    return "OTP verified successfully";

    }catch(err){
      throw err;
    }
  }
  // Updates the user's password after OTP verification
  async resetPass(email,password){
    try{
      // Update user password by email
      const user = await userModel.findOneAndUpdate({email},{password:password});
      if(!user){
       const error = new Error("User not Found.");
       error.statusCode = 404;
       throw error;
      };
      return user;
    }catch(err){
      throw err;
    }
  }
}
