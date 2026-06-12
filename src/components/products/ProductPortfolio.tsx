"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { productPortfolio } from "@/data/product-portfolio";
import { MobileCarousel } from "@/components/shared/MobileCarousel";

export default function ProductPortfolio() {
  return (
    <section className="py-20 sm:py-24 bg-brand-light">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-secondary">
            Product Portfolio
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
            Comprehensive laboratory and diagnostic solutions
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
            From scientific instruments and cold chain systems to diagnostic platforms,
            consumables, and reagents — Miraco Biocare delivers end-to-end product
            portfolios for research, diagnostics, and healthcare operations.
          </p>
        </div>

        <MobileCarousel className="mt-14 md:grid-cols-2 xl:grid-cols-3" breakpoint="md">
          {productPortfolio.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="flex flex-col rounded-[1.75rem] border border-brand-border bg-white p-6 shadow-xl shadow-slate-900/5"
            >
              <h3 className="text-xl font-semibold text-brand-primary">{category.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {category.description}
              </p>
              <ul className="mt-5 space-y-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </MobileCarousel>
      </div>
    </section>
  );
}
