import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

interface ContactCTAProps {
  title?: string;
  description?: string;
}

export function ContactCTA({
  title = "Let's Advance Healthcare Together",
  description = "Whether you are a diagnostic laboratory, research institution, biotechnology company, pharmaceutical organization, or healthcare provider, Miraco Biocare is ready to support your scientific and clinical goals.",
}: ContactCTAProps) {
  return (
    <section className="bg-gradient-to-r from-brand-primary to-brand-secondary py-12 md:py-16 lg:py-20">
      <div className="container-custom text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm text-white/90 md:text-base">
          {description}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-8 md:gap-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-brand-primary hover:bg-white/90"
          >
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-brand-primary hover:bg-white/10 hover:text-white"
          >
            <Link href="/request-quotation">Request Quotation</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-brand-primary hover:bg-white/10 hover:text-white"
          >
            <Link href="tel:+919876543210">
              <Phone className="mr-2 h-4 w-4" />
              Call Us
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
