import type { Metadata } from "next";

const siteUrl = "https://www.miracobiocare.com";
const siteName = "Miraco Biocare Private Limited";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Healthcare, Diagnostics & Life Sciences`,
    template: `%s | ${siteName}`,
  },
  description:
    "Miraco Biocare Private Limited is a trusted provider of innovative healthcare, pharmaceutical, diagnostics, and life science solutions for clinical laboratories, research institutions, and healthcare providers.",
  keywords: [
    "healthcare",
    "diagnostics",
    "life sciences",
    "biotechnology",
    "pharmaceuticals",
    "clinical laboratory",
    "genomics",
    "Miraco Biocare",
    "Pharmaceutical Solutions",
    "Biotechnology Solutions",
    "Clinical Diagnostics",
    "Laboratory Equipment",
    "Research Infrastructure",
    "Healthcare Solutions",
    "Life Sciences Solutions",
    "Scientific Instruments",
    "Laboratory Consumables",
    "Diagnostic Technologies",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName,
    title: siteName,
    description:
      "Advancing healthcare through innovation, diagnostics, and life science solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function createMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${path}`,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: `${siteUrl}${path}`,
    },
  };
}
