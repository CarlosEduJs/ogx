import satori from "satori";

import type { CSSProperties } from "./css";
import { fontRegistry } from "./font-registry";
import { parseTailwind } from "./tailwind";
import { getPlatformDimensions } from "./targets";
import type {
	FontConfig,
	OGXElement,
	RenderOptions,
	ThemeConfig,
} from "./types";

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 630;

/**
 * Render an OGX element to SVG string
 * Browser-safe: uses only Satori (no Node.js dependencies)
 */
export async function renderToSVG(
	element: OGXElement,
	options: RenderOptions = {},
): Promise<string> {
	const profile = process.env.OGX_PROFILE === "1";
	const tStart = profile ? performance.now() : 0;
	const platformDims = options.platform
		? getPlatformDimensions(options.platform)
		: null;

	const {
		width = platformDims?.width ?? DEFAULT_WIDTH,
		height = platformDims?.height ?? DEFAULT_HEIGHT,
		debug = false,
	} = options;

	let resolvedFonts = options.fonts ?? [];
	if (resolvedFonts.length === 0) {
		resolvedFonts = fontRegistry.getFonts();
	}
	if (resolvedFonts.length === 0) {
		const { loadInterFromUrl } = await import("./fonts");
		resolvedFonts = [
			await loadInterFromUrl(300),
			await loadInterFromUrl(400),
			await loadInterFromUrl(500),
			await loadInterFromUrl(600),
			await loadInterFromUrl(700),
		];
	}

	const fullOptions = {
		width,
		height,
		fonts: resolvedFonts,
		debug,
		theme: options.theme,
		colorScheme: options.colorScheme,
	} as const;

	const tTransformStart = profile ? performance.now() : 0;
	const transformedElement = transformElement(element, debug, fullOptions);
	const tTransformEnd = profile ? performance.now() : 0;

	const svg = await satori(transformedElement as React.ReactNode, {
		width,
		height,
		fonts: resolvedFonts.map(fontToSatoriFont),
		debug,
	});

	if (profile) {
		const tEnd = performance.now();
		// Log coarse-grained timings for debugging hot paths
		console.log(
			`[OGX PROFILE] renderToSVG transform=${(tTransformEnd - tTransformStart).toFixed(2)}ms satori=${(tEnd - tTransformEnd).toFixed(2)}ms total=${(tEnd - tStart).toFixed(2)}ms`,
		);
	}

	return svg;
}

/**
 * Transform OGX element tree to Satori-compatible format
 * Processes `tw` props into inline styles
 */
function transformElement(
	element: OGXElement | string | number | null | undefined,
	debug: boolean,
	options: { theme?: ThemeConfig; colorScheme?: "light" | "dark" },
): unknown {
	if (element === null || element === undefined) {
		return null;
	}
	if (typeof element === "string" || typeof element === "number") {
		return element;
	}

	const { tw, style, children, ...restProps } = element.props;

	let mergedStyle: CSSProperties;
	if (tw) {
		const twStyles = parseTailwind(tw, options.theme, options.colorScheme);
		mergedStyle = style ? { ...twStyles, ...style } : twStyles;
	} else {
		mergedStyle = style ? { ...style } : {};
	}

	// Default resets for Satori (only if not already set by Tailwind)
	if (mergedStyle.margin === undefined) mergedStyle.margin = 0;
	if (
		mergedStyle.padding === undefined &&
		mergedStyle.paddingTop === undefined &&
		mergedStyle.paddingBottom === undefined &&
		mergedStyle.paddingLeft === undefined &&
		mergedStyle.paddingRight === undefined
	) {
		mergedStyle.padding = 0;
	}

	// Apply default fontFamily if not specified
	if (!mergedStyle.fontFamily) {
		mergedStyle.fontFamily = "Inter";
	}

	// h1/p tags have default margins in many browsers, reset them
	if (element.type === "h1" || element.type === "p") {
		mergedStyle.margin = 0;
	}

	// Add debug border if enabled
	if (debug) {
		mergedStyle.border = "1px solid rgba(255, 0, 0, 0.3)";
	}

	// Transform children recursively
	let transformedChildren: any = null;
	if (children !== null && children !== undefined) {
		if (Array.isArray(children)) {
			const filtered = children.filter((c) => c !== null && c !== undefined);
			if (filtered.length === 1) {
				transformedChildren = transformElement(
					filtered[0] as any,
					debug,
					options,
				);
			} else {
				transformedChildren = filtered.map((c) =>
					transformElement(c as any, debug, options),
				);
			}
		} else {
			transformedChildren = transformElement(children, debug, options);
		}
	}

	return {
		type: element.type,
		props: {
			...restProps,
			style: mergedStyle,
			children: transformedChildren,
		},
	};
}

/**
 * Convert OGX FontConfig to Satori font format
 */
function fontToSatoriFont(font: FontConfig) {
	return {
		name: font.name,
		data: font.data,
		weight: font.weight ?? 400,
		style: font.style ?? "normal",
	};
}
