"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { partners } from "@/data/partners";

export function PartnersCarousel() {
  // Triple the list to ensure there is plenty of content for seamless infinite looping
  const marqueeList = [...partners, ...partners, ...partners];

  return (
    <section className="section-padding bg-white dark:bg-background relative overflow-hidden border-t border-slate-100 dark:border-slate-900">
      {/* Decorative lighting background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Our Manufacturers & Brands"
          title="Collaborating with Global Leaders"
          description="Miraco Biocare partners with internationally recognized manufacturers and technology innovators to deliver world-class solutions to healthcare and research communities."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-12 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] dark:[mask-image:linear-gradient(to_right,transparent,#090e1a_10%,#090e1a_90%,transparent)] py-8"
        >
          {/* Scroll Track */}
          <div 
            className="animate-marquee flex gap-8 select-none" 
            style={{ "--marquee-duration": "35s" } as React.CSSProperties}
          >
            {marqueeList.map((partner, index) => {
              const CardContent = (
                <div className="text-center flex flex-col justify-center items-center h-full px-6 py-4">
                  {/* Initials with hover scale and color transformation */}
                  <span className="text-sm font-black tracking-widest text-slate-400 dark:text-slate-600 group-hover:text-brand-primary dark:group-hover:text-brand-accent group-hover:scale-110 transition-all duration-300 md:text-base">
                    {partner.initials}
                  </span>
                  
                  {/* Partner Name */}
                  <span className="mt-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wide md:text-xs group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                    {partner.name}
                  </span>
                </div>
              );

              const elementKey = `${partner.name}-${index}`;
              const classes = "group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-[1.75rem] border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-card/30 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:border-brand-primary/25 dark:hover:border-brand-primary/20 hover:bg-white dark:hover:bg-slate-900/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:scale-[1.03] transition-all duration-300 cursor-pointer";

              return partner.website ? (
                <a
                  key={elementKey}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes}
                >
                  {CardContent}
                </a>
              ) : (
                <div
                  key={elementKey}
                  className={classes}
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
