/**
 * SciPhi™ unified product photography design system.
 * Every catalog image uses the same camera, box, background, lighting, and composition.
 * Only product name, category label, and scientific illustration vary per product.
 *
 * Prompts are generated in batch from product data via product-image-prompt-generator.ts.
 */

export const SCI_PHI_DESIGN_SYSTEM = {
  aspectRatio: "1:1",
  camera: {
    angle: "fixed 3/4 front-left perspective at product center height",
    lens: "35mm equivalent",
    boxRotation: "15 degrees toward camera",
    framing: "box occupies 60% of frame height, horizontally centered with 10% side margins",
  },
  packaging: {
    shape: "identical matte white rectangular product box, landscape front face 3:2 ratio",
    dimensions: "same exact box size and thickness on every product",
    logo: "SciPhi wordmark upper-left in deep blue #0057B8",
    headerBand: "solid blue #0057B8 horizontal band across upper 25% of front panel",
    accentLine: "thin cyan #009FE3 line immediately below blue band",
    categoryText: "small uppercase cyan #009FE3 category label below logo area",
    productName: "bold blue #0057B8 sans-serif product name below category",
    illustration: "centered blue-to-cyan gradient scientific line art on lower half of front panel",
    sidePanel: "right edge shows identical subtle barcode strip on white side panel",
  },
  environment: {
    background: "seamless off-white #F8FAFC empty laboratory studio backdrop, no equipment",
    surface: "pristine glossy white acrylic reflective tabletop with soft mirror reflection beneath box",
    props: "single product box only, no bottles, tubes, hands, or extra items",
  },
  lighting: {
    key: "soft diffused studio key light from upper-left 45 degrees",
    fill: "gentle fill from right",
    rim: "faint rim light on box edges",
    shadow: "minimal shadow falling lower-right",
  },
  palette: ["#FFFFFF", "#F8FAFC", "#0057B8", "#009FE3"],
  quality: "ultra-sharp photorealistic 4K commercial biotech catalog photography",
} as const;

export const UNIVERSAL_NEGATIVE_PROMPT =
  "different camera angle, top-down view, straight-on flat front only, side view only, multiple boxes, open box, scattered reagents, bottles, tubes, lab equipment, centrifuge, pipette, dark background, black background, wood table, green branding, purple branding, orange branding, red branding, cartoon, illustration style flat vector, blurry, low resolution, watermark, logo stamp, people, hands, distorted box, warped label, inconsistent box size, different box shape, 3D render, CGI, neon lighting, lens flare, text overlay, price tag, cluttered scene";

export interface CatalogProductImageConfig {
  slug: string;
  name: string;
  categoryLabel: string;
  illustration: string;
  filename: string;
}

export function buildCatalogImagePrompt(config: CatalogProductImageConfig): string {
  const ds = SCI_PHI_DESIGN_SYSTEM;

  return [
    "Professional biotechnology catalog product photograph, square 1:1 aspect ratio.",
    `LOCKED CAMERA: ${ds.camera.angle}, ${ds.camera.lens}, box rotated ${ds.camera.boxRotation}, ${ds.camera.framing}.`,
    `LOCKED PACKAGING: ${ds.packaging.shape}, ${ds.packaging.dimensions}.`,
    `${ds.packaging.logo}. ${ds.packaging.headerBand}. ${ds.packaging.accentLine}.`,
    `Category label on box reads "${config.categoryLabel}" in ${ds.packaging.categoryText}.`,
    `Product name on box reads "${config.name}" in ${ds.packaging.productName}.`,
    `ONLY VARIABLE GRAPHIC: ${config.illustration} on ${ds.packaging.illustration}.`,
    `${ds.packaging.sidePanel}.`,
    `LOCKED BACKGROUND: ${ds.environment.background}.`,
    `LOCKED SURFACE: ${ds.environment.surface}. ${ds.environment.props}.`,
    `LOCKED LIGHTING: ${ds.lighting.key}, ${ds.lighting.fill}, ${ds.lighting.rim}, ${ds.lighting.shadow}.`,
    `Color palette strictly white, off-white #F8FAFC, blue #0057B8, cyan #009FE3 only.`,
    `${ds.quality}. No watermark, no people, no text overlay beyond printed box label.`,
    "Must look identical in composition to other SciPhi catalog products — same family, same company, same catalog series.",
  ].join(" ");
}

/** Slugs whose image files use a different filename than the product slug. */
export const PRODUCT_IMAGE_ALIASES: Record<string, string> = {
  "sciphi-pcr-master-mix-2x": "/images/products/sciphi-2x-pcr-master-mix.png",
  "sciphi-qpcr-master-mix-2x": "/images/products/sciphi-qpcr-master-mix.png",
  "sciphi-hot-start-dna-polymerase-5u-l":
    "/images/products/sciphi-hot-start-taq-dna-polymerase.png",
  "sti-panel": "/images/products/sti-multiplex-panel.png",
  "gastroenteritis-panel": "/images/products/gastrointestinal-pathogen-panel.png",
};

export function resolveCatalogImagePath(slug: string): string {
  return PRODUCT_IMAGE_ALIASES[slug] ?? `/images/products/${slug}.png`;
}
