import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../../models/users/userModel.js";
import createError from "http-errors";
import { getFilePath, uploadToCloudinary } from "../../utils/fileUpload.js";
import Config from "../../configuration/config.js";

const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Register User
export const registerUser = async (req, res, next) => {
  const { firstName, lastName, userName, email, password } = req?.body;

  // Validation for missing fields
  if (!firstName || !lastName || !userName || !email || !password) {
    return next(createError(400, "All fields are required!"));
  }

  // Validation for username
  if (!usernameRegex.test(userName)) {
    return next(
      createError(
        400,
        "Username must be alphanumeric and between 3 to 20 characters long!"
      )
    );
  }

  // Validation for email
  if (!emailRegex.test(email)) {
    return next(createError(400, "Invalid email format!"));
  }

  // Validation for password strength
  if (!passwordRegex.test(password)) {
    return next(
      createError(
        400,
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
      )
    );
  }

  try {
    // Check if username already exists
    const existingUserName = await userModel.findOne({ userName });
    if (existingUserName) {
      return next(createError(409, "Username already exists!")); // 409 Conflict
    }

    // Check if email already exists
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return next(createError(409, "Email already exists!")); // 409 Conflict
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle image upload if provided
    let imageUrl = "";
    if (req.file) {
      const imagePath = getFilePath(req?.file?.filename);
      const imageMimeType = req.file.mimetype.split("/").pop();
      imageUrl = await uploadToCloudinary(
        imagePath,
        "profile-images",
        req?.file?.filename,
        imageMimeType
      );
    }

    // Create the new user
    const newUser = await userModel.create({
      firstName,
      lastName,
      userName,
      email,
      image: imageUrl,
      password: hashedPassword,
    });

    // Prepare the response without the password
    const userObject = newUser.toObject();
    delete userObject.password;

    // Send success response
    res.status(201).json({
      StatusCode: 201, // 201 Created
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "User registered successfully!",
        userData: userObject,
      },
    });
  } catch (error) {
    console.error(error);
    next(createError(500, "Internal Server Error. Please try again later.")); // 500 Internal Server Error
  }
};

// Generate Access Token
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, Config.jwtSecret, { expiresIn: "1h" });
};

// Generate Refresh Token
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, Config.refreshTokenSecret, { expiresIn: "7d" });
};

// User Login
export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(createError(400, "All fields are required."));
  }

  try {
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(createError(404, "User not found.")); // 404 Not Found
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch) {
      return next(createError(401, "Incorrect password.")); // 401 Unauthorized
    }

    // Check if user is logging in for the first time
    const isNewUser = !user.lastLogin;

    // Generate JWT tokens
    const accessToken = generateAccessToken(user?._id);
    const refreshToken = generateRefreshToken(user?._id);

    // Update last login time
    user?.lastLogin = new Date();
    await user.save();

    // Send success response
    res.status(200).json({
      StatusCode: 200, // 200 OK
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Login successful!",
        accessToken,
        refreshToken,
        user: {
          id: user?._id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          userName: user?.userName,
          email: user?.email,
          image: user?.image,
          isNewUser,
        },
      },
    });
  } catch (error) {
    console.error(error);
    next(createError(500, "Internal Server Error. Please try again later."));
  }
};
