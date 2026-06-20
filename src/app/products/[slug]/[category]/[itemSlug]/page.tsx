import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Check, 
  ArrowLeft, 
  Info, 
  Settings, 
  ListCollapse, 
  Sparkles,
  FlaskConical,
  Activity,
  CheckCircle2
} from "lucide-react";
import SafeImage from "@/components/shared/SafeImage";
import ProductBreadcrumb from "@/components/ProductBreadcrumb";
import RelatedProducts from "@/components/RelatedProducts";
import ProductActions from "@/components/ProductActions";
import { createMetadata } from "@/lib/metadata";
import { getMDLSProducts, getMDLSProductBySlug } from "@/lib/product-utils";
import { buttonVariants } from "@/components/ui/button";
import { enrichProduct } from "@/lib/product-enricher";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    slug: string;       // divisionSlug (e.g. life-sciences)
    category: string;   // categorySlug (e.g. purification-kits)
    itemSlug: string;   // product slug (e.g. sciphi-genomic-dna-purification-kit)
  }>;
}

// Pre-render all 56 molecular diagnostics and life sciences pages statically
export async function generateStaticParams() {
  const mdlsProducts = getMDLSProducts();
  return mdlsProducts.map((p) => ({
    slug: p.divisionSlug,
    category: p.categorySlug,
    itemSlug: p.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: divisionSlug, category: categorySlug, itemSlug: productSlug } = await params;
  const product = getMDLSProductBySlug(divisionSlug, categorySlug, productSlug);
  if (!product) return {};

  return createMetadata({
    title: `${product.name} | ${product.category}`,
    description: product.description,
    path: `/products/${divisionSlug}/${categorySlug}/${productSlug}`,
  });
}

// Beautiful icon card selector for Key Features
const FEATURE_ICONS = [
  FlaskConical,
  Activity,
  Settings,
  Sparkles,
  CheckCircle2
];

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug: divisionSlug, category: categorySlug, itemSlug: productSlug } = await params;
  const rawProduct = getMDLSProductBySlug(divisionSlug, categorySlug, productSlug);
  if (!rawProduct) notFound();
  const product = enrichProduct(rawProduct);

  // JSON-LD Product Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": `https://www.miracobiocare.com${product.image}`,
    "description": product.description,
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": "SciPhi™"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "0.00",
      "highPrice": "0.00",
      "offerCount": "1",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-0 pb-20">
        <div className="container-custom space-y-6">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/80 pb-4">
            <ProductBreadcrumb
              items={[
                { label: "Products", href: "/products" },
                { label: "Diagnostics & Life Sciences", href: "/products/molecular-diagnostics-life-sciences" },
                { label: product.category },
                { label: product.name }
              ]}
            />
            <Link
              href="/products/molecular-diagnostics-life-sciences"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-slate-500 hover:text-brand-primary w-fit self-start sm:self-center"
              )}
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back to Catalog
            </Link>
          </div>

          {/* Main Product Layout Grid */}
          <div className="grid gap-10 lg:grid-cols-12 items-start mt-6">
            
            {/* Left Column: Sticky Product Image & Actions */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-md dark:border-slate-800/80 dark:bg-slate-900/60 p-4">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </div>
              </div>

              {/* Quick Contact & Info Card */}
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/65 rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Product Actions
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Generate technical documents or submit an RFQ quotation request for this product.
                </p>
                <ProductActions product={product} />
              </div>
            </div>

            {/* Right Column: Detailed Product Specifications */}
            <div className="lg:col-span-7 space-y-8">
              {/* Product Header */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge className="bg-slate-900 dark:bg-slate-800 text-white uppercase text-[10px] tracking-wider py-0.5 px-2.5">
                    {product.division}
                  </Badge>
                  <Badge className="bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 hover:bg-brand-primary/10 text-xs py-0.5 px-2.5 font-semibold">
                    {product.category}
                  </Badge>
                  {product.subCategory && (
                    <Badge className="bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400 border border-slate-200 dark:border-slate-800 text-xs py-0.5 px-2.5 font-normal">
                      {product.subCategory}
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-3xl md:text-4xl leading-tight">
                  {product.name}
                </h1>
                <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed md:text-lg">
                  {product.description}
                </p>
              </div>

              {/* Key Features Section - Icon Cards */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-primary">
                  <Info className="h-4 w-4" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                    Key Features &amp; Capabilities
                  </h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {product.features?.map((feature, index) => {
                    const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
                    return (
                      <div 
                        key={feature} 
                        className="bg-white dark:bg-slate-900/30 border border-slate-200/80 dark:border-slate-855 rounded-xl p-4 flex gap-3.5 items-start shadow-sm"
                      >
                        <div className="p-2 rounded-lg bg-brand-primary/5 dark:bg-brand-primary/10 text-brand-primary shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-350 leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Benefits Section */}
              {product.benefits && product.benefits.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-500">
                    <CheckCircle2 className="h-4 w-4" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                      Scientific &amp; Operational Benefits
                    </h3>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5 space-y-3.5">
                    {product.benefits.map((benefit) => (
                      <div key={benefit} className="flex gap-3 items-start">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications - Table */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-brand-secondary">
                    <Settings className="h-4 w-4" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                      Technical Specifications
                    </h3>
                  </div>
                  <div className="border border-slate-200/80 dark:border-slate-850 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-slate-900/20">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
                          <th className="p-4 font-bold text-slate-800 dark:text-slate-200 w-1/3">Parameter</th>
                          <th className="p-4 font-bold text-slate-800 dark:text-slate-200">Specification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(product.specs).map(([key, value], idx) => (
                          <tr 
                            key={key} 
                            className={cn(
                              "border-b border-slate-200/60 dark:border-slate-800/60 last:border-none",
                              idx % 2 === 1 ? "bg-slate-50/40 dark:bg-slate-900/10" : ""
                            )}
                          >
                            <td className="p-4 font-semibold text-slate-600 dark:text-slate-450">{key}</td>
                            <td className="p-4 text-slate-700 dark:text-slate-300 leading-relaxed">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Applications Section */}
              {product.applications && product.applications.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-brand-primary">
                    <ListCollapse className="h-4 w-4" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                      Laboratory Use Cases &amp; Applications
                    </h3>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {product.applications.map((app) => (
                      <div 
                        key={app} 
                        className="flex gap-2.5 items-center p-3 rounded-lg bg-slate-100/50 dark:bg-slate-900/20 border border-slate-200/50 dark:border-slate-850"
                      >
                        <div className="h-2 w-2 rounded-full bg-brand-primary shrink-0" />
                        <span className="text-sm font-medium text-slate-650 dark:text-slate-350">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}              {/* CTA Section (Download/Brochure) */}
              {/* <div 
                id="brochure"
                className="bg-gradient-to-r from-slate-900 via-slate-855 to-brand-primary/95 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-slate-800"
              >
                <div className="space-y-1.5 max-w-md">
                  <h3 className="text-lg font-bold md:text-xl">Technical Datasheet</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Generate and download a comprehensive datasheet including features, benefits, specifications, quality control and contact info for {product.name}.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 items-center shrink-0">
                  <Link
                    href={`/request-quotation?product=${product.slug}`}
                    className={cn(
                      buttonVariants({ size: "default" }),
                      "bg-white hover:bg-slate-100 text-slate-900 font-bold px-5"
                    )}
                  >
                    Request Quote
                  </Link>
                  <ProductActions product={product} layout="download-only" />
                </div>
              </div> */}

            </div>
          </div>

          {/* Related Products Section */}
          <RelatedProducts
            categorySlug={product.categorySlug || ""}
            currentProductSlug={product.slug}
          />
        </div>
      </div>
    </>
  );
}
