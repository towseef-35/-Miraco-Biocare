"use client";

import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { type Product } from "@/data/products";

interface ProductCategorySectionProps {
  title: string;
  description?: string;
  products: Product[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function ProductCategorySection({
  title,
  description,
  products,
}: ProductCategorySectionProps) {
  if (products.length === 0) return null;

  return (
    <div className="space-y-6 scroll-mt-24">
      {/* Category Header */}
      <div className="border-l-4 border-brand-primary pl-4 py-1">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-50 md:text-2xl">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>

      {/* Grid of Product Cards with Staggered Entrance */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product) => (
          <motion.div
            key={product.slug}
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
