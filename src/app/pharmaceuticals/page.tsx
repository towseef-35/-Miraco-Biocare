import { DivisionPageTemplate } from "@/components/shared/DivisionPageTemplate";
import { createMetadata } from "@/lib/metadata";
import { pharmaApplications } from "@/data/divisions-content";

export const metadata = createMetadata({
  title: "Pharmaceuticals",
  description:
    "Quality pharmaceutical products and healthcare solutions meeting the highest standards of safety and efficacy.",
  path: "/pharmaceuticals",
});

const pharmaSections = [
  {
    title: "Pharmaceutical Products",
    description:
      "GMP-compliant pharmaceutical products and active pharmaceutical ingredients sourced from certified manufacturers.",
    items: [
      "Active Pharmaceutical Ingredients (APIs)",
      "Excipients and Formulation Aids",
      "Finished Dosage Forms",
      "Generic Pharmaceuticals",
      "Specialty Pharmaceuticals",
    ],
    applications: [
      "Drug manufacturing",
      "Formulation development",
      "Quality control testing",
    ],
  },
  {
    title: "Healthcare Solutions",
    description:
      "Comprehensive healthcare products supporting hospitals, clinics, and healthcare institutions.",
    items: [
      "Hospital Supplies",
      "Medical Consumables",
      "Surgical Products",
      "Critical Care Products",
      "Cold chain storage solutions",
    ],
    applications: [
      "Hospital procurement",
      "Clinical care delivery",
      "Patient safety programs",
    ],
  },
  {
    title: "Quality & Compliance",
    description:
      "Products and services supporting regulatory compliance and quality assurance in pharmaceutical operations.",
    items: [
      "GMP Certified Products",
      "Batch Documentation",
      "Stability Testing Reagents",
      "Process Validation Materials",
      "Regulatory Support",
    ],
    applications: [
      "Regulatory submissions",
      "Quality management systems",
      "Audit preparation",
    ],
  },
  {
    title: "Research & Development",
    description:
      "Research-grade materials and reagents supporting pharmaceutical R&D and drug discovery programs.",
    items: [
      "Research Chemicals",
      "Reference Standards",
      "Cell Culture Media",
      "Analytical Reagents",
      "Drug Discovery Tools",
      "GMP-grade formulation reagents",
    ],
    applications: [
      "Preclinical research",
      "Method development",
      "Bioanalytical studies",
    ],
  },
];

export default function PharmaceuticalsPage() {
  return (
    <DivisionPageTemplate
      title="Pharmaceuticals"
      subtitle="Quality pharmaceutical products and healthcare solutions for regulatory compliance"
      breadcrumb="Pharmaceuticals"
      heroImage="/hero/banner-4.jpg"
      overview="Miraco Biocare supplies quality pharmaceutical products and healthcare solutions that meet the highest standards of safety, efficacy, and regulatory compliance. We partner with certified manufacturers to deliver GMP-compliant products, excipients, and healthcare supplies to pharmaceutical companies, hospitals, and healthcare institutions."
      extraOverview="Supporting pharmaceutical manufacturing, quality control, formulation development, and research laboratories with advanced instruments, laboratory equipment, and analytical solutions."
      sections={pharmaSections}
      applications={pharmaApplications}
      features={[
        "GMP-certified product portfolio",
        "Full regulatory documentation",
        "Batch traceability and quality assurance",
        "Reliable supply chain management",
        "Technical and regulatory support",
        "Custom procurement solutions",
      ]}
    />
  );
}
