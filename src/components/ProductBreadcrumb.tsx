import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ProductBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function ProductBreadcrumb({ items }: ProductBreadcrumbProps) {
  return (
    <nav className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 md:text-sm py-3 px-1">
      <Link
        href="/"
        className="flex items-center gap-1 transition-colors hover:text-brand-primary dark:hover:text-brand-primary shrink-0"
      >
        <Home className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.label + index} className="flex items-center gap-x-2 shrink-0">
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-brand-primary dark:hover:text-brand-primary text-slate-600 dark:text-slate-300 whitespace-nowrap truncate max-w-[120px] xs:max-w-[160px] sm:max-w-[240px]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-900 dark:text-slate-100 font-semibold whitespace-nowrap truncate max-w-[120px] xs:max-w-[160px] sm:max-w-[240px] md:max-w-[350px]">
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
