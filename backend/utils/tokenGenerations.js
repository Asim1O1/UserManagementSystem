import jwt from "jsonwebtoken";
import Config from "../configuration/config.js";

// Generate Access Token
export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, Config.jwtSecret, { expiresIn: "1h" });
};

// Generate Refresh Token
export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, Config.refreshTokenSecret, { expiresIn: "5d" });
};
