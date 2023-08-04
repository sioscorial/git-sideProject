import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_URI;

export const database = async () => {
  if (!MONGODB_URI) {
    console.error("DB_URI not set in the .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
};
