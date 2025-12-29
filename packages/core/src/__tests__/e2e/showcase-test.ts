/**
 * Premium Showcase test using brand assets
 * Run with: bun run src/__tests__/showcase-test.ts
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
	absolute,
	div,
	fontRegistry,
	img,
	loadAsset,
	render,
	row,
	span,
	stack,
} from "../../index";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "../../../../../");
const ASSETS_DIR = join(ROOT_DIR, "assets");
const OUTPUT_DIR = join(ROOT_DIR, "test-output");

async function main() {
	console.log("\n Generating Premium Branding Showcase\n");

	await mkdir(OUTPUT_DIR, { recursive: true });

	// 1. Setup fonts (New ergonomic internal helper)
	await fontRegistry.registerInter([400, 700]);

	// 2. Load Logo (New ergonomic internal helper)
	const logoBase64 = await loadAsset(join(ASSETS_DIR, "logo-transparent.svg"));

	// 3. Create a high-end "Hero" layout
	const element = stack(
		"w-full h-full bg-zinc-950 p-20 justify-center items-center",
		[
			// Background Pattern + Subtle Overlay
			absolute(
				"bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10",
			),

			// Content Stack
			stack("items-center gap-12", [
				// Branded Logo
				img(logoBase64, "w-48"),

				// Headline
				stack("items-center gap-4", [
					span(
						"text-white text-7xl font-bold tracking-tight",
						"Dynamic OG Images",
					),
					span(
						"text-slate-400 text-3xl",
						"Building the future of social sharing",
					),
				]),

				// Features Row
				row("gap-4 mt-8", [
					tag("Satori Powered"),
					tag("Tailwind Native"),
					tag("DX Focused"),
				]),
			]),
		],
	);

	console.log("Rendering showcase...");
	const png = await render(element);

	await writeFile(join(OUTPUT_DIR, "showcase-premium.png"), png);
	console.log("showcase-premium.png generated!");

	console.log(`Check ${OUTPUT_DIR}\n`);
}

// Helper for pill tags
function tag(text: string) {
	return div("bg-white/5 border border-white/10 px-6 py-2 rounded-full", [
		span("text-slate-300 text-lg font-medium", text),
	]);
}

main();
