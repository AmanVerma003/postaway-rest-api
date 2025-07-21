import jwt from "jsonwebtoken";
import { userModel } from "../modules/user/user.repository.js";

// Middleware to verify reset password token (OTP flow)
const jwtOtpVerify = async (req, res, next) => {
  // Extract the token from the "Authorization" header (Bearer <token>)
  const token = req.headers.authorization?.split(" ")[1];
  // If token is missing, block the request
   if (!token) {
    const error = new Error("Reset Token is missing.");
    error.statusCode = 401;
    return next(error);
  }
  try {
    // Verify the token using the secret key for OTP reset
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_RESET_KEY);
    // Find the user using the email from the decoded token
    const user = await userModel.findOne({email:verifyToken.email});
     // If no user found, respond with error
    if (!user) {
      const error = new Error("User not Found.");
      error.statusCode = 404;
      return next(error);
    }
    // Check if the token matches the one stored in DB (to prevent reuse)
    if(user.latestResetToken !== token){
       const error = new Error("Token is expired or invalid");
       error.statusCode = 403;
       return next(error); 
    }
    // Store email in request for access in the reset controller
    req.email = verifyToken.email;
    next(); // Proceed to controller
  } catch (err) {
    next(err);
  }
};

export default jwtOtpVerify;
