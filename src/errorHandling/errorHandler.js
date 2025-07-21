import { logger } from "../middlewares/logger.middleware.js";
import mongoose from "mongoose";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    logger.error(`Validation Error: ${err.message}`);
    return res.status(400).json({ success: false, message: err.message });
  }
  
  logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message ||"Something went wrong",
  });
  
};

 