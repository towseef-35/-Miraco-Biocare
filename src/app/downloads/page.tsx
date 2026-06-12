import { Download, FileText } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createMetadata } from "@/lib/metadata";
import { downloads } from "@/data/downloads";

export const metadata = createMetadata({
  title: "Downloads",
  description:
    "Download product catalogs, brochures, and technical documents from Miraco Biocare.",
  path: "/downloads",
});

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        title="Downloads"
        subtitle="Product catalogs, brochures, and technical resources"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Downloads" },
        ]}
        image="/hero/banner-1.jpg"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            label="Resources"
            title="Download Center"
            description="Access our latest product catalogs, brochures, and technical documentation."
            align="center"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
            {downloads.map((doc) => (
              <div
                key={doc.title}
                className="flex items-start gap-4 rounded-lg border border-brand-border bg-white p-4 md:p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                  <FileText className="h-6 w-6 text-brand-primary" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-brand-text">{doc.title}</h3>
                    <Badge variant="secondary">{doc.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {doc.type} • {doc.size}
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
