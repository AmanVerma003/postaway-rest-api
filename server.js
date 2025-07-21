import { connectToMongoose } from "./src/config/mongoose.js";
import { app } from "./index.js";

// Start the server on port 5000
app.listen(5000,()=>{
    console.log("Server is listening at port 5000");// Log when server starts successfully
    connectToMongoose(); // Establish connection to MongoDB
});