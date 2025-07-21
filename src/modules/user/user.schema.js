import mongoose from "mongoose";
/**
 * User Schema
 * Represents a user in the system.
 * Includes personal info, login credentials, tokens, and password reset support.
 */
export const userSchema = new mongoose.Schema({
  name: { // Full name of the user
    type: String,
    requred: [true, "Name is Required and must be more then 2letters"],
    minLength: 3,
  },

  age: { // Age of the user with a custom validator between 16–100s
    type: Number,
    required: [true, "Age is Required"],
    validate: {
      validator: function (age) {
        return age >= 16 && age <= 100;
      },

      message: `age must be between 16 to 100`,
    },
  },

  gender: { // Gender with only allowed values
    type: String,
    required: [true, "Gender is Required"],
    enum: ["male", "female", "others"],
  },

  email: { // User's email address — must be unique and in valid format
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },

  password: { // Hashed password of the user
    type: String,
    required: [true, "Password is Required"],
  },

  tokens: [{ type: String }], // List of active tokens (for multi-device login support)

  otp: { // OTP used for password reset 
    type: String,
  },

  otpExpiresAt: { // Expiry time for OTP — useful for making OTP time-sensitive
    type: Date,
  },

  latestResetToken:{type:String} // Token used for securely resetting password
  
});
