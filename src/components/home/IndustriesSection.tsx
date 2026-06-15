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

const industryGradients: Record<string, string> = {
  "Pharmaceutical Companies": "from-emerald-500/10 to-teal-500/10",
  "Biotechnology Organizations": "from-blue-500/10 to-indigo-500/10",
  "Academic Institutions": "from-purple-500/10 to-indigo-500/10",
  Universities: "from-amber-500/10 to-orange-500/10",
  "Research Laboratories": "from-cyan-500/10 to-blue-500/10",
  "Clinical Laboratories": "from-violet-500/10 to-fuchsia-500/10",
  Hospitals: "from-rose-500/10 to-pink-500/10",
  "Government Research Organizations": "from-sky-500/10 to-blue-500/10",
  "Healthcare Institutions": "from-teal-500/10 to-emerald-500/10",
};

export function IndustriesSection() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-950/20 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Floating accent spots */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Industries We Serve"
          title="Empowering Growth Across Diverse Sectors"
          description="We deliver specialized diagnostics, laboratory equipment, and biotechnological solutions customized for standard-setting institutions nationwide."
          align="center"
        />

        <MobileCarousel className="mt-12 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" breakpoint="md">
          {industriesWeServe.map((item, index) => {
            const Icon = industryIcons[item.title] ?? FlaskConical;
            const gradient = industryGradients[item.title] ?? "from-slate-500/10 to-slate-600/10";
            
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
              >
                <div className="group relative h-full overflow-hidden rounded-[2.5rem] p-8 bg-white dark:bg-card border border-brand-border/60 dark:border-border/10 shadow-[0_8px_30px_rgba(0,0,0,0.01)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                  {/* Subtle color spot on hover */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${gradient} rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-500 pointer-events-none opacity-0 group-hover:opacity-100`} />
                  
                  <div className="relative z-10">
                    {/* Icon container */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary dark:text-brand-accent group-hover:scale-105 group-hover:bg-brand-primary group-hover:text-white dark:group-hover:text-slate-950 transition-all duration-300">
                      <Icon className="h-6.5 w-6.5" />
                    </div>
                    
                    <h3 className="mt-6 text-lg font-bold text-slate-950 dark:text-white tracking-tight leading-snug group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Premium indicator line */}
                  <div className="mt-8 w-full h-[3px] bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
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
