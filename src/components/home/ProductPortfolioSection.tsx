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
    <section className="section-padding bg-brand-light dark:bg-slate-950/20 relative overflow-hidden">
      {/* Background soft lighting blobs */}
      <div className="absolute top-12 left-1/3 w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[250px] h-[250px] bg-brand-secondary/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Our Portfolio"
          title="Scientific Products & Diagnostic Supplies"
          description="Explore our comprehensive range of high-quality scientific instruments, diagnostic systems, laboratory consumables, and research reagents supplied to laboratories across India."
          align="center"
        />

        <MobileCarousel className="mt-12 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" breakpoint="md">
          {productPortfolio.map((category, index) => {
            const Icon = categoryIcons[category.title] ?? Microscope;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex flex-col h-full rounded-[2rem] border border-brand-border/60 dark:border-border/10 bg-white dark:bg-card/40 p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-brand-primary/20 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Decorative border gradient flare */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-primary/20 via-brand-primary to-brand-secondary/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Corner floating background icon */}
                <div className="absolute -right-6 -bottom-6 opacity-3 group-hover:opacity-[0.06] dark:group-hover:opacity-[0.08] transition-opacity duration-300 text-brand-primary pointer-events-none">
                  <Icon className="h-32 w-32 rotate-12" />
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary dark:text-brand-primary group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-brand-text dark:text-foreground group-hover:text-brand-primary transition-colors duration-300">
                  {category.title}
                </h3>
                
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>

                <div className="mt-6 flex-1 flex flex-col justify-end">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-secondary dark:text-brand-secondary">
                    Solutions & Supplies:
                  </p>
                  
                  <ul className="mt-3.5 space-y-2.5">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-normal"
                      >
                        <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-accent dark:text-brand-primary" />
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
