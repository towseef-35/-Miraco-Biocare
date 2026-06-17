"use client";

import { useState, useRef, useEffect } from "react";
import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence, type Variants, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { company } from "@/data/company";
import { heroBanners } from "@/data/hero-banners";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface SlideContentProps {
  banner: (typeof heroBanners)[number];
  isActive: boolean;
  index: number;
  
  // Content card transforms
  yContent: any;
  opacityContent: any;
  scaleContent: any;
  rotateXContent: any;
  rotateYContent: any;
  filterContent: any;
  
  // Card 1 transforms (Top Right)
  xCard1: any;
  yCard1: any;
  zCard1: any;
  rxCard1: any;
  ryCard1: any;
  scaleCard1: any;
  opacityCard1: any;

  // Card 2 transforms (Bottom Right)
  xCard2: any;
  yCard2: any;
  zCard2: any;
  rxCard2: any;
  ryCard2: any;
  scaleCard2: any;
  opacityCard2: any;

  // Card 3 transforms (Middle Right)
  xCard3: any;
  yCard3: any;
  zCard3: any;
  rxCard3: any;
  ryCard3: any;
  scaleCard3: any;
  opacityCard3: any;
}

function renderFloatingCard1(index: number) {
  switch (index) {
    case 0:
      return (
        <div className="flex flex-col gap-1 sm:gap-2 text-[10px] sm:text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-brand-primary dark:text-brand-accent">Genome Analysis</span>
            <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-brand-accent animate-pulse" />
          </div>
          <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-white">NGS Sequencing Grid</h4>
          <div className="mt-0.5 sm:mt-1 grid grid-cols-4 gap-1 text-center font-mono font-bold text-[9px] sm:text-[10px]">
            <div className="rounded bg-brand-primary/10 text-brand-primary py-0.5">A</div>
            <div className="rounded bg-brand-secondary/10 text-brand-secondary py-0.5">T</div>
            <div className="rounded bg-brand-accent/10 text-brand-accent py-0.5">C</div>
            <div className="rounded bg-brand-primary/20 text-brand-primary py-0.5">G</div>
          </div>
          <p className="text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400">Status: Active Sequence</p>
        </div>
      );
    case 1:
      return (
        <div className="flex flex-col gap-1 sm:gap-2 text-[10px] sm:text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-brand-secondary">Lab Automation</span>
            <span className="text-[8px] sm:text-[9px] font-bold text-brand-accent">Online</span>
          </div>
          <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-white">Hematology Analyzer</h4>
          <div className="mt-0.5 sm:mt-1 flex flex-col gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] text-slate-600 dark:text-slate-300 font-mono">
            <div className="flex justify-between border-b border-brand-border/30 pb-0.5">
              <span>RBC Counter:</span>
              <span className="font-bold text-slate-900 dark:text-white">4.82 M/µL</span>
            </div>
            <div className="flex justify-between">
              <span>WBC Counter:</span>
              <span className="font-bold text-slate-900 dark:text-white">7.40 K/µL</span>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col gap-1 sm:gap-2 text-[10px] sm:text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-brand-primary">Bioreactor Status</span>
            <span className="text-[8px] sm:text-[9px] font-bold text-amber-500">37.0°C</span>
          </div>
          <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-white">Incubation Chamber</h4>
          <div className="mt-0.5 sm:mt-1 grid grid-cols-2 gap-x-2 gap-y-0.5 sm:gap-y-1 text-[9px] sm:text-[10px] text-slate-600 dark:text-slate-300 font-mono">
            <div className="flex flex-col">
              <span className="text-[8px] text-slate-400">CO2 LEVEL</span>
              <span className="font-bold text-slate-900 dark:text-white">5.0%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] text-slate-400">HUMIDITY</span>
              <span className="font-bold text-slate-900 dark:text-white">95%</span>
            </div>
          </div>
        </div>
      );
    case 3:
    default:
      return (
        <div className="flex flex-col gap-1 sm:gap-2 text-[10px] sm:text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-brand-primary dark:text-brand-accent">Sequencing Queue</span>
            <span className="text-[8px] sm:text-[9px] font-mono text-slate-400">Run 48-Z</span>
          </div>
          <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-white">Next-Gen Platform</h4>
          <div className="mt-0.5 sm:mt-1 flex flex-col gap-0.5 sm:gap-1">
            <div className="flex justify-between text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400">
              <span>Sequencing Progress:</span>
              <span className="font-bold">84%</span>
            </div>
            <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-brand-primary rounded-full" style={{ width: "84%" }} />
            </div>
          </div>
        </div>
      );
  }
}

function renderFloatingCard2(index: number) {
  switch (index) {
    case 0:
      return (
        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent shadow-[0_4px_12px_rgba(16,185,129,0.15)] shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400">Compliance</span>
            <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-white truncate">FDA & CE Validated</h4>
            <p className="text-[7px] sm:text-[8px] text-brand-accent">100% Quality Assurance</p>
          </div>
        </div>
      );
    case 1:
      return (
        <div className="flex flex-col gap-1 sm:gap-1.5 text-[10px] sm:text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400">Amplification</span>
            <span className="text-[8px] sm:text-[9px] font-mono text-brand-secondary">Ct 18.4</span>
          </div>
          <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-white">Real-Time PCR</h4>
          <div className="flex items-center justify-center h-6 sm:h-8 bg-slate-50 dark:bg-slate-900/60 rounded-lg overflow-hidden px-1 sm:px-2 border border-brand-border/10">
            <svg className="w-full h-5 sm:h-6 text-brand-secondary" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M 0,15 L 20,15 L 30,5 L 35,25 L 40,15 L 50,15 L 55,10 L 60,20 L 65,15 L 100,15" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-accent shadow-[0_4px_12px_rgba(0,87,184,0.15)] shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flask-conical"><path d="M10 2v7.31"/><path d="M14 9.3V2M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0M5.52 16h12.96"/></svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400">Performance</span>
            <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-white">Assay Validation</h4>
            <p className="text-[8px] sm:text-[9px] text-brand-primary dark:text-brand-accent font-semibold">Yield: 98.4%</p>
          </div>
        </div>
      );
    case 3:
    default:
      return (
        <div className="flex flex-col gap-1 sm:gap-1.5 text-[10px] sm:text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400">Variant Mapping</span>
            <span className="text-[8px] sm:text-[9px] text-brand-accent">Aligned</span>
          </div>
          <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-white">Genomic Alignment</h4>
          <div className="flex items-center gap-1 text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 font-mono">
            <span className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-brand-accent" />
            <span>chr17:7577120</span>
          </div>
        </div>
      );
  }
}

function renderFloatingCard3(index: number) {
  switch (index) {
    case 0:
      return (
        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-accent shadow-[0_4px_12px_rgba(0,87,184,0.15)] shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity"><rect width="20" height="12" x="2" y="6" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400">Quality Index</span>
            <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-white">Score: 99.98%</h4>
            <p className="text-[7px] sm:text-[8px] text-brand-accent font-semibold">Precision Assured</p>
          </div>
        </div>
      );
    case 1:
      return (
        <div className="flex flex-col gap-1 sm:gap-2 text-[10px] sm:text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-brand-secondary">Analyzer Status</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
          </div>
          <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-white">Active Diagnostics</h4>
          <div className="mt-0.5 h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-brand-secondary rounded-full" style={{ width: "100%" }} />
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col gap-1 sm:gap-1.5 text-[10px] sm:text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400">Yield Progress</span>
            <span className="text-[8px] sm:text-[9px] font-bold text-brand-primary">Optimal</span>
          </div>
          <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-white">Assay Yield Stats</h4>
          <div className="flex items-center gap-1 text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 font-mono">
            <span className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-brand-primary" />
            <span>Assay Pass</span>
          </div>
        </div>
      );
    case 3:
    default:
      return (
        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent shadow-[0_4px_12px_rgba(16,185,129,0.15)] shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dna"><path d="M4.5 10.5C5 9.5 6 9 7.5 9s2.5.5 3 1.5 1 2.5 2.5 2.5 2.5-.5 3-1.5 1-2.5 2.5-2.5 2.5.5 3 1.5M4.5 13.5C5 14.5 6 15 7.5 15s2.5-.5 3-1.5 1-2.5 2.5-2.5 2.5.5 3 1.5 1 2.5 2.5 2.5 2.5-.5 3-1.5"/></svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400">Genomic Alignment</span>
            <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-white">Base Pairs Matching</h4>
            <p className="text-[7px] sm:text-[8px] text-brand-accent font-semibold font-mono">Active</p>
          </div>
        </div>
      );
  }
}

function SlideContent({
  banner,
  isActive,
  index,
  yContent,
  opacityContent,
  scaleContent,
  rotateXContent,
  rotateYContent,
  filterContent,
  xCard1,
  yCard1,
  zCard1,
  rxCard1,
  ryCard1,
  scaleCard1,
  opacityCard1,
  xCard2,
  yCard2,
  zCard2,
  rxCard2,
  ryCard2,
  scaleCard2,
  opacityCard2,
  xCard3,
  yCard3,
  zCard3,
  rxCard3,
  ryCard3,
  scaleCard3,
  opacityCard3,
}: SlideContentProps) {
  // Staggered child variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          className="relative w-full h-full flex items-center justify-start overflow-visible transform-3d"
        >
          {/* Main Content Card (Left, aligned to container bounds, responsive size) */}
          <motion.div
            key={banner.id}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            style={{
              scale: scaleContent,
              rotateX: rotateXContent,
              rotateY: rotateYContent,
              y: yContent,
              opacity: opacityContent,
              filter: filterContent,
              transformPerspective: 1200,
              transformStyle: "preserve-3d"
            }}
            className="w-full max-w-[85%] sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl select-none rounded-[2rem] border border-white/20 dark:border-white/5 bg-white/45 dark:bg-slate-950/45 p-5 sm:p-8 md:p-10 lg:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl flex flex-col justify-center overflow-hidden transform-3d z-10"
          >
            {/* Subtle color spot inside the card */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full blur-[50px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-full blur-[50px] pointer-events-none" />

            {/* Pre-title */}
            {index === 0 && (
              <motion.div
                variants={itemVariants}
                className="mb-3 flex items-center gap-2"
              >
                <span className="h-[2px] w-6 bg-brand-secondary rounded-full" />
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-secondary dark:text-brand-accent sm:text-xs">
                  Welcome to {company.name}
                </p>
              </motion.div>
            )}

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-3xl md:text-4xl lg:text-5xl lg:leading-[1.12] tracking-tight"
            >
              {banner.title.split(", ").map((part, i, arr) => (
                <span key={i} className="block">
                  {i === arr.length - 1 ? (
                    <span className="bg-gradient-to-r from-brand-primary to-brand-secondary dark:from-brand-accent dark:to-brand-primary bg-clip-text text-transparent">
                      {part}
                    </span>
                  ) : (
                    part
                  )}
                </span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-4 text-xs leading-relaxed text-slate-700 dark:text-slate-200 sm:text-sm md:text-base md:leading-relaxed"
            >
              {banner.subtitle}
            </motion.p>

            {/* Actions */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8"
            >
              <Link
                href="/#divisions"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-10 text-xs md:h-12 md:text-sm shadow-md transition-all duration-300 hover:shadow-lg active:scale-95 group/btn rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary dark:from-brand-primary dark:to-brand-accent text-white font-medium border-0"
                )}
              >
                Explore Solutions
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
              <Link
                href="/request-quotation"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-10 text-xs md:h-12 md:text-sm transition-all duration-300 active:scale-95 bg-white/30 dark:bg-card/20 backdrop-blur-md hover:bg-white/60 dark:hover:bg-card/50 rounded-full border-brand-border/60 dark:border-border/10 text-slate-800 dark:text-slate-100 hover:border-brand-primary"
                )}
              >
                Request Quotation
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Scientific Cards Layer (Absolute layered positions overlaying viewport) */}
          <div className="absolute inset-0 overflow-visible transform-3d pointer-events-none">
            {/* Card 1: Top Right */}
            <motion.div
              style={{
                x: xCard1,
                y: yCard1,
                z: zCard1,
                rotateX: rxCard1,
                rotateY: ryCard1,
                scale: scaleCard1,
                opacity: opacityCard1,
                transformPerspective: 1200,
                transformStyle: "preserve-3d"
              }}
              className="absolute top-2 right-2 sm:right-6 lg:right-12 w-32 sm:w-44 lg:w-72 rounded-2xl border border-white/20 dark:border-white/5 bg-white/50 dark:bg-slate-950/50 p-3 sm:p-4 shadow-lg backdrop-blur-md transform-3d z-0 lg:z-20"
            >
              {renderFloatingCard1(index)}
            </motion.div>

            {/* Card 2: Bottom Left (mobile/tablet) / Bottom Left (desktop) */}
            <motion.div
              style={{
                x: xCard2,
                y: yCard2,
                z: zCard2,
                rotateX: rxCard2,
                rotateY: ryCard2,
                scale: scaleCard2,
                opacity: opacityCard2,
                transformPerspective: 1200,
                transformStyle: "preserve-3d"
              }}
              className="absolute bottom-4 left-4 sm:left-10 lg:left-12 lg:right-auto w-28 sm:w-36 lg:w-64 rounded-2xl border border-white/20 dark:border-white/5 bg-white/50 dark:bg-slate-950/50 p-3 sm:p-4 shadow-lg backdrop-blur-md transform-3d z-0 lg:z-20"
            >
              {renderFloatingCard2(index)}
            </motion.div>

            {/* Card 3: Middle Right */}
            <motion.div
              style={{
                x: xCard3,
                y: yCard3,
                z: zCard3,
                rotateX: rxCard3,
                rotateY: ryCard3,
                scale: scaleCard3,
                opacity: opacityCard3,
                transformPerspective: 1200,
                transformStyle: "preserve-3d"
              }}
              className="absolute top-1/2 -translate-y-1/2 right-6 sm:right-16 lg:right-28 w-30 sm:w-40 lg:w-60 rounded-2xl border border-white/20 dark:border-white/5 bg-white/50 dark:bg-slate-950/50 p-3 sm:p-4 shadow-lg backdrop-blur-md transform-3d z-0 lg:z-20"
            >
              {renderFloatingCard3(index)}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function HeroSection() {
  const [realIndex, setRealIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Scroll-linked transforms for the entire parent section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Mobile multiplier is 0.35 (35% intensity), desktop multiplier is 1.0 (100% intensity)
  const motionMultiplier = isDesktop ? 1 : 0.35;

  // Dynamic tilt interaction tracking (touch and mouse pointer move)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  
  // Springs to smooth pointer/touch movement response
  const tiltX = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const tiltY = useSpring(pointerY, { stiffness: 60, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      // Calculate cursor/finger position relative to the center of the container
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      const intensity = isDesktop ? 1.0 : 0.45;
      pointerX.set(x * 12 * intensity);
      pointerY.set(y * -12 * intensity);
    }
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  // Scroll-linked transforms for the main text content card (Left Side)
  const scaleContent = useTransform(scrollYProgress, [0, 0.7], [1, 1 - 0.08 * motionMultiplier]);
  const rotateXContent = useTransform(scrollYProgress, [0, 0.7], [0, -8 * motionMultiplier]);
  const rotateYContent = useTransform(scrollYProgress, [0, 0.7], [0, 5 * motionMultiplier]);
  const yContentVal = useTransform(scrollYProgress, [0, 0.7], ["0%", `${-10 * motionMultiplier}%`]);
  
  // Opacity: on mobile, content remains visible longer (fades to 0.3 instead of 0)
  const opacityContent = useTransform(scrollYProgress, [0, 0.6], [1, isDesktop ? 0 : 0.3]);
  
  // Disable text card blur on mobile to keep font crisp and performant
  const blurContentVal = useTransform(scrollYProgress, [0, 0.6], [0, isDesktop ? 8 : 0]);
  const filterContent = useTransform(blurContentVal, (v) => v > 0.1 ? `blur(${v}px)` : "none");

  // Scroll-linked transforms for the background image
  // Mobile zoom is 1.035, desktop zoom is 1.10
  const scaleBgVal = useTransform(scrollYProgress, [0, 0.8], [1, 1 + 0.1 * motionMultiplier]);
  // Minimize background image blur on mobile (max 3px) for GPU performance
  const blurBgVal = useTransform(scrollYProgress, [0, 0.8], [0, isDesktop ? 10 : 3]);
  const filterBgVal = useTransform(blurBgVal, (v) => v > 0.1 ? `blur(${v}px)` : "none");
  const opacityBgVal = useTransform(scrollYProgress, [0, 0.8], [1, isDesktop ? 0.35 : 0.6]);

  // Floating card 1 transforms (Top Right)
  const xCard1 = useTransform(scrollYProgress, [0, 0.7], [0, 80 * motionMultiplier]);
  const yCard1 = useTransform(scrollYProgress, [0, 0.7], [0, -150 * motionMultiplier]);
  // On mobile, card translates negative Z (behind glass) to avoid text collision
  const zCard1 = useTransform(scrollYProgress, [0, 0.7], [0, isDesktop ? 100 : -80]);
  const rxCard1 = useTransform(scrollYProgress, [0, 0.7], [0, -15 * motionMultiplier]);
  const ryCard1 = useTransform(scrollYProgress, [0, 0.7], [0, 20 * motionMultiplier]);
  const scaleCard1 = useTransform(scrollYProgress, [0, 0.7], [1, 1 - 0.15 * motionMultiplier]);
  const opacityCard1 = useTransform(scrollYProgress, [0, 0.6], [1, isDesktop ? 0 : 0.4]);

  // Floating card 2 transforms (Bottom Left on mobile, Bottom Left on desktop)
  const xCard2 = useTransform(scrollYProgress, [0, 0.7], [0, -60 * motionMultiplier]);
  const yCard2 = useTransform(scrollYProgress, [0, 0.7], [0, 100 * motionMultiplier]);
  const zCard2 = useTransform(scrollYProgress, [0, 0.7], [0, isDesktop ? 50 : -50]);
  const rxCard2 = useTransform(scrollYProgress, [0, 0.7], [0, 20 * motionMultiplier]);
  const ryCard2 = useTransform(scrollYProgress, [0, 0.7], [0, -15 * motionMultiplier]);
  const scaleCard2 = useTransform(scrollYProgress, [0, 0.7], [1, 1 + 0.1 * motionMultiplier]);
  const opacityCard2 = useTransform(scrollYProgress, [0, 0.6], [1, isDesktop ? 0 : 0.4]);

  // Floating card 3 transforms (Middle Right)
  const xCard3 = useTransform(scrollYProgress, [0, 0.7], [0, 120 * motionMultiplier]);
  const yCard3 = useTransform(scrollYProgress, [0, 0.7], [0, -40 * motionMultiplier]);
  const zCard3 = useTransform(scrollYProgress, [0, 0.7], [0, isDesktop ? 150 : -120]);
  const rxCard3 = useTransform(scrollYProgress, [0, 0.7], [0, -10 * motionMultiplier]);
  const ryCard3 = useTransform(scrollYProgress, [0, 0.7], [0, -25 * motionMultiplier]);
  const scaleCard3 = useTransform(scrollYProgress, [0, 0.7], [1, 1 - 0.1 * motionMultiplier]);
  const opacityCard3 = useTransform(scrollYProgress, [0, 0.6], [1, isDesktop ? 0 : 0.4]);

  // Combined scroll-based rotations with active pointer/touch tilts
  const combinedRotateXContent = useTransform([rotateXContent, tiltY], ([rX, tY]) => (rX as number) + (tY as number));
  const combinedRotateYContent = useTransform([rotateYContent, tiltX], ([rY, tX]) => (rY as number) + (tX as number));

  const combinedRxCard1 = useTransform([rxCard1, tiltY], ([rX, tY]) => (rX as number) + (tY as number) * 1.5);
  const combinedRyCard1 = useTransform([ryCard1, tiltX], ([rY, tX]) => (rY as number) + (tX as number) * 1.5);

  const combinedRxCard2 = useTransform([rxCard2, tiltY], ([rX, tY]) => (rX as number) + (tY as number) * 1.2);
  const combinedRyCard2 = useTransform([ryCard2, tiltX], ([rY, tX]) => (rY as number) + (tX as number) * 1.2);

  const combinedRxCard3 = useTransform([rxCard3, tiltY], ([rX, tY]) => (rX as number) + (tY as number) * 1.8);
  const combinedRyCard3 = useTransform([ryCard3, tiltX], ([rY, tX]) => (rY as number) + (tX as number) * 1.8);

  // Multi-layered parallax for background soft blobs
  const yBlob1 = useTransform(scrollYProgress, [0, 0.8], [0, -160]);
  const yBlob2 = useTransform(scrollYProgress, [0, 0.8], [0, 120]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[140vh] md:h-[150vh] lg:h-[180vh] overflow-visible bg-brand-light dark:bg-slate-950 px-4 sm:px-6 md:px-8 py-4 lg:py-12"
    >
      {/* Background Soft Blobs with scroll parallax */}
      <motion.div 
        style={{ y: yBlob1 }}
        className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none z-1" 
      />
      <motion.div 
        style={{ y: yBlob2 }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-secondary/10 dark:bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none z-1" 
      />

      {/* Pinned Viewport Container with 3D perspective fold-on-scroll */}
      <div 
        className="sticky top-[68px] sm:top-[76px] lg:top-[112px] w-full h-[480px] sm:h-[540px] md:h-[600px] lg:h-[calc(100vh-140px)] overflow-hidden lg:rounded-[2.5rem] rounded-[2rem] border border-brand-border/30 dark:border-white/5 shadow-2xl bg-brand-light dark:bg-slate-950 transform-3d"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          touchAction: "pan-y"
        }}
      >
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1200}
          loop={true}
          autoplay={{
            delay: 6500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            bulletClass: "hero-pagination-bullet",
            bulletActiveClass: "hero-pagination-bullet-active",
          }}
          onSlideChange={(swiper) => {
            setRealIndex(swiper.realIndex);
          }}
          grabCursor={true}
          simulateTouch={true}
          allowTouchMove={true}
          className="h-full w-full"
        >
          {heroBanners.map((banner, index) => {
            const isSlideActive = realIndex === index;
            return (
              <SwiperSlide key={banner.id} className="relative h-full overflow-hidden">
                <>
                  {/* Background Image Container with Parallax and Ken Burns effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                      style={{ 
                        scale: scaleBgVal,
                        filter: filterBgVal,
                        opacity: opacityBgVal
                      }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <div className="relative h-full w-full overflow-hidden animate-ken-burns">
                        <Image
                          src={banner.image}
                          alt={banner.alt}
                          fill
                          priority={index === 0}
                          className="object-cover object-center"
                          sizes="100vw"
                          quality={90}
                          draggable={false}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Glass Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/30 to-transparent md:from-white/90 md:via-white/20 md:to-transparent dark:from-slate-950/95 dark:via-slate-950/30 dark:to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/90 dark:from-slate-950/90 to-transparent" />

                  {/* Slide Content Box */}
                  <div className="absolute inset-0 flex items-center justify-start pt-16 md:pt-0">
                    <div className="container-custom w-full py-4 sm:py-6 md:py-8">
                      <SlideContent
                        banner={banner}
                        isActive={isSlideActive}
                        index={index}
                        yContent={yContentVal}
                        opacityContent={opacityContent}
                        scaleContent={scaleContent}
                        rotateXContent={combinedRotateXContent}
                        rotateYContent={combinedRotateYContent}
                        filterContent={filterContent}
                        xCard1={xCard1}
                        yCard1={yCard1}
                        zCard1={zCard1}
                        rxCard1={combinedRxCard1}
                        ryCard1={combinedRyCard1}
                        scaleCard1={scaleCard1}
                        opacityCard1={opacityCard1}
                        xCard2={xCard2}
                        yCard2={yCard2}
                        zCard2={zCard2}
                        rxCard2={combinedRxCard2}
                        ryCard2={combinedRyCard2}
                        scaleCard2={scaleCard2}
                        opacityCard2={opacityCard2}
                        xCard3={xCard3}
                        yCard3={yCard3}
                        zCard3={zCard3}
                        rxCard3={combinedRxCard3}
                        ryCard3={combinedRyCard3}
                        scaleCard3={scaleCard3}
                        opacityCard3={opacityCard3}
                      />
                    </div>
                  </div>
                </>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
