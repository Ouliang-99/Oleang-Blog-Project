import "./App.css";
import { HomePage } from "./pagecomponent/HomePage";
import { ViewPostPage } from "./pagecomponent/ViewPostPage";
import { NotFoundPage } from "./pagecomponent/NotFoundPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:postId" element={<ViewPostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
