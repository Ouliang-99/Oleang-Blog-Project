import { NavBar, HeroSection, Footer } from "../component/semantic";
import { ArticleSection } from "../component/ArticleSection";

export function HomePage() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </>
  );
}
