"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { IconResolver } from "@/components/shared/IconResolver";
import { whyChooseUs } from "@/data/divisions-content";

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          label="Why Choose Us"
          title="Why Choose Miraco Biocare"
          description="Your trusted partner for healthcare, diagnostics, and life science excellence."
          align="center"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-lg border border-brand-border bg-brand-light p-4 text-center md:p-6"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10">
                <IconResolver name={item.icon} className="h-6 w-6 text-brand-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-brand-text">{item.title}</h3>
              <p className="text-xs text-muted-foreground md:text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
