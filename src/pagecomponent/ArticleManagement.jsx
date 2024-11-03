import React, { useState } from "react";
import {
  OutIcon,
  BookIcon,
  FileIcon,
  BellIcon,
  ProfileIcon,
  LogOutIcon,
  MagnifyingIcon,
  DropdownIcon,
  EditIcon,
  TrashIcon,
} from "@/component/icon";
import { Input } from "@/components/ui/input";

export function ArticleManagement() {
  const [selectedButton, setSelectedButton] = useState("Article management");

  const buttonSelection = [
    { label: "Article management", icon: <BookIcon /> },
    { label: "Category management", icon: <FileIcon /> },
    { label: "Profile", icon: <ProfileIcon /> },
    { label: "Notification", icon: <BellIcon /> },
    { label: "Reset password", icon: <BellIcon /> },
  ];

  const handleButtonClick = (label) => {
    setSelectedButton(label);
  };

  const truncateText = (text, charLimit) => {
    return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-2/12 bg-white">
        <div className="px-8 py-10 bg-Brown-100">
          <a href="/" className="text-2xl font-bold">
            Oleang Blog<span className="text-green-500">.</span>
          </a>
          <h2 className="text-orange-300">Admin panel</h2>
        </div>

        <div className="py-4 space-y-4 bg-Brown-100">
          {buttonSelection.map((button, index) => (
            <div
              key={index}
              onClick={() => handleButtonClick(button.label)}
              className={`flex items-center space-x-2 cursor-pointer w-full px-4 py-2 
            ${
              selectedButton === button.label ? "bg-Brown-300" : ""
            } hover:underline`}
            >
              {button.icon}
              <span>{button.label}</span>
            </div>
          ))}
        </div>

        <div className="pt-24 py-4 space-y-4 bg-Brown-100">
          <div
            onClick={() => handleButtonClick("Oleang Blog. website")}
            className={`flex items-center space-x-2 border-b border-gray-300 pb-2 cursor-pointer w-full px-4 py-2 
          ${
            selectedButton === "Oleang Blog. website" ? "bg-Brown-300" : ""
          } hover:underline`}
          >
            <OutIcon />
            <span>Oleang Blog. website</span>
          </div>
          <div
            onClick={() => handleButtonClick("Log out")}
            className={`flex items-center space-x-2 cursor-pointer w-full px-4 py-2 
          ${
            selectedButton === "Log out" ? "bg-Brown-300" : ""
          } hover:underline`}
          >
            <LogOutIcon />
            <span>Log out</span>
          </div>
        </div>
      </div>
      <div className="w-10/12 bg-white">
        <div className="flex justify-between items-center py-8 px-32 border-b border-Brown-300">
          <h1 className="text-3xl font-bold">Article management</h1>
          <button className="text-xl text-white px-20 py-5 bg-Brown-600 hover:bg-Brown-500 rounded-full">
            + Create article
          </button>
        </div>
        <div className="m-20">
          <div className="flex justify-between gap-5">
            <div className="flex items-center">
              <div className="relative">
                <Input
                  className="pl-10 pr-10"
                  type="text"
                  placeholder="Search..."
                />
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center">
                  <MagnifyingIcon className="text-gray-400" />
                </div>
              </div>
            </div>
            <button className="ml-auto flex items-center px-20 py-2 border border-Brown-400 rounded-xl">
              Status <DropdownIcon />
            </button>
            <button className="flex items-center px-20 py-2 border border-Brown-400 rounded-xl">
              Category <DropdownIcon />
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-0 right-0 mx-20 bg-Brown-100 p-6 mt-[-60px] gap-10 rounded-t-xl border shadow-bottom z-10 flex justify-between items-center">
            <a className="text-left">Article title</a>
            <div className="ml-auto flex items-center">
              <a className="ml-4 mr-12 text-center">Category</a>
              <a className="ml-4 mr-52 text-center">Status</a>
            </div>
          </div>
        </div>
        <div className="flex justify-between mx-20 bg-Brown-100 p-6 gap-10 border-x">
          <p className="flex-1">
            {truncateText(
              "The Fascinating World of Cats: Why We Love Our Furry Friends",
              40
            )}
          </p>
          <p className="flex-none text-center">Cat</p>
          <p className="flex-none text-center text-green-400">Published</p>
          <button className="ml-auto">
            <EditIcon />
          </button>
          <button className="mr-20">
            <TrashIcon />
          </button>
        </div>
        <div className="flex justify-between mx-20 bg-Brown-100 p-6 gap-10 border-x">
          <p className="flex-1">
            {truncateText(
              "Finding Motivation: How to Stay Inspired Through Life's Challenges",
              40
            )}
          </p>
          <p className="flex-none text-center">Cat</p>
          <p className="flex-none text-center text-green-400">Published</p>
          <button className="ml-auto">
            <EditIcon />
          </button>
          <button className="mr-20">
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
