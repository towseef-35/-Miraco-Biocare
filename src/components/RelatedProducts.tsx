"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { getRelatedMDLSProducts } from "@/lib/product-utils";

interface RelatedProductsProps {
  categorySlug: string;
  currentProductSlug: string;
}

export default function RelatedProducts({
  categorySlug,
  currentProductSlug,
}: RelatedProductsProps) {
  const related = getRelatedMDLSProducts(categorySlug, currentProductSlug);

  if (related.length === 0) return null;

  return (
    <section className="border-t border-slate-100 dark:border-slate-800/80 pt-12 mt-16">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 md:text-2xl">
            Related Products
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Other solutions and reagents from the same product category.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
