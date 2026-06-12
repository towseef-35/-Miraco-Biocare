"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { partners } from "@/data/partners";
import "swiper/css";
import "swiper/css/pagination";

export function PartnersCarousel() {
  return (
    <section className="section-padding bg-brand-light">
      <div className="container-custom">
        <SectionHeading
          label="Our Partners"
          title="Collaborating with Global Leaders"
          description="Miraco Biocare partners with internationally recognized manufacturers and technology innovators to deliver world-class solutions to healthcare and research communities."
          align="center"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={2}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="pb-10"
          >
            {partners.map((partner) => {
              const CardContent = (
                <div className="text-center">
                  <p className="text-lg font-bold text-brand-primary/80 md:text-xl">
                    {partner.initials}
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-muted-foreground md:text-xs">
                    {partner.name}
                  </p>
                </div>
              );

              return (
                <SwiperSlide key={partner.name}>
                  {partner.website ? (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-20 items-center justify-center rounded-lg border border-brand-border bg-white px-4 transition-all hover:border-brand-primary/30 hover:shadow-md hover:scale-[1.02] md:h-24"
                    >
                      {CardContent}
                    </a>
                  ) : (
                    <div className="flex h-20 items-center justify-center rounded-lg border border-brand-border bg-white px-4 transition-shadow hover:shadow-md md:h-24">
                      {CardContent}
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
