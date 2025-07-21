import exress from "express";
import { friendController } from "./friend.controller.js";

export const friendRouter = exress.Router();
const friendCont = new friendController();

// http://localhost:5000/api/friend/request/:toId
friendRouter.post("/request/:toId",(req,res,next)=>{
    friendCont.sendRequest(req,res,next);
});
// http://localhost:5000/api/friend/accept/:fromId
friendRouter.post("/accept/:fromId",(req,res,next)=>{
    friendCont.acceptRequest(req,res,next);
});
// http://localhost:5000/api/friend/cancel/:id
friendRouter.delete("/cancel/:id",(req,res,next)=>{
    friendCont.cancelRequest(req,res,next);
});
// http://localhost:5000/api/friend/allFriends
friendRouter.get("/allFriends",(req,res,next)=>{
    friendCont.fetchAllFriends(req,res,next);
});
// http://localhost:5000/api/friend/accept/pendings
friendRouter.get("/pendings",(req,res,next)=>{
    friendCont.allPendingRequest(req,res,next)
});