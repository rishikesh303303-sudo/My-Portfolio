import Navbar from "./sections/Navbar/Navbar";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Skills from "./sections/Skills/Skills";
import SelectedWork from "./sections/SelectedWork/SelectedWork";
import Education from "./sections/Education/Education";
import Achievements from "./sections/Achievements/Achievements";

export default function App() {
  return (
    <>
      <Navbar />

      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <Skills />
      <SelectedWork />
      <Education />
      <Achievements />
    </>
  );
}