import { NavBar } from "@/component/semantic";
import { useState } from "react";
import { ProfileIcon, ResetIcon, XIcon } from "@/component/icon";
import { useNavigate } from "react-router-dom";

export function ResetPasswordPage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <NavBar />
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
          <span className="md:w-1/3 flex items-center gap-4 border-l-Brown-300">
            <img
              src="https://img5.pic.in.th/file/secure-sv1/oleang-img1.jpg"
              alt="UserProfile"
              className="rounded-full w-16 h-16"
            />
            <h1 className="whitespace-nowrap pr-2 border-r-2 border-Brown-200 text-3xl font-semibold text-Brown-400">
              Oleang ja
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
          <div className=" md:ml-4 flex flex-1 justify-center items-center">
            <div className="w-full md:p-6 py-16 rounded-xl bg-Brown-200 ">
              <div className="px-16 flex flex-col gap-8">
                <div>
                  <p>Name</p>
                  <input className="w-full p-2 rounded-xl" type="text" />
                </div>
                <div>
                  <p>Username</p>
                  <input className="w-full p-2 rounded-xl" type="text" />
                </div>
                <div>
                  <p>Confirm new password</p>
                  <input className="w-full p-2 rounded-xl" type="text" />
                </div>
                <div>
                  <button
                    onClick={handleSignUp}
                    className=" text-xl text-white bg-Brown-600 border border-black hover:bg-Brown-500 py-4 px-10 rounded-full font-semibold"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className=" gap-6 bg-white flex flex-col items-center rounded-xl px-6 py-20 text-center relative">
            <button
              onClick={closeModal}
              className="   absolute top-7 right-7 text-black"
            >
              <XIcon />
            </button>
            <h2 className="mx-20 text-4xl font-semibold">Reset password</h2>
            <h2>Do you want to reset your password?</h2>
            <div className="flex gap-10">
              <button
                onClick={closeModal}
                className="bg-white text-black border border-Brown-400 px-8 py-4 rounded-full hover:bg-Brown-100"
              >
                Cancel
              </button>
              <button className="bg-Brown-600 text-white px-8 py-4 rounded-full hover:bg-Brown-500">
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
