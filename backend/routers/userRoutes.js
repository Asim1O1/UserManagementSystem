import express from "express";

import {
  getUserProfile,
  registerUser,
  userLogin,
} from "../controllers/users/userController.js";
import upload from "../middlewares/multerConfig.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), registerUser);
userRouter.post("/login", userLogin);
userRouter.get("/userProfile", verifyToken, getUserProfile);

export default userRouter;
