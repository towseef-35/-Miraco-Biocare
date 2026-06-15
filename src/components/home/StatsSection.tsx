"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, motion } from "framer-motion";
import { 
  Building2, 
  FlaskConical, 
  Dna, 
  Headphones, 
  HeartHandshake, 
  Award,
  type LucideIcon 
} from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

const statsData: StatItem[] = [
  {
    label: "Global Partnerships",
    value: "50+",
    description: "Internationally recognized brand partnerships",
    icon: Award,
  },
  {
    label: "Scientific Solutions",
    value: "500+",
    description: "High-quality products and specialized supplies",
    icon: FlaskConical,
  },
  {
    label: "Research Applications",
    value: "150+",
    description: "Advanced analytical and research procedures",
    icon: Dna,
  },
  {
    label: "Technical Support",
    value: "100%",
    description: "On-site installation, training, and consultation",
    icon: Headphones,
  },
  {
    label: "Customer Satisfaction",
    value: "99%",
    description: "Positive trust index from labs and hospitals",
    icon: HeartHandshake,
  },
  {
    label: "Industries Served",
    value: "9+",
    description: "Key sectors supported across India",
    icon: Building2,
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
    const totalSteps = 45;
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
    <section className="relative overflow-hidden py-12 md:py-20 bg-slate-50 dark:bg-slate-950/40 border-y border-brand-border/60 dark:border-border/30">
      {/* Background Decorative Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-6 lg:gap-4">
          {statsData.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/60 dark:bg-card/40 border border-brand-border/40 dark:border-border/10 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-primary/95 mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                
                <p className="text-2xl font-bold tracking-tight text-brand-text dark:text-brand-text md:text-3xl lg:text-4xl">
                  <Counter value={stat.value} />
                </p>
                
                <h3 className="mt-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {stat.label}
                </h3>
                
                <p className="mt-1 text-[10px] leading-normal text-muted-foreground max-w-[140px]">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
