/**
 * Test Shadows and Per-element Dark Mode
 * Run with: bun run src/__tests__/shadow-dark-test.ts
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ogx } from "../../index";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "../../../../../");
const OUTPUT_DIR = join(ROOT_DIR, "test-output");

async function main() {
	console.log("\nTesting Shadows and Dark Mode\n");

	await mkdir(OUTPUT_DIR, { recursive: true });

	// 1. Text with Shadow in Light Mode
	const pngLight = await ogx({
		preset: "minimal",
		title: "Shadow & Dark Mode",
		subtitle: "Light Mode with Shadows",
		background: "bg-white",
		textColor: "text-zinc-900",
		colorScheme: "light",
		slots: {
			content: {
				type: "div",
				props: {
					tw: "flex flex-row gap-8 items-center justify-center",
					children: [
						{
							type: "div",
							props: {
								tw: "w-48 h-48 bg-white shadow-lg rounded-xl flex items-center justify-center border border-zinc-100",
								children: "Shadow LG",
							},
						},
						{
							type: "div",
							props: {
								tw: "w-48 h-48 bg-white shadow-2xl rounded-xl flex items-center justify-center border border-zinc-100",
								children: "Shadow 2XL",
							},
						},
					],
				},
			},
		},
	});

	await writeFile(join(OUTPUT_DIR, "shadow-light.png"), pngLight);
	console.log("shadow-light.png generated!");

	// 2. Dark Mode per-element
	const pngDark = await ogx({
		preset: "minimal",
		title: "Shadow & Dark Mode",
		subtitle: "Dark Mode - Element Overrides",
		colorScheme: "dark",
		// Global dark theme
		theme: {
			background: "#09090b",
			foreground: "#fafafa",
			primary: "#3b82f6",
		},
		background: "bg-background",
		textColor: "text-foreground",
		slots: {
			content: {
				type: "div",
				props: {
					tw: "flex flex-col gap-8 items-center justify-center",
					children: [
						{
							type: "div",
							props: {
								tw: "p-8 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 shadow-md",
								children: "This box changes colors in Dark Mode",
							},
						},
						{
							type: "div",
							props: {
								tw: "p-8 bg-blue-500 dark:bg-blue-700 text-white rounded-lg shadow-lg dark:shadow-none",
								children: "Shadow disappears in Dark Mode",
							},
						},
					],
				},
			},
		},
	});

	await writeFile(join(OUTPUT_DIR, "shadow-dark.png"), pngDark);
	console.log("shadow-dark.png generated!");

	console.log(`Check ${OUTPUT_DIR}\n`);
}

main();
