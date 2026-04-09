import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Laboratory from "@/components/sections/Laboratory";
import Sectors from "@/components/sections/Sectors";
import Team from "@/components/sections/Team";
import Guarantees from "@/components/sections/Guarantees";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Interstice from "@/components/sections/Interstice";
import SectionDivider from "@/components/ui/section-divider";

export default function Home() {
  return (
    <main id="contenu-principal" className="bg-[var(--bg-primary)]">
      <Navbar />
      <Hero />

      <SectionDivider variant="numeral" number="01" label="Ce qu'on fait" />
      <Services />

      <Interstice />

      <SectionDivider variant="numeral" number="02" label="Démo en direct" />
      <Laboratory />

      <SectionDivider variant="dots" />
      <Sectors />

      <SectionDivider variant="numeral" number="03" label="Qui on est" />
      <Team />

      <SectionDivider variant="ornament" />
      <Guarantees />

      <SectionDivider variant="dots" />
      <Contact />

      <Footer />
    </main>
  );
}
