/**
 * Platform Auto-Scaling Test
 * Run with: pnpm tsx src/__tests__/platform-test.ts
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
	console.log("\nTesting Platform Auto-Scaling\n");
	await ensureOutputDir();
	await fontRegistry.registerInter([400, 700]);

	const platforms = [
		{ name: "instagram", label: "Instagram (1080x1080)" },
		{ name: "twitter", label: "Twitter (1200x600)" },
		{ name: "pinterest", label: "Pinterest (1000x1500)" },
		{ name: "youtube", label: "YouTube (1280x720)" },
		{ name: "marketplace", label: "Marketplace (1000x1000)" },
	] as const;

	for (const p of platforms) {
		console.log(`Testing for ${p.label}...`);

		const png = await ogx({
			preset: "social",
			platform: p.name,
			title: p.label,
			brand: "OGX PLATFORMS",
			handle: `@target_${p.name}`,
		});

		await writeFile(join(OUTPUT_DIR, `${p.name}.png`), png);
	}

	console.log(`\nPlatform tests complete! Check ${OUTPUT_DIR}\n`);
}

runTests().catch(console.error);
