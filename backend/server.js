import express from "express";
import connectDB from "./configuration/db.js";
import Config from "./configuration/config.js";
import userRouter from "./routers/userRoutes.js";

const server = express();

// Middleware to parse JSON and URL-encoded data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// routes
server.get("/", (req, res) => {
  res.send(" User Management System's API is running...");
});
server.use("/api/users", userRouter);

// Start Server Function
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start the server only if the database connection is successful
    const port = Config.port || 3001;
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
