import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Benchmarks } from "@/components/sections/benchmarks";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col">
        <Hero />
        <Marquee />
        <Projects />
        <Skills />
        <Services />
        <Certifications />
        <Benchmarks />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
