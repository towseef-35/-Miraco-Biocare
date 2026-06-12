import { DivisionPageTemplate } from "@/components/shared/DivisionPageTemplate";
import { createMetadata } from "@/lib/metadata";
import { diagnosticsSections } from "@/data/divisions-content";

export const metadata = createMetadata({
  title: "Clinical Diagnostics",
  description:
    "Advanced clinical diagnostic solutions including hematology, biochemistry, immunology, and molecular diagnostics.",
  path: "/clinical-diagnostics",
});

export default function ClinicalDiagnosticsPage() {
  return (
    <DivisionPageTemplate
      title="Clinical Diagnostics"
      subtitle="Advanced diagnostic technologies for accurate disease detection and patient management"
      breadcrumb="Clinical Diagnostics"
      heroImage="/hero/banner-2.jpg"
      overview="Miraco Biocare delivers comprehensive clinical diagnostic solutions that enable laboratories to provide accurate, timely, and reliable test results. Our portfolio spans hematology, clinical biochemistry, immunology, serology, and molecular diagnostics, supported by world-class instruments, reagents, and technical expertise."
      sections={diagnosticsSections}
      features={[
        "Complete diagnostic workflow solutions",
        "High-throughput automated systems",
        "Comprehensive reagent portfolios",
        "Infectious disease testing solutions",
        "Point-of-care diagnostic technologies",
        "LIS integration and connectivity",
        "Quality control and compliance support",
        "Application training and technical support",
      ]}
      ctaText="End-to-end diagnostic solutions for hospitals, clinical laboratories, and healthcare institutions."
    />
  );
}
