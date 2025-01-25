import { NavBar } from "@/component/semantic";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { CurrectCircle, XIcon } from "@/component/icon";
import { useUser } from "@/contexts/UserContext";

export function LoginPage() {
  const inputTags = ["Email", "Password"];
  const navigate = useNavigate();
  const { user, setUser } = useUser(); // เพิ่ม user จาก context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  // ตรวจสอบสถานะผู้ใช้
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleInputChange = (tag, value) => {
    const key = tag.toLowerCase();
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      // ดึงข้อมูลผู้ใช้
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .single();

      if (userError) {
        console.error("Error fetching user data", userError);
        return;
      }

      // เก็บข้อมูลผู้ใช้ใน context
      setUser(userData);

      setShowModal(true);
    } catch (err) {
      setError("Error Can't Log in");
      console.error(err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center mt-20">
        <div className="px-10 pt-16 bg-Brown-200 rounded-2xl w-2/3 h-[27rem]">
          <h1 className="text-center text-3xl font-bold">Log in</h1>
          <form
            onSubmit={handleLogin}
            className="w-full flex flex-col gap-3 mt-3"
          >
            {inputTags.map((tag) => (
              <div key={tag}>
                <p className="text-left">{tag}</p>
                <input
                  className="w-full justify-start items-start p-2 border border-gray-300 rounded-md"
                  type={tag === "Password" ? "password" : "text"}
                  placeholder={tag}
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
                Log in
              </button>
            </div>
          </form>
          <div className="flex flex-col justify-center gap-2 mt-5 sm:flex-row text-center">
            <p>Don't have any account?</p>
            <button onClick={() => navigate("/signup")} className="underline">
              Sign up
            </button>
          </div>
        </div>
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
                onClick={() => navigate("/")}
                className="bg-black text-white px-8 py-4 rounded-full"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}