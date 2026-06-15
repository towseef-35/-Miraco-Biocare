"use client";

import { useState } from "react";
import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
}

function SlideContent({ banner, isActive, index }: SlideContentProps) {
  // Staggered child variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={banner.id}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
          className="relative w-full max-w-xl select-none rounded-[2rem] border border-white/20 dark:border-white/5 bg-white/45 dark:bg-slate-950/45 p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:max-w-2xl lg:max-w-3xl flex flex-col justify-center overflow-hidden"
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
      )}
    </AnimatePresence>
  );
}

export function HeroSection() {
  const [realIndex, setRealIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-brand-light dark:bg-slate-950">
      {/* Background Soft Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none z-1" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-secondary/10 dark:bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none z-1" />

      {/* Main Container */}
      <div className="hero-carousel relative h-[500px] sm:h-[550px] md:h-[620px] lg:h-[720px] overflow-hidden z-10">
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
                  {/* Background Image Container with Ken Burns effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={banner.image}
                        alt={banner.alt}
                        fill
                        priority={index === 0}
                        className={cn(
                          "object-cover object-center transition-transform duration-[6800ms] ease-out",
                          isSlideActive ? "scale-108 translate-x-1 translate-y-1" : "scale-100 translate-x-0 translate-y-0"
                        )}
                        sizes="100vw"
                        quality={90}
                        draggable={false}
                      />
                    </div>
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
