/**
 * Comprehensive Performance Benchmark
 * Tests OGX performance across different scenarios
 *
 * Run with: pnpm -F @ogxjs/core bench
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
	absolute,
	fontRegistry,
	h1,
	ogx,
	p,
	render,
	row,
	stack,
} from "../../index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "../../../../../");
const OUTPUT_DIR = join(ROOT_DIR, "benchmarks");

interface BenchmarkResult {
	name: string;
	iterations: number;
	min: number;
	max: number;
	mean: number;
	median: number;
	p90: number;
	p99: number;
	stdDev: number;
}

// Calculate statistics from timing array
function calculateStats(name: string, times: number[]): BenchmarkResult {
	const sorted = [...times].sort((a, b) => a - b);
	const mean = times.reduce((a, b) => a + b) / times.length;
	const median = sorted[Math.floor(times.length / 2)];
	const p90 = sorted[Math.floor(times.length * 0.9)];
	const p99 = sorted[Math.floor(times.length * 0.99)];

	const variance =
		times.reduce((acc, val) => acc + (val - mean) ** 2, 0) / times.length;
	const stdDev = Math.sqrt(variance);

	return {
		name,
		iterations: times.length,
		min: Number(Math.min(...times).toFixed(2)),
		max: Number(Math.max(...times).toFixed(2)),
		mean: Number(mean.toFixed(2)),
		median: Number(median.toFixed(2)),
		p90: Number(p90.toFixed(2)),
		p99: Number(p99.toFixed(2)),
		stdDev: Number(stdDev.toFixed(2)),
	};
}

// Benchmark: Minimal Preset (simplest scenario)
async function benchmarkMinimal(iterations: number): Promise<BenchmarkResult> {
	const times: number[] = [];

	for (let i = 0; i < iterations; i++) {
		const start = performance.now();
		await ogx({
			preset: "minimal",
			title: `Test ${i}`,
			subtitle: "Performance benchmark",
			cache: false,
		});
		times.push(performance.now() - start);
	}

	return calculateStats("Minimal Preset", times);
}

// Benchmark: Social Preset (complex layout)
async function benchmarkSocial(iterations: number): Promise<BenchmarkResult> {
	const times: number[] = [];

	for (let i = 0; i < iterations; i++) {
		const start = performance.now();
		await ogx({
			preset: "social",
			title: `Benchmark ${i}`,
			brand: "OGX",
			handle: "@ogx_perf",
			cache: false,
		});
		times.push(performance.now() - start);
	}

	return calculateStats("Social Preset", times);
}

// Benchmark: Docs Preset (with theme)
async function benchmarkDocs(iterations: number): Promise<BenchmarkResult> {
	const times: number[] = [];

	for (let i = 0; i < iterations; i++) {
		const start = performance.now();
		await ogx({
			preset: "docs",
			title: `Documentation ${i}`,
			description: "Performance testing",
			siteName: "OGX Docs",
			colorScheme: "dark",
			cache: false,
			theme: {
				background: "#0a0a0a",
				foreground: "#fafafa",
				primary: "#3b82f6",
			},
		});
		times.push(performance.now() - start);
	}

	return calculateStats("Docs Preset", times);
}

// Benchmark: With Cache (should be much faster)
async function benchmarkWithCache(
	iterations: number,
): Promise<BenchmarkResult> {
	const times: number[] = [];

	// Same config to test cache
	const config = {
		preset: "minimal" as const,
		title: "Cached Test",
		subtitle: "Same config every time",
		cache: true,
	};

	// Warm the cache once so the timed loop measures only cache hits
	await ogx(config);

	for (let i = 0; i < iterations; i++) {
		const start = performance.now();
		await ogx(config);
		times.push(performance.now() - start);
	}

	return calculateStats("With Cache", times);
}

// Benchmark: Custom Layout (builder API without presets)
async function benchmarkCustomLayout(
	iterations: number,
): Promise<BenchmarkResult> {
	const times: number[] = [];

	for (let i = 0; i < iterations; i++) {
		const start = performance.now();

		const element = stack(
			"w-full h-full bg-zinc-950 p-20 items-center justify-center",
			[
				absolute(
					"bg-gradient-to-br from-green-500/10 via-transparent to-purple-500/10",
				),
				stack("items-center gap-12", [
					row("items-center gap-4", [
						stack("w-16 h-16 bg-white/10 rounded-xl", []),
					]),

					stack("items-center gap-4", [
						h1(
							"text-white text-6xl font-bold tracking-tight text-center",
							`Custom Layout ${i}`,
						),
						p(
							"text-slate-400 text-2xl text-center",
							"Testing builder API performance",
						),
					]),
				]),
			],
		);

		await render(element);
		times.push(performance.now() - start);
	}

	return calculateStats("Custom Layout", times);
}

// Generate Markdown Report
function generateMarkdown(results: BenchmarkResult[]): string {
	return `# OGX Performance Benchmarks

Last updated: ${new Date().toISOString().split("T")[0]}

## Environment

- **Node.js:** ${process.version}
- **Platform:** ${process.platform} (${process.arch})
- **Iterations:** ${results[0].iterations} per scenario

## Results

| Scenario | Mean | Median | P90 | P99 | Min | Max | Std Dev |
|----------|------|--------|-----|-----|-----|-----|---------|
${results
	.map(
		(r) =>
			`| ${r.name} | ${r.mean}ms | ${r.median}ms | ${r.p90}ms | ${r.p99}ms | ${r.min}ms | ${r.max}ms | ±${r.stdDev}ms |`,
	)
	.join("\n")}

## Key Findings

- **Minimal preset:** Fastest option for simple OG images (~${results[0].mean}ms average)
- **Caching:** ${results[4].mean < results[0].mean / 10 ? "Extremely effective" : "Improves performance"} (${results[4].mean}ms cached vs ${results[0].mean}ms uncached)
- **Complex layouts:** Still performant even with rich presets (~${results[1].mean}ms average)
- **Custom layouts:** Builder API performs similarly to presets (~${results[3].mean}ms average)

## Performance Targets

- Simple scenarios: **< 200ms** (achieved: ${results[0].mean}ms)
- Complex scenarios: **< 500ms** (achieved: ${results[1].mean}ms)  
- Cached renders: **< 10ms** (achieved: ${results[4].mean}ms)

## Run Benchmarks Yourself

\`\`\`bash
pnpm -F @ogxjs/core bench
\`\`\`

---

*Benchmarks run in Node.js runtime. Performance may vary based on hardware and system load.*
`;
}

// Main benchmark runner
async function main() {
	console.log("\n🏁 OGX Performance Benchmark\n");

	await mkdir(OUTPUT_DIR, { recursive: true });

	// Warm up
	console.log("🔥 Warming up...");
	await fontRegistry.registerInter([400, 700]);

	for (let i = 0; i < 10; i++) {
		await ogx({ preset: "minimal", title: "Warm up", cache: false });
	}
	console.log("✓ Warm-up complete\n");

	const ITERATIONS = 100;
	console.log(`📊 Running ${ITERATIONS} iterations per scenario...\n`);

	// Run benchmarks
	const minimal = await benchmarkMinimal(ITERATIONS);
	console.log(`✓ ${minimal.name}: ${minimal.mean}ms (mean)`);

	const social = await benchmarkSocial(ITERATIONS);
	console.log(`✓ ${social.name}: ${social.mean}ms (mean)`);

	const docs = await benchmarkDocs(ITERATIONS);
	console.log(`✓ ${docs.name}: ${docs.mean}ms (mean)`);

	const custom = await benchmarkCustomLayout(ITERATIONS);
	console.log(`✓ ${custom.name}: ${custom.mean}ms (mean)`);

	const cached = await benchmarkWithCache(ITERATIONS);
	console.log(`✓ ${cached.name}: ${cached.mean}ms (mean)\n`);

	const results = [minimal, social, docs, custom, cached];

	// Save JSON
	const jsonPath = join(OUTPUT_DIR, "results.json");
	await writeFile(
		jsonPath,
		JSON.stringify(
			{
				timestamp: new Date().toISOString(),
				node_version: process.version,
				platform: process.platform,
				arch: process.arch,
				results,
			},
			null,
			2,
		),
	);
	console.log(`💾 Results saved: ${jsonPath}`);

	// Save Markdown
	const mdPath = join(OUTPUT_DIR, "BENCHMARKS.md");
	await writeFile(mdPath, generateMarkdown(results));
	console.log(`📄 Report saved: ${mdPath}\n`);

	// Summary
	console.log("📈 Summary:");
	console.log(`   Fastest: ${minimal.name} (${minimal.mean}ms)`);
	console.log(`   Cache speedup: ${(minimal.mean / cached.mean).toFixed(1)}x`);
	console.log("\n🎉 Benchmark complete!\n");
}

main().catch(console.error);
