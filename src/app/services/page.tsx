import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { IconResolver } from "@/components/shared/IconResolver";
import { createMetadata } from "@/lib/metadata";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { MobileCarousel } from "@/components/shared/MobileCarousel";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Professional installation, training, maintenance, and application support services for laboratory equipment.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive support services for your laboratory success"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
        image="/hero/banner-3.jpg"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            label="Support Services"
            title="End-to-End Laboratory Support"
            description="From installation to ongoing maintenance, our expert team ensures your laboratory operates at peak performance."
            align="center"
          />
          <MobileCarousel className="md:grid-cols-2 lg:grid-cols-3 lg:gap-6" breakpoint="md">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-brand-border bg-white transition-shadow hover:shadow-md"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10">
                    <IconResolver
                      name={service.icon}
                      className="h-5 w-5 text-brand-primary"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-brand-text group-hover:text-brand-primary md:text-lg">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
                    {service.description}
                  </p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-brand-primary">
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </MobileCarousel>
        </div>
      </section>

      <section className="section-padding bg-brand-light">
        <div className="container-custom">
          <SectionHeading
            label="Technical Support"
            title="Technical Support & Services"
            description={company.technicalSupportIntro}
            align="center"
          />
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {company.technicalSupportItems.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 rounded-lg border border-brand-border bg-white p-4"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
