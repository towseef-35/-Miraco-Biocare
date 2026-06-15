"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { partners } from "@/data/partners";

export function PartnersCarousel() {
  // Double the list for seamless infinite loop scroll
  const marqueeList = [...partners, ...partners];

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-950/20 relative overflow-hidden border-t border-brand-border/40 dark:border-border/10">
      <div className="container-custom">
        <SectionHeading
          label="Our Manufacturers & Brands"
          title="Collaborating with Global Leaders"
          description="Miraco Biocare partners with internationally recognized manufacturers and technology innovators to deliver world-class solutions to healthcare and research communities."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-8 md:mt-12 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)] py-6"
        >
          {/* Scroll Track */}
          <div 
            className="animate-marquee flex gap-6 select-none cursor-pointer" 
            style={{ "--marquee-duration": "45s" } as React.CSSProperties}
          >
            {marqueeList.map((partner, index) => {
              const CardContent = (
                <div className="text-center flex flex-col justify-center items-center h-full px-5 py-3">
                  <span className="text-sm font-extrabold tracking-widest text-brand-primary/80 dark:text-brand-primary md:text-base group-hover:scale-105 transition-transform duration-300">
                    {partner.initials}
                  </span>
                  
                  <span className="mt-1 text-[10px] font-bold text-slate-800 dark:text-slate-200 tracking-wide md:text-xs">
                    {partner.name}
                  </span>
                </div>
              );

              const elementKey = `${partner.name}-${index}`;

              return partner.website ? (
                <a
                  key={elementKey}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-20 w-44 md:w-52 shrink-0 items-center justify-center rounded-2xl border border-brand-border/60 dark:border-border/15 bg-white dark:bg-card/40 transition-all duration-300 hover:border-brand-primary/30 hover:shadow-lg dark:hover:bg-card/70 hover:scale-[1.03] grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 dark:hover:opacity-100"
                >
                  {CardContent}
                </a>
              ) : (
                <div
                  key={elementKey}
                  className="group flex h-20 w-44 md:w-52 shrink-0 items-center justify-center rounded-2xl border border-brand-border/60 dark:border-border/15 bg-white dark:bg-card/40 transition-all duration-300 hover:border-brand-primary/20 hover:shadow-lg dark:hover:bg-card/70 hover:scale-[1.03] grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 dark:hover:opacity-100"
                >
                  {CardContent}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
