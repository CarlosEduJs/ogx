/**
 * Integration test - generate a real PNG image
 * Run with: bun run src/__tests__/integration.test.ts
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
	absolute,
	fontRegistry,
	img,
	loadAsset,
	ogx,
	render,
	row,
	span,
	stack,
} from "../../index";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "../../../../../");
const ASSETS_DIR = join(ROOT_DIR, "assets");
const OUTPUT_DIR = join(ROOT_DIR, "test-output");

let logoBase64: string;

async function ensureOutputDir() {
	try {
		await mkdir(OUTPUT_DIR, { recursive: true });
	} catch {
		// ignore if exists
	}
}

async function testDocsPreset() {
	console.log("Testing docs preset...");

	const png = await ogx({
		preset: "docs",
		title: "Getting Started with OGX",
		description: "Generate beautiful OG images with Tailwind-like syntax",
		siteName: "OGX Docs",
		colorScheme: "dark",
		logo: logoBase64,
	});

	await writeFile(join(OUTPUT_DIR, "docs-preset.png"), png);
	console.log("docs-preset.png generated");
}

async function testBlogPreset() {
	console.log("Testing blog preset...");

	const png = await ogx({
		preset: "blog",
		title: "How to Build a Modern OG Image Generator",
		author: "Carlos",
		category: "Tutorial",
		date: "Dec 25, 2024",
		readingTime: "5 min read",
		colorScheme: "dark",
		logo: logoBase64,
	});

	await writeFile(join(OUTPUT_DIR, "blog-preset.png"), png);
	console.log("blog-preset.png generated");
}

async function testMinimalPreset() {
	console.log("Testing minimal preset...");

	const png = await ogx({
		preset: "minimal",
		title: "OGX",
		subtitle: "Tailwind-first OG Image Generator",
		background: "bg-zinc-950",
		textColor: "text-white",
	});

	await writeFile(join(OUTPUT_DIR, "minimal-preset.png"), png);
	console.log("minimal-preset.png generated");
}

async function testSocialPreset() {
	console.log("Testing social preset...");

	const png = await ogx({
		preset: "social",
		title: "Launching OGX v0.1.0",
		brand: "OGX",
		handle: "@ogx_lib",
		fromColor: "#9900FF",
		toColor: "#9FF5C9",
		logo: logoBase64,
	});

	await writeFile(join(OUTPUT_DIR, "social-preset.png"), png);
	console.log("social-preset.png generated");
}

async function testCustomRender() {
	console.log("Testing custom render with logo...");

	const png = await render(
		stack("w-full h-full bg-zinc-950 p-16 justify-center items-center", [
			absolute(
				"bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20",
			),
			stack("items-center gap-10", [
				img(logoBase64, "w-32"),
				span("text-7xl font-bold text-white text-center", "Custom Render"),
				span(
					"text-2xl text-slate-400 text-center",
					"Build your own layouts with full control",
				),
				row("gap-3 mt-4", [tag("Satori"), tag("Tailwind"), tag("TypeScript")]),
			]),
		]),
	);

	await writeFile(join(OUTPUT_DIR, "custom-render.png"), png);
	console.log("custom-render.png generated");
}

function tag(text: string) {
	return span(
		"bg-white/10 border border-white/20 px-4 py-1 rounded-full text-slate-300 text-sm",
		text,
	);
}

async function main() {
	console.log("\nOGX Integration Tests\n");

	await ensureOutputDir();
	await fontRegistry.registerInter([400, 700]);
	logoBase64 = await loadAsset(join(ASSETS_DIR, "logo-transparent.svg"));

	try {
		await testDocsPreset();
		await testBlogPreset();
		await testMinimalPreset();
		await testSocialPreset();
		await testCustomRender();

		console.log(`\nAll tests passed! Check ${OUTPUT_DIR}\n`);
	} catch (error) {
		console.error("\nTest failed:", error);
		process.exit(1);
	}
}

main();
