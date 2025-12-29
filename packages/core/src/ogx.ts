import { snapshotCache } from "./cache";
import { fontRegistry } from "./font-registry";
import { loadInterFont } from "./fonts";
import { render } from "./render-png";
import { renderToSVG } from "./render-svg";
import type { FontConfig, OGXConfig, Platform, PresetName } from "./types";
import { presets } from "./types";

/**
 * Generate an OG image using a preset
 */
export async function ogx<T extends PresetName>(
	config: OGXConfig<T> & { platform: Platform[] },
): Promise<Record<Platform, Uint8Array>>;
export async function ogx<T extends PresetName>(
	config: OGXConfig<T>,
): Promise<Uint8Array>;
export async function ogx<T extends PresetName>(
	config: OGXConfig<T>,
): Promise<Uint8Array | Record<Platform, Uint8Array>> {
	const {
		preset,
		slots,
		options = {},
		platform,
		fonts,
		theme,
		colorScheme,
		cache = true,
		...props
	} = config;

	// Handle batch rendering
	if (Array.isArray(platform)) {
		const results = await Promise.all(
			platform.map((p) => ogx({ ...config, platform: p } as OGXConfig<T>)),
		);
		return platform.reduce(
			(acc, p, i) => {
				acc[p] = results[i]!;
				return acc;
			},
			{} as Record<Platform, Uint8Array>,
		);
	}

	// Check cache
	const hash = cache ? snapshotCache.getHash(config) : null;
	if (hash) {
		const cached = snapshotCache.get(hash);
		if (cached) return cached as any;
	}

	const presetFn = presets[preset] as any;
	if (!presetFn) {
		throw new Error(`Unknown preset: ${preset}`);
	}

	const element = presetFn({ ...props, slots } as Parameters<
		typeof presetFn
	>[0]);

	// Resolve fonts (Registry > Explicit > Default Inter)
	let resolvedFonts: FontConfig[] = fonts ?? [];
	if (resolvedFonts.length === 0) {
		resolvedFonts = fontRegistry.getFonts();
	}
	if (resolvedFonts.length === 0) {
		resolvedFonts = [
			await loadInterFont(300),
			await loadInterFont(400),
			await loadInterFont(500),
			await loadInterFont(600),
			await loadInterFont(700),
		];
	}

	const result = await render(element, {
		...options,
		platform: (platform as Platform) ?? options.platform,
		fonts: resolvedFonts,
		theme: theme ?? options.theme,
		colorScheme: colorScheme ?? options.colorScheme,
	});

	if (hash) {
		snapshotCache.set(hash, result);
	}

	return result;
}

/**
 * Generate an OG image as SVG using a preset
 */
export async function ogxToSVG<T extends PresetName>(
	config: OGXConfig<T> & { platform: Platform[] },
): Promise<Record<Platform, string>>;
export async function ogxToSVG<T extends PresetName>(
	config: OGXConfig<T>,
): Promise<string>;
export async function ogxToSVG<T extends PresetName>(
	config: OGXConfig<T>,
): Promise<string | Record<Platform, string>> {
	const {
		preset,
		slots,
		options = {},
		platform,
		fonts,
		theme,
		colorScheme,
		cache = true,
		...props
	} = config;

	if (Array.isArray(platform)) {
		const results = await Promise.all(
			platform.map((p) => ogxToSVG({ ...config, platform: p } as OGXConfig<T>)),
		);
		return platform.reduce(
			(acc, p, i) => {
				acc[p] = results[i]!;
				return acc;
			},
			{} as Record<Platform, string>,
		);
	}

	// Check cache
	const hash = cache
		? snapshotCache.getHash({ ...config, format: "svg" })
		: null;
	if (hash) {
		const cached = snapshotCache.get(hash);
		if (cached) return cached as any;
	}

	const presetFn = presets[preset] as any;
	if (!presetFn) {
		throw new Error(`Unknown preset: ${preset}`);
	}

	const element = presetFn({ ...props, slots } as Parameters<
		typeof presetFn
	>[0]);

	// Resolve fonts
	let resolvedFonts: FontConfig[] = fonts ?? [];
	if (resolvedFonts.length === 0) {
		resolvedFonts = fontRegistry.getFonts();
	}
	if (resolvedFonts.length === 0) {
		resolvedFonts = [
			await loadInterFont(300),
			await loadInterFont(400),
			await loadInterFont(500),
			await loadInterFont(600),
			await loadInterFont(700),
		];
	}

	const result = await renderToSVG(element, {
		...options,
		platform: (platform as Platform) ?? options.platform,
		fonts: resolvedFonts,
		theme: theme ?? options.theme,
		colorScheme: colorScheme ?? options.colorScheme,
	});

	// Store in cache
	if (hash) {
		snapshotCache.set(hash, result);
	}

	return result;
}
