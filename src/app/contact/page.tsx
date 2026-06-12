import { Mail, Phone, Globe, MapPin } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { createMetadata } from "@/lib/metadata";
import { company } from "@/data/company";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Contact Miraco Biocare Private Limited for healthcare, diagnostics, and life science solutions.",
  path: "/contact",
});

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: company.email,
    href: `mailto:${company.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: company.phone,
    href: `tel:${company.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Globe,
    label: "Website",
    value: company.website,
    href: `https://${company.website}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: company.address.full,
    href: `https://maps.google.com/?q=${encodeURIComponent(company.address.full)}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's Advance Healthcare Together"
        subtitle={company.contactIntro}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        image="/hero/banner-1.jpg"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <SectionHeading
                label="Get in Touch"
                title="Contact Information"
                description={company.tagline}
              />
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.label === "Address" ? "_blank" : undefined}
                    rel={info.label === "Address" ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 rounded-lg border border-brand-border p-4 transition-colors hover:border-brand-primary/30"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                      <info.icon className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand-text">{info.label}</p>
                      <p className="text-sm text-muted-foreground">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-lg border border-brand-border">
              <iframe
  title="Miraco Biocare Office Location"
  src={`https://maps.google.com/maps?q=${encodeURIComponent(company.address.full)}&z=15&output=embed`}
  className="h-48 w-full md:h-64"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
              </div>
            </div>

            <div className="rounded-lg border border-brand-border bg-brand-light p-4 md:p-6">
              <h3 className="mb-4 text-lg font-semibold text-brand-text">
                Send Us a Message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
