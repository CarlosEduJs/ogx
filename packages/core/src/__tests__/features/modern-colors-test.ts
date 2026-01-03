/**
 * Test OKLCH and HSL color support
 * Run with: pnpm tsx src/__tests__/modern-colors-test.ts
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ogx } from "../../index";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "../../../../../");
const OUTPUT_DIR = join(ROOT_DIR, "test-output");

async function main() {
	console.log("\nTesting OKLCH and HSL Color Support\n");

	await mkdir(OUTPUT_DIR, { recursive: true });

	// Test with OKLCH and HSL colors
	const png = await ogx({
		preset: "minimal",
		title: "Modern Colors",
		subtitle: "OKLCH & HSL Support",
		// Custom theme colors using modern formats
		theme: {
			background: "oklch(0.15 0.02 240)", // Dark blue-ish
			primary: "oklch(0.7 0.25 20)", // Vibrant orange-red
			foreground: "hsl(0, 0%, 100%)", // Pure white
			muted: "hsl(240, 5%, 26%)", // Muted gray
		},
		background: "bg-background",
		textColor: "text-foreground",
		slots: {
			content: {
				type: "div",
				props: {
					tw: "flex flex-col items-center justify-center",
					children: [
						{
							type: "div",
							props: {
								tw: "text-7xl font-bold text-foreground mb-4",
								children: "Modern Colors",
							},
						},
						{
							type: "div",
							props: {
								tw: "text-4xl font-bold text-primary",
								children: "This should be ORANGE-RED (OKLCH)",
							},
						},
						{
							type: "div",
							props: {
								tw: "text-2xl mt-8 opacity-80 text-foreground",
								children: "HSL Background and Foreground",
							},
						},
					],
				},
			},
		},
	});

	await writeFile(join(OUTPUT_DIR, "modern-colors.png"), png);
	console.log("modern-colors.png generated!");
	console.log(`Check ${OUTPUT_DIR}\n`);
}

main();
