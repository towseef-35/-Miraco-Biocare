"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { NavChild } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface MobileNavGroupProps {
  title: string;
  href: string;
  items: NavChild[];
  isActive: (href: string) => boolean;
  onNavigate: () => void;
}

export function MobileNavGroup({
  title,
  href,
  items,
  isActive,
  onNavigate,
}: MobileNavGroupProps) {
  const [expanded, setExpanded] = useState(
    isActive(href) || items.some((c) => isActive(c.href))
  );

  const sectionActive = isActive(href) || items.some((c) => isActive(c.href));

  return (
    <div className="border-b border-brand-border/60 last:border-0">
      <motion.button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
          sectionActive
            ? "text-brand-primary bg-brand-primary/5 shadow-sm"
            : "text-brand-text hover:bg-brand-light/80"
        )}
        aria-expanded={expanded}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            expanded && "rotate-180"
          )}
        />
      </motion.button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" as const }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5 pb-3 pl-3">
              {href !== "#" && (
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={cn(
                    "block rounded-2xl px-3 py-2 text-sm transition-all duration-200 hover:bg-brand-primary/10 hover:text-brand-primary",
                    isActive(href) && "font-medium text-brand-primary"
                  )}
                >
                  Overview
                </Link>
              )}
              {items.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  className={cn(
                    "block rounded-2xl px-3 py-2 text-sm transition-all duration-200 hover:bg-brand-primary/10 hover:text-brand-primary",
                    isActive(child.href) && "font-medium text-brand-primary"
                  )}
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
