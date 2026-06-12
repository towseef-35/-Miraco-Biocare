interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`mb-8 max-w-3xl md:mb-12 ${alignClass}`}>
      {label && (
        <span
          className={`mb-2 inline-block text-xs font-semibold uppercase tracking-widest md:text-sm ${
            light ? "text-brand-secondary" : "text-brand-secondary"
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`text-2xl font-bold md:text-3xl lg:text-4xl ${
          light ? "text-white" : "text-brand-text"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-sm leading-relaxed md:mt-4 md:text-base ${
            light ? "text-white/85" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
