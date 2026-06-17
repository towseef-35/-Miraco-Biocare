"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, motion } from "framer-motion";
import { 
  FlaskConical, 
  Dna, 
  Headphones, 
  HeartHandshake, 
  Award,
  type LucideIcon 
} from "lucide-react";

interface TrustItem {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const trustData: TrustItem[] = [
  {
    label: "Scientific Solutions",
    value: "500+",
    description: "High-quality products & specialized supplies",
    icon: FlaskConical,
    color: "from-blue-500 to-indigo-600",
  },
  {
    label: "Industry Expertise",
    value: "15+",
    description: "Years of specialized laboratory leadership",
    icon: Award,
    color: "from-amber-500 to-orange-600",
  },
  {
    label: "Technical Support",
    value: "100%",
    description: "On-site setup, training, and 24/7 care",
    icon: Headphones,
    color: "from-emerald-500 to-teal-600",
  },
  {
    label: "Research Applications",
    value: "150+",
    description: "Advanced analytical and molecular procedures",
    icon: Dna,
    color: "from-purple-500 to-pink-600",
  },
  {
    label: "Healthcare Partnerships",
    value: "50+",
    description: "Collaborations with global medical leaders",
    icon: HeartHandshake,
    color: "from-rose-500 to-red-600",
  },
];

function Counter({ value, duration = 1.5 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Extract digits
  const numericMatch = value.match(/\d+/);
  const target = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, "");

  useEffect(() => {
    if (!isInView || target === 0) return;

    let start = 0;
    const end = target;
    const totalSteps = 50;
    const stepTime = Math.max((duration * 1000) / totalSteps, 16);
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      // Ease out quad
      const currentCount = Math.floor(end * (1 - (1 - progress) * (1 - progress)));

      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(currentCount);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums font-bold">
      {target > 0 ? `${count}${suffix}` : value}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 border-y border-brand-border/60 dark:border-border/10">
      {/* Visual background accents */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-brand-secondary/5 dark:bg-brand-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Intro subtitle */}
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-extrabold uppercase tracking-[0.2em] text-brand-secondary dark:text-brand-accent bg-brand-secondary/10 dark:bg-brand-accent/10 px-3 py-1 rounded-full"
          >
            Trust & Credibility
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl md:text-4xl"
          >
            Engineered for Scientific Excellence
          </motion.h2>
        </div>

        {/* 5 columns layout */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {trustData.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group flex flex-col justify-between p-6 rounded-[2rem] bg-white dark:bg-card border border-brand-border/60 dark:border-border/10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
              >
                {/* Diagonal background line pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
                
                <div>
                  {/* Icon badge */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-md mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  {/* Title / Label */}
                  <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                    {stat.label}
                  </h3>
                  
                  {/* Main animated counter */}
                  <p className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl">
                    <Counter value={stat.value} />
                  </p>
                </div>
                
                {/* Visual Indicator (animated progress bar or pulse dot) */}
                <div className="mt-5">
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, delay: i * 0.15, ease: "easeOut" as const }}
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                    />
                  </div>
                  
                  <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
