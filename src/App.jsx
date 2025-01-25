import "./App.css";
import { HomePage } from "./pagecomponent/HomePage";
import { ViewPostPage } from "./pagecomponent/ViewPostPage";
import { NotFoundPage } from "./pagecomponent/NotFoundPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pagecomponent/LoginPage";
import { SignupPage } from "./pagecomponent/SignupPage";
import { UserProfilePage } from "./pagecomponent/UserProfilePage";
import { ResetPasswordPage } from "./pagecomponent/ResetPasswordPage";
import { AdminLoginPage } from "./pagecomponent/AdminLoginPage";
import { ArticleManagement } from "./pagecomponent/ArticleManagement";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/posts/:postId" element={<ViewPostPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/article-management" element={<ArticleManagement />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
