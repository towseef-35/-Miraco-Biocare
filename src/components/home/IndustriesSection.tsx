"use client";

import { motion } from "framer-motion";
import {
  Pill,
  Dna,
  BookOpen,
  GraduationCap,
  Microscope,
  FlaskConical,
  Hospital,
  Building2,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import { industriesWeServe } from "@/data/industries";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MobileCarousel } from "@/components/shared/MobileCarousel";

const industryIcons: Record<string, LucideIcon> = {
  "Pharmaceutical Companies": Pill,
  "Biotechnology Organizations": Dna,
  "Academic Institutions": BookOpen,
  Universities: GraduationCap,
  "Research Laboratories": Microscope,
  "Clinical Laboratories": FlaskConical,
  Hospitals: Hospital,
  "Government Research Organizations": Building2,
  "Healthcare Institutions": HeartPulse,
};

export function IndustriesSection() {
  return (
    <section className="section-padding bg-white dark:bg-background relative overflow-hidden">
      {/* Subtle background mesh decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Industries We Serve"
          title="Empowering Growth Across Diverse Sectors"
          description="We deliver specialized diagnostics, laboratory equipment, and biotechnological solutions customized for standard-setting institutions nationwide."
          align="center"
        />

        <MobileCarousel className="mt-8 sm:grid-cols-2 lg:grid-cols-3 gap-6" breakpoint="md">
          {industriesWeServe.map((item, index) => {
            const Icon = industryIcons[item.title] ?? FlaskConical;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
              >
                <div className="group premium-glow-card relative h-full overflow-hidden rounded-[1.5rem] p-6 flex flex-col justify-between">
                  {/* Subtle hover icon glow backplate */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-500" />
                  
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary dark:text-brand-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-primary group-hover:text-white dark:group-hover:text-black">
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <h3 className="mt-5 text-lg font-bold text-brand-text dark:text-foreground">
                      {item.title}
                    </h3>
                    
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Animated bottom bar */}
                  <div className="mt-6 w-full h-[2px] bg-brand-border/40 dark:bg-border/10 rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-gradient-to-r from-brand-primary to-brand-secondary group-hover:w-full transition-all duration-500 ease-out" />
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
