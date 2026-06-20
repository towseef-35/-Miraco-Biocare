"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ProductHero from "@/components/ProductHero";
import ProductCard from "@/components/ProductCard";
import CatalogFilterSidebar from "@/components/CatalogFilterSidebar";
import CatalogPagination, {
  CATALOG_PAGE_SIZE,
  getPageRange,
  getTotalPages,
  paginateItems,
} from "@/components/CatalogPagination";
import { getMDLSProducts } from "@/lib/product-utils";
import {
  DEFAULT_CATALOG_FILTERS,
  filterCatalogProducts,
  getActiveFilterCount,
  getSelectionBreadcrumb,
  getSelectionLabel,
  buildCatalogCategoryTree,
  parseCatalogFiltersFromParams,
  type CatalogFilterState,
} from "@/lib/catalog-filters";
import { ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function MDLSCatalogClient() {
  const searchParams = useSearchParams();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<CatalogFilterState>(DEFAULT_CATALOG_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const mdlsProducts = useMemo(() => getMDLSProducts(), []);
  const categoryTree = useMemo(() => buildCatalogCategoryTree(mdlsProducts), [mdlsProducts]);

  useEffect(() => {
    const partial = parseCatalogFiltersFromParams(searchParams);
    if (Object.keys(partial).length > 0) {
      setFilters((prev) => ({ ...prev, ...partial }));
    }
  }, [searchParams]);

  const filteredProducts = useMemo(
    () => filterCatalogProducts(mdlsProducts, filters),
    [mdlsProducts, filters]
  );

  const activeFilterCount = getActiveFilterCount(filters);
  const selectionLabel = getSelectionLabel(categoryTree, filters);
  const breadcrumb = getSelectionBreadcrumb(categoryTree, filters);

  const filterKey = [
    filters.divisionSlug ?? "all",
    filters.categorySlug ?? "all",
    filters.subCategory ?? "all",
    filters.searchTerm.trim().toLowerCase(),
  ].join("|");

  const totalPages = getTotalPages(filteredProducts.length);
  const paginatedProducts = useMemo(
    () => paginateItems(filteredProducts, currentPage),
    [filteredProducts, currentPage]
  );
  const pageRange = getPageRange(currentPage, filteredProducts.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterKey]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleClearAll = useCallback(() => {
    setFilters(DEFAULT_CATALOG_FILTERS);
  }, []);

  const handleSelectionChange = useCallback(() => {
    setMobileFiltersOpen(false);
  }, []);

  const sidebarProps = {
    filters,
    onFiltersChange: setFilters,
    products: mdlsProducts,
    onClearAll: handleClearAll,
    onSelectionChange: handleSelectionChange,
  };

  return (
    <div className="min-h-screen bg-slate-50/40 pb-20 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <ProductHero />

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-start">
            <aside className="hidden w-full shrink-0 md:block md:max-w-[280px] lg:max-w-[300px]">
              <div className="sticky top-24 max-h-[calc(100vh-6.5rem)] overflow-y-auto overscroll-contain pr-1 scrollbar-thin">
                <CatalogFilterSidebar {...sidebarProps} />
              </div>
            </aside>

            <div ref={resultsRef} className="min-w-0 flex-1 scroll-mt-28">
              <div className="sticky top-[4.5rem] z-20 -mx-1 mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-950/90 md:static md:mx-0 md:mb-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
                <div className="min-w-0">
                  {breadcrumb.length > 0 && (
                    <nav
                      aria-label="Current category"
                      className="mb-1 flex flex-wrap items-center gap-1 text-xs text-slate-500 dark:text-slate-400"
                    >
                      {breadcrumb.map((crumb, index) => (
                        <span key={`${crumb}-${index}`} className="flex items-center gap-1">
                          {index > 0 && (
                            <ChevronRight className="h-3 w-3 shrink-0 text-slate-300 dark:text-slate-600" />
                          )}
                          <span
                            className={cn(
                              index === breadcrumb.length - 1 &&
                                "font-semibold text-brand-primary"
                            )}
                          >
                            {crumb}
                          </span>
                        </span>
                      ))}
                    </nav>
                  )}
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {filteredProducts.length > CATALOG_PAGE_SIZE ? (
                      <>
                        Showing{" "}
                        <span className="text-brand-primary">
                          {pageRange.start}–{pageRange.end}
                        </span>{" "}
                        of{" "}
                        <span className="text-brand-primary">{filteredProducts.length}</span>{" "}
                        products
                      </>
                    ) : (
                      <>
                        Showing{" "}
                        <span className="text-brand-primary">{filteredProducts.length}</span>{" "}
                        {filteredProducts.length === 1 ? "product" : "products"}
                      </>
                    )}
                    {selectionLabel && (
                      <>
                        {" "}
                        in{" "}
                        <span className="text-slate-800 dark:text-slate-100">
                          {selectionLabel}
                        </span>
                      </>
                    )}
                    {totalPages > 1 && (
                      <span className="font-normal text-slate-500 dark:text-slate-400">
                        {" "}
                        · Page {currentPage} of {totalPages}
                      </span>
                    )}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 border-slate-200 bg-white md:hidden dark:border-slate-700 dark:bg-slate-900"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Categories
                  {activeFilterCount > 0 && (
                    <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-primary px-1.5 text-[10px] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {filteredProducts.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center dark:border-slate-800 dark:bg-slate-900/40"
                  >
                    <div className="rounded-full border border-slate-200/50 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-900/60">
                      <Search className="h-10 w-10 text-slate-400" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                      No Products Found
                    </h4>
                    <p className="max-w-md px-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      No products match your current category or search. Try another category or
                      clear your filters.
                    </p>
                    <Button onClick={handleClearAll} className="mt-2">
                      View All Products
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <motion.div
                      key={`${filterKey}-page-${currentPage}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3"
                    >
                      {paginatedProducts.map((product, index) => (
                        <motion.div
                          key={product.slug}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.28, delay: Math.min(index * 0.025, 0.25) }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </motion.div>

                    <CatalogPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      className="mt-10 border-t border-slate-100 pt-8 dark:border-slate-800/80"
                    />
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent
          side="left"
          showCloseButton
          className={cn(
            "w-full gap-0 overflow-y-auto border-r border-slate-200/80 p-0 sm:max-w-[340px]",
            "dark:border-slate-800/80"
          )}
        >
          <SheetHeader className="border-b border-slate-100 px-5 py-4 dark:border-slate-800/80">
            <SheetTitle className="text-left text-base font-bold">
              Browse by Category
            </SheetTitle>
            <p className="text-left text-xs text-slate-500 dark:text-slate-400">
              Category → Subcategory
            </p>
          </SheetHeader>
          <div className="p-4">
            <CatalogFilterSidebar
              {...sidebarProps}
              compact
              className="border-0 bg-transparent shadow-none dark:bg-transparent"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
