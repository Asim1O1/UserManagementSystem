import path from "path";
import fs from "fs/promises";
import cloudinary from "../configuration/cloudinary";

export const uploadToCloudinary = async (
  filePath,
  folder,
  filename,
  format
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      public_id: filename,
      resource_type: format === "pdf" ? "raw" : "image",
    });
    await fs.unlink(filePath);
    return result?.secret_key;
  } catch (error) {
    await fs.unlink(filePath);
    throw error;
  }
};

export const getFilePath = (filename) => {
  return path.resolve(__dirname, "../../public/data/uploads", filename);
};
