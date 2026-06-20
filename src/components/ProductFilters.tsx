"use client";

import React, { useRef, useEffect } from "react";
import { Search, X, SlidersHorizontal, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface CategoryOption {
  label: string;
  slug: string;
  division: "life-sciences" | "molecular-diagnostics";
}

interface ProductFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDivision: "all" | "life-sciences" | "molecular-diagnostics";
  setSelectedDivision: (div: "all" | "life-sciences" | "molecular-diagnostics") => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  availableCategories: CategoryOption[];
}

export default function ProductFilters({
  searchTerm,
  setSearchTerm,
  selectedDivision,
  setSelectedDivision,
  selectedCategory,
  setSelectedCategory,
  availableCategories,
}: ProductFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter categories based on division
  const filteredCategories = availableCategories.filter(
    (cat) => selectedDivision === "all" || cat.division === selectedDivision
  );

  // Reset category filter if selected division changes and the category is not under the new division
  useEffect(() => {
    if (selectedCategory !== "all") {
      const isAvailable = filteredCategories.some((c) => c.slug === selectedCategory);
      if (!isAvailable) {
        setSelectedCategory("all");
      }
    }
  }, [selectedDivision, filteredCategories, selectedCategory, setSelectedCategory]);

  return (
    <div className="space-y-6 w-full py-4">
      {/* Search and Division Toggle Row */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search molecular products, assays, kits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 py-5 w-full bg-slate-50/55 border-slate-200 dark:bg-slate-900/40 dark:border-slate-800 text-sm focus-visible:ring-brand-primary rounded-xl"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Division Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/80 rounded-xl max-w-fit">
          <button
            onClick={() => setSelectedDivision("all")}
            className={cn(
              "px-4 py-2 text-xs font-semibold rounded-lg transition-all",
              selectedDivision === "all"
                ? "bg-white text-brand-primary shadow-sm dark:bg-slate-800 dark:text-brand-primary"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            )}
          >
            All Divisions
          </button>
          <button
            onClick={() => setSelectedDivision("life-sciences")}
            className={cn(
              "px-4 py-2 text-xs font-semibold rounded-lg transition-all",
              selectedDivision === "life-sciences"
                ? "bg-white text-brand-primary shadow-sm dark:bg-slate-800 dark:text-brand-primary"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            )}
          >
            Life Sciences
          </button>
          <button
            onClick={() => setSelectedDivision("molecular-diagnostics")}
            className={cn(
              "px-4 py-2 text-xs font-semibold rounded-lg transition-all",
              selectedDivision === "molecular-diagnostics"
                ? "bg-white text-brand-primary shadow-sm dark:bg-slate-800 dark:text-brand-primary"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            )}
          >
            Molecular Diagnostics
          </button>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="relative border-t border-slate-100 dark:border-slate-800/80 pt-5">
        <div className="flex items-center gap-2 mb-3 text-slate-400 dark:text-slate-500">
          <SlidersHorizontal className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Filter by Category
          </span>
        </div>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth -mx-4 px-4 md:-mx-0 md:px-0"
        >
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "whitespace-nowrap px-4 py-1.5 text-xs font-medium border rounded-full transition-all shrink-0",
              selectedCategory === "all"
                ? "bg-brand-primary text-white border-brand-primary shadow-sm shadow-brand-primary/10"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 dark:bg-slate-900/40 dark:text-slate-400 dark:border-slate-800 dark:hover:border-slate-700"
            )}
          >
            All Categories
          </button>

          {filteredCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={cn(
                "whitespace-nowrap px-4 py-1.5 text-xs font-medium border rounded-full transition-all shrink-0",
                selectedCategory === cat.slug
                  ? "bg-brand-primary text-white border-brand-primary shadow-sm shadow-brand-primary/10"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 dark:bg-slate-900/40 dark:text-slate-400 dark:border-slate-800 dark:hover:border-slate-700"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
