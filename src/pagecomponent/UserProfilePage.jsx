import { NavBar } from "@/component/semantic";
import { useState } from "react";
import { ProfileIcon, ResetIcon, XIcon } from "@/component/icon";
import { useNavigate } from "react-router-dom";

export function UserProfilePage() {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
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
          <div className="flex flex-1 justify-center items-center md:ml-4">
            <div className="p-2 md:p-10 rounded-xl bg-Brown-200 w-full ">
              <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-10 border-b border-Brown-300 m-10 pb-10">
                <img
                  src="https://img5.pic.in.th/file/secure-sv1/oleang-img1.jpg"
                  alt="UserProfile"
                  className=" w-36 h-36 rounded-full "
                />
                <button className=" text-l bg-white border border-black hover:bg-Brown-100 py-4 px-10 rounded-full font-semibold">
                  Upload profile picture
                </button>
              </div>
              <div className="px-16 pb-20  flex flex-col gap-6">
                <div>
                  <p>Name</p>
                  <input className="w-full p-2 rounded-xl" type="text" />
                </div>
                <div>
                  <p>Username</p>
                  <input className="w-full p-2 rounded-xl" type="text" />
                </div>
                <div className="text-Brown-300">
                  <p>Email</p>
                  <p className="py-6">OleangJa@gmail.com</p>
                </div>
                <div>
                  <button
                    onClick={handleAlert}
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
