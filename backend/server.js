import express from "express";
import connectDB from "./configuration/db.js";
import Config from "./configuration/config.js";
import userRouter from "./routers/userRoutes.js";
import cors from "cors";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const server = express();

server.use(cors());

server.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Middleware to parse JSON and URL-encoded data

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// routes
server.get("/", (req, res) => {
  res.send(" User Management System's API is running...");
});
server.use("/api/users", userRouter);

// Handle 404 errors
server.use(notFoundHandler);

// Use custom error handler
server.use(errorHandler);

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
