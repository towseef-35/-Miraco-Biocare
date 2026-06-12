export interface Career {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export const careers: Career[] = [
  {
    slug: "application-scientist",
    title: "Application Scientist – Life Sciences",
    department: "Technical Support",
    location: "Hyderabad, India",
    type: "Full-time",
    description:
      "Join our technical team as an Application Scientist supporting life sciences customers with product demonstrations, training, and application development.",
    responsibilities: [
      "Provide technical support and product demonstrations",
      "Conduct customer training sessions",
      "Develop and optimize application protocols",
      "Collaborate with sales team on customer engagements",
    ],
    requirements: [
      "MSc or PhD in Life Sciences or related field",
      "3+ years experience in molecular biology or cell biology",
      "Excellent communication and presentation skills",
      "Willingness to travel within assigned territory",
    ],
  },
  {
    slug: "sales-executive-diagnostics",
    title: "Sales Executive – Clinical Diagnostics",
    department: "Sales",
    location: "Multiple Locations",
    type: "Full-time",
    description:
      "Drive sales of clinical diagnostic products and solutions to hospitals, laboratories, and healthcare institutions.",
    responsibilities: [
      "Identify and develop new business opportunities",
      "Manage existing customer relationships",
      "Achieve sales targets and KPIs",
      "Coordinate with technical and service teams",
    ],
    requirements: [
      "Bachelor's degree in Life Sciences or Business",
      "2+ years experience in diagnostic or medical device sales",
      "Strong negotiation and relationship-building skills",
      "Valid driver's license",
    ],
  },
  {
    slug: "service-engineer",
    title: "Service Engineer – Laboratory Instruments",
    department: "Service",
    location: "Hyderabad, India",
    type: "Full-time",
    description:
      "Install, maintain, and repair laboratory instruments ensuring optimal performance and customer satisfaction.",
    responsibilities: [
      "Perform installation and commissioning of instruments",
      "Conduct preventive and corrective maintenance",
      "Provide technical troubleshooting support",
      "Maintain service documentation and reports",
    ],
    requirements: [
      "Diploma or degree in Electronics/Biomedical Engineering",
      "2+ years experience servicing laboratory equipment",
      "Strong analytical and problem-solving skills",
      "Customer-oriented approach",
    ],
  },
];

export function getCareerBySlug(slug: string): Career | undefined {
  return careers.find((c) => c.slug === slug);
}
