/**
 * Test Builder API (h, div, span, img, stack, row)
 * Run with: pnpm tsx src/__tests__/builder-test.ts
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadInterFromUrl } from "../../fonts";
import {
	absolute,
	div,
	fontRegistry,
	footer,
	grid,
	header,
	render,
	renderToSVG,
	spacer,
	span,
	stack,
} from "../../index";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "../../../../../");
const OUTPUT_DIR = join(ROOT_DIR, "test-output");

async function main() {
	console.log("\nTesting Builder API\n");

	await mkdir(OUTPUT_DIR, { recursive: true });

	// 1. Setup fonts in registry once
	console.log("Registering fonts...");
	fontRegistry.register(await loadInterFromUrl(400));
	fontRegistry.register(await loadInterFromUrl(700));

	// 2. Create complex layout with ergonomic API
	console.log("Generating layout with Builder API...");

	const element = stack("w-full h-full bg-slate-950 p-20", [
		// 1. Overlay (Background Grid)
		absolute("bg-grid-slate-700/20-40"),

		// 2. Semantic Header
		header("justify-between items-center", [
			span("text-slate-500 font-medium", "Version 0.1.0"),
			div(
				"bg-blue-500/10 px-3 py-1 rounded text-blue-400 text-sm font-bold",
				"BETA",
			),
		]),

		spacer(), // Push content to center

		// 3. Main Content
		stack("items-center gap-6", [
			div("bg-blue-600 rounded-2xl p-8 shadow-2xl", [
				span("text-white text-6xl font-bold", "OGX Builder API"),
			]),
			grid("mt-10 gap-6 justify-center items-center", [
				div("bg-slate-800 px-6 py-3 rounded-full", [
					span("text-slate-300 text-xl", "Concise"),
				]),
				div("bg-slate-800 px-6 py-3 rounded-full", [
					span("text-slate-300 text-xl", "Ergonomic"),
				]),
				div("bg-slate-800 px-6 py-3 rounded-full", [
					span("text-slate-300 text-xl", "Powerful"),
				]),
			]),
		]),

		spacer(), // Push footer to bottom

		// 4. Semantic Footer
		footer("border-t border-slate-800 pt-8 justify-between items-center", [
			span("text-slate-400", "github.com/ogx/ogx"),
			div("flex items-center gap-2", [
				div("w-3 h-3 rounded-full bg-green-500"),
				span("text-slate-500 text-sm", "All systems operational"),
			]),
		]),
	]);

	// 3. Render directly (fonts resolved via registry)
	const png = await render(element);
	const svg = await renderToSVG(element);

	await writeFile(join(OUTPUT_DIR, "builder-api.png"), png);
	await writeFile(join(OUTPUT_DIR, "builder-api.svg"), svg);
	console.log("builder-api.png generated!");

	console.log(`Check ${OUTPUT_DIR}\n`);
}

main();
