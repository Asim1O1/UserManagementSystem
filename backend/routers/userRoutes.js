import express from "express";
import { registerUser } from "../controllers/users/userController";
import upload from "../middlewares/multerConfig";

const router = express.Router();
router.post("/register", upload.single("image"), registerUser);

export default router;
