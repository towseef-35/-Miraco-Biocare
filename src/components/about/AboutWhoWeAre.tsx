"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";

export function AboutWhoWeAre() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-8 max-w-3xl md:mb-12">
              <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest md:text-sm text-brand-secondary">
                Who We Are
              </span>
              <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl text-brand-text">
                Company Overview
              </h2>
            </div>

            <div
              id="who-we-are-text"
              className={`relative overflow-hidden transition-all duration-500 ease-out ${
                expanded ? "max-h-250" : "max-h-24"
              } md:max-h-none md:overflow-visible`}
            >
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {company.welcomeText1}
              </p>
              <p className="mb-0 text-sm leading-relaxed text-muted-foreground md:text-base">
                {company.welcomeText2}
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-4 px-0 text-sm font-medium text-brand-primary md:hidden"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-controls="who-we-are-text"
            >
              {expanded ? "Read Less" : "Read More"}
            </Button>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
              alt="Miraco Biocare team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
