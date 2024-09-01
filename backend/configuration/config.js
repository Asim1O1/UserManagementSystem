import dotenv from "dotenv";
dotenv.config();

const Config = {
  port: process.env.PORT || 3001,
  db_url: process.env.MONGO_URL,
  cloud_name: process.env.CLOUDINARY_CLOUD,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret_key: process.env.CLOUDINARY_API_SECRET,
};

export default Config;
