import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { BackToTop } from "@/components/sections/BackToTop";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Portfolio />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
