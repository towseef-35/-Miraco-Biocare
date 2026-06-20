import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PRODUCT_IMAGE_ALIASES } from "../src/lib/product-image-design-system";

const productsDir = join(process.cwd(), "public/images/products");
const prompts = JSON.parse(
  readFileSync(join(process.cwd(), "src/data/product-image-prompts.json"), "utf8")
) as Array<{ slug: string; filename: string; imagePath: string; prompt: string }>;

const existing = new Set(readdirSync(productsDir));

function imageExists(imagePath: string): boolean {
  return existing.has(imagePath.replace("/images/products/", ""));
}

const missing = prompts.filter((entry) => {
  const aliasPath = PRODUCT_IMAGE_ALIASES[entry.slug];
  if (aliasPath && imageExists(aliasPath)) return false;
  return !existing.has(entry.filename);
});

writeFileSync(
  join(process.cwd(), "scripts/missing-product-prompts.json"),
  JSON.stringify(missing, null, 2)
);

console.log(`Missing: ${missing.length} / ${prompts.length}`);
