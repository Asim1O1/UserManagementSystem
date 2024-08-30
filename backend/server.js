import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

dotenv.config();
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("The data base is connected successfully!");
    server.listen(PORT, () => {
      console.log("The server is running......");
    });
  })
  .catch((error) => console.log("Error: ", error));
