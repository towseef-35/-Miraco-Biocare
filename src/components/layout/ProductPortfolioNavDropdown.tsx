"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  productPortfolioNavigation,
  isProductPortfolioPath,
  type PortfolioNavCategory,
} from "@/data/product-portfolio-navigation";
import { cn } from "@/lib/utils";

interface ProductPortfolioNavDropdownProps {
  title: string;
  href: string;
}

const HOVER_CLOSE_DELAY = 140;

export function ProductPortfolioNavDropdown({
  title,
  href,
}: ProductPortfolioNavDropdownProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mdlsActive, setMdlsActive] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = isProductPortfolioPath(pathname);

  const activeCategory = productPortfolioNavigation.categories.find(
    (c) => c.id === activeCategoryId
  );
  const activeSubcategory = activeCategory?.subcategories?.find(
    (c) => c.id === activeSubcategoryId
  );

  const hasSubcategories = (activeCategory?.subcategories?.length ?? 0) > 0;
  const directCategoryProducts =
    !hasSubcategories && activeCategory?.products ? activeCategory.products : [];

  const subcategoryProducts = activeSubcategory?.products ?? [];

  const resetNestedState = useCallback(() => {
    setMdlsActive(false);
    setActiveCategoryId(null);
    setActiveSubcategoryId(null);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    resetNestedState();
  }, [resetNestedState]);

  const clearCloseTimer = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const handleEnter = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(closeMenu, HOVER_CLOSE_DELAY);
  };

  const handleMdlsEnter = () => {
    clearCloseTimer();
    setMdlsActive(true);
  };

  const handleCategoryEnter = useCallback((category: PortfolioNavCategory) => {
    setActiveCategoryId(category.id);
    setActiveSubcategoryId(null);
  }, []);

  const handleSubcategoryEnter = useCallback((subcategoryId: string) => {
    setActiveSubcategoryId(subcategoryId);
  }, []);

  const linkIsActive = (linkHref: string) =>
    pathname === linkHref || pathname.startsWith(`${linkHref}/`);

  const showCategoriesPanel = open && mdlsActive;
  const showSubcategoryPanel = showCategoriesPanel && !!activeCategory && hasSubcategories;
  const showDirectProductsPanel =
    showCategoriesPanel && !!activeCategory && !hasSubcategories && directCategoryProducts.length > 0;
  const showNestedProductsPanel =
    showCategoriesPanel && !!activeSubcategory && activeSubcategoryId !== null;

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
        <Link
          href={href}
          className={cn(
            "px-3 py-2 text-sm font-medium transition-colors hover:text-brand-primary",
            isActive && "text-brand-primary"
          )}
        >
          {title}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={`${title} submenu`}
          className="flex h-8 w-7 items-center justify-center rounded-md transition-colors hover:text-brand-primary"
          onClick={() => {
            if (open) closeMenu();
            else setOpen(true);
          }}
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
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 pt-1"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div
              className="flex overflow-hidden rounded-lg border border-brand-border bg-white shadow-lg"
              role="menu"
              aria-label="Product portfolio menu"
            >
              {/* Level 1: MDLS only — visible when Product Portfolio is hovered */}
              <div className="w-68 shrink-0 bg-white p-1.5">
                <div
                  onMouseEnter={handleMdlsEnter}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-md transition-colors hover:bg-brand-light",
                    mdlsActive && "bg-brand-light text-brand-primary"
                  )}
                >
                  <Link
                    href={productPortfolioNavigation.href}
                    role="menuitem"
                    className={cn(
                      "block min-w-0 flex-1 rounded-md px-3 py-2.5 transition-colors",
                      linkIsActive(productPortfolioNavigation.href) &&
                        "text-brand-primary"
                    )}
                    onClick={closeMenu}
                  >
                    <p className="text-sm font-semibold text-brand-text">
                      {productPortfolioNavigation.title}
                    </p>
                    {productPortfolioNavigation.description && (
                      <p className="mt-0.5 text-xs leading-snug text-muted-foreground line-clamp-2">
                        {productPortfolioNavigation.description}
                      </p>
                    )}
                  </Link>
                  <ChevronRight className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                </div>
              </div>

              {/* Level 2: Categories — visible only when MDLS is hovered */}
              <AnimatePresence mode="popLayout">
                {showCategoriesPanel && (
                  <motion.div
                    key="categories-panel"
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    transition={{ duration: 0.15 }}
                    className="w-60 shrink-0 border-l border-brand-border/70 bg-white p-1.5"
                    onMouseEnter={handleMdlsEnter}
                  >
                    <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Categories
                    </p>
                    {productPortfolioNavigation.categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        role="menuitem"
                        aria-haspopup="true"
                        aria-expanded={activeCategoryId === category.id}
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-brand-light",
                          activeCategoryId === category.id &&
                            "bg-brand-light text-brand-primary"
                        )}
                        onMouseEnter={() => handleCategoryEnter(category)}
                        onFocus={() => handleCategoryEnter(category)}
                      >
                        <span className="font-medium text-brand-text">{category.title}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Level 3a: Subcategories (Life Sciences) */}
              <AnimatePresence mode="popLayout">
                {showSubcategoryPanel && activeCategory && (
                  <motion.div
                    key={`subcategories-${activeCategory.id}`}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    transition={{ duration: 0.15 }}
                    className="w-60 shrink-0 border-l border-brand-border/70 bg-white p-1.5"
                  >
                    {activeCategory.href && (
                      <Link
                        href={activeCategory.href}
                        className="mb-1 block rounded-md px-3 py-2 text-xs font-semibold text-brand-primary transition-colors hover:bg-brand-light"
                        onClick={closeMenu}
                      >
                        View all {activeCategory.title}
                      </Link>
                    )}
                    {activeCategory.subcategories?.map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        role="menuitem"
                        aria-haspopup="true"
                        aria-expanded={activeSubcategoryId === sub.id}
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-brand-light",
                          activeSubcategoryId === sub.id &&
                            "bg-brand-light text-brand-primary"
                        )}
                        onMouseEnter={() => handleSubcategoryEnter(sub.id)}
                        onFocus={() => handleSubcategoryEnter(sub.id)}
                      >
                        <span className="font-medium text-brand-text">{sub.title}</span>
                        {(sub.products?.length ?? 0) > 0 && (
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Level 3b: Direct products (Singleplex / Multiplex) */}
              <AnimatePresence mode="popLayout">
                {showDirectProductsPanel && activeCategory && (
                  <motion.div
                    key={`products-direct-${activeCategory.id}`}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    transition={{ duration: 0.15 }}
                    className="w-76 shrink-0 border-l border-brand-border/70 bg-white p-1.5"
                  >
                    {activeCategory.href && (
                      <Link
                        href={activeCategory.href}
                        className="mb-1 block rounded-md px-3 py-2 text-xs font-semibold text-brand-primary transition-colors hover:bg-brand-light"
                        onClick={closeMenu}
                      >
                        View all {activeCategory.title}
                      </Link>
                    )}
                    <div className="max-h-88 overflow-y-auto">
                      {directCategoryProducts.map((product) => (
                        <Link
                          key={product.href}
                          href={product.href}
                          role="menuitem"
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm leading-snug transition-colors hover:bg-brand-light",
                            linkIsActive(product.href) &&
                              "bg-brand-light font-medium text-brand-primary"
                          )}
                          onClick={closeMenu}
                        >
                          {product.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Level 4: Products under subcategory */}
              <AnimatePresence mode="popLayout">
                {showNestedProductsPanel && activeSubcategory && (
                  <motion.div
                    key={`products-nested-${activeSubcategory.id}`}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    transition={{ duration: 0.15 }}
                    className="w-76 shrink-0 border-l border-brand-border/70 bg-white p-1.5"
                  >
                    {activeSubcategory.href && (
                      <Link
                        href={activeSubcategory.href}
                        className="mb-1 block rounded-md px-3 py-2 text-xs font-semibold text-brand-primary transition-colors hover:bg-brand-light"
                        onClick={closeMenu}
                      >
                        View all {activeSubcategory.title}
                      </Link>
                    )}
                    <div className="max-h-88 overflow-y-auto">
                      {subcategoryProducts.map((product) => (
                        <Link
                          key={product.href}
                          href={product.href}
                          role="menuitem"
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm leading-snug transition-colors hover:bg-brand-light",
                            linkIsActive(product.href) &&
                              "bg-brand-light font-medium text-brand-primary"
                          )}
                          onClick={closeMenu}
                        >
                          {product.title}
                        </Link>
                      ))}
                      {subcategoryProducts.length === 0 && (
                        <p className="px-3 py-2 text-xs text-muted-foreground">
                          Products coming soon.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
