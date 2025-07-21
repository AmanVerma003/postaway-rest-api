import express from "express";
import userController from "./user.controller.js";
import { jwtAuth } from "../../middlewares/jwtAuth.js";

export const userRouter = express.Router(); 

const userCont = new userController
//http://localhost:5000/api/user/signUp
userRouter.post("/signUp",(req,res,next)=>{
    userCont.signUp(req,res,next);
});
//http://localhost:5000/api/user/signIn
userRouter.post("/signIn",(req,res,next)=>{
    userCont.signIn(req,res,next);
});
//http://localhost:5000/api/user/logOut
userRouter.get("/logOut",jwtAuth, (req,res,next)=>{
    userCont.logOutOne(req,res,next);
});
//http://localhost:5000/api/user/logOutAll
userRouter.get("/logOutAll", jwtAuth, (req,res,next)=>{
    userCont.logOutAll(req,res,next);
});
//http://localhost:5000/api/user/getUserDetails/:userId
userRouter.get("/getUserDetails/:userId", jwtAuth, (req,res,next)=>{
    userCont.getuserDetail(req,res,next);
});
//http://localhost:5000/api/user/getAllDetails
userRouter.get("/getAllDetails", jwtAuth, (req,res,next)=>{
    userCont.getAllUserDetails(req,res,next);
});
//http://localhost:5000/api/user/updateData/:userId
userRouter.put("/updateData/:userId", jwtAuth, (req,res,next)=>{
    userCont.updateUserData(req,res,next);  
})