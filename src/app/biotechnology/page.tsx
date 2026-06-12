import { DivisionPageTemplate } from "@/components/shared/DivisionPageTemplate";
import { createMetadata } from "@/lib/metadata";
import { biotechApplications } from "@/data/divisions-content";

export const metadata = createMetadata({
  title: "Biotechnology",
  description:
    "Biotechnology solutions for genomics, molecular biology, cell biology, and translational research.",
  path: "/biotechnology",
});

const biotechSections = [
  {
    title: "Molecular Biology",
    description:
      "Advanced tools for nucleic acid research, gene editing, and molecular diagnostics development.",
    items: [
      "PCR & Real-Time PCR Systems",
      "Nucleic Acid Extraction",
      "CRISPR & Gene Editing",
      "Cloning & Vector Systems",
      "Molecular Assay Development",
    ],
    applications: [
      "Gene expression studies",
      "Pathogen detection",
      "Genetic engineering",
    ],
  },
  {
    title: "Cell Biology",
    description:
      "Complete cell culture and analysis solutions for mammalian and stem cell research.",
    items: [
      "Cell Culture Systems",
      "CO₂ Incubators",
      "Cell Imaging Platforms",
      "Cell Viability Assays",
      "Stem Cell Technologies",
    ],
    applications: [
      "Cell line development",
      "Stem cell research",
      "Drug screening assays",
    ],
  },
  {
    title: "Protein & Biomarker Research",
    description:
      "Proteomics tools for protein analysis, biomarker discovery, and functional studies.",
    items: [
      "Protein Purification",
      "Western Blotting Systems",
      "ELISA Platforms",
      "Mass Spectrometry Prep",
      "Biomarker Panels",
    ],
    applications: [
      "Biomarker discovery",
      "Protein characterization",
      "Immunoassay development",
    ],
  },
  {
    title: "Translational Research",
    description:
      "Bridging basic research and clinical applications with integrated biotechnology workflows.",
    items: [
      "Biobanking Solutions",
      "Sample Management",
      "Multi-omics Integration",
      "Clinical Research Tools",
      "Bioprocessing Equipment",
    ],
    applications: [
      "Clinical trial support",
      "Biomarker validation",
      "Therapeutic development",
    ],
  },
];

export default function BiotechnologyPage() {
  return (
    <DivisionPageTemplate
      title="Biotechnology Solutions"
      subtitle="Enabling breakthroughs in genomics, molecular biology, and translational research"
      breadcrumb="Biotechnology"
      heroImage="/hero/banner-4.jpg"
      overview="Miraco Biocare enables breakthroughs in genomics, molecular biology, cell biology, and translational research through comprehensive biotechnology solutions. We provide researchers and biotechnology organizations with cutting-edge instruments, reagents, and application support to accelerate scientific discovery and therapeutic development."
      extraOverview="Providing innovative solutions for molecular biology, genomics, proteomics, cell biology, microbiology, and biotechnology research."
      sections={biotechSections}
      applications={biotechApplications}
      features={[
        "End-to-end biotechnology workflows",
        "Scalable research platforms",
        "Application scientist support",
        "Custom workflow development",
        "Training and protocol optimization",
        "Global technology partnerships",
      ]}
    />
  );
}
