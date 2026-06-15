import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import { ContactCTA } from "@/components/shared/ContactCTA";
import {
  diagnosticsSections,
  lifeSciencesSections,
} from "@/data/divisions-content";

const StatsSection = dynamic(
  () => import("@/components/home/StatsSection").then((mod) => mod.StatsSection),
  { ssr: true }
);

const DivisionsSection = dynamic(
  () => import("@/components/home/DivisionsSection").then((mod) => mod.DivisionsSection),
  { ssr: true }
);

const AboutSection = dynamic(
  () => import("@/components/home/AboutSection").then((mod) => mod.AboutSection),
  { ssr: true }
);

const ProductPortfolioSection = dynamic(
  () => import("@/components/home/ProductPortfolioSection").then((mod) => mod.ProductPortfolioSection),
  { ssr: true }
);

const SolutionPreview = dynamic(
  () => import("@/components/home/SolutionPreview").then((mod) => mod.SolutionPreview),
  { ssr: true }
);

const GenomicsSection = dynamic(
  () => import("@/components/home/GenomicsSection").then((mod) => mod.GenomicsSection),
  { ssr: true }
);

const WhyChooseUs = dynamic(
  () => import("@/components/home/WhyChooseUs").then((mod) => mod.WhyChooseUs),
  { ssr: true }
);

const IndustriesSection = dynamic(
  () => import("@/components/home/IndustriesSection").then((mod) => mod.IndustriesSection),
  { ssr: true }
);

const PartnersCarousel = dynamic(
  () => import("@/components/home/PartnersCarousel").then((mod) => mod.PartnersCarousel),
  { ssr: true }
);

const NewsSection = dynamic(
  () => import("@/components/home/NewsSection").then((mod) => mod.NewsSection),
  { ssr: true }
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
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
      <IndustriesSection />
      <PartnersCarousel />
      <NewsSection />
      <ContactCTA />
    </>
  );
}
