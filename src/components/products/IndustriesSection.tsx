"use client";

import { motion } from "framer-motion";
import {
  Beaker,
  BookOpen,
  Building2,
  FlaskConical,
  HeartPulse,
  Hospital,
  Landmark,
  Microscope,
  Pill,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { industriesWeServe } from "@/data/industries";

const industryIcons: Record<string, LucideIcon> = {
  "Pharmaceutical Companies": Pill,
  "Biotechnology Organizations": HeartPulse,
  "Academic Institutions": Building2,
  Universities: BookOpen,
  "Research Laboratories": Microscope,
  "Clinical Laboratories": Beaker,
  Hospitals: Hospital,
  "Government Research Organizations": Landmark,
  "Healthcare Institutions": ShieldCheck,
};

export default function IndustriesSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
            Industries We Serve
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Healthcare and life sciences solutions across every sector
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Miraco Biocare partners with pharmaceutical companies, biotechnology
            organizations, academic institutions, research laboratories, clinical
            laboratories, hospitals, and healthcare institutions across India.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {industriesWeServe.map((item, index) => {
            const Icon = industryIcons[item.title] ?? FlaskConical;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 text-left shadow-xl shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
