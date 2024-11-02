import { NavBar } from "@/component/semantic";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CurrectCircle ,XIcon  } from "@/component/icon";

export function SignupPage() {
  const inputTags = ["Name", "Username", "Email", "Password"];
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleSignUp = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center mt-20">
        <div className="px-10 pt-10 bg-Brown-200 rounded-2xl w-2/3 h-[35rem]">
          <h1 className="text-center text-3xl font-bold">Sign up</h1>
          <div className="w-full flex flex-col gap-3 mt-3">
            {inputTags.map((index) => (
              <div key={index}>
                <p className="text-left">{index}</p>
                <input
                  className=" w-full justify-start items-start p-2 border border-gray-300 rounded-md"
                  type="text"
                  placeholder={`Enter your ${index.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSignUp}
              className="mt-4 px-6 rounded-full bg-black text-white py-2 hover:bg-gray-800"
            >
              Sign up
            </button>
          </div>
          <div className="flex flex-col justify-center text-center gap-2 mt-5 sm:flex-row">
            <p>
              Already have
              <br className="sm:hidden" /> an account?
            </p>
            <button onClick={() => navigate("/signup")} className=" underline">
              Log in
            </button>

            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
                <div className=" gap-6 bg-white flex flex-col items-center rounded-xl px-6 py-20 text-center relative">
                  <CurrectCircle/>
                  <button
                    onClick={closeModal}
                    className="   absolute top-7 right-7 text-black"
                  >
                    <XIcon />
                  </button>
                  <h2 className="mx-20 text-4xl font-semibold">
                    Registration success
                  </h2>
                  <button
                    onClick={() => navigate("/signup")}
                    className="bg-black text-white px-8 py-4 rounded-full"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
