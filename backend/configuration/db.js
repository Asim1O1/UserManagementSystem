import mongoose from "mongoose";
import Config from "./config.js";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to the MongoDB");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error while connecting with MongoDb..", err);
    });
    await mongoose.connect(Config.db_url);
  } catch (error) {
    console.error("Failed to connect to MongoDb..", error);
    process.exit(1);
  }
};

export default connectDB;
