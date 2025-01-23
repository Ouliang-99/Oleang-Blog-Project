import { NavBar } from "@/component/semantic";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CurrectCircle, XIcon } from "@/component/icon";

export function SignupPage() {
  const inputTags = ["Name", "Username", "Email", "Password"];
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (tag, value) => {
    const key = tag.toLowerCase();
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please Fill All Required Data");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error);
        return;
      }

      setShowModal(true);
    } catch (err) {
      setError("Error Can't Sign Up!");
      console.error(err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center mt-20">
        <div className="px-10 pt-10 bg-Brown-200 rounded-2xl w-2/3 h-[35rem]">
          <h1 className="text-center text-3xl font-bold">Sign Up</h1>
          <form
            onSubmit={handleSignUp}
            className="w-full flex flex-col gap-3 mt-3"
          >
            {inputTags.map((tag) => (
              <div key={tag}>
                <p className="text-left">{tag}</p>
                <input
                  className="w-full justify-start items-start p-2 border border-gray-300 rounded-md"
                  type={tag === "Password" ? "password" : "text"}
                  autoComplete={tag === "Password" ? "off" : "on"}
                  placeholder={`Please input your ${tag}`}
                  value={formData[tag.toLowerCase()]}
                  onChange={(e) => handleInputChange(tag, e.target.value)}
                />
              </div>
            ))}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-4 px-6 rounded-full bg-black text-white py-2 hover:bg-gray-800"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex flex-col justify-center text-center gap-2 mt-5 sm:flex-row">
            <p>
              Already have an account?
              <br className="sm:hidden" /> Yes or Not ?
            </p>
            <button onClick={() => navigate("/login")} className="underline">
              Log in
            </button>

            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
                <div className="gap-6 bg-white flex flex-col items-center rounded-xl px-6 py-20 text-center relative">
                  <CurrectCircle />
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-7 right-7 text-black"
                  >
                    <XIcon />
                  </button>
                  <h2 className="mx-20 text-4xl font-semibold">
                    Sign Up Completed !
                  </h2>
                  <button
                    onClick={() => navigate("/login")}
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
