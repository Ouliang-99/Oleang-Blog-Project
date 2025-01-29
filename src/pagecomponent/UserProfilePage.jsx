import { NavBar, Footer } from "@/component/semantic";
import { useState, useEffect } from "react";
import { ProfileIcon, ResetIcon, XIcon } from "@/component/icon";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useRef } from "react";
import axios from "axios";

export function UserProfilePage() {
  const fileInputRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setFormData({
      name: user.name || "",
      username: user.username || "",
    });
  }, [user]);

  const handleClickUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      alert("File size should not exceed 5MB.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      let profilePicUrl = user.profile_pic;

      if (imageFile) {
        profilePicUrl = await uploadToCloudinary(imageFile);
      }

      const payload = {
        userId: user.id,
        updateData: {
          name: formData.name,
          username: formData.username,
          profile_pic: profilePicUrl,
        },
      };

      const response = await axios.put("/api/update_user", payload);

      if (response.status === 200) {
        setIsloading(false);
        setUser({ ...user, ...formData, profile_pic: profilePicUrl });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (err) {
      setIsloading(false);
      console.error("Error updating user profile:", err);
    }
  };

  return (
    <>
      <NavBar />
      {isLoading && (
        <div className="absolute inset-0 bg-[#FFFFFF] bg-opacity-20 flex items-center justify-center z-10">
          <div className="loader border-t-4 border-Brown-600 w-12 h-12 rounded-full animate-spin"></div>
        </div>
      )}
      <div className="flex md:hidden flex-row gap-5 p-8">
        <button
          className="flex items-center gap-4 hover:bg-gray-100 hover:border-b text-xl"
          onClick={() => navigate("/profile")}
        >
          <ProfileIcon />
          Profile
        </button>
        <button
          className=" whitespace-nowrap flex items-center gap-4 hover:bg-gray-100 hover:border-b text-xl"
          onClick={() => navigate("/reset-password")}
        >
          <ResetIcon />
          Reset password
        </button>
      </div>
      <div className="flex flex-col justify-center items-center mt-5 md:mt-20">
        <div className="md:w-2/3 flex flex-row items-center gap-5">
          <span className="md:w-1/3 flex items-center gap-4 border-l-Brown-300">
            <img
              src={user.profile_pic}
              alt="UserProfile"
              className="rounded-full w-16 h-16 object-cover"
            />
            <h1 className="whitespace-nowrap pr-2 border-r-2 border-Brown-200 text-3xl font-semibold text-Brown-400">
              {user.name}
            </h1>
            <h1 className="text-3xl font-semibold text-Black">Profile</h1>
          </span>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="flex flex-row w-full md:w-2/3">
          <div className="hidden md:flex flex-col gap-5">
            <button
              className="flex items-center gap-4 hover:bg-gray-100 hover:border-b text-xl"
              onClick={() => navigate("/profile")}
            >
              <ProfileIcon />
              Profile
            </button>
            <button
              className="whitespace-nowrap flex items-center gap-4 hover:bg-gray-100 hover:border-b text-xl"
              onClick={() => navigate("/reset-password")}
            >
              <ResetIcon />
              Reset password
            </button>
          </div>
          <div className="flex flex-1 justify-center items-center md:ml-4">
            <div className="p-2 md:p-10 rounded-xl bg-Brown-200 w-full ">
              <div className="flex sm:pl-10 flex-col md:flex-row items-center justify-start mt-10 border-b border-Brown-300 m-10 pb-10">
                <img
                  src={previewImage || user.profile_pic}
                  alt="UserProfile"
                  className="rounded-full w-48 h-48 object-cover"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageFileChange}
                />
                <button
                  type="button"
                  className="text-l mt-5 sm:mt-0 sm:ml-32 bg-white border border-black hover:bg-Brown-100 py-4 px-10 rounded-full sm:w-1/3 w-full font-semibold"
                  onClick={handleClickUploadImage}
                >
                  Upload profile picture
                </button>
              </div>
              <div className="px-16 pb-20  flex flex-col gap-6">
                <div>
                  <p>Name</p>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-xl"
                  />
                </div>
                <div>
                  <p>Username</p>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-xl"
                    type="text"
                  />
                </div>
                <div className="text-Brown-300">
                  <p>Email</p>
                  <p className="py-6">{user.email}</p>
                </div>
                <div>
                  <button
                    onClick={handleSave}
                    className=" text-xl text-white bg-Brown-600 border border-black hover:bg-Brown-500 py-4 px-10 rounded-full font-semibold"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAlert && (
        <div className="text-left fixed bottom-4 md:right-4 bg-green-600 text-white p-6 rounded-md">
          <h1>Saved profile!</h1>
          <p>Your profile has been successfully updated</p>
        </div>
      )}
    </>
  );
}
