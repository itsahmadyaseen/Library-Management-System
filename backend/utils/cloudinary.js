import cloudinary from "cloudinary";
import { configDotenv } from "dotenv";
configDotenv();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const UploadOnCloudinary = async (coverImageLocalPath) => {
  try {
    const response = await cloudinary.uploader.upload(coverImageLocalPath, {
      resource_type: "auto",
    });

    if (!response) console.log("Bad response");
    // console.log("response", response);
    console.log("File uploaded on cloudinary");
    return response.secure_url;
  } catch (error) {
    console.log("Error uploading on cloudinary", error);
  }
};

export const deleteOnCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;

    const deleteResponse = await cloudinary.uploader.destroy(publicId);

    console.log("File deleted on cloudinary");
    return deleteResponse;
  } catch (error) {
    console.log("Error deleting file on cloudinary", error);
  }
};
