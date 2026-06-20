"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X, ChevronDown, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  MULTIPLEX_CATEGORY_SLUG,
  buildCatalogCategoryTree,
  findSelectionContext,
  getActiveFilterCount,
  getSelectionLabel,
  isCategorySelected,
  isDivisionSelected,
  isSubcategorySelected,
  selectCategory,
  selectDivision,
  selectSubcategory,
  type CatalogFilterState,
  type CatalogDivisionNode,
} from "@/lib/catalog-filters";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface CatalogFilterSidebarProps {
  filters: CatalogFilterState;
  onFiltersChange: (filters: CatalogFilterState) => void;
  products: Product[];
  onClearAll: () => void;
  onSelectionChange?: () => void;
  className?: string;
  compact?: boolean;
}

function SelectionButton({
  label,
  count,
  selected,
  onClick,
  depth = 0,
}: {
  label: string;
  count: number;
  selected: boolean;
  onClick: () => void;
  depth?: 0 | 1 | 2;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={selected ? "true" : undefined}
      className={cn(
        "group relative flex w-full items-center gap-2.5 rounded-lg py-2 pr-2 text-left text-sm transition-all",
        depth === 0 && "pl-2",
        depth === 1 && "pl-5",
        depth === 2 && "pl-7",
        selected
          ? "bg-brand-primary/[0.08] font-medium text-brand-primary shadow-[inset_3px_0_0_0_var(--brand-primary)]"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900/50 dark:hover:text-slate-100"
      )}
    >
      <span
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
          selected
            ? "border-brand-primary bg-brand-primary"
            : "border-slate-300 bg-white group-hover:border-slate-400 dark:border-slate-600 dark:bg-slate-900"
        )}
        aria-hidden
      >
        {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
      <span className="min-w-0 flex-1 leading-snug">{label}</span>
      <span
        className={cn(
          "shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
          selected
            ? "bg-brand-primary/12 text-brand-primary"
            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
        )}
      >
        {count}
      </span>
    </button>
  );
}

function DivisionFilterSection({
  division,
  filters,
  onFiltersChange,
  onSelectionChange,
  defaultOpen,
}: {
  division: CatalogDivisionNode;
  filters: CatalogFilterState;
  onFiltersChange: (filters: CatalogFilterState) => void;
  onSelectionChange?: () => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (filters.divisionSlug === division.id) {
      setOpen(true);
    }

    if (filters.categorySlug || filters.subCategory) {
      const activeCategory = division.categories.find(
        (c) =>
          c.categorySlug === filters.categorySlug ||
          c.subcategories.some((s) => s.categorySlug === filters.categorySlug)
      );

      if (activeCategory?.subcategories.length) {
        setOpenCategories((prev) => ({ ...prev, [activeCategory.id]: true }));
      }
    }
  }, [filters.divisionSlug, filters.categorySlug, filters.subCategory, division]);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const applyFilters = (next: CatalogFilterState) => {
    onFiltersChange(next);
    onSelectionChange?.();
  };

  return (
    <div className="border-b border-slate-100 last:border-0 dark:border-slate-800/80">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg py-3 pl-1 pr-1 text-left transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-900/40"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-800 dark:text-slate-100">
          {division.label}
        </span>
        <span className="flex items-center gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {division.count}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-slate-400 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5 pb-4">
              <SelectionButton
                label={`All ${division.label}`}
                count={division.count}
                selected={isDivisionSelected(filters, division.id)}
                depth={1}
                onClick={() => applyFilters(selectDivision(division.id))}
              />

              {division.categories.map((category) => {
                const hasSubcategories = category.subcategories.length > 0;
                const categoryOpen = openCategories[category.id] ?? false;
                const categorySelected = isCategorySelected(
                  filters,
                  division.id,
                  category.categorySlug
                );

                if (!hasSubcategories) {
                  return (
                    <SelectionButton
                      key={category.id}
                      label={category.label}
                      count={category.count}
                      selected={categorySelected}
                      depth={1}
                      onClick={() =>
                        applyFilters(
                          selectCategory(filters, division.id, category.categorySlug)
                        )
                      }
                    />
                  );
                }

                return (
                  <div key={category.id} className="space-y-0.5">
                    <div className="flex items-stretch">
                      <button
                        type="button"
                        onClick={() => toggleCategory(category.id)}
                        aria-expanded={categoryOpen}
                        aria-label={`${categoryOpen ? "Collapse" : "Expand"} ${category.label}`}
                        className="flex w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-50 hover:text-brand-primary dark:hover:bg-slate-900/50"
                      >
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            categoryOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <div className="min-w-0 flex-1">
                        <SelectionButton
                          label={category.label}
                          count={category.count}
                          selected={categorySelected}
                          depth={1}
                          onClick={() =>
                            applyFilters(
                              selectCategory(filters, division.id, category.categorySlug)
                            )
                          }
                        />
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {categoryOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="ml-3 space-y-0.5 border-l-2 border-slate-100 pl-1 dark:border-slate-800">
                            {category.subcategories.map((sub) => (
                              <SelectionButton
                                key={sub.id}
                                label={sub.label}
                                count={sub.count}
                                selected={isSubcategorySelected(
                                  filters,
                                  division.id,
                                  category.categorySlug,
                                  sub.subCategory,
                                  category.categorySlug === MULTIPLEX_CATEGORY_SLUG
                                    ? sub.categorySlug
                                    : undefined
                                )}
                                depth={2}
                                onClick={() =>
                                  applyFilters(
                                    selectSubcategory(
                                      filters,
                                      division.id,
                                      category.categorySlug,
                                      sub.subCategory,
                                      category.categorySlug === MULTIPLEX_CATEGORY_SLUG
                                        ? sub.categorySlug
                                        : undefined
                                    )
                                  )
                                }
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CatalogFilterSidebar({
  filters,
  onFiltersChange,
  products,
  onClearAll,
  onSelectionChange,
  className,
  compact = false,
}: CatalogFilterSidebarProps) {
  const categoryTree = useMemo(() => buildCatalogCategoryTree(products), [products]);
  const activeCount = getActiveFilterCount(filters);
  const selectionLabel = getSelectionLabel(categoryTree, filters);
  const selectionContext = findSelectionContext(categoryTree, filters);

  const handleClearAll = () => {
    onClearAll();
    onSelectionChange?.();
  };

  return (
    <nav
      aria-label="Product category filters"
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-900/60",
        compact ? "p-4" : "p-5",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50">
            Browse by Category
          </h2>
          {!compact && (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Category → Subcategory
            </p>
          )}
        </div>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="h-8 shrink-0 px-2 text-xs text-slate-500 hover:text-brand-primary"
          >
            <RotateCcw className="mr-1 h-3.5 w-3.5" />
            Clear
          </Button>
        )}
      </div>

      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="search"
          placeholder="Search products..."
          value={filters.searchTerm}
          onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
          className="h-10 rounded-xl border-slate-200 bg-slate-50/80 pl-9 pr-9 text-sm dark:border-slate-800 dark:bg-slate-950/40"
        />
        {filters.searchTerm && (
          <button
            type="button"
            onClick={() => onFiltersChange({ ...filters, searchTerm: "" })}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-200/70 hover:text-slate-600 dark:hover:bg-slate-800"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {selectionLabel && (
        <div className="mb-4 rounded-xl border border-brand-primary/15 bg-gradient-to-br from-brand-primary/[0.06] to-brand-secondary/[0.04] px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-primary/70">
            Active filter
          </p>
          <p className="mt-0.5 text-sm font-semibold text-brand-primary">{selectionLabel}</p>
          {selectionContext.division && selectionContext.category && (
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              {selectionContext.division.label}
              {selectionContext.subcategory
                ? ` › ${selectionContext.category.label} › ${selectionContext.subcategory.label}`
                : selectionContext.category
                  ? ` › ${selectionContext.category.label}`
                  : ""}
            </p>
          )}
        </div>
      )}

      <SelectionButton
        label="All Products"
        count={products.length}
        selected={
          !filters.divisionSlug && !filters.categorySlug && !filters.subCategory
        }
        onClick={handleClearAll}
      />

      <div className="mt-3">
        {categoryTree.map((division, index) => (
          <DivisionFilterSection
            key={division.id}
            division={division}
            filters={filters}
            onFiltersChange={onFiltersChange}
            onSelectionChange={onSelectionChange}
            defaultOpen={index === 0 || filters.divisionSlug === division.id}
          />
        ))}
      </div>
    </nav>
  );
}
