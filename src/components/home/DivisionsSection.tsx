"use client";

import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { IconResolver } from "@/components/shared/IconResolver";
import { homeDivisions } from "@/data/divisions-content";
import { MobileCarousel } from "@/components/shared/MobileCarousel";

export function DivisionsSection() {
  return (
    <section id="divisions" className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          label="Our Divisions"
          title="Comprehensive Healthcare & Life Science Solutions"
          description="Delivering integrated solutions across pharmaceuticals, diagnostics, life sciences, and biotechnology."
          align="center"
        />
        <MobileCarousel className="sm:grid-cols-2 lg:gap-6" breakpoint="sm">
          {homeDivisions.map((division, i) => (
            <motion.div
              key={division.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={division.href}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-brand-border bg-white shadow-sm transition-all hover:border-brand-primary/30 hover:shadow-md"
              >
                <div className="relative h-40 overflow-hidden md:h-48">
                  <Image
                    src={division.image}
                    alt={division.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90">
                    <IconResolver
                      name={division.icon}
                      className="h-5 w-5 text-brand-primary"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4 md:p-6">
                  <h3 className="text-lg font-semibold text-brand-text group-hover:text-brand-primary md:text-xl">
                    {division.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {division.description}
                  </p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-brand-primary">
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </MobileCarousel>
      </div>
    </section>
  );
}
