import axios from "axios";

export const uploadToCloudinary = async (file) => {
  const cloudinaryUrl = import.meta.env.VITE_PUBLIC_CLOUDINARY_URL;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(cloudinaryUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.secure_url;
  } catch (error) {
    console.error(
      "Cloudinary upload error:",
      error.response ? error.response.data : error
    );
    throw new Error("Failed to upload to Cloudinary");
  }
};
