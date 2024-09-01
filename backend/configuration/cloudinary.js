import cloudinary from "cloudinary";
import Config from "./config.js";

cloudinary.v2.config({
  cloud_name: Config?.cloud_name,
  api_key: Config?.cloudinary_api_key,
  secret_key: Config?.cloudinary_secret_key,
});

export default cloudinary;
