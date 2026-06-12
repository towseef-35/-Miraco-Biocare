import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Gallery",
  description:
    "Photo gallery showcasing Miraco Biocare laboratories, events, and healthcare solutions.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="A glimpse into our laboratories, events, and healthcare solutions"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
        image="/hero/banner-3.jpg"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            label="Photo Gallery"
            title="Our World in Pictures"
            align="center"
          />
          <GalleryGrid />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
