"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MobileCarouselProps {
  children: React.ReactNode;
  className?: string; // Additional classes for the container (like grid classes for desktop)
  breakpoint?: "sm" | "md";
}

export function MobileCarousel({
  children,
  className = "",
  breakpoint = "md",
}: MobileCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter out falsy/nullish children
  const validChildren = React.Children.toArray(children).filter(Boolean);
  const count = validChildren.length;

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
    
    const maxScrollLeft = scrollWidth - clientWidth;
    if (maxScrollLeft <= 0) return;
    
    const percentage = scrollLeft / maxScrollLeft;
    const index = Math.round(percentage * (count - 1));
    setActiveIndex(index);
  };

  // Determine snap/width classes based on the breakpoint prop
  const breakpointClass = breakpoint === "sm" ? "sm" : "md";
  const childCarouselClasses = cn(
    "w-[85vw] shrink-0 snap-center transition-all duration-300",
    breakpointClass === "sm" ? "sm:w-auto sm:shrink sm:snap-none" : "md:w-auto md:shrink md:snap-none"
  );

  const containerClasses = cn(
    "flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-6 -mx-4 px-4",
    breakpointClass === "sm" 
      ? "sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:overflow-x-visible sm:snap-none sm:gap-6" 
      : "md:mx-0 md:px-0 md:pb-0 md:grid md:overflow-x-visible md:snap-none md:gap-6",
    className
  );

  return (
    <div className="relative w-full">
      {/* Scrollable Container */}
      <div ref={containerRef} onScroll={handleScroll} className={containerClasses}>
        {validChildren.map((child, i) => {
          if (!React.isValidElement(child)) return child;
          
          const element = child as React.ReactElement<any>;
          
          return React.cloneElement(element, {
            className: cn(element.props.className, childCarouselClasses),
          });
        })}
      </div>

      {/* Pagination Dots (Mobile Only) */}
      {count > 1 && (
        <div 
          className={cn(
            "mt-4 flex justify-center gap-1.5",
            breakpointClass === "sm" ? "sm:hidden" : "md:hidden"
          )}
        >
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? "w-4 bg-brand-primary" : "w-1.5 bg-brand-primary/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
