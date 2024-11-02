import "./App.css";
import { HomePage } from "./pagecomponent/HomePage";
import { ViewPostPage } from "./pagecomponent/ViewPostPage";
import { NotFoundPage } from "./pagecomponent/NotFoundPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pagecomponent/LoginPage";
import { SignupPage } from "./pagecomponent/SignupPage";
import { UserProfilePage } from "./pagecomponent/UserProfilePage";
import { ResetPasswordPage } from "./pagecomponent/ResetPasswordPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/posts/:postId" element={<ViewPostPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
