import path from "path";
import fs from "fs/promises";
import cloudinary from "../configuration/cloudinary.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadToCloudinary = async (filePath,folder,filename,format) => {
  try {
    console.log("hello from file");
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder,
      public_id: filename,
      resource_type: format === "pdf" ? "raw" : "image",
    });
    console.log("THE RESULT IS", result)
    await fs.unlink(filePath);
    console.log("THE RESULT IS", result)
    return result.secure_url;
  } catch (error) {
    await fs.unlink(filePath);
    throw error;
  }
};

export const getFilePath = (filename) => {
  return path.resolve(__dirname, "../../public/uploads", filename);
};
