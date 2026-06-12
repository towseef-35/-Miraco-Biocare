export interface Product {
  slug: string;
  name: string;
  category: string;
  division: string;
  description: string;
  features: string[];
  applications: string[];
  image: string;
}

export const productCategories = [
  "All",
  "Diagnostics",
  "Life Sciences",
  "Genomics",
  "Pharmaceuticals",
  "Biotechnology",
];

export const products: Product[] = [
  {
    slug: "hematology-analyzer",
    name: "Advanced Hematology Analyzer",
    category: "diagnostics",
    division: "Clinical Diagnostics",
    description:
      "Fully automated hematology analyzer delivering accurate CBC results with advanced flagging algorithms for clinical laboratories.",
    features: [
      "High throughput processing",
      "Advanced abnormal cell detection",
      "Integrated quality control",
      "LIS connectivity",
    ],
    applications: [
      "Complete Blood Count",
      "Differential analysis",
      "Reticulocyte counting",
      "Hematological disease screening",
    ],
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80",
  },
  {
    slug: "clinical-chemistry-system",
    name: "Clinical Chemistry System",
    category: "diagnostics",
    division: "Clinical Diagnostics",
    description:
      "Modular clinical chemistry platform for comprehensive biochemical testing with exceptional precision and reliability.",
    features: [
      "Modular architecture",
      "Broad test menu",
      "Random access sampling",
      "Automated calibration",
    ],
    applications: [
      "Liver function tests",
      "Kidney function tests",
      "Lipid profiles",
      "Cardiac markers",
    ],
    image:
      "https://images.unsplash.com/photo-1582719471137-c3967ffeb8cb?w=800&q=80",
  },
  {
    slug: "immunoassay-platform",
    name: "Immunoassay Platform",
    category: "diagnostics",
    division: "Clinical Diagnostics",
    description:
      "High-sensitivity immunoassay system for infectious disease, hormone, and tumor marker testing.",
    features: [
      "Chemiluminescent detection",
      "Wide assay menu",
      "High sensitivity",
      "STAT testing capability",
    ],
    applications: [
      "Infectious disease testing",
      "Hormone analysis",
      "Tumor marker detection",
      "Autoimmune screening",
    ],
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9db3851bc?w=800&q=80",
  },
  {
    slug: "real-time-pcr-system",
    name: "Real-Time PCR System",
    category: "life-sciences",
    division: "Life Sciences",
    description:
      "Precision real-time PCR platform for gene expression analysis, pathogen detection, and molecular diagnostics.",
    features: [
      "Multi-channel detection",
      "Fast thermal cycling",
      "Intuitive software",
      "Flexible assay design",
    ],
    applications: [
      "Gene expression analysis",
      "Pathogen detection",
      "SNP genotyping",
      "Viral load quantification",
    ],
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80",
  },
  {
    slug: "flow-cytometer",
    name: "Flow Cytometry System",
    category: "life-sciences",
    division: "Life Sciences",
    description:
      "Advanced flow cytometry platform for immunophenotyping, cell sorting, and multi-parameter analysis.",
    features: [
      "Multi-laser configuration",
      "High-speed acquisition",
      "Automated compensation",
      "Cell sorting capability",
    ],
    applications: [
      "Immunophenotyping",
      "Apoptosis studies",
      "Oncology research",
      "Stem cell analysis",
    ],
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
  },
  {
    slug: "ngs-sequencer",
    name: "Next Generation Sequencer",
    category: "genomics",
    division: "Genomics",
    description:
      "High-throughput NGS platform enabling whole genome sequencing, exome sequencing, and targeted panel analysis.",
    features: [
      "High data output",
      "Scalable throughput",
      "Comprehensive bioinformatics",
      "Clinical-grade accuracy",
    ],
    applications: [
      "Whole genome sequencing",
      "Exome sequencing",
      "RNA sequencing",
      "Pharmacogenomics",
    ],
    image:
      "https://images.unsplash.com/photo-1628595351029-2dd764c697d8?w=800&q=80",
  },
  {
    slug: "nucleic-acid-extractor",
    name: "Automated Nucleic Acid Extractor",
    category: "genomics",
    division: "Genomics",
    description:
      "Automated system for high-quality DNA and RNA extraction from diverse sample types.",
    features: [
      "Hands-free automation",
      "High purity yields",
      "Multiple sample types",
      "Contamination control",
    ],
    applications: [
      "Genomic DNA extraction",
      "RNA isolation",
      "Pathogen nucleic acid prep",
      "NGS library prep",
    ],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
  },
  {
    slug: "cell-culture-incubator",
    name: "CO₂ Cell Culture Incubator",
    category: "biotechnology",
    division: "Biotechnology",
    description:
      "Precision-controlled incubator for mammalian cell culture with uniform temperature and CO₂ management.",
    features: [
      "Precise CO₂ control",
      "HEPA filtration",
      "Uniform temperature",
      "Decontamination cycle",
    ],
    applications: [
      "Mammalian cell culture",
      "Stem cell research",
      "Primary cell isolation",
      "Vaccine development",
    ],
    image:
      "https://images.unsplash.com/photo-1579154341094-9e3e42f9e9f4?w=800&q=80",
  },
  {
    slug: "pharma-grade-reagents",
    name: "Pharmaceutical Grade Reagents",
    category: "pharmaceuticals",
    division: "Pharmaceuticals",
    description:
      "GMP-compliant pharmaceutical reagents and excipients for drug manufacturing and quality control.",
    features: [
      "GMP certified",
      "Full documentation",
      "Batch traceability",
      "Regulatory compliance",
    ],
    applications: [
      "Drug formulation",
      "Quality control testing",
      "Stability studies",
      "Process validation",
    ],
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (!category || category === "all") return products;
  return products.filter((p) => p.category === category.toLowerCase());
}
