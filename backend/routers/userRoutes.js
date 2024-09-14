import express from "express";

import {registerUser, userLogin} from "../controllers/users/userController.js"
import upload from "../middlewares/multerConfig.js"

const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), registerUser);
userRouter.post("/login", userLogin)

export default userRouter;
