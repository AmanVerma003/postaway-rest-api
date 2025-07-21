import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

export const userModel = mongoose.model("users", userSchema);

export default class userRepository {
  async userSignUp(user) { // Save new user
    try{
        const userCreated = new userModel(user);
        await userCreated.save();
        return userCreated;
    }catch(err){
        throw err;
    };
  };

  async findbyEmail(email){// Find user by email
    try{
      return await userModel.findOne({email});
    }catch(err){
      throw err;
    };
  };

  async pushTokenInUser(id, token){// Push token to user's token array
    try{
      await userModel.findByIdAndUpdate(id,{$push:{tokens:token}},{new:true});
    }catch(err){
      throw err;
    };
  };

  async pullSelectedToken(id, token){// Pull single token from user's token array
    try{
      return await userModel.findByIdAndUpdate(id, {$pull:{tokens:token}});
    }catch(err){
      throw err;
    };
  };

  async allLOgOut(id){// Clear all tokens from user document
    try{
      const findUser = await userModel.findById(id);
      findUser.tokens = [];
      findUser.save();
      return findUser;
    }catch(err){
      throw err;
    };
  };

  async userDetail(id){// Fetch user by ID
    try{
      return await userModel.findById(id).select("-password -tokens -__v");
    }catch(err){
      throw err;
    };
  };

  async allUserDetails(){// Get all users
    try{
      return await userModel.find().select("-password -tokens -__v");
    }catch(err){
      throw err;
    }
  }
 
  async updateData(id, dataObj){// Update user fields by ID
    try{
      return await userModel.findByIdAndUpdate(id, dataObj, {
        new: true,  
        runValidators: true, // validate schema
      }).select("-password -tokens -__v");
    }catch(err){
      throw err;
    }
  }

}
