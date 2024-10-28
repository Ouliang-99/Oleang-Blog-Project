import { NavBar, Footer } from "@/component/semantic";
import { WarningIcon } from "@/component/icon";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <WarningIcon />
        <h1 className="mt-4 text-2xl font-semibold">NotFoundPage</h1>
        <button
          onClick={() => navigate("/")}
          className="mt-5 p-6 bg-black rounded-3xl text-white hover:bg-gray-700"
        >
          Go to Homepage
        </button>
      </div>
      <Footer />
    </>
  );
}
