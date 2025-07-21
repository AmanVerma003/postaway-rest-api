import jwt from "jsonwebtoken";
// Middleware to authenticate user using JWT from cookie or header
export const jwtAuth = async (req, res, next) => {
  try {
    // Extract JWT from either cookie or "Authorization" header (Bearer token)
    const jwToken =
      req.cookies.jwtToken || req.headers.authorization?.split(" ")[1];
    // If no token found, block access
    if (!jwToken) {
      const error = new Error("User Unauthorised!");
      error.statusCode = 401;
      return next(error);
    }
    // Verify token using secret key (throws error if invalid or expired)
    const token = jwt.verify(jwToken, process.env.JWT_SECRET_KEY);
    // Store decoded data in request object for downstream access
    req.userId = token._id; // User ID extracted from token
    req.userToken = jwToken; // Original token
    // Allow request to proceed to the next middleware/controller
    next();
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};
