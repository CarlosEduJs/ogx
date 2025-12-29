/**
 * Run with: bun run src/__tests__/builder-premium-test.ts
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  absolute,
  badge,
  fluent,
  fontRegistry,
  h1,
  img,
  loadAsset,
  p,
  render,
  row,
  spacer,
  stack,
} from "../../index";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, "assets");
const ROOT_DIR = join(__dirname, "../../../../../");
const OUTPUT_DIR = join(ROOT_DIR, "test-output");

async function main() {
  console.log("\nTesting Builder API\n");
  await mkdir(OUTPUT_DIR, { recursive: true });

  await fontRegistry.registerInter([400, 600, 700]);
  const logo = await loadAsset(join(ASSETS_DIR, "logo-transparent.svg"));

  const element = stack(
    "w-full h-full bg-zinc-950 p-20 items-center justify-center",
    [
      absolute("bg-grid-zinc-950/20-40"),
      fluent(
        stack("items-center gap-10", [
          img(logo, "w-32"),

          stack("items-center gap-3", [
            h1("text-white text-center font-bold", "OGX Builder"),
            p("text-2xl font-medium", "The next level of OG Image ergonomics"),
          ]),

          spacer(),

          row("gap-4", [
            badge("Fluent API", "blue"),
            badge("Semantic Typography", "green"),
            badge("High-level Primitives", "purple"),
          ]),
        ]),
      ).element,
    ],
  );

  console.log("Rendering ogx...");
  const png = await render(element);

  await writeFile(join(OUTPUT_DIR, "ogx.png"), png);
  console.log("ogx.png generated!");
}

main();
