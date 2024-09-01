import bcrypt from "bcryptjs";
import userModel from "../../models/users/userModel";
import createError from "http-errors"; //
import { getFilePath, uploadToCloudinary } from "../../utils/fileHelpers";

const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerUser = async (req, res, next) => {
  const { firstName, lastName, userName, email, image, password } = req?.body;

  // Validation for missing fields
  if (!firstName || !lastName || !userName || !email || !password) {
    const error = createError(400, "All fields are required!");
    return next(error);
  }

  // Validation for username
  if (!usernameRegex.test(userName)) {
    const error = createError(
      400,
      "Username must be alphanumeric and between 3 to 20 characters long!"
    );
    return next(error);
  }

  // Validation for email
  if (!emailRegex.test(email)) {
    const error = createError(400, "Invalid email format!");
    return next(error);
  }

  // Validation for password strength
  if (!passwordRegex.test(password)) {
    const error = createError(
      400,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
    );
    return next(error);
  }

  try {
    // Check if username already exists
    const existingUserName = await userModel.findOne({ userName });
    if (existingUserName) {
      const error = createError(409, "Username already exists!"); // 409 Conflict
      return next(error);
    }

    // Check if email already exists
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      const error = createError(409, "Email already exists!"); // 409 Conflict
      return next(error);
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
