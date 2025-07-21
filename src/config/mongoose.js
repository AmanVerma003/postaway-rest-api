import mongoose from "mongoose"; // Import mongoose to interact with MongoDB
import dotenv from "dotenv";      // Import dotenv to load environment variables from .env file

dotenv.config({ quiet: true });  // Load variables silently (without logging)
const db_Url = process.env.DATABASE_URL; // Get MongoDB connection string from .env file

// Function to connect to MongoDB using Mongoose
export const connectToMongoose = async () => {
  try {
    await mongoose.connect(db_Url); // Attempt to connect using the connection string
    console.log("MongoDB connected using mongoose"); // Success message
  } catch (err) {
    console.error("Mongoose Connection Error", err.message); // Log error message
    process.exit(1); // Exit the process if connection fails
  }
};
