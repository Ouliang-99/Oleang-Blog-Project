import "./App.css";
import { HeroSection, NavBar,Footer,} from "./component/semantic";
import {ArticleSection, AllBlogCard} from "./component/ArticleSection"



function App() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <ArticleSection/>
      <AllBlogCard/>
      <Footer/>
    </>
  );
}

export default App;
