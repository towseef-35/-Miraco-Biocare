import { DivisionPageTemplate } from "@/components/shared/DivisionPageTemplate";
import { ResearchInfrastructureSection } from "@/components/shared/ResearchInfrastructureSection";
import { createMetadata } from "@/lib/metadata";
import { lifeSciencesSections } from "@/data/divisions-content";

export const metadata = createMetadata({
  title: "Life Sciences",
  description:
    "Life sciences research solutions including molecular biology, cell biology, proteomics, and flow cytometry.",
  path: "/life-sciences",
});

const sectionsWithDescriptions = lifeSciencesSections.map((s) => ({
  ...s,
  description: `Comprehensive ${s.title.toLowerCase()} solutions supporting advanced research and discovery.`,
}));

export default function LifeSciencesPage() {
  return (
    <DivisionPageTemplate
      title="Life Sciences & Research"
      subtitle="World-class instruments, reagents, and laboratory solutions for scientific innovation"
      breadcrumb="Life Sciences"
      heroImage="/hero/banner-3.jpg"
      overview="Miraco Biocare supports scientific innovation through a comprehensive portfolio of life sciences instruments, reagents, consumables, cold storage, and laboratory solutions. We partner with leading global manufacturers to provide researchers with the tools they need for breakthrough discoveries in molecular biology, cell biology, proteomics, and flow cytometry."
      extraOverview="Providing innovative solutions for molecular biology, genomics, proteomics, cell biology, microbiology, and biotechnology research across academic and industry settings."
      sections={sectionsWithDescriptions}
      additionalSections={<ResearchInfrastructureSection />}
      features={[
        "Cutting-edge research instrumentation",
        "High-quality reagents and consumables",
        "Application development support",
        "Training and workflow optimization",
        "Custom solution configurations",
        "Reliable supply chain management",
      ]}
    />
  );
}
