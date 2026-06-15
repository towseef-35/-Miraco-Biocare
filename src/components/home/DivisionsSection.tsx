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
    <section id="divisions" className="section-padding bg-white dark:bg-background relative overflow-hidden">
      {/* Decorative floating lights */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-secondary/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Our Business Divisions"
          title="Innovative Solutions Across Healthcare Sectors"
          description="We provide comprehensive specialized portfolios to support scientific research, pharmaceutical development, and advanced medical diagnostics."
          align="center"
        />

        <MobileCarousel className="sm:grid-cols-2 lg:gap-8" breakpoint="sm">
          {homeDivisions.map((division, i) => (
            <motion.div
              key={division.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                href={division.href}
                className="group premium-glow-card flex h-full flex-col overflow-hidden rounded-3xl border border-brand-border/60 dark:border-border/10 bg-white dark:bg-card/40 transition-all duration-300"
              >
                {/* Division Image with Zoom & Vignette */}
                <div className="relative h-44 overflow-hidden md:h-52">
                  <Image
                    src={division.image}
                    alt={division.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Glassmorphic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />

                  {/* Icon badge floating in bottom-left */}
                  <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 dark:bg-slate-950/90 shadow-lg border border-white/20 dark:border-white/10 text-brand-primary dark:text-brand-primary group-hover:bg-brand-primary group-hover:text-white dark:group-hover:text-black transition-all duration-300">
                    <IconResolver
                      name={division.icon}
                      className="h-5 w-5"
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold tracking-tight text-brand-text dark:text-foreground group-hover:text-brand-primary transition-colors duration-300">
                      {division.title}
                    </h3>
                    
                    {/* Hover-reveal arrow link icon */}
                    <div className="h-8 w-8 rounded-full border border-brand-border/80 dark:border-border/20 flex items-center justify-center text-muted-foreground group-hover:bg-brand-primary/10 group-hover:text-brand-primary dark:group-hover:bg-brand-primary dark:group-hover:text-black transition-all duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {division.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-brand-border/30 dark:border-border/10 flex items-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary dark:text-brand-primary/90">
                      Explore Division Solutions
                    </span>
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
