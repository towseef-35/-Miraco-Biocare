"use client";

import { motion } from "framer-motion";
import { Globe, Headphones, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    title: "Quality Assurance",
    description: "Products and solutions meeting international quality standards.",
    icon: ShieldCheck,
  },
  {
    title: "Global Partnerships",
    description: "Collaborations with globally recognized manufacturers and technology partners.",
    icon: Globe,
  },
  {
    title: "Scientific Expertise",
    description: "Deep expertise across diagnostics, genomics, biotechnology, and life sciences.",
    icon: Sparkles,
  },
  {
    title: "Customer-Centric Support",
    description: "Dedicated service, consultation, and technical assistance.",
    icon: Headphones,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
            Why Choose Miraco Biocare
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Trusted Solutions Backed by Science and Service
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Miraco Biocare combines scientific innovation with enterprise support, giving customers a premium experience from consultation to deployment.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
              >
                <div className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-950">{feature.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
