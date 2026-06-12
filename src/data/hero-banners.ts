export interface HeroBanner {
  id: number;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
}

export const heroBanners: HeroBanner[] = [
  {
    id: 1,
    image: "/hero/banner-1.jpg",
    alt: "Healthcare professionals collaborating in a clinical setting",
    title:
      "Advancing Healthcare Through Innovation, Diagnostics, and Life Science Solutions",
    subtitle:
      "Miraco Biocare is a trusted provider of innovative healthcare, pharmaceutical, diagnostics, and life science solutions partnering with leading global manufacturers.",
  },
  {
    id: 2,
    image: "/hero/banner-2.jpg",
    alt: "Advanced clinical diagnostics laboratory with modern analyzers",
    title: "Precision Diagnostics for Better Patient Outcomes",
    subtitle:
      "Delivering advanced hematology, biochemistry, immunology, and molecular diagnostic technologies for accurate disease detection and monitoring.",
  },
  {
    id: 3,
    image: "/hero/banner-3.jpg",
    alt: "Life sciences research laboratory with scientific instrumentation",
    title: "Empowering Scientific Discovery & Research Excellence",
    subtitle:
      "World-class instruments, reagents, and laboratory solutions supporting molecular biology, cell biology, proteomics, and genomics research.",
  },
  {
    id: 4,
    image: "/hero/banner-4.jpg",
    alt: "Laboratory technology and scientific research equipment",
    title: "Unlocking the Power of Genomic Science",
    subtitle:
      "High-performance NGS platforms and genomic workflows for precision medicine, pharmacogenomics, and clinical genomics applications.",
  },
];
