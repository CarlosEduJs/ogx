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
 * Load a font from a URL with timeout protection
 * @param url - Font URL to load
 * @param timeoutMs - Timeout in milliseconds (default: 10000)
 */
export async function loadFontFromUrl(
	url: string,
	timeoutMs = 10000,
): Promise<ArrayBuffer> {
	if (fontCache.has(url)) {
		return fontCache.get(url)!;
	}

	// Validate URL to prevent SSRF
	const { validateImageUrl } = await import("./builder");
	if (!validateImageUrl(url)) {
		throw new Error(
			`OGX: Invalid or unsafe font URL "${url}". URLs must use http/https protocols and cannot point to private networks in production.`,
		);
	}

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

	try {
		const response = await fetch(url, { signal: controller.signal });
		if (!response.ok) {
			throw new Error(
				`Failed to load font from ${url}: ${response.statusText}`,
			);
		}
		const data = await response.arrayBuffer();
		fontCache.set(url, data);
		return data;
	} catch (error) {
		if ((error as Error).name === "AbortError") {
			throw new Error(
				`OGX: Font loading timed out after ${timeoutMs}ms for URL: ${url}`,
			);
		}
		throw error;
	} finally {
		clearTimeout(timeoutId);
	}
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
 * @deprecated Use loadInterFromUrl() for universal compatibility. This function will be removed in v1.0.0
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

/**
 * Load any Google Font by name with specified weights
 * Uses Bunny Fonts CDN (privacy-friendly Google Fonts mirror)
 * @param fontName - Name of the Google Font (e.g., 'Roboto', 'Poppins', 'Playfair Display')
 * @param weights - Array of font weights to load (default: [400, 700])
 * @returns Promise resolving to array of FontConfig objects
 */
export async function loadGoogleFont(
	fontName: string,
	weights: (100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900)[] = [400, 700],
): Promise<FontConfig[]> {
	// Normalize font name for URL (replace spaces with hyphens, lowercase)
	const urlFontName = fontName.toLowerCase().replace(/\s+/g, "-");

	const fontConfigs = await Promise.all(
		weights.map(async (weight) => {
			// Use Bunny Fonts CDN (privacy-friendly alternative to Google Fonts)
			const url = `https://fonts.bunny.net/${urlFontName}/files/${urlFontName}-latin-${weight}-normal.woff`;
			const data = await loadFontFromUrl(url);
			return createFont(fontName, data, { weight });
		}),
	);

	return fontConfigs;
}

/**
 * Load a font from a local file path
 * Useful for loading custom fonts or integrating with next/font/local
 * @param path - Path to the font file (relative or absolute)
 * @param options - Font configuration options
 * @returns Promise resolving to FontConfig object
 */
export async function loadFontFromFile(
	path: string,
	options: {
		name: string;
		weight?: FontConfig["weight"];
		style?: FontConfig["style"];
	},
): Promise<FontConfig> {
	const data = await loadFont(path);
	return createFont(options.name, data, {
		weight: options.weight,
		style: options.style,
	});
}
