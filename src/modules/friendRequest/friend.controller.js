import { friendRepository } from "./friend.repository.js";

export class friendController {
  constructor() {
    this.friendRepo = new friendRepository();
  }
// Controller to handle sending a friend request from the logged-in user to another user
  async sendRequest(req, res, next) { 
    try {
      const from = req.userId;
      if (!from) {
        const err = new Error("Unauthorized: User not logged in");
        err.statusCode = 401;
        throw err;
      };
      const to = req.params.toId;
      if (!to) {
        const err = new Error("Bad Request: toId parameter is required");
        err.statusCode = 400;
        throw err;
      };
      const resp = await this.friendRepo.sendRequest({ from, to });
      res.status(201).json({
        success: true,
        message: "You have succesfully send request.",
        resp,
      });
    } catch (err) {
      next(err);
    };
  };

// Controller to accept a pending friend request sent from another user
  async acceptRequest(req, res, next) {
    try {
      const from = req.params.fromId;
      if (!from) {
        const err = new Error("Bad Request: from parameter is required");
        err.statusCode = 400;
        throw err;
      };
      const to = req.userId;
      if (!to) {
        const err = new Error("Unauthorized: User not logged in");
        err.statusCode = 401;
        throw err;
      };
      const resp = await this.friendRepo.acceptRequest(from, to);
      res.status(200).json({ sucess: true, resp });
    } catch (err) {
      next(err);
    };
  };
// Controller to cancel a friend request by either sender or receiver
  async cancelRequest(req, res, next) {
    try {
      const userId = req.userId; // The logged-in user (sender or receiver)
      if (!userId) {
        const err = new Error("Unauthorized: User not logged in");
        err.statusCode = 401;
        throw err;
      };
      const send_Rec_Id = req.params.id; // The other user (either sender or receiver)
      if (!send_Rec_Id) {
        const err = new Error("Bad Request: id parameter is required");
        err.statusCode = 400;
        throw err;
      };
      // Bi-directional cancel
      await this.friendRepo.cancelRequest(userId, send_Rec_Id);
      res.status(200).json({ success: true, message: "Request cancelled" });
    } catch (err) {
      next(err);
    };
  };
// Controller to get all friends (accepted connections) of the logged-in user
  async fetchAllFriends(req, res, next) {
    try {
      const userId = req.userId;
      if (!userId) {
        const err = new Error("Unauthorized: User not logged in");
        err.statusCode = 401;
        throw err;
      };
      const resp = await this.friendRepo.fetchAllFriends(userId);
      res.status(200).json({ success: true, resp });
    } catch (err) {
      next(err);
    };
  };
// Controller to get all pending friend requests sent *to* the logged-in user
  async allPendingRequest(req, res, next) {
    try {
      const userId = req.userId;
      if (!userId) {
        const err = new Error("Unauthorized: User not logged in");
        err.statusCode = 401;
        throw err;
      };
      const resp = await this.friendRepo.allPendingRequest(userId);
      res.status(200).json({ success: true, resp });
    } catch (err) {
      next(err);
    };
  };
};
