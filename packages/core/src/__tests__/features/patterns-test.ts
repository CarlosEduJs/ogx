/**
 * Test Background Patterns (Grids, Dots, Lines)
 * Run with: pnpm tsx src/__tests__/patterns-test.ts
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ogx } from "../../index";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "../../../../../");
const OUTPUT_DIR = join(ROOT_DIR, "test-output");

async function main() {
	console.log("\n🕸️ Testing Background Patterns\n");

	await mkdir(OUTPUT_DIR, { recursive: true });

	// 1. Grid Pattern (Large spacing)
	const pngGrid = await ogx({
		preset: "minimal",
		title: "Grid Pattern",
		subtitle: "bg-grid-slate-700/20-40", // Color slate-700, 20% opacity, 40px spacing
		background: "bg-zinc-950 bg-grid-slate-700/20-40",
		textColor: "text-white",
		cache: false,
	});
	await writeFile(join(OUTPUT_DIR, "pattern-grid.png"), pngGrid);
	console.log("✅ pattern-grid.png generated!");

	// 2. Dots Pattern (Fine)
	const pngDots = await ogx({
		preset: "minimal",
		title: "Dot Matrix Pattern",
		subtitle: "bg-dots-blue-500/30-16",
		background: "bg-slate-900 bg-dots-blue-500/30-16",
		textColor: "text-white",
		cache: false,
	});
	await writeFile(join(OUTPUT_DIR, "pattern-dots.png"), pngDots);
	console.log("pattern-dots.png generated!");

	// 3. Lines Pattern (Notebook style)
	const pngLines = await ogx({
		preset: "minimal",
		title: "Lined Background",
		subtitle: "bg-lines-blue-200-32",
		background: "bg-white bg-lines-blue-200-32",
		textColor: "text-blue-900",
		cache: false,
	});
	await writeFile(join(OUTPUT_DIR, "pattern-lines.png"), pngLines);
	console.log("pattern-lines.png generated!");

	console.log(`Check ${OUTPUT_DIR}\n`);
}

main();
