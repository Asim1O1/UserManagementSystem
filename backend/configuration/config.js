import dotenv from "dotenv";
dotenv.config();

const Config = {
  port: process.env.PORT || 3001,
  db_url: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET_KEY,
  refreshTokenSecret: process.env.REFRESH_TOKEN,
  cloud_name: process.env.CLOUDINARY_CLOUD,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret_key: process.env.CLOUDINARY_API_SECRET,
  email_user: process.env.EMAIL_USER,
  email_password: process.env.EMAIL_PASSWORD,
  frontend_url: process.env.FRONTEND_URL,
};

export default Config;
