import { friendModel } from "./friend.schema.js";

export class friendRepository {
  // Save a new friend request if one doesn't already exist
  async sendRequest({ from, to }) {
    try {
      if (from === to) {
        const err = new Error("invalid way of sending request");
        err.statusCode = 400;
        throw err;
      }
       
      const findAddFriend = await friendModel.findOne({
        status: "accepted",
        $or: [
          { from, to },
          { from: to, to: from },
        ],
      });
      // Check if already friends
      if (findAddFriend) {
        const err = new Error("Friendship already exists.");
        err.statusCode = 409;
        throw err;
      }

      const alreadyPending = await friendModel.findOne({
        status: "pending",
        from,
        to,
      });
      // Check if pending already
      if (alreadyPending) {
        const err = new Error("Friend request already sent.");
        err.status = 409;
        throw err;
      }
      const rqstSend = new friendModel({ from, to });
      const rqstSave = await rqstSend.save();
      return rqstSave
        .populate([
          { path: "from", select: "name email" },
          { path: "to", select: "name email" },
        ])
        .then((doc) => {
          const obj = doc.toObject();
          delete obj.__v;
          delete obj.createdAt;
          delete obj.updatedAt;
          return obj;
        });
    } catch (err) {
      throw err;
    }
  }
  // Accept a friend request by updating its status
  async acceptRequest(from, to) {
    try {
      const status = "pending";
      const resp = await friendModel.findOneAndUpdate(
        { from, to, status },
        { status: "accepted" },
        { new: true }
      );
      if (!resp) {
        const err = new Error("No pending friend request found");
        err.statusCode = 404;
        throw err;
      }
      return resp;
    } catch (err) {
      throw err;
    }
  }
   // Cancel friend request either by sender or receiver
  async cancelRequest(userId, sender_Reciver_Id) {
    try {
      const resp = await friendModel.findOneAndDelete({
        $or: [
          { from: userId, to: sender_Reciver_Id },
          { from: sender_Reciver_Id, to: userId },
        ],
      });
      if (!resp) {
        const err = new Error("No pending friend request found");
        err.statusCode = 404;
        throw err;
      }
      return resp;
    } catch (err) {
      next(err);
    }
  }
  // Get all accepted friends of a user
  async fetchAllFriends(userId) {
    try {
      const resp = friendModel
        .find({
          status: "accepted",
          $or: [{ from: userId }, { to: userId }],
        })
        .populate("from to", "name email")
        .select("-__v -createdAt -updatedAt");
      if (resp.length === 0) {
        const err = new Error("No friends found");
        err.statusCode = 404;
        throw err;
      }
      return resp;
    } catch (err) {
      throw err;
    }
  }
  // Get all pending requests *sent to* a user
  async allPendingRequest(userId) {
    try {
      const resp = friendModel
        .find({ status: "pending", to: userId })
        .populate("from to", "name email")
        .select("-__v -createdAt -updatedAt");
      if (resp.length === 0) {
       const err = new Error("No pending friend requests found.");
       err.statusCode = 404;
       throw err;
      };
      return resp;
    } catch (err) {
      throw err;
    };
  };
};
