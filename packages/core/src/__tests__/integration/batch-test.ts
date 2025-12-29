/**
 * Batch Rendering Test
 * Run with: bun run src/__tests__/batch-test.ts
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fontRegistry, ogx } from "../../index";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "../../../../../");
const OUTPUT_DIR = join(ROOT_DIR, "test-output");

async function ensureOutputDir() {
  try {
    await mkdir(OUTPUT_DIR, { recursive: true });
  } catch {
    // ignore
  }
}

async function runTests() {
  console.log("\nTesting Batch Multi-Platform Rendering\n");
  await ensureOutputDir();
  await fontRegistry.registerInter([400, 700]);

  console.log("Rendering batch (Meta, Twitter, Instagram)...");

  const startTime = Date.now();
  const results = await ogx({
    preset: "blog",
    platform: ["meta", "twitter", "instagram"],
    title: "Modern Batch Rendering with OGX",
    author: "Carlos",
    category: "Engineering",
    date: "Dec 26, 2024",
  });
  const duration = Date.now() - startTime;

  console.log(`Batch completed in ${duration}ms`);

  // Verify results structure
  for (const [platform, buffer] of Object.entries(results)) {
    console.log(`${platform}: ${buffer.length} bytes`);
    await writeFile(join(OUTPUT_DIR, `${platform}.png`), buffer);
  }

  console.log(`\nBatch tests complete! Check ${OUTPUT_DIR}\n`);
}

runTests().catch(console.error);
