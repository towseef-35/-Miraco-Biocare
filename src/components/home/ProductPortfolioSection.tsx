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

const categoryGradients: Record<string, string> = {
  "Laboratory Instruments": "from-blue-500/10 to-cyan-500/10 hover:border-blue-500/30",
  "Cold Chain Solutions": "from-sky-500/10 to-blue-500/10 hover:border-sky-500/30",
  "Diagnostic Systems": "from-indigo-500/10 to-purple-500/10 hover:border-indigo-500/30",
  "Laboratory Consumables": "from-emerald-500/10 to-teal-500/10 hover:border-emerald-500/30",
  "Chemicals & Reagents": "from-violet-500/10 to-fuchsia-500/10 hover:border-violet-500/30",
};

const iconColors: Record<string, string> = {
  "Laboratory Instruments": "text-blue-500 bg-blue-500/10",
  "Cold Chain Solutions": "text-sky-500 bg-sky-500/10",
  "Diagnostic Systems": "text-indigo-500 bg-indigo-500/10",
  "Laboratory Consumables": "text-emerald-500 bg-emerald-500/10",
  "Chemicals & Reagents": "text-violet-500 bg-violet-500/10",
};

export function ProductPortfolioSection() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-950/20 relative overflow-hidden">
      {/* Background soft lighting blobs */}
      <div className="absolute top-12 left-1/3 w-[350px] h-[350px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[300px] h-[300px] bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />

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
            const gradient = categoryGradients[category.title] ?? "from-slate-500/10 to-slate-600/10";
            const iconStyle = iconColors[category.title] ?? "text-brand-primary bg-brand-primary/10";
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`flex flex-col h-full rounded-[2.5rem] border border-brand-border/60 dark:border-border/10 bg-white dark:bg-card p-8 shadow-[0_10px_35px_rgba(0,0,0,0.02)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.15)] hover:shadow-[0_24px_55px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_24px_55px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group`}
              >
                {/* Visual glow backdrop on card hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Decorative border gradient flare */}
                <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-brand-primary/40 via-brand-primary to-brand-secondary/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

                {/* Giant rotation background icon */}
                <div className="absolute -right-8 -bottom-8 opacity-[0.02] group-hover:opacity-[0.06] dark:group-hover:opacity-[0.08] transition-opacity duration-300 text-brand-primary pointer-events-none">
                  <Icon className="h-40 w-40 rotate-12 transition-transform duration-500 group-hover:rotate-[30deg]" />
                </div>

                <div className="relative z-10">
                  {/* Icon badge */}
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconStyle} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-950 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors duration-300">
                    {category.title}
                  </h3>
                  
                  <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {category.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Solutions & Supplies
                    </p>
                    
                    <ul className="mt-4 space-y-3">
                      {category.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 leading-normal"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </MobileCarousel>
      </div>
    </section>
  );
}
