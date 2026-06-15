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
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              },
            },
          }}
          className="max-w-xl select-none rounded-[1.75rem] border border-white/20 dark:border-white/10 bg-white/75 dark:bg-slate-950/75 p-6 shadow-2xl backdrop-blur-md sm:max-w-2xl sm:p-8 lg:max-w-3xl lg:p-12 min-h-[200px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[380px] flex flex-col justify-center relative overflow-hidden"
        >
          {/* Decorative Corner Glow */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full blur-xl pointer-events-none" />

          {/* Welcome pre-title */}
          {index === 0 && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="mb-2 sm:mb-3 flex items-center gap-2"
            >
              <span className="h-[2px] w-6 bg-brand-secondary rounded-full" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-secondary sm:text-xs">
                Welcome to {company.name}
              </p>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="text-lg font-extrabold leading-snug text-brand-text dark:text-foreground sm:text-2xl md:text-3xl lg:text-5xl lg:leading-[1.15] tracking-tight text-gradient"
          >
            {banner.title}
          </motion.h1>

          {/* Subtitle / Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:line-clamp-none sm:text-sm md:mt-4 md:text-base"
          >
            {banner.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8"
          >
            <Link
              href="/#divisions"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-10 text-xs md:h-12 md:text-sm shadow-md transition-all duration-300 hover:shadow-lg active:scale-95 group/btn rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-medium border-0"
              )}
            >
              Explore Solutions
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
            <Link
              href="/request-quotation"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-10 text-xs md:h-12 md:text-sm transition-all duration-300 active:scale-95 bg-white/40 dark:bg-card/40 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-card/80 rounded-full border-brand-border/60 dark:border-border/30 text-brand-text dark:text-foreground hover:border-brand-primary"
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
    <section className="relative bg-brand-light overflow-hidden">
      {/* Background soft color spots for extra visual depth */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none z-1" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-secondary/10 rounded-full blur-[140px] pointer-events-none z-1" />

      <div className="hero-carousel relative h-[450px] sm:h-[500px] md:h-[550px] lg:h-[680px] overflow-hidden z-10">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          loop={true}
          autoplay={{
            delay: 6000,
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
          {heroBanners.map((banner, index) => (
            <SwiperSlide key={banner.id} className="relative h-full overflow-hidden">
              <>
                {/* Background Image Container with advanced Ken Burns zoom transition */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={banner.image}
                      alt={banner.alt}
                      fill
                      priority={index === 0}
                      className={cn(
                        "object-cover object-center transition-transform duration-[7000ms] ease-out",
                        realIndex === index ? "scale-108 translate-y-1" : "scale-100 translate-y-0"
                      )}
                      sizes="100vw"
                      quality={90}
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Dark & Light Dual-Mode Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/40 to-transparent md:from-white/90 md:via-white/30 md:to-transparent dark:from-background/95 dark:via-background/35 dark:to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/80 dark:from-background/80 to-transparent" />

                {/* Slide Content Box */}
                <div className="absolute inset-x-0 bottom-0 top-12 md:top-0 flex items-center">
                  <div className="container-custom w-full py-4 sm:py-6 md:py-8">
                    <SlideContent
                      banner={banner}
                      isActive={realIndex === index}
                      index={index}
                    />
                  </div>
                </div>
              </>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
