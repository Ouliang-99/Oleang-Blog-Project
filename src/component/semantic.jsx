import {
  LinkedinIcon,
  GithubIcon,
  GoogleIcon,
  HamburgerIcon,
  BellIcon,
  LogOutIcon,
  ProfileIcon,
  ResetIcon,
  DropdownIcon,
  OutIcon,
} from "./icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userSetting, setUserSetting] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleSetting = () => {
    setUserSetting(!userSetting);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("session");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between py-4 px-8 bg-Brown-100 border-b relative">
      <a href="/" className="text-2xl font-bold">
        Oleang Blog<span className="text-green-500">.</span>
      </a>
      {user ? (
        <div className="hidden md:flex items-center ml-auto gap-4 pr-8 relative">
          <button className="bg-white border border-Brown-200 p-2 rounded-full hover:bg-Brown-200">
            <BellIcon />
          </button>
          <img
            src={user.profile_pic}
            alt="UserProfile"
            className="border rounded-full w-5 h-5 sm:w-10 sm:h-10 hidden md:flex object-cover"
          />
          <div
            onClick={toggleSetting}
            className="hidden md:flex items-center cursor-pointer mr-6"
          >
            {user.name} <DropdownIcon />
          </div>
          {userSetting && (
            <div className="hidden md:flex flex-col absolute top-full right-0 mt-4 w-60 bg-white rounded-md shadow-lg py-2 z-20">
              <button
                className="flex items-center w-full text-left px-4 py-2 gap-4 hover:bg-gray-100 hover:border-b"
                onClick={() => navigate("/profile")}
              >
                <ProfileIcon />
                Profile
              </button>
              <button
                className="flex items-center w-full text-left px-4 py-2 gap-4 hover:bg-gray-100 hover:border-b"
                onClick={() => navigate("/reset-password")}
              >
                <ResetIcon />
                Reset password
              </button>
              {user.isAdmin && (
                <button
                  className="flex items-center w-full text-left px-4 py-2 gap-4 hover:bg-gray-100 border-b"
                  onClick={() => navigate("/admin-login")}
                >
                  <OutIcon />
                  Admin panel
                </button>
              )}
              <button
                className="flex items-center w-full text-left px-4 py-2 gap-4 hover:bg-gray-100 hover:border-b"
                onClick={handleLogout}
              >
                <LogOutIcon />
                Log out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="hidden md:flex space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-9 py-2 rounded-full border"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors"
          >
            Sign up
          </button>
        </div>
      )}
      <button className="md:hidden" onClick={toggleDropdown}>
        <HamburgerIcon />
      </button>
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 mx-auto w-5/6 bg-white rounded-lg shadow-lg md:hidden">
          {user ? (
            <div className="p-4">
              <div className="flex justify-between items-center pb-2 border-b border-Brown-200 mx-5">
                <img
                  src={user.profile_pic || "https://via.placeholder.com/150"}
                  alt="UserProfile"
                  className="w-10 h-10 rounded-full shadow-md"
                />
                <span>{user.name}</span>
                <button className="bg-white border border-Brown-200 p-2 rounded-full hover:bg-Brown-200">
                  <BellIcon />
                </button>
              </div>
              <button
                className="flex items-center w-full text-left px-4 py-2 gap-4 hover:bg-gray-100 hover:border-b"
                onClick={() => navigate("/profile")}
              >
                <ProfileIcon />
                Profile
              </button>
              <button
                className="flex items-center w-full text-left px-4 py-2 gap-4 hover:bg-gray-100 hover:border-b"
                onClick={() => navigate("/reset-password")}
              >
                <ResetIcon />
                Reset password
              </button>
              <button
                className={`flex items-center w-full text-left px-4 py-2 gap-4 hover:bg-gray-100 hover:border-b ${
                  user.isAdmin && "border-b"
                }`}
                onClick={handleLogout}
              >
                <LogOutIcon />
                Log out
              </button>
              {user.isAdmin && (
                <button
                  className="flex items-center w-full text-left px-4 py-2 gap-4 hover:bg-gray-100 hover:border-b"
                  onClick={() => navigate("/admin-login")}
                >
                  <OutIcon />
                  Admin panel
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col space-y-2 p-4">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-full border text-center hover:bg-gray-100"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors text-center"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export function HeroSection() {
  return (
    <main className="container px-4 py-8 lg:py-16 mx-auto">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Stay <br className="hidden lg:block" />
            Informed, <br />
            Stay Inspired,
          </h1>
          <p className="text-lg text-gray-500">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
            Inspiration and Information.
          </p>
        </div>
        <img
          src="https://img5.pic.in.th/file/secure-sv1/oleang-img1.jpg"
          alt="UserProfile"
          className="h-[530px] object-cover rounded-lg shadow-lg lg:w-1/3 mx-4 mb-8 lg:mb-0"
        />
        <div className="lg:w-1/3 lg:pl-8">
          <h2 className="text-xl font-semibold mb-2">-Author</h2>
          <h3 className="text-2xl font-bold mb-4">wannachok.t</h3>
          <p className="text-gray-500 mb-4">
            I am a pet enthusiast and freelance writer who specializes in animal
            behavior and care. With a deep love for cats, I enjoy sharing
            insights on feline companionship and wellness.
          </p>
          <p className="text-gray-500">
            When I&apos;m not writing, I spend time volunteering at my local
            animal shelter, helping cats find loving homes.
          </p>
        </div>
      </div>
    </main>
  );
}

export function Footer() {
  const navigate = useNavigate();
  return (
    <div className="bg-Brown-200 p-10">
      <div className="flex justify-between flex-col items-center sm:flex-row">
        <div className="flex space-x-4">
          <p>Get in Touch</p>
          <LinkedinIcon />
          <GithubIcon />
          <GoogleIcon />
        </div>
        <button
          onClick={() => navigate("/")}
          className="underline mt-5 sm:mt-auto"
        >
          Home Page
        </button>
      </div>
    </div>
  );
}
