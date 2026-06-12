"use client";

import { motion } from "framer-motion";
import { Activity, FlaskConical, ShieldCheck, Dna } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const diagnostics = [
  {
    title: "Analyzer Platforms",
    icon: Activity,
    subtitle: "Hematology, chemistry, and immunoassay systems",
    items: [
      "Hematology analyzers",
      "Clinical chemistry systems",
      "Immunoassay platforms",
      "Molecular diagnostic instruments",
      "Point-of-care devices",
    ],
  },
  {
    title: "Diagnostics Reagents",
    icon: FlaskConical,
    subtitle: "Reagent systems and consumables for clinical labs",
    items: [
      "CBC reagents",
      "Clinical chemistry kits",
      "Immunoassay consumables",
      "Molecular assay kits",
      "Quality control materials",
    ],
  },
  {
    title: "Automation & Connectivity",
    icon: ShieldCheck,
    subtitle: "Workflow solutions for faster laboratory operations",
    items: [
      "Sample handling systems",
      "LIS integration",
      "Automated calibration",
      "Workflow management software",
      "Inventory tracking",
    ],
  },
  {
    title: "Support Systems",
    icon: Dna,
    subtitle: "Turnkey services and performance support",
    items: [
      "Installation and validation",
      "Application training",
      "Technical support",
      "Performance optimization",
      "Preventive maintenance",
    ],
  },
];

export default function ClinicalDiagnostics() {
  return (
    <section id="clinical-diagnostics" className="scroll-mt-16 md:scroll-mt-20 py-20 sm:py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
            Clinical Diagnostics
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Transforming Diagnostics Through Precision and Innovation
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Miraco Biocare offers a broad diagnostics product portfolio for clinical laboratories, including analyzer platforms, reagent systems, automation, and support services that speed workflow and improve result reliability.
          </p>
        </div>

        <div className="mt-14 grid gap-6 xl:grid-cols-4">
          {diagnostics.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
              >
                <Card className="h-full rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <CardHeader className="gap-4 p-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-secondary to-accent text-white shadow-lg shadow-secondary/20">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-950">{item.title}</CardTitle>
                      <CardDescription className="mt-2 text-sm text-slate-600">
                        {item.subtitle}
                      </CardDescription>
                    </div>
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
