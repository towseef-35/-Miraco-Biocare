"use client";

import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { IconResolver } from "@/components/shared/IconResolver";
import { homeDivisions } from "@/data/divisions-content";
import { MobileCarousel } from "@/components/shared/MobileCarousel";

export function DivisionsSection() {
  return (
    <section id="divisions" className="section-padding bg-slate-50 dark:bg-slate-950/20 relative overflow-hidden">
      {/* Visual glowing layout backplates */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-brand-secondary/5 dark:bg-brand-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Our Business Divisions"
          title="Innovative Solutions Across Healthcare Sectors"
          description="We provide comprehensive specialized portfolios to support scientific research, pharmaceutical development, and advanced medical diagnostics."
          align="center"
        />

        <MobileCarousel className="sm:grid-cols-2 lg:gap-8 mt-12" breakpoint="sm">
          {homeDivisions.map((division, i) => (
            <motion.div
              key={division.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={division.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-brand-border/60 dark:border-border/10 bg-white dark:bg-card/45 shadow-[0_10px_35px_rgba(0,0,0,0.02)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.2)] hover:shadow-[0_24px_60px_rgba(0,87,184,0.08)] dark:hover:shadow-[0_24px_60px_rgba(16,185,129,0.15)] hover:border-brand-primary/25 transition-all duration-500"
              >
                {/* Image & Overlay */}
                <div className="relative h-48 overflow-hidden md:h-56">
                  <Image
                    src={division.image}
                    alt={division.title}
                    fill
                    className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

                  {/* Icon badge floating bottom-left */}
                  <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 dark:bg-slate-900/90 shadow-xl border border-white/20 dark:border-white/10 text-brand-primary dark:text-brand-accent group-hover:bg-brand-primary group-hover:text-white dark:group-hover:bg-brand-primary dark:group-hover:text-slate-950 transition-all duration-300">
                    <IconResolver
                      name={division.icon}
                      className="h-5.5 w-5.5"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors duration-300">
                      {division.title}
                    </h3>
                    
                    {/* Circle Arrow with interactive translate */}
                    <div className="h-9 w-9 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary dark:group-hover:bg-brand-primary dark:group-hover:text-slate-950 transition-all duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="h-4.5 w-4.5" />
                    </div>
                  </div>

                  <p className="mt-3.5 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {division.description}
                  </p>

                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors duration-300">
                      Explore Division Solutions
                    </span>
                    <span className="h-1.5 w-1.5 bg-slate-300 dark:bg-slate-700 rounded-full group-hover:w-8 group-hover:bg-brand-primary dark:group-hover:bg-brand-accent transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </MobileCarousel>
      </div>
    </section>
  );
}
