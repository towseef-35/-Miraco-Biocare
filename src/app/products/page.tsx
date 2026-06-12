import type { Metadata } from "next";
import ProductsHero from "@/components/products/ProductsHero";
import ProductPortfolio from "@/components/products/ProductPortfolio";
import CTASection from "@/components/products/CTASection";

export const metadata: Metadata = {
  title: "Products & Solutions | Miraco Biocare",
  description:
    "Explore Miraco Biocare's pharmaceutical solutions, biotechnology solutions, clinical diagnostics, laboratory equipment, research infrastructure, scientific instruments, laboratory consumables, and diagnostic technologies.",
};

export default function ProductsPage() {
  return (
    <main className="bg-white text-slate-950">
      <ProductsHero />
      <ProductPortfolio />
      <CTASection />
    </main>
  );
}
