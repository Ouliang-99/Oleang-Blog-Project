import { LinkedinIcon, GithubIcon, GoogleIcon, HamburgerIcon } from "./icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between py-4 px-8 bg-Brown-100 border-b">
      <a href="/" className="text-2xl font-bold">
        Thomson P<span className="text-green-500">.</span>
      </a>
      <div className="hidden md:flex space-x-4">
        <a href="/login" className="px-9 py-2 rounded-full border">
          Log in
        </a>
        <a
          href="/signup"
          className="px-8 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors"
        >
          Sign up
        </a>
      </div>
      <button className="md:hidden" onClick={toggleDropdown}>
        <HamburgerIcon />
      </button>
      {isOpen && (
        <div className="absolute top-16 mt-8 left-0 right-0 mx-auto w-5/6 bg-white rounded-lg shadow-lg md:hidden">
          <div className="flex flex-col space-y-2 p-4">
            <a
              href="/login"
              className="px-4 py-2 rounded-full border text-center hover:bg-gray-100"
            >
              Log in
            </a>
            <a
              href="/signup"
              className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors text-center"
            >
              Sign up
            </a>
          </div>
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
          alt="Person with a cat"
          className="h-[530px] object-cover rounded-lg shadow-lg lg:w-1/3 mx-4 mb-8 lg:mb-0"
        />
        <div className="lg:w-1/3 lg:pl-8">
          <h2 className="text-xl font-semibold mb-2">-Author</h2>
          <h3 className="text-2xl font-bold mb-4">Thompson P.</h3>
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
        <button onClick={() => navigate("/")} className="underline mt-5 sm:mt-auto">
          Home Page
        </button>
      </div>
    </div>
  );
}
