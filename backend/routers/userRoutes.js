import express from "express";

import {registerUser} from "../controllers/users/userController.js"
import upload from "../middlewares/multerConfig.js"

const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), registerUser);

export default userRouter;
