import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { Badge } from "@/components/ui/badge";
import { createMetadata } from "@/lib/metadata";
import { newsArticles } from "@/data/news";

export const metadata = createMetadata({
  title: "News & Events",
  description:
    "Latest news, events, and announcements from Miraco Biocare Private Limited.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <>
      <PageHero
        title="News & Events"
        subtitle="Stay updated with the latest from Miraco Biocare"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News & Events" },
        ]}
        image="/hero/banner-2.jpg"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            label="Latest Updates"
            title="News & Announcements"
            align="center"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
            {newsArticles.map((article) => (
              <article
                key={article.slug}
                className="group overflow-hidden rounded-lg border border-brand-border bg-white transition-shadow hover:shadow-md"
              >
                <Link href={`/news/${article.slug}`} className="flex flex-col md:flex-row">
                  <div className="relative h-48 w-full shrink-0 overflow-hidden md:h-auto md:w-48 lg:w-56">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 200px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 md:p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-brand-primary">{article.category}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(article.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-brand-text group-hover:text-brand-primary md:text-lg">
                      {article.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                    <span className="mt-3 inline-flex items-center text-sm font-medium text-brand-primary">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
