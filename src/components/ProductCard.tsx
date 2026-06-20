"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Info, FileText } from "lucide-react";
import SafeImage from "@/components/shared/SafeImage";
import { type Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Determine the product URL based on if it's a new MDLS product or old general product
  const detailUrl =
    product.divisionSlug && product.categorySlug
      ? `/products/${product.divisionSlug}/${product.categorySlug}/${product.slug}`
      : `/products/${product.slug}`;

  const enquireUrl = `/request-quotation?product=${product.slug}`;

  // Get application tags (limit to 3 for visual spacing)
  const displayTags = product.applications?.slice(0, 3) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col h-full overflow-hidden rounded-xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/60 premium-glow-card"
    >
      {/* Visual Header / Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

        {/* Badges on top of Image */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          <Badge className="bg-slate-900/80 text-white border-none hover:bg-slate-900/80 text-[10px] uppercase tracking-wider font-semibold">
            {product.division}
          </Badge>
          <Badge className="bg-brand-primary text-white border-none hover:bg-brand-primary text-[10px] font-medium">
            {product.category}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Product Title */}
        <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50 line-clamp-1 group-hover:text-brand-primary transition-colors mb-2">
          {product.name}
        </h4>

        {/* Short Description */}
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
          {product.description}
        </p>

        {/* Application Tags */}
        {displayTags.length > 0 && (
          <div className="mb-5">
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
              Applications
            </span>
            <div className="flex flex-wrap gap-1.5">
              {displayTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-[11px] py-0 px-2 font-normal text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 max-w-[150px] truncate"
                  title={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <Link
            href={detailUrl}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors py-2"
          >
            <Info className="h-3.5 w-3.5" />
            Learn More
          </Link>
          <Link
            href={enquireUrl}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-primary hover:bg-brand-primary/95 dark:bg-brand-primary dark:hover:bg-brand-primary/90 text-xs font-semibold text-white transition-colors py-2"
          >
            Enquire Now
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
