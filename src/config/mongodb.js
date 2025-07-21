import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
const client = new MongoClient(process.env.DATABASE_URL);
let db;

// Just showcasing native MongoDB connection (MongoClient) — real project will use Mongoose

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("MongoDB is connected");
    db = client.db();
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) {
    throw new Error("DB isn't initialized. call connectToMongoDB() first");
  }
  return db;
}
