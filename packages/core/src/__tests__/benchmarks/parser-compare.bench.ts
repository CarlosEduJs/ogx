/**
 * Parser comparison benchmark
 * Compare v1 vs v2 performance
 */

import { bench, describe } from "vitest";
import { parseTailwind as parseTailwindV1 } from "../../tailwind/parser";
import {
	clearAllCaches,
	parseTailwind as parseTailwindV2,
} from "../../tailwind/parser-v2";

const SIMPLE_CLASSES = "flex items-center justify-center";
const MEDIUM_CLASSES =
	"flex flex-col items-center justify-center w-full h-full bg-zinc-950 p-12 gap-6 text-white";
const COMPLEX_CLASSES =
	"flex flex-col items-center justify-center w-full h-full bg-zinc-950 p-12 gap-6 text-white rounded-2xl shadow-2xl border border-zinc-800 text-6xl font-bold tracking-tight leading-tight";

describe("Parser v1 vs v2 - Simple classes", () => {
	bench("v1 (original)", () => {
		parseTailwindV1(SIMPLE_CLASSES);
	});

	bench("v2 (turbo) - cold", () => {
		clearAllCaches();
		parseTailwindV2(SIMPLE_CLASSES);
	});

	bench("v2 (turbo) - warm", () => {
		parseTailwindV2(SIMPLE_CLASSES);
	});
});

describe("Parser v1 vs v2 - Medium classes", () => {
	bench("v1 (original)", () => {
		parseTailwindV1(MEDIUM_CLASSES);
	});

	bench("v2 (turbo) - cold", () => {
		clearAllCaches();
		parseTailwindV2(MEDIUM_CLASSES);
	});

	bench("v2 (turbo) - warm", () => {
		parseTailwindV2(MEDIUM_CLASSES);
	});
});

describe("Parser v1 vs v2 - Complex classes", () => {
	bench("v1 (original)", () => {
		parseTailwindV1(COMPLEX_CLASSES);
	});

	bench("v2 (turbo) - cold", () => {
		clearAllCaches();
		parseTailwindV2(COMPLEX_CLASSES);
	});

	bench("v2 (turbo) - warm", () => {
		parseTailwindV2(COMPLEX_CLASSES);
	});
});
