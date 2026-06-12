"use client";

import { motion } from "framer-motion";
import { Atom, Microscope, ScanLine, TestTube } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const lifeSciences = [
  {
    title: "Molecular Biology",
    icon: Microscope,
    items: [
      "PCR & qPCR systems",
      "Nucleic acid extraction platforms",
      "DNA/RNA quantification tools",
      "Gene expression workstations",
      "Cloning and genetic engineering supplies",
    ],
  },
  {
    title: "Cell Biology",
    icon: Atom,
    items: [
      "Cell culture incubators",
      "CO₂ incubation systems",
      "Cell imaging equipment",
      "Viability assay kits",
      "Stem cell workflow solutions",
    ],
  },
  {
    title: "Proteomics",
    icon: TestTube,
    items: [
      "Protein quantification systems",
      "Western blot imaging",
      "ELISA platforms",
      "Biomarker discovery reagents",
      "Mass spectrometry prep tools",
    ],
  },
  {
    title: "Flow Cytometry",
    icon: ScanLine,
    items: [
      "Flow cytometry analyzers",
      "Cell sorting modules",
      "Immunophenotyping panels",
      "Apoptosis and cell cycle assays",
      "Multi-parameter research workflows",
    ],
  },
];

export default function LifeSciences() {
  return (
    <section id="life-sciences" className="scroll-mt-16 md:scroll-mt-20 py-20 sm:py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
            Life Sciences
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Empowering Scientific Discovery
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Miraco Biocare supports researchers with product systems, reagents, and lab solutions designed for molecular biology, cell biology, proteomics, and cytometry applications.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {lifeSciences.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <CardHeader className="p-0">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl text-slate-950">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="mt-6 grid gap-3">
                    {item.items.map((feature) => (
                      <div key={feature} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        {feature}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
