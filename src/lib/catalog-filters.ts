import type { Product } from "@/data/products";

export interface CatalogFilterState {
  searchTerm: string;
  /** Division filter; null = all divisions */
  divisionSlug: "life-sciences" | "molecular-diagnostics" | null;
  /** Product categorySlug; null = all categories in selected division */
  categorySlug: string | null;
  /** Optional subcategory label match (Molecular Diagnostics panels) */
  subCategory: string | null;
}

export interface CatalogSubcategoryNode {
  id: string;
  label: string;
  categorySlug: string;
  subCategory: string | null;
  count: number;
}

export interface CatalogCategoryNode {
  id: string;
  label: string;
  categorySlug: string;
  count: number;
  subcategories: CatalogSubcategoryNode[];
}

export interface CatalogDivisionNode {
  id: "life-sciences" | "molecular-diagnostics";
  label: string;
  count: number;
  categories: CatalogCategoryNode[];
}

/** Matches all molecular diagnostics panel products (non-singleplex). */
export const MULTIPLEX_CATEGORY_SLUG = "__rt-pcr-multiplex__";

export const DEFAULT_CATALOG_FILTERS: CatalogFilterState = {
  searchTerm: "",
  divisionSlug: null,
  categorySlug: null,
  subCategory: null,
};

function slugifyLabel(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function matchesSearch(product: Product, searchTerm: string): boolean {
  if (!searchTerm.trim()) return true;
  const query = searchTerm.toLowerCase();
  return (
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    (product.subCategory?.toLowerCase().includes(query) ?? false) ||
    product.applications?.some((tag) => tag.toLowerCase().includes(query)) === true
  );
}

export function isMultiplexProduct(product: Product): boolean {
  return (
    product.divisionSlug === "molecular-diagnostics" &&
    !!product.categorySlug &&
    product.categorySlug !== "rt-pcr-singleplex"
  );
}

export function productMatchesCategorySelection(
  product: Product,
  divisionSlug: CatalogFilterState["divisionSlug"],
  categorySlug: string | null,
  subCategory: string | null
): boolean {
  if (divisionSlug && product.divisionSlug !== divisionSlug) {
    return false;
  }

  if (categorySlug) {
    if (categorySlug === MULTIPLEX_CATEGORY_SLUG) {
      if (!isMultiplexProduct(product)) return false;
    } else if (product.categorySlug !== categorySlug) {
      return false;
    }
  }

  if (subCategory && product.subCategory !== subCategory) {
    return false;
  }

  return true;
}

export function filterCatalogProducts(
  products: Product[],
  filters: CatalogFilterState
): Product[] {
  return products.filter(
    (product) =>
      matchesSearch(product, filters.searchTerm) &&
      productMatchesCategorySelection(
        product,
        filters.divisionSlug,
        filters.categorySlug,
        filters.subCategory
      )
  );
}

export function buildCatalogCategoryTree(products: Product[]): CatalogDivisionNode[] {
  const divisions: CatalogDivisionNode[] = [
    {
      id: "life-sciences",
      label: "Life Sciences",
      count: 0,
      categories: [],
    },
    {
      id: "molecular-diagnostics",
      label: "Molecular Diagnostics",
      count: 0,
      categories: [],
    },
  ];

  const divisionMap = new Map(divisions.map((d) => [d.id, d]));

  for (const product of products) {
    if (!product.divisionSlug || !product.categorySlug) continue;

    const division = divisionMap.get(product.divisionSlug);
    if (!division) continue;

    division.count += 1;

    if (isMultiplexProduct(product)) {
      continue;
    }

    let category = division.categories.find((c) => c.categorySlug === product.categorySlug);

    if (!category) {
      category = {
        id: product.categorySlug,
        label: product.category,
        categorySlug: product.categorySlug,
        count: 0,
        subcategories: [],
      };
      division.categories.push(category);
    }

    category.count += 1;

    if (product.subCategory) {
      const subId = `${product.categorySlug}::${slugifyLabel(product.subCategory)}`;
      let sub = category.subcategories.find((s) => s.id === subId);
      if (!sub) {
        sub = {
          id: subId,
          label: product.subCategory,
          categorySlug: product.categorySlug,
          subCategory: product.subCategory,
          count: 0,
        };
        category.subcategories.push(sub);
      }
      sub.count += 1;
    }
  }

  const mdDivision = divisionMap.get("molecular-diagnostics");
  if (mdDivision) {
    const multiplexProducts = products.filter(isMultiplexProduct);
    if (multiplexProducts.length > 0) {
      const multiplexCategory: CatalogCategoryNode = {
        id: MULTIPLEX_CATEGORY_SLUG,
        label: "RT-PCR Multiplex",
        categorySlug: MULTIPLEX_CATEGORY_SLUG,
        count: multiplexProducts.length,
        subcategories: [],
      };

      const panelGroups = new Map<string, CatalogSubcategoryNode>();

      for (const product of multiplexProducts) {
        if (!product.categorySlug) continue;

        const subId = `${product.categorySlug}::${slugifyLabel(product.subCategory ?? product.category)}`;
        let sub = panelGroups.get(subId);
        if (!sub) {
          sub = {
            id: subId,
            label: product.subCategory ?? product.category,
            categorySlug: product.categorySlug,
            subCategory: product.subCategory ?? null,
            count: 0,
          };
          panelGroups.set(subId, sub);
        }
        sub.count += 1;
      }

      multiplexCategory.subcategories = Array.from(panelGroups.values()).sort((a, b) =>
        a.label.localeCompare(b.label)
      );

      const singleplex = mdDivision.categories.find(
        (c) => c.categorySlug === "rt-pcr-singleplex"
      );
      const others = mdDivision.categories.filter(
        (c) => c.categorySlug !== "rt-pcr-singleplex"
      );

      mdDivision.categories = [
        ...(singleplex ? [singleplex] : []),
        multiplexCategory,
        ...others.sort((a, b) => a.label.localeCompare(b.label)),
      ];
    } else {
      mdDivision.categories.sort((a, b) => a.label.localeCompare(b.label));
    }
  }

  divisionMap.get("life-sciences")?.categories.sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  return divisions;
}

export function getActiveFilterCount(filters: CatalogFilterState): number {
  let count = filters.searchTerm.trim() ? 1 : 0;
  if (filters.divisionSlug) count += 1;
  if (filters.categorySlug) count += 1;
  if (filters.subCategory) count += 1;
  return count;
}

export function getSelectionLabel(
  tree: CatalogDivisionNode[],
  filters: CatalogFilterState
): string | null {
  const context = findSelectionContext(tree, filters);
  if (!context.division) return null;

  if (context.subcategory) return context.subcategory.label;
  if (context.category) return context.category.label;
  return context.division.label;
}

export interface CatalogSelectionContext {
  division: CatalogDivisionNode | null;
  category: CatalogCategoryNode | null;
  subcategory: CatalogSubcategoryNode | null;
}

export function findSelectionContext(
  tree: CatalogDivisionNode[],
  filters: CatalogFilterState
): CatalogSelectionContext {
  const empty: CatalogSelectionContext = {
    division: null,
    category: null,
    subcategory: null,
  };

  if (!filters.divisionSlug) return empty;

  const division = tree.find((d) => d.id === filters.divisionSlug) ?? null;
  if (!division) return empty;

  if (!filters.categorySlug) {
    return { division, category: null, subcategory: null };
  }

  const directCategory = division.categories.find(
    (c) => c.categorySlug === filters.categorySlug
  );

  if (directCategory) {
    const subcategory = filters.subCategory
      ? directCategory.subcategories.find((s) => s.subCategory === filters.subCategory) ??
        null
      : null;

    return {
      division,
      category: directCategory,
      subcategory,
    };
  }

  for (const category of division.categories) {
    const subcategory = category.subcategories.find(
      (s) =>
        s.categorySlug === filters.categorySlug &&
        (!filters.subCategory || s.subCategory === filters.subCategory)
    );

    if (subcategory) {
      return { division, category, subcategory };
    }
  }

  return { division, category: null, subcategory: null };
}

export function getSelectionBreadcrumb(
  tree: CatalogDivisionNode[],
  filters: CatalogFilterState
): string[] {
  const context = findSelectionContext(tree, filters);
  if (!context.division) return [];

  const crumbs = [context.division.label];
  if (context.category) crumbs.push(context.category.label);
  if (context.subcategory) crumbs.push(context.subcategory.label);
  return crumbs;
}

export function parseCatalogFiltersFromParams(
  params: URLSearchParams
): Partial<CatalogFilterState> {
  const partial: Partial<CatalogFilterState> = {};
  const division = params.get("division");
  const category = params.get("category");

  if (division === "life-sciences" || division === "molecular-diagnostics") {
    partial.divisionSlug = division;
  }

  if (category) {
    partial.categorySlug = category;
    if (division === "life-sciences" || !division) {
      partial.divisionSlug = "life-sciences";
    } else if (division === "molecular-diagnostics") {
      partial.divisionSlug = "molecular-diagnostics";
    }
  }

  if (category === "rt-pcr-singleplex") {
    partial.divisionSlug = "molecular-diagnostics";
  }

  return partial;
}

export function selectDivision(
  divisionId: "life-sciences" | "molecular-diagnostics"
): CatalogFilterState {
  return {
    ...DEFAULT_CATALOG_FILTERS,
    divisionSlug: divisionId,
    categorySlug: null,
    subCategory: null,
  };
}

export function selectCategory(
  filters: CatalogFilterState,
  divisionId: "life-sciences" | "molecular-diagnostics",
  categorySlug: string
): CatalogFilterState {
  return {
    ...filters,
    divisionSlug: divisionId,
    categorySlug,
    subCategory: null,
  };
}

export function selectSubcategory(
  filters: CatalogFilterState,
  divisionId: "life-sciences" | "molecular-diagnostics",
  categorySlug: string,
  subCategory: string | null,
  actualCategorySlug?: string
): CatalogFilterState {
  const resolvedCategory =
    categorySlug === MULTIPLEX_CATEGORY_SLUG
      ? actualCategorySlug ?? MULTIPLEX_CATEGORY_SLUG
      : categorySlug;

  return {
    ...filters,
    divisionSlug: divisionId,
    categorySlug:
      categorySlug === MULTIPLEX_CATEGORY_SLUG && actualCategorySlug
        ? actualCategorySlug
        : resolvedCategory,
    subCategory,
  };
}

export function isDivisionSelected(
  filters: CatalogFilterState,
  divisionId: "life-sciences" | "molecular-diagnostics"
): boolean {
  return (
    filters.divisionSlug === divisionId &&
    !filters.categorySlug &&
    !filters.subCategory
  );
}

export function isCategorySelected(
  filters: CatalogFilterState,
  divisionId: "life-sciences" | "molecular-diagnostics",
  categorySlug: string
): boolean {
  return (
    filters.divisionSlug === divisionId &&
    filters.categorySlug === categorySlug &&
    !filters.subCategory
  );
}

export function isSubcategorySelected(
  filters: CatalogFilterState,
  divisionId: "life-sciences" | "molecular-diagnostics",
  categorySlug: string,
  subCategory: string | null,
  actualCategorySlug?: string
): boolean {
  if (filters.divisionSlug !== divisionId) return false;

  if (categorySlug === MULTIPLEX_CATEGORY_SLUG && actualCategorySlug) {
    return (
      filters.categorySlug === actualCategorySlug &&
      filters.subCategory === subCategory
    );
  }

  return filters.categorySlug === categorySlug && filters.subCategory === subCategory;
}
