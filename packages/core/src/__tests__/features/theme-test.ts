/**
 * Test custom theme support
 * Run with: pnpm tsx src/__tests__/theme-test.ts
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ogx } from "../../index";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "../../../../../");
const OUTPUT_DIR = join(ROOT_DIR, "test-output");

async function main() {
	console.log("\nTesting Custom Theme Support\n");

	await mkdir(OUTPUT_DIR, { recursive: true });

	// Test with custom theme colors
	const png = await ogx({
		preset: "docs",
		title: "Custom Theme Example",
		description: "Using design system colors",
		siteName: "My App",
		colorScheme: "dark",
		// Custom theme colors
		theme: {
			background: "#0a0a0a",
			foreground: "#fafafa",
			primary: "#3b82f6",
			"primary-foreground": "#ffffff",
			muted: "#27272a",
			"muted-foreground": "#a1a1aa",
		},
		// Override slots to use theme colors
		slots: {
			header: {
				type: "div",
				props: {
					tw: "flex items-center",
					children: {
						type: "span",
						props: {
							tw: "text-2xl font-bold text-primary",
							children: "Custom Theme",
						},
					},
				},
			},
			footer: {
				type: "div",
				props: {
					tw: "flex items-center",
					children: {
						type: "h3",
						props: {
							tw: "text-2xl font-medium text-primary text-center",
							children: "Footer",
						},
					},
				},
			},
		},
	});

	await writeFile(join(OUTPUT_DIR, "custom-theme.png"), png);
	console.log("custom-theme.png generated with custom colors!");
	console.log(`Check ${OUTPUT_DIR}\n`);
}

main();
