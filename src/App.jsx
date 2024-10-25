import "./App.css";
import { HeroSection, NavBar, Footer } from "./component/semantic";
import { ArticleSection } from "./component/ArticleSection";

function App() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </>
  );
}

export default App;
