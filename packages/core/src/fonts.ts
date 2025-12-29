import type { FontConfig } from "./types";

const fontCache = new Map<string, ArrayBuffer>();

/**
 * Load a font from a file path (Node.js/Bun)
 */
export async function loadFont(path: string): Promise<ArrayBuffer> {
	if (fontCache.has(path)) {
		return fontCache.get(path)!;
	}

	const fs = await import("node:fs/promises");
	const buffer = await fs.readFile(path);
	const data = buffer.buffer.slice(
		buffer.byteOffset,
		buffer.byteOffset + buffer.byteLength,
	);
	fontCache.set(path, data);
	return data;
}

/**
 * Load a font from a URL
 */
export async function loadFontFromUrl(url: string): Promise<ArrayBuffer> {
	if (fontCache.has(url)) {
		return fontCache.get(url)!;
	}

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to load font from ${url}: ${response.statusText}`);
	}
	const data = await response.arrayBuffer();
	fontCache.set(url, data);
	return data;
}

/**
 * Create a FontConfig from an ArrayBuffer
 */
export function createFont(
	name: string,
	data: ArrayBuffer,
	options: { weight?: FontConfig["weight"]; style?: FontConfig["style"] } = {},
): FontConfig {
	return {
		name,
		data,
		weight: options.weight ?? 400,
		style: options.style ?? "normal",
	};
}

// Google Fonts CDN URLs for Inter
const INTER_URLS: Record<number, string> = {
	300: "https://fonts.bunny.net/inter/files/inter-latin-300-normal.woff",
	400: "https://fonts.bunny.net/inter/files/inter-latin-400-normal.woff",
	500: "https://fonts.bunny.net/inter/files/inter-latin-500-normal.woff",
	600: "https://fonts.bunny.net/inter/files/inter-latin-600-normal.woff",
	700: "https://fonts.bunny.net/inter/files/inter-latin-700-normal.woff",
};

/**
 * Load Inter font from Google Fonts CDN
 * Works with all bundlers (Next.js, Vite, etc.)
 * Supports weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
 */
export async function loadInterFromUrl(
	weight: 300 | 400 | 500 | 600 | 700 = 400,
): Promise<FontConfig> {
	const url = INTER_URLS[weight] ?? INTER_URLS[400]!;
	const data = await loadFontFromUrl(url);
	return createFont("Inter", data, { weight });
}

/**
 * Load Inter font from local file
 * Only works in Bun/Node without bundlers
 * Supports weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
 */
export async function loadInterFont(
	weight: 300 | 400 | 500 | 600 | 700 = 400,
): Promise<FontConfig> {
	if (
		typeof globalThis !== "undefined" &&
		(globalThis as any).window !== undefined
	) {
		throw new Error(
			"loadInterFont is only available in Node.js/Bun environments.",
		);
	}

	const base = "./fonts/inter";
	const file = `inter-${weight}.ttf`;
	const fontFile = [base, file].join("/");

	// Hide import.meta.url from bundlers like Webpack/Next.js using a dynamic check
	// this prevents the "Can't resolve <dynamic>" error during build
	let metaUrl: string | undefined;
	try {
		const meta = import.meta as any;
		if (meta?.url) {
			metaUrl = String(meta.url);
		}
	} catch {
		// Fallback
	}

	if (!metaUrl) {
		throw new Error("Could not determine base URL for local font loading.");
	}

	const path = new URL(fontFile, metaUrl).pathname;

	const data = await loadFont(path);
	return createFont("Inter", data, { weight });
}
