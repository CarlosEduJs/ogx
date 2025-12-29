/**
 * Performance Benchmark Test
 * Run with: bun run src/__tests__/performance-bench-test.ts
 */

import { fontRegistry, ogx } from "../../index";

async function benchmark() {
  console.log("\nOGX Turbo Engine Benchmark\n");

  // 1. Warm up (Load fonts)
  console.log("Warming up engine...");
  const startWarm = performance.now();
  await fontRegistry.registerInter([400, 700]);
  const endWarm = performance.now();
  console.log(`Engine warmed in ${(endWarm - startWarm).toFixed(2)}ms`);

  const iterations = 50;
  console.log(
    `\n⚡ Rendering ${iterations} images (simulating cache hits and repeats)...`,
  );

  const startRender = performance.now();

  for (let i = 0; i < iterations; i++) {
    // We use slightly different titles to avoid basic top-level cache
    // but the inner layout and Tailwind classes will be heavily memoized
    await ogx({
      preset: "social",
      title: `Iteration #${i}`,
      brand: "TURBO ENGINE",
      handle: "@ogx_benchmark",
      cache: false,
    });

    if (i % 10 === 0 && i > 0) {
      console.log(`   Processed ${i} images...`);
    }
  }

  const endRender = performance.now();
  const totalTime = endRender - startRender;
  const avgTime = totalTime / iterations;

  console.log("\n--- Results ---");
  console.log(`Total Time:   ${totalTime.toFixed(2)}ms`);
  console.log(`Average/Img:  ${avgTime.toFixed(2)}ms`);
  console.log("---------------");

  if (avgTime < 50) {
    console.log(
      "\nSubsonic Speeds Achieved! The Turbo Engine is ready for production.",
    );
  } else {
    console.log(
      "\nPerformance is adequate, but more optimizations could be made.",
    );
  }
}

benchmark().catch(console.error);
