"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dna, Sparkles, Activity, BarChart3 } from "lucide-react";

const applications = [
  "NGS sequencing platforms",
  "Sample preparation systems",
  "Library prep consumables",
  "Genetic analysis workflow tools",
  "Clinical genomics solutions",
  "Pharmacogenomics assays",
  "Population genomics workflows",
];

const stats = [
  { title: "Advanced Sequencing Technologies", value: 98 },
  { title: "Precision Research Workflows", value: 92 },
  { title: "Clinical Genomics Support", value: 89 },
  { title: "High Throughput Analysis", value: 95 },
];

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 900;
    const increment = Math.max(1, Math.floor(value / (duration / 30)));
    const interval = window.setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        window.clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 30);

    return () => window.clearInterval(interval);
  }, [value]);

  return <span className="text-4xl font-semibold text-white sm:text-5xl">{count}%</span>;
}

export default function Genomics() {
  return (
    <section id="genomics" className="relative scroll-mt-16 md:scroll-mt-20 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.14),_transparent_28%)]" />
      <div className="container-custom relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Genomics
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Unlocking the Power of Genomic Science
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-200 sm:text-lg">
              Miraco Biocare offers genomics products and workflows for sequencing, sample preparation, and precision analysis — enabling researchers and clinicians to unlock genetic insights with confidence.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {applications.slice(0, 4).map((application) => (
                <div key={application} className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-100 shadow-lg shadow-cyan-500/5 backdrop-blur-md">
                  {application}
                </div>
              ))}
              {applications.slice(4).map((application) => (
                <div key={application} className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-100 shadow-lg shadow-cyan-500/5 backdrop-blur-md">
                  {application}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="relative"
          >
            <div className="absolute -top-10 left-0 h-20 w-20 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute -right-8 top-24 h-24 w-24 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-lg shadow-slate-950/40">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Genomic scale</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">Precision sequencing ecosystem</h3>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/20">
                  <Dna className="h-7 w-7" />
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex items-center gap-3 text-white/70">
                      <BarChart3 className="h-5 w-5 text-cyan-300" />
                      <p className="text-sm font-medium">{stat.title}</p>
                    </div>
                    <div className="mt-5 flex items-end justify-between gap-4">
                      <AnimatedCounter value={stat.value} />
                      <div className="text-right text-sm text-slate-300">
                        <p className="font-medium">Performance</p>
                        <p>Analytics and workflows</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
