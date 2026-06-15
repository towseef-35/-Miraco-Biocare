import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  image?: string;
}

const DEFAULT_BANNER = "/hero/banner-1.jpg";

export function PageHero({ title, subtitle, breadcrumbs, image }: PageHeroProps) {
  return (
    <section className="relative h-[280px] sm:h-[320px] md:h-[350px] lg:h-[550px] overflow-hidden bg-brand-light">
      <Image
        src={image || DEFAULT_BANNER}
        alt={title}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent dark:from-background/90 dark:via-background/45 dark:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 top-16 md:top-0 flex items-center">
        <div className="container-custom w-full py-4 md:py-6">
          <div className="max-w-2xl rounded-lg border border-brand-border/60 bg-white/85 p-4 shadow-sm backdrop-blur-sm md:max-w-3xl md:p-6 md:shadow-md lg:p-8">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="mb-2 flex flex-wrap items-center gap-1 text-xs text-muted-foreground md:mb-3 md:text-sm">
                {breadcrumbs.map((crumb, i) => (
                  <span key={crumb.label} className="flex items-center gap-1">
                    {i > 0 && <ChevronRight className="h-3 w-3 shrink-0" />}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="transition-colors hover:text-brand-primary"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="font-medium text-brand-text">{crumb.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
            <h1 className="text-xl font-bold leading-tight text-brand-text sm:text-2xl md:text-3xl lg:text-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 line-clamp-3 text-xs text-muted-foreground sm:line-clamp-none md:mt-3 md:text-sm lg:text-base">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
