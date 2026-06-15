"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Award, ShieldCheck, Headphones, Sparkles, Truck, type LucideIcon } from "lucide-react";

interface TrustItem {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const trustItems: TrustItem[] = [
  {
    title: "Industry Expertise",
    description: "Deep domain knowledge across pharma, diagnostics, molecular research, and biotechnology.",
    icon: Award,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Quality & Standards",
    description: "Rigorous sourcing from globally certified manufacturers adhering strictly to FDA and CE standards.",
    icon: ShieldCheck,
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Innovation & Tech",
    description: "Providing laboratories with next-generation NGS platforms, real-time PCR, and advanced workflows.",
    icon: Sparkles,
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Comprehensive Support",
    description: "On-site installation, application validation, user training, and rapid troubleshooting care.",
    icon: Headphones,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Reliable Logistics",
    description: "Seamless deliveries, active cold chain management, and a secure supply network across India.",
    icon: Truck,
    color: "from-rose-500 to-red-600",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white dark:bg-background relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-secondary/5 dark:bg-brand-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Why Partner With Us"
          title="Why Choose Miraco Biocare"
          description="We are committed to delivering the highest level of service, quality diagnostics, and life sciences products to the healthcare community."
          align="center"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6 mt-12">
          {trustItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                className="group flex flex-col justify-between p-6 rounded-[2rem] bg-slate-50 dark:bg-card border border-brand-border/60 dark:border-border/10 shadow-[0_10px_30px_rgba(0,0,0,0.01)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:bg-white dark:hover:bg-slate-900/60 hover:-translate-y-2 transition-all duration-300"
              >
                <div>
                  {/* Icon wrap with custom color gradients */}
                  <div className={`mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="mb-3 text-center font-bold text-slate-950 dark:text-white tracking-tight text-base sm:text-lg group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-center text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>

                {/* Decorative horizontal hover bar */}
                <div className="mt-6 flex justify-center">
                  <span className="h-[3px] w-8 bg-slate-200 dark:bg-slate-800 rounded-full group-hover:w-16 group-hover:bg-gradient-to-r group-hover:from-brand-primary group-hover:to-brand-secondary transition-all duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
