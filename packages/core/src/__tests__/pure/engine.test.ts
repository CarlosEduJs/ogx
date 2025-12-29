/**
 * OGX Pure Engine Test Suite
 *
 * Tests the core OGX engine without any runtime-specific test framework.
 * Uses simple assertions that work in any JavaScript runtime.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { snapshotCache } from "../../cache";
import {
	absolute,
	badge,
	card,
	div,
	fontRegistry,
	grid,
	h,
	h1,
	ogx,
	p,
	render,
	row,
	spacer,
	span,
	stack,
} from "../../index";
import { parseTailwind } from "../../tailwind/parser";
import { getPlatformDimensions } from "../../targets";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "../../../../../");
const OUTPUT_DIR = join(ROOT_DIR, "test-output/pure");

// Simple assertion helpers
function assert(condition: boolean, message: string) {
	if (!condition) {
		throw new Error(`❌ FAILED: ${message}`);
	}
}

function assertEqual<T>(actual: T, expected: T, message: string) {
	if (actual !== expected) {
		throw new Error(
			`❌ FAILED: ${message}\n   Expected: ${JSON.stringify(expected)}\n   Actual: ${JSON.stringify(actual)}`,
		);
	}
}

function assertDeepEqual<T>(actual: T, expected: T, message: string) {
	if (JSON.stringify(actual) !== JSON.stringify(expected)) {
		throw new Error(
			`❌ FAILED: ${message}\n   Expected: ${JSON.stringify(expected)}\n   Actual: ${JSON.stringify(actual)}`,
		);
	}
}

function assertContains(
	value: string | string[] | undefined,
	substring: string,
	message: string,
) {
	const str = Array.isArray(value) ? value.join(" ") : (value ?? "");
	if (!str.includes(substring)) {
		throw new Error(
			`❌ FAILED: ${message}\n   Expected "${str}" to contain "${substring}"`,
		);
	}
}

function assertDefined<T>(
	value: T,
	message: string,
): asserts value is NonNullable<T> {
	if (value === undefined || value === null) {
		throw new Error(`❌ FAILED: ${message} (value is ${value})`);
	}
}

// Test runner
let passed = 0;
let failed = 0;

async function test(name: string, fn: () => void | Promise<void>) {
	try {
		await fn();
		console.log(`  ✓ ${name}`);
		passed++;
	} catch (error) {
		console.error(`  ✗ ${name}`);
		console.error(`    ${(error as Error).message}`);
		failed++;
	}
}

function describe(name: string, fn: () => void) {
	console.log(`\n${name}`);
	fn();
}

// Tests

async function runBuilderTests() {
	describe("Builder API - Primitivos", () => {
		test("h() cria elemento básico", () => {
			const el = h("div", { tw: "bg-red-500", children: "Hello" });
			assertEqual(el.type, "div", "type should be div");
			assertEqual(el.props.tw, "bg-red-500", "tw should match");
			assertEqual(el.props.children, "Hello", "children should match");
		});

		test("div() cria div com display flex", () => {
			const el = div("bg-blue-500", "Content");
			assertEqual(el.type, "div", "type should be div");
			assertContains(el.props.tw, "flex", "should contain flex");
			assertEqual(el.props.children, "Content", "children should match");
		});

		test("span() cria span corretamente", () => {
			const el = span("text-sm", "Text");
			assertEqual(el.type, "span", "type should be span");
			assertDeepEqual(el.props.tw, ["text-sm"], "tw should match as array");
			assertEqual(el.props.children, "Text", "children should match");
		});
	});

	describe("Builder API - Layout Helpers", () => {
		test("stack() aplica flex-col", () => {
			const el = stack("gap-4", []);
			assertContains(el.props.tw, "flex", "should contain flex");
			assertContains(el.props.tw, "flex-col", "should contain flex-col");
			assertContains(el.props.tw, "gap-4", "should contain gap-4");
		});

		test("row() aplica flex-row", () => {
			const el = row("items-center", []);
			assertContains(el.props.tw, "flex", "should contain flex");
			assertContains(el.props.tw, "flex-row", "should contain flex-row");
			assertContains(
				el.props.tw,
				"items-center",
				"should contain items-center",
			);
		});

		test("absolute() aplica absolute e inset-0", () => {
			const el = absolute("bg-black/50");
			assertContains(el.props.tw, "absolute", "should contain absolute");
			assertContains(el.props.tw, "inset-0", "should contain inset-0");
		});

		test("grid() aplica flex-wrap", () => {
			const el = grid("gap-2", []);
			assertContains(el.props.tw, "flex-wrap", "should contain flex-wrap");
		});

		test("spacer() cresce com flex-1", () => {
			const el = spacer();
			assertContains(el.props.tw, "flex-1", "should contain flex-1");
		});
	});

	describe("Builder API - Typography", () => {
		test("h1() tem estilos de título padrão", () => {
			const el = h1("Titulo");
			assertContains(el.props.tw, "text-6xl", "should contain text-6xl");
			assertContains(el.props.tw, "font-bold", "should contain font-bold");
		});

		test("p() tem estilos de parágrafo padrão", () => {
			const el = p("Texto");
			assertContains(el.props.tw, "text-lg", "should contain text-lg");
			assertContains(
				el.props.tw,
				"text-slate-400",
				"should contain text-slate-400",
			);
		});
	});

	describe("Builder API - High-level Components", () => {
		test("badge() aplica bordas e padding", () => {
			const el = badge("Primary", "blue");
			assertContains(
				el.props.tw,
				"rounded-full",
				"should contain rounded-full",
			);
			assertContains(el.props.tw, "px-3", "should contain px-3");
		});

		test("card() aplica sombras e cantos", () => {
			const el = card(["bg-white"], "Card Content");
			assertContains(el.props.tw, "rounded-2xl", "should contain rounded-2xl");
			assertContains(el.props.tw, "shadow-lg", "should contain shadow-lg");
		});
	});
}

async function runCacheTests() {
	describe("Snapshot Cache", () => {
		test("gera hashes consistentes para mesmo config", () => {
			const config1 = { preset: "docs", title: "Test" };
			const config2 = { preset: "docs", title: "Test" };
			assertEqual(
				snapshotCache.getHash(config1),
				snapshotCache.getHash(config2),
				"hashes should match for identical configs",
			);
		});

		test("gera hashes diferentes para configs diferentes", () => {
			const config1 = { preset: "docs", title: "Test A" };
			const config2 = { preset: "docs", title: "Test B" };
			assert(
				snapshotCache.getHash(config1) !== snapshotCache.getHash(config2),
				"hashes should differ for different configs",
			);
		});

		test("armazena e recupera dados do cache", () => {
			const data = new Uint8Array([1, 2, 3]);
			const hash = "test-hash-pure";
			snapshotCache.set(hash, data);
			assertEqual(snapshotCache.get(hash), data, "should retrieve cached data");
		});
	});
}

async function runParserTests() {
	describe("Tailwind Parser", () => {
		test("converte classes básicas (padding, colors)", () => {
			const style = parseTailwind(["p-4", "bg-red-500", "text-white"]);
			assertEqual(style.padding, 16, "padding should be 16");
			assertEqual(style.backgroundColor, "#ef4444", "bg should be red-500");
			assertEqual(style.color, "#ffffff", "color should be white");
		});

		test("suporta opacidade em cores (slash syntax)", () => {
			const style = parseTailwind("bg-blue-500/50");
			assertEqual(
				style.backgroundColor,
				"rgba(59, 130, 246, 0.5)",
				"should have rgba with opacity",
			);
		});

		test("suporta valores arbitrários", () => {
			const style = parseTailwind("bg-[#123456]");
			assertEqual(
				style.backgroundColor,
				"#123456",
				"should use arbitrary color",
			);
		});

		test("suporta padrões de fundo (Patterns)", () => {
			const style = parseTailwind("bg-grid-zinc-800");
			assertDefined(style.backgroundImage, "backgroundImage should be defined");
			assertContains(
				style.backgroundImage,
				"linear-gradient",
				"should contain gradient",
			);
			assertEqual(
				style.backgroundSize,
				"24px 24px",
				"should have default size",
			);
		});

		test("aceita arrays de classes ou strings simples", () => {
			const s1 = parseTailwind("p-2 m-2");
			const s2 = parseTailwind(["p-2", "m-2"]);
			assertDeepEqual(s1, s2, "both formats should produce same result");
		});
	});
}

async function runPlatformTests() {
	describe("Platform Resolution", () => {
		test("retorna dimensões corretas para instagram (square)", () => {
			const dims = getPlatformDimensions("instagram");
			assertDeepEqual(
				dims,
				{ width: 1080, height: 1080 },
				"instagram should be 1080x1080",
			);
		});

		test("retorna dimensões corretas para pinterest (vertical)", () => {
			const dims = getPlatformDimensions("pinterest");
			assertDeepEqual(
				dims,
				{ width: 1000, height: 1500 },
				"pinterest should be 1000x1500",
			);
		});

		test("retorna meta (padrão) para plataformas desconhecidas", () => {
			// @ts-expect-error
			const dims = getPlatformDimensions("unknown");
			assertDeepEqual(
				dims,
				{ width: 1200, height: 630 },
				"unknown should default to meta",
			);
		});

		test("tem dimensões corretas para youtube", () => {
			const dims = getPlatformDimensions("youtube");
			assertDeepEqual(
				dims,
				{ width: 1280, height: 720 },
				"youtube should be 1280x720",
			);
		});
	});
}

async function runRenderTests() {
	describe("Render Integration", () => {
		test("renderiza preset docs", async () => {
			await fontRegistry.registerInter([400, 700]);

			const png = await ogx({
				preset: "docs",
				title: "Pure Engine Test",
				description: "Testing the OGX engine",
				siteName: "OGX",
			});

			assert(png instanceof Uint8Array, "should return Uint8Array");
			assert(png.length > 1000, "PNG should have reasonable size");

			// Save for visual inspection
			await mkdir(OUTPUT_DIR, { recursive: true });
			await writeFile(join(OUTPUT_DIR, "docs-preset.png"), png);
		});

		test("renderiza com builder direto", async () => {
			const png = await render(
				stack("w-full h-full bg-zinc-950 p-16 justify-center items-center", [
					span("text-4xl font-bold text-white", "Pure Engine Test"),
				]),
			);

			assert(png instanceof Uint8Array, "should return Uint8Array");
			assert(png.length > 1000, "PNG should have reasonable size");

			await writeFile(join(OUTPUT_DIR, "builder-render.png"), png);
		});
	});
}

// Deno tests
// Deno type declaration for runtime detection
declare const Deno: unknown;

async function main() {
	console.log("\n🧪 OGX Pure Engine Test Suite\n");
	console.log(
		"Runtime:",
		typeof Bun !== "undefined"
			? "Bun"
			: typeof Deno !== "undefined"
				? "Deno"
				: "Node.js",
	);

	await runBuilderTests();
	await runCacheTests();
	await runParserTests();
	await runPlatformTests();
	await runRenderTests();

	console.log("\n" + "=".repeat(40));
	console.log(`Results: ${passed} passed, ${failed} failed`);
	console.log("=".repeat(40) + "\n");

	if (failed > 0) {
		process.exit(1);
	}
}

main().catch((error) => {
	console.error("\n❌ Test suite failed:", error);
	process.exit(1);
});
