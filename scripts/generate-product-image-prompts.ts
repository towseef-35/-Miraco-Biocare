import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { generateAllCatalogImagePrompts } from "../src/lib/product-image-prompt-generator";

const outputPath = join(process.cwd(), "src/data/product-image-prompts.json");
const prompts = generateAllCatalogImagePrompts();

writeFileSync(outputPath, `${JSON.stringify(prompts, null, 2)}\n`, "utf8");

console.log(`Generated ${prompts.length} product image prompts → ${outputPath}`);
