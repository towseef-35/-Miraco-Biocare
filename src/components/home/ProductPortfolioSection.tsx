"use client";

import { motion } from "framer-motion";
import { Check, Microscope, Snowflake, Activity, Layers, FlaskConical, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { productPortfolio } from "@/data/product-portfolio";
import { MobileCarousel } from "@/components/shared/MobileCarousel";

const categoryIcons: Record<string, LucideIcon> = {
  "Laboratory Instruments": Microscope,
  "Cold Chain Solutions": Snowflake,
  "Diagnostic Systems": Activity,
  "Laboratory Consumables": Layers,
  "Chemicals & Reagents": FlaskConical,
};

export function ProductPortfolioSection() {
  return (
    <section className="section-padding bg-brand-light">
      <div className="container-custom">
        <SectionHeading
          label="Our Offerings"
          title="Scientific Product Portfolio"
          description="Explore our comprehensive range of high-quality scientific instruments, diagnostic systems, laboratory consumables, and research reagents supplied to laboratories across India."
          align="center"
        />
        <MobileCarousel className="mt-12 md:grid-cols-2 lg:grid-cols-3" breakpoint="md">
          {productPortfolio.map((category, index) => {
            const Icon = categoryIcons[category.title] ?? Microscope;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col rounded-[2rem] border border-brand-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-md md:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-brand-text">
                  {category.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
                <div className="mt-6 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">
                    Solutions & Supplies:
                  </p>
                  <ul className="mt-3 space-y-2">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 shrink-0 text-brand-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </MobileCarousel>
      </div>
    </section>
  );
}
