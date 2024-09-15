import jwt from "jsonwebtoken";
import createError from "http-errors";
import Config from "../configuration/config.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      createError(401, "Unauthorized: Token is missing or malformed")
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, Config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return next(createError(403, "Unauthorized: Token is invalid or expired"));
  }
};
