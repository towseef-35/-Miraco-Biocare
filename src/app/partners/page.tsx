import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { createMetadata } from "@/lib/metadata";
import { partners } from "@/data/partners";

export const metadata = createMetadata({
  title: "Partners",
  description:
    "Miraco Biocare partners with globally recognized manufacturers and technology innovators in healthcare and life sciences.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        title="Technology Partners"
        subtitle="Collaborating with global leaders in healthcare and life sciences"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Partners" },
        ]}
        image="/hero/banner-4.jpg"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            label="Global Collaborations"
            title="Our Technology Partners"
            description="Miraco Biocare partners with internationally recognized manufacturers and technology innovators to deliver world-class solutions. Our collaborations ensure access to advanced technologies, robust product portfolios, and comprehensive technical support."
            align="center"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
            {partners.map((partner) => {
              const CardContent = (
                <>
                  <p className="text-xl font-bold text-brand-primary/80 md:text-2xl">
                    {partner.initials}
                  </p>
                  <p className="mt-1 text-center text-[10px] font-medium text-muted-foreground md:text-xs">
                    {partner.name}
                  </p>
                </>
              );

              if (partner.website) {
                return (
                  <a
                    key={partner.name}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-24 flex-col items-center justify-center rounded-lg border border-brand-border bg-brand-light p-4 transition-all hover:border-brand-primary/30 hover:shadow-md hover:scale-[1.02] md:h-28"
                  >
                    {CardContent}
                  </a>
                );
              }

              return (
                <div
                  key={partner.name}
                  className="flex h-24 flex-col items-center justify-center rounded-lg border border-brand-border bg-brand-light p-4 transition-shadow hover:shadow-md md:h-28"
                >
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-light">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-brand-text md:text-3xl">
              Partnership Benefits
            </h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              Through our strategic partnerships, we provide customers with access to
              cutting-edge technologies, genuine products, comprehensive warranties, and
              factory-trained technical support. Our partner network spans diagnostics,
              life sciences, genomics, and pharmaceutical sectors — including globally
              recognized brands such as Eppendorf and Haier Biomedical.
            </p>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
