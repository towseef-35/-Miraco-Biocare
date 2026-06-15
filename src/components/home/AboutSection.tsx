"use client";

import { useState } from "react";
import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

const highlights = [
  "Globally recognized manufacturer partnerships",
  "Integrated laboratory ecosystem solutions",
  "Hospitals, labs, universities & research institutes",
  "Quality, integrity & customer satisfaction",
];

export function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="section-padding bg-brand-light dark:bg-slate-950/20 relative overflow-hidden">
      {/* Decorative background grid and glowing bubbles */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-primary/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col"
          >
            <SectionHeading
              label="About Miraco Biocare"
              title="Leading the Way in Scientific & Diagnostics Excellence"
              description={company.welcomeText1}
            />

            {/* Mobile-collapsible narrative block */}
            <div className="space-y-4">
              {/* Desktop: always visible. Mobile: conditionally visible */}
              <div className={cn("text-sm text-muted-foreground md:text-base md:block", isExpanded ? "block" : "hidden")}>
                <p className="mb-4">
                  {company.welcomeText2}
                </p>
                <p className="mb-4">
                  Our expertise spans the complete healthcare and laboratory ecosystem,
                  enabling us to provide integrated solutions that support diagnosis,
                  research, quality control, and scientific advancement.
                </p>
                <p className="mb-4">
                  {company.welcomeMissionBridge}
                </p>
              </div>

              {/* Mobile Toggle Button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-primary md:hidden mb-4"
              >
                {isExpanded ? (
                  <>
                    Read Less <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            <ul className="mb-8 space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm font-medium text-slate-800 dark:text-slate-200"
                >
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-accent dark:text-brand-primary" />
                  {item}
                </li>
              ))}
            </ul>

            <div>
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-brand-primary dark:bg-brand-primary text-white font-semibold shadow-lg hover:shadow-xl hover:bg-brand-primary/95 transition-all duration-300 hover:scale-[1.02]"
                )}
              >
                Learn More About Us
              </Link>
            </div>
          </motion.div>

          {/* Staggered Visual Collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative flex items-center justify-center min-h-[340px] md:min-h-[460px] pb-6 sm:pb-0"
          >
            {/* Background Decorative Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#0057b8_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-20 pointer-events-none" />

            {/* Main Image Card */}
            <div className="relative w-[80%] aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl border border-white/20 dark:border-white/10 z-10 transition-transform duration-500 hover:scale-102">
              <Image
                src="https://images.unsplash.com/photo-1582719471137-c3967ffeb8cb?w=800&q=80"
                alt="Miraco Biocare laboratory solutions"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Overlapping Floating Sub-Image */}
            <div className="absolute right-0 bottom-4 w-[45%] aspect-[1/1] overflow-hidden rounded-[1.5rem] shadow-2xl border-4 border-white dark:border-slate-950 z-20 animate-float-slow hidden sm:block">
              <Image
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&q=80"
                alt="Biotechnology research and collaboration"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>

            {/* Floating Glassmorphic Badge */}
            <div className="absolute -bottom-2 left-2 md:-bottom-4 md:left-4 rounded-2xl bg-brand-primary/90 dark:bg-brand-primary/90 backdrop-blur-md px-5 py-4 text-white shadow-xl z-30 flex items-center gap-3 border border-white/20">
              <div className="text-3xl font-extrabold tracking-tight md:text-4xl text-white dark:text-black">15+</div>
              <div className="leading-tight text-xs md:text-sm font-semibold tracking-wide text-white dark:text-black">
                Years of<br />Excellence
              </div>
            </div>

            {/* Floating Dotted Accent */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-brand-secondary/10 rounded-full blur-xl pointer-events-none hidden md:block" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
