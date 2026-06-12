export interface ProductPortfolioCategory {
  title: string;
  description: string;
  items: string[];
}

export const productPortfolio: ProductPortfolioCategory[] = [
  {
    title: "Laboratory Instruments",
    description:
      "State-of-the-art scientific instruments and laboratory instruments designed to deliver precision and reproducibility for advanced research, diagnostics, and quality control applications.",
    items: [
      "Centrifuges",
      "PCR Systems",
      "Thermal Cyclers",
      "Spectrophotometers",
      "Microplate Readers",
      "Homogenizers",
      "Incubators",
      "Shakers & Mixers",
    ],
  },
  {
    title: "Cold Chain Solutions",
    description:
      "Highly reliable cold chain solutions and storage systems engineered to safeguard sensitive vaccines, biological samples, and research reagents at precise temperatures.",
    items: [
      "Biomedical Refrigerators",
      "Blood Bank Refrigerators",
      "Vaccine Storage Systems",
      "Ultra-Low Temperature Freezers",
      "Cryogenic Storage Systems",
    ],
  },
  {
    title: "Diagnostic Systems",
    description:
      "Advanced diagnostic equipment and systems designed for clinical laboratories and medical facilities, supporting molecular diagnostics and accurate patient care.",
    items: [
      "Hematology Analyzers",
      "Biochemistry Analyzers",
      "Immunology Platforms",
      "Molecular Diagnostic Systems",
      "Diagnostic Reagents",
      "Quality Controls & Calibrators",
    ],
  },
  {
    title: "Laboratory Consumables",
    description:
      "Premium laboratory consumables and plasticware supporting standard laboratory assays, cell culture workflows, and clinical diagnostics.",
    items: [
      "Pipette Tips",
      "Tubes & Plates",
      "Cell Culture Consumables",
      "Filtration Products",
      "Cryogenic Storage Products",
      "Laboratory Plasticware",
    ],
  },
  {
    title: "Chemicals & Reagents",
    description:
      "High-purity research reagents, buffers, and chemicals tailored for molecular biology, cell culture, bioprocess development, and biotechnology solutions.",
    items: [
      "Molecular Biology Reagents",
      "Cell Culture Media",
      "Research Chemicals",
      "Diagnostic Reagents",
      "Laboratory Buffers",
      "Reference Standards",
    ],
  },
];
