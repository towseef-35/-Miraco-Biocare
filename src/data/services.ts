export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  benefits: string[];
  image: string;
}

export const services: Service[] = [
  {
    slug: "installation-support",
    title: "Installation & Setup",
    description:
      "Professional installation and commissioning of laboratory instruments and diagnostic systems by certified engineers.",
    icon: "Wrench",
    features: [
      "Site assessment and preparation",
      "Equipment installation and calibration",
      "System validation and testing",
      "User orientation sessions",
    ],
    benefits: [
      "Minimized downtime",
      "Optimal instrument performance",
      "Compliance with manufacturer specifications",
      "Smooth laboratory workflow integration",
    ],
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
  },
  {
    slug: "training-programs",
    title: "Training Programs",
    description:
      "Comprehensive training programs for laboratory staff covering instrument operation, maintenance, and application protocols.",
    icon: "GraduationCap",
    features: [
      "On-site and virtual training options",
      "Application-specific protocols",
      "Troubleshooting workshops",
      "Certification upon completion",
    ],
    benefits: [
      "Enhanced staff competency",
      "Improved test accuracy",
      "Reduced operational errors",
      "Maximized instrument utilization",
    ],
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  },
  {
    slug: "maintenance-services",
    title: "Maintenance & Support",
    description:
      "Preventive and corrective maintenance services to ensure continuous operation and longevity of your laboratory equipment.",
    icon: "Settings",
    features: [
      "Scheduled preventive maintenance",
      "Emergency repair services",
      "Genuine spare parts supply",
      "Performance verification",
    ],
    benefits: [
      "Extended equipment lifespan",
      "Reduced unexpected failures",
      "Consistent result quality",
      "Regulatory compliance support",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  },
  {
    slug: "laboratory-consulting",
    title: "Laboratory Consulting",
    description:
      "Expert consulting services for laboratory design, workflow optimization, and technology selection.",
    icon: "Lightbulb",
    features: [
      "Laboratory layout planning",
      "Workflow optimization",
      "Technology assessment",
      "Regulatory guidance",
    ],
    benefits: [
      "Optimized laboratory efficiency",
      "Cost-effective technology investments",
      "Improved turnaround times",
      "Enhanced quality management",
    ],
    image:
      "https://images.unsplash.com/photo-1582719471137-c3967ffeb8cb?w=800&q=80",
  },
  {
    slug: "application-support",
    title: "Application Support",
    description:
      "Dedicated application scientists providing technical guidance for assay development, validation, and optimization.",
    icon: "FlaskConical",
    features: [
      "Assay development support",
      "Protocol optimization",
      "Troubleshooting assistance",
      "Literature and resources",
    ],
    benefits: [
      "Accelerated method development",
      "Reliable assay performance",
      "Access to scientific expertise",
      "Improved research outcomes",
    ],
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9db3851bc?w=800&q=80",
  },
  {
    slug: "supply-chain-management",
    title: "Supply Chain Management",
    description:
      "Reliable supply chain solutions for reagents, consumables, and spare parts with inventory management support.",
    icon: "Truck",
    features: [
      "Timely product delivery",
      "Inventory planning assistance",
      "Cold chain logistics",
      "Bulk ordering programs",
    ],
    benefits: [
      "Uninterrupted laboratory operations",
      "Cost savings through planning",
      "Quality-assured products",
      "Simplified procurement",
    ],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
