export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "partnership-global-diagnostics-leader",
    title: "Miraco Biocare Partners with Global Diagnostics Leader",
    excerpt:
      "Strategic partnership expands access to advanced diagnostic technologies across India.",
    content:
      "Miraco Biocare Private Limited is pleased to announce a strategic partnership with a leading global diagnostics manufacturer. This collaboration will enable healthcare providers and clinical laboratories across India to access cutting-edge diagnostic instruments, reagents, and comprehensive technical support. The partnership reinforces our commitment to delivering world-class healthcare solutions and strengthening the diagnostic infrastructure in the region.",
    date: "2025-11-15",
    category: "Partnership",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    author: "Corporate Communications",
  },
  {
    slug: "new-genomics-laboratory-solutions",
    title: "Launch of Advanced Genomics Laboratory Solutions",
    excerpt:
      "Comprehensive NGS and genomic analysis platforms now available for research and clinical applications.",
    content:
      "Miraco Biocare has expanded its genomics portfolio with the introduction of advanced next-generation sequencing platforms and automated nucleic acid extraction systems. These solutions support whole genome sequencing, pharmacogenomics, and precision medicine applications. Our application support team is ready to assist laboratories in implementing these technologies for both research and clinical workflows.",
    date: "2025-10-28",
    category: "Product Launch",
    image:
      "https://images.unsplash.com/photo-1628595351029-2dd764c697d8?w=800&q=80",
    author: "Product Team",
  },
  {
    slug: "annual-life-sciences-symposium",
    title: "Annual Life Sciences Symposium 2025",
    excerpt:
      "Join leading scientists and healthcare professionals at our annual symposium on laboratory innovation.",
    content:
      "Miraco Biocare invites researchers, laboratory directors, and healthcare professionals to the Annual Life Sciences Symposium 2025. This event features keynote presentations on molecular diagnostics, genomics, and laboratory automation. Attendees will have the opportunity to explore the latest technologies, participate in workshops, and network with industry experts. Registration is now open for this premier scientific gathering.",
    date: "2025-09-10",
    category: "Event",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    author: "Events Team",
  },
  {
    slug: "iso-certification-renewal",
    title: "ISO Quality Certification Successfully Renewed",
    excerpt:
      "Miraco Biocare maintains its commitment to quality with renewed ISO certification.",
    content:
      "We are proud to announce the successful renewal of our ISO quality management certification. This achievement reflects our ongoing dedication to maintaining the highest standards in product quality, customer service, and operational excellence. Our quality management system ensures that every product and service we deliver meets rigorous international standards.",
    date: "2025-08-22",
    category: "Company News",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    author: "Quality Assurance",
  },
];

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((n) => n.slug === slug);
}
