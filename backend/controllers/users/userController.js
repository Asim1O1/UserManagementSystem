import bcrypt from "bcryptjs";
import userModel from "../../models/users/userModel.js";
import createError from "http-errors";
import { getFilePath, uploadToCloudinary } from "../../utils/fileUpload.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/tokenGenerations.js";

const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Register User
export const registerUser = async (req, res, next) => {
  const { firstName, lastName, userName, email, password } = req?.body;
  console.log("Thee image url is", req.body.image);

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
      console.log("hello");
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

// User Login
export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("The request body is", req.body);
  console.log("The email and password is", email, password);

  // Check if email and password are provided
  if (!email || !password) {
    return next(createError(400, "All fields are required."));
  }

  try {
    // Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return next(createError(404, "User Not Found")); // 404 Not Found
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch) {
      return next(createError(401, "Incorrect password.")); // 401 Unauthorized
    }

    // Generate JWT tokens
    const accessToken = generateAccessToken(user?._id);
    const refreshToken = generateRefreshToken(user?._id);

    // Update last login time
    user.lastLogin = new Date();
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
        },
      },
    });
  } catch (error) {
    console.error(error);
    next(createError(500, "Internal Server Error. Please try again later."));
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.userId).select("-password");

    if (!user) {
      return next(createError(404, "User not Found!"));
    }
    const userObject = user.toObject();
    return res.status(200).json({
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "User data fetched successfully",
        user_data: userObject,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    next(createError(500, "Internal Server Error. Please try again later."));
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    let user = await userModel.findById(user_id);

    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const { firstName, lastName, userName, email, image } = req.body;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (image) user.image = image;

    await user.save();

    return res.status(200).json({
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "User profile updated",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userName: user.userName,
          image: user.image,
        },
      },
    });
  } catch (error) {
    console.error("The error while updating user profile", error);
    return next(createError(500, "Internal server error.Try again later!"));
  }
};
