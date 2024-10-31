import { NavBar } from "@/component/semantic";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const inputTags = ["Email", "Password"];
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center mt-20">
        <div className="px-10 pt-16 bg-Brown-200 rounded-2xl w-2/3 h-[27rem]">
          <h1 className="text-center text-3xl font-bold">Log in</h1>
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
            <button className="mt-4 px-6 rounded-full bg-black text-white py-2 hover:bg-gray-800">
              Log in
            </button>
          </div>
          <div className="flex flex-col justify-center gap-2 mt-5 sm:flex-row text-center">
            <p>Don’t have<br className="sm:hidden"/> any account?</p>
            <button onClick={() => navigate("/signup")} className=" underline">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
