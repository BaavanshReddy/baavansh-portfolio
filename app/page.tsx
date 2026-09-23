import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MLSummary from "@/components/MLSummary";
import MLSystems from "@/components/MLSystems";
import Projects from "@/components/Projects";
import ChatBaavansh from "@/components/ChatBaavansh";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Leadership from "@/components/Leadership";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <MLSummary />
        <About />
        <MLSystems />
        <Projects />
        <ChatBaavansh />
        <Experience />
        <Skills />
        <Education />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
