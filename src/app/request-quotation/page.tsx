import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { createMetadata } from "@/lib/metadata";
import { QuotationForm } from "@/components/forms/QuotationForm";

export const metadata = createMetadata({
  title: "Request Quotation",
  description:
    "Submit a quotation request for Miraco Biocare products and solutions.",
  path: "/request-quotation",
});

export default function RequestQuotationPage() {
  return (
    <>
      <PageHero
        title="Request Quotation"
        subtitle="Submit your product requirements and our team will provide a detailed quotation"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Request Quotation" },
        ]}
        image="/hero/banner-1.jpg"
      />

      <section className="section-padding bg-brand-light">
        <div className="container-custom max-w-4xl">
          <SectionHeading
            label="RFQ Form"
            title="Request a Quote"
            description="Please fill in your details and product requirements. Our sales team will review your request and respond within 1-2 business days."
            align="center"
          />
          <QuotationForm />
        </div>
      </section>
    </>
  );
}
