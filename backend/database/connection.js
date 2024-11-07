import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

export const connection = async () => {
  try {
    // console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected", process.env.MONGO_URI);
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};
