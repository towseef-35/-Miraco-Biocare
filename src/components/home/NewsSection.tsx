"use client";

import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { newsArticles } from "@/data/news";
import { MobileCarousel } from "@/components/shared/MobileCarousel";
import { cn } from "@/lib/utils";

const categoryBadgeColors: Record<string, string> = {
  "Partnership": "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 border-indigo-500/20",
  "Product Launch": "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20",
  "Event": "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20",
  "Company News": "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20",
};

export function NewsSection() {
  const articles = newsArticles.slice(0, 3);

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-950/20 relative overflow-hidden border-t border-slate-100 dark:border-slate-900">
      {/* Decorative floating dots */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <SectionHeading
            label="News & Events"
            title="Latest Activities & Updates"
            description="Stay informed about our global partnerships, cutting-edge product launches, and regional scientific exhibitions."
          />
          <Link
            href="/news"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full border-brand-border/60 hover:border-brand-primary hover:bg-brand-primary/5 dark:bg-slate-950/40 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
            )}
          >
            View All News
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <MobileCarousel className="md:grid-cols-3 gap-6 lg:gap-8" breakpoint="md">
          {articles.map((article, i) => {
            const badgeClass = categoryBadgeColors[article.category] ?? "bg-slate-500/10 text-slate-600 border-slate-500/20";
            
            return (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-col h-full"
              >
                <Link
                  href={`/news/${article.slug}`}
                  className="group flex flex-col h-full overflow-hidden rounded-[2rem] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card hover:border-brand-primary/20 shadow-[0_8px_30px_rgba(0,0,0,0.01)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Banner Image with Scale Zoom */}
                  <div className="relative h-48 overflow-hidden md:h-52 z-0">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    
                    {/* Shadow Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Badge Category overlay */}
                    <span className={cn(
                      "absolute left-4 top-4 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full border backdrop-blur-md shadow-sm z-10",
                      badgeClass
                    )}>
                      {article.category}
                    </span>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-1 flex-col p-6 md:p-8 z-10">
                    {/* Metadata line */}
                    <div className="mb-4 flex items-center gap-4 text-xs font-semibold text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-brand-primary/75 dark:text-brand-accent/75" />
                        {new Date(article.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-brand-primary/75 dark:text-brand-accent/75" />
                        {article.author}
                      </span>
                    </div>

                    <h3 className="mb-3 text-lg font-bold text-slate-950 dark:text-white tracking-tight leading-snug group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="inline-flex items-center text-xs font-extrabold uppercase tracking-wider text-brand-primary dark:text-brand-accent">
                        Read Article
                        <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                      <span className="h-1.5 w-1.5 bg-slate-300 dark:bg-slate-700 rounded-full group-hover:scale-125 group-hover:bg-brand-primary dark:group-hover:bg-brand-accent transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </MobileCarousel>
      </div>
    </section>
  );
}
