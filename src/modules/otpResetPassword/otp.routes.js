import express, { Router } from "express";
import otpController from "./otp.controller.js";
import jwtOtpVerify from "../../middlewares/jwtOtpVerify.js";

export const otpRouter = express.Router();

const otpCont = new otpController;
http://localhost:5000/api/otp/sendOtp
otpRouter.get("/sendOtp", (req,res,next)=>{
    otpCont.sendOtp(req,res,next);
});
http://localhost:5000/api/otp/verifyOtp
otpRouter.post("/verifyOtp",(req,res,next)=>{
    otpCont.verifyOpt(req,res,next);
});
http://localhost:5000/api/otp/resetPassword
otpRouter.put("/resetPassword",jwtOtpVerify, (req,res,next)=>{
    otpCont.resetPassword(req,res,next);
});