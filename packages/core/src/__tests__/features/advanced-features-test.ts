/**
 * Test Advanced Features: Auto Text Fitting and Snapshot Cache
 * Run with: pnpm tsx src/__tests__/advanced-features-test.ts
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { snapshotCache } from "../../cache";
import { loadInterFont } from "../../fonts";
import { fontRegistry, ogx } from "../../index";
import { calculateFittingFontSize } from "../../utils/text";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "../../../../../");
const OUTPUT_DIR = join(ROOT_DIR, "test-output");

async function main() {
	console.log("\nTesting Advanced Features\n");

	await mkdir(OUTPUT_DIR, { recursive: true });

	// 1. Prepare Fonts
	console.log("Loading Inter fonts into Registry...");
	const interRegular = await loadInterFont(400);
	const interBold = await loadInterFont(700);
	fontRegistry.register(interRegular);
	fontRegistry.register(interBold);

	// 2. Test Auto Text Fitting
	console.log("Testing Auto Text Fitting...");
	const longText =
		"This is a very long title that should automatically fit into the container without overflowing or being too small.";

	const fontSize = await calculateFittingFontSize(longText, {
		maxWidth: 1000,
		maxHeight: 200,
		fonts: fontRegistry.getFonts(),
		maxFontSize: 120,
		minFontSize: 20,
	});

	console.log(`Optimal Font Size calculated: ${fontSize}px`);

	const pngFitting = await ogx({
		preset: "minimal",
		title: "",
		background: "bg-white",
		textColor: "text-black",
		cache: false,
		slots: {
			content: {
				type: "div",
				props: {
					tw: `text-[${fontSize}px] font-bold text-center leading-tight p-20`,
					children: longText,
				},
			},
		},
	});
	await writeFile(join(OUTPUT_DIR, "auto-fitting.png"), pngFitting);
	console.log("auto-fitting.png generated!");

	// 3. Test Snapshot Cache
	console.log("Testing Snapshot Cache...");
	const config = {
		preset: "minimal",
		title: "Cached Image",
		subtitle: "This should come from cache on second call",
		cache: true,
	} as const;

	console.time("First render (cold)");
	await ogx(config);
	console.timeEnd("First render (cold)");

	console.time("Second render (warm/cached)");
	await ogx(config);
	console.timeEnd("Second render (warm/cached)");

	console.log(
		`Cache size: ${Array.from((snapshotCache as any).cache.keys()).length} items`,
	);

	console.log(`Check ${OUTPUT_DIR}\n`);
}

main();
