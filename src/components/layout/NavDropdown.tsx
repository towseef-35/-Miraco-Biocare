"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { NavChild } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface NavDropdownProps {
  title: string;
  href: string;
  items: NavChild[];
  isActive: boolean;
  isChildActive: (href: string) => boolean;
}

export function NavDropdown({
  title,
  href,
  items,
  isActive,
  isChildActive,
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className={cn(
          "flex items-center gap-0.5 rounded-md transition-colors",
          (isActive || open) && "text-brand-primary",
          open && "bg-brand-light"
        )}
      >
        {href === "#" ? (
          <span
            className={cn(
              "cursor-default px-3 py-2 text-sm font-medium",
              isActive && "text-brand-primary"
            )}
          >
            {title}
          </span>
        ) : (
          <Link
            href={href}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors hover:text-brand-primary",
              isActive && "text-brand-primary"
            )}
          >
            {title}
          </Link>
        )}
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={`${title} submenu`}
          className="flex h-8 w-7 items-center justify-center rounded-md transition-colors hover:text-brand-primary"
          onClick={() => setOpen((prev) => !prev)}
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" as const }}
            className="absolute left-0 top-full z-50 pt-1"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="min-w-[15rem] overflow-hidden rounded-lg border border-brand-border bg-white p-1.5 shadow-lg md:min-w-[16rem]">
              {items.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "block rounded-md px-3 py-2.5 transition-colors hover:bg-brand-light",
                    isChildActive(child.href) && "bg-brand-light text-brand-primary"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <p className="text-sm font-medium text-brand-text">{child.title}</p>
                  {child.description && (
                    <p className="mt-0.5 text-xs leading-snug text-muted-foreground line-clamp-2">
                      {child.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
