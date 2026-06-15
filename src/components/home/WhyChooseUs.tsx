"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { IconResolver } from "@/components/shared/IconResolver";

interface TrustItem {
  title: string;
  description: string;
  icon: string;
}

const trustItems: TrustItem[] = [
  {
    title: "Industry Expertise",
    description: "Deep domain knowledge in pharmaceutical, medical, diagnostic, and life sciences sectors.",
    icon: "Award",
  },
  {
    title: "Quality Assurance",
    description: "Rigorous standards sourcing from globally certified manufacturers adhering to FDA and CE standards.",
    icon: "ShieldCheck",
  },
  {
    title: "Global Partnerships",
    description: "Direct access to advanced research instruments, technologies, and reagents from international innovators.",
    icon: "HeartHandshake",
  },
  {
    title: "Technical Support",
    description: "Full-lifecycle technical assistance, installation coordination, application consulting, and training.",
    icon: "Headphones",
  },
  {
    title: "Reliable Supply Chain",
    description: "Seamless order delivery, specialized cold chain logistics management, and robust supply systems across India.",
    icon: "Truck",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white dark:bg-background relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Why Partner With Us"
          title="Why Choose Miraco Biocare"
          description="We are committed to delivering the highest level of service, quality diagnostics, and life sciences products to the healthcare community."
          align="center"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6 mt-8">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="premium-glow-card rounded-2xl bg-brand-light dark:bg-card/30 p-6 text-center border border-brand-border/60 dark:border-border/10 flex flex-col justify-between group"
            >
              <div>
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary dark:text-brand-primary group-hover:scale-110 transition-transform duration-300">
                  <IconResolver name={item.icon} className="h-6 w-6" />
                </div>
                
                <h3 className="mb-3 font-bold text-brand-text dark:text-foreground tracking-tight text-base sm:text-lg group-hover:text-brand-primary transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>

              {/* Decorative detail */}
              <div className="mt-6 flex justify-center">
                <span className="h-1 w-8 bg-brand-border/80 dark:bg-border/20 rounded-full group-hover:w-16 group-hover:bg-brand-primary transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
