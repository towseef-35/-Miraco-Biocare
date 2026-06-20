"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  productPortfolioNavigation,
  isProductPortfolioPath,
  type PortfolioNavCategory,
} from "@/data/product-portfolio-navigation";
import { cn } from "@/lib/utils";

interface MobileProductPortfolioNavProps {
  title: string;
  href: string;
  pathname: string;
  onNavigate: () => void;
}

function MobileAccordionSection({
  label,
  expanded,
  onToggle,
  active,
  children,
}: {
  label: string;
  expanded: boolean;
  onToggle: () => void;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
          active
            ? "bg-brand-primary/10 text-brand-primary"
            : "text-brand-text hover:bg-brand-primary/5"
        )}
      >
        <span className="text-left">{label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-300",
            expanded && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5 pb-2 pl-3 pt-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileCategoryBlock({
  category,
  pathname,
  onNavigate,
}: {
  category: PortfolioNavCategory;
  pathname: string;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [expandedSubId, setExpandedSubId] = useState<string | null>(null);

  const isLinkActive = (linkHref: string) =>
    pathname === linkHref || pathname.startsWith(`${linkHref}/`);

  const categoryActive =
    (category.href && isLinkActive(category.href)) ||
    category.products?.some((p) => isLinkActive(p.href)) ||
    category.subcategories?.some(
      (sub) =>
        (sub.href && isLinkActive(sub.href)) ||
        sub.products?.some((p) => isLinkActive(p.href))
    );

  if (category.subcategories?.length) {
    return (
      <MobileAccordionSection
        label={category.title}
        expanded={expanded}
        onToggle={() => setExpanded((v) => !v)}
        active={categoryActive}
      >
        {category.href && (
          <Link
            href={category.href}
            onClick={onNavigate}
            className={cn(
              "block rounded-xl px-3 py-2 text-xs font-semibold text-brand-primary hover:bg-brand-primary/10",
              isLinkActive(category.href) && "underline"
            )}
          >
            View all {category.title}
          </Link>
        )}
        {category.subcategories.map((sub) => (
          <MobileAccordionSection
            key={sub.id}
            label={sub.title}
            expanded={expandedSubId === sub.id}
            onToggle={() =>
              setExpandedSubId((current) => (current === sub.id ? null : sub.id))
            }
            active={
              (sub.href && isLinkActive(sub.href)) ||
              sub.products?.some((p) => isLinkActive(p.href))
            }
          >
            {sub.href && (
              <Link
                href={sub.href}
                onClick={onNavigate}
                className="block rounded-xl px-3 py-1.5 text-xs font-semibold text-brand-primary hover:bg-brand-primary/10"
              >
                View all {sub.title}
              </Link>
            )}
            {sub.products?.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                onClick={onNavigate}
                className={cn(
                  "block rounded-xl px-3 py-2 text-sm leading-snug transition-colors hover:bg-brand-primary/10 hover:text-brand-primary",
                  isLinkActive(product.href) && "font-medium text-brand-primary"
                )}
              >
                {product.title}
              </Link>
            ))}
            {!sub.products?.length && (
              <p className="px-3 py-1 text-xs text-muted-foreground">Coming soon.</p>
            )}
          </MobileAccordionSection>
        ))}
      </MobileAccordionSection>
    );
  }

  return (
    <MobileAccordionSection
      label={category.title}
      expanded={expanded}
      onToggle={() => setExpanded((v) => !v)}
      active={categoryActive}
    >
      {category.href && (
        <Link
          href={category.href}
          onClick={onNavigate}
          className="block rounded-xl px-3 py-1.5 text-xs font-semibold text-brand-primary hover:bg-brand-primary/10"
        >
          View all {category.title}
        </Link>
      )}
      {category.products?.map((product) => (
        <Link
          key={product.href}
          href={product.href}
          onClick={onNavigate}
          className={cn(
            "block rounded-xl px-3 py-2 text-sm leading-snug transition-colors hover:bg-brand-primary/10 hover:text-brand-primary",
            isLinkActive(product.href) && "font-medium text-brand-primary"
          )}
        >
          {product.title}
        </Link>
      ))}
    </MobileAccordionSection>
  );
}

export function MobileProductPortfolioNav({
  title,
  href,
  pathname,
  onNavigate,
}: MobileProductPortfolioNavProps) {
  const [expanded, setExpanded] = useState(false);
  const [mdlsExpanded, setMdlsExpanded] = useState(false);

  const sectionActive = isProductPortfolioPath(pathname);

  return (
    <div className="border-b border-brand-border/60 last:border-0">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
          sectionActive
            ? "bg-brand-primary/5 text-brand-primary shadow-sm"
            : "text-brand-text hover:bg-brand-light/80"
        )}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            expanded && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-1 pb-3 pl-3">
              <Link
                href={href}
                onClick={onNavigate}
                className={cn(
                  "block rounded-2xl px-3 py-2 text-sm transition-colors hover:bg-brand-primary/10 hover:text-brand-primary",
                  pathname === href && "font-medium text-brand-primary"
                )}
              >
                Overview
              </Link>

              <MobileAccordionSection
                label={productPortfolioNavigation.title}
                expanded={mdlsExpanded}
                onToggle={() => setMdlsExpanded((v) => !v)}
                active={isProductPortfolioPath(pathname)}
              >
                <Link
                  href={productPortfolioNavigation.href}
                  onClick={onNavigate}
                  className={cn(
                    "block rounded-xl px-3 py-2 text-xs font-semibold text-brand-primary hover:bg-brand-primary/10",
                    pathname === productPortfolioNavigation.href && "underline"
                  )}
                >
                  View full catalog
                </Link>
                {productPortfolioNavigation.categories.map((category) => (
                  <MobileCategoryBlock
                    key={category.id}
                    category={category}
                    pathname={pathname}
                    onNavigate={onNavigate}
                  />
                ))}
              </MobileAccordionSection>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
