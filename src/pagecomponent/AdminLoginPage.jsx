import { useNavigate } from "react-router-dom";

export function AdminLoginPage() {
  const inputTags = ["Email", "Password"];
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center items-center mt-20">
        <div className="px-10 pt-16 bg-Brown-200 rounded-2xl w-2/3 h-[27rem]">
          <h2 className="text-center text-orange-300">Admin panel</h2>
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
            <button
              onClick={() => navigate("/article-management")}
              className="mt-4 px-6 rounded-full bg-black text-white py-2 hover:bg-gray-800"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
