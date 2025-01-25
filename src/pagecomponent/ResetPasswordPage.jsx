import { NavBar } from "@/component/semantic";
import { useState } from "react";
import { ProfileIcon, ResetIcon, XIcon } from "@/component/icon";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/lib/supabase";

export function ResetPasswordPage() {
  const [showModal, setShowModal] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleModal = () => {
    setError("");

    if (!currentPassword) {
      setError("Current password is required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }
    if (currentPassword === newPassword) {
      setError("New password cannot be the same as current password");
      return;
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (error) {
        setError("Current password is incorrect");
        setIsLoading(false);
        setShowModal(false);
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      // รีเซ็ตฟอร์ม
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowModal(false);
      setIsLoading(false);
      setShowAlert(true);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
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
          className="whitespace-nowrap flex items-center gap-4 hover:bg-gray-100 hover:border-b text-xl"
          onClick={() => navigate("/reset-password")}
        >
          <ResetIcon />
          Reset password
        </button>
      </div>
      <div className="flex flex-col justify-center items-center mt-5 md:mt-20">
        <div className="md:w-2/3 flex flex-row items-center gap-5">
          <span className="md:w-2/3 flex items-center gap-4 border-l-Brown-300">
            <img
              src={user.profile_pic}
              alt="UserProfile"
              className="rounded-full w-16 h-16 object-cover"
            />
            <h1 className="whitespace-nowrap pr-2 border-r-2 border-Brown-200 text-3xl font-semibold text-Brown-400">
              {user.name}
            </h1>
            <h1 className="text-3xl text-nowrap font-semibold text-Black">
              Reset Password
            </h1>
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
          <div className=" md:ml-4 flex flex-1 justify-center items-center">
            <div className="w-full md:p-6 py-16 rounded-xl bg-Brown-200 ">
              <div className="px-16 flex flex-col gap-8">
                <div className="mt-8">
                  <p>Current password</p>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-2 rounded-xl"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="mt-1">
                  <p>New password</p>
                  <input
                    className="w-full p-2 rounded-xl"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="mt-1">
                  <p>Confirm new password</p>
                  <input
                    className="w-full p-2 rounded-xl"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="mt-5 relative">
                  {error && (
                    <div className="absolute -top-10 left-0 text-red-500">
                      {error}
                    </div>
                  )}
                  <button
                    onClick={handleModal}
                    className="text-xl text-white bg-Brown-600 border border-black hover:bg-Brown-500 py-4 px-10 rounded-full font-semibold"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center">
            <h2 className="text-2xl mb-4">Confirm Password Reset</h2>
            <p className="mb-4">
              Are you sure you want to reset your password?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={closeModal}
                className="bg-gray-200 px-4 py-2 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                className="bg-Brown-600 text-white px-4 py-2 rounded-full"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {showAlert && (
        <div className="text-left fixed bottom-4 md:right-4 bg-green-600 text-white p-6 rounded-md">
          <h1>Saved Password!</h1>
          <p>Your Password has been successfully updated</p>
        </div>
      )}
    </>
  );
}
