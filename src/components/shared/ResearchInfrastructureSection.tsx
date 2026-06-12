import { Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { researchInfrastructure } from "@/data/divisions-content";

export function ResearchInfrastructureSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          label="Infrastructure"
          title={researchInfrastructure.title}
          description={researchInfrastructure.description}
          align="center"
        />
        <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
          {researchInfrastructure.solutions.map((solution) => (
            <div
              key={solution}
              className="flex items-start gap-2 rounded-lg border border-brand-border bg-brand-light p-4"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
              <span className="text-sm text-muted-foreground">{solution}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
