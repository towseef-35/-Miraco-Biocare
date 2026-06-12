import { HeroSection } from "@/components/home/HeroSection";
import { DivisionsSection } from "@/components/home/DivisionsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ProductPortfolioSection } from "@/components/home/ProductPortfolioSection";
import { SolutionPreview } from "@/components/home/SolutionPreview";
import { GenomicsSection } from "@/components/home/GenomicsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { PartnersCarousel } from "@/components/home/PartnersCarousel";
import { NewsSection } from "@/components/home/NewsSection";
import { ContactCTA } from "@/components/shared/ContactCTA";
import {
  diagnosticsSections,
  lifeSciencesSections,
} from "@/data/divisions-content";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DivisionsSection />
      <AboutSection />
      <ProductPortfolioSection />
      <SolutionPreview
        label="Clinical Diagnostics"
        title="Advanced Diagnostic Solutions"
        description="Comprehensive diagnostic technologies for accurate disease detection and patient management."
        sections={diagnosticsSections}
        href="/clinical-diagnostics"
      />
      <SolutionPreview
        label="Life Sciences"
        title="Research & Laboratory Solutions"
        description="World-class instruments and reagents supporting scientific innovation and discovery."
        sections={lifeSciencesSections}
        href="/life-sciences"
        variant="alt"
      />
      <GenomicsSection />
      <WhyChooseUs />
      <PartnersCarousel />
      <NewsSection />
      <ContactCTA />
    </>
  );
}
