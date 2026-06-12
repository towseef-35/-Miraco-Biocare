"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { galleryImages } from "@/data/gallery";

const categories = ["All", ...Array.from(new Set(galleryImages.map((i) => i.category)))];

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((i) => i.category === activeCategory);

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-brand-primary text-white"
                : "bg-brand-light text-muted-foreground hover:bg-brand-primary/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((image) => (
          <div
            key={image.src}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-3 left-3 opacity-0 transition-opacity group-hover:opacity-100">
              <Badge className="bg-brand-primary">{image.category}</Badge>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
