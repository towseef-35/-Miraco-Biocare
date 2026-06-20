import React, { Suspense } from "react";
import type { Metadata } from "next";
import MDLSCatalogClient from "./MDLSCatalogClient";
import { createMetadata } from "@/lib/metadata";
import { getMDLSProducts } from "@/lib/product-utils";

export const metadata: Metadata = createMetadata({
  title: "Molecular Diagnostics & Life Sciences",
  description:
    "Explore Miraco Biocare's advanced molecular diagnostics and life science products, including PCR kits, DNA/RNA purification, PCR master mixes, and clinical assay panels.",
  path: "/products/molecular-diagnostics-life-sciences",
});

export default function MolecularDiagnosticsLifeSciencesPage() {
  const mdlsProducts = getMDLSProducts();

  // Create JSON-LD Structured Data for search engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Molecular Diagnostics & Life Sciences | Miraco Biocare",
    "description": "Advanced molecular diagnostic assays and life science research solutions designed for clinical, research, and biotechnology laboratories.",
    "url": "https://www.miracobiocare.com/products/molecular-diagnostics-life-sciences",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": mdlsProducts.length,
      "itemListElement": mdlsProducts.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "description": product.description,
          "image": `https://www.miracobiocare.com${product.image}`,
          "url": `https://www.miracobiocare.com/products/${product.divisionSlug}/${product.categorySlug}/${product.slug}`,
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "USD",
            "price": "0.00",
            "priceValidUntil": "2027-12-31"
          }
        }
      }))
    }
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Suspense fallback={null}>
        <MDLSCatalogClient />
      </Suspense>
    </>
  );
}
