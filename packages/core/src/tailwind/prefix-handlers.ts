/**
 * @ogxjs/core - Tailwind Prefix Handlers
 * Modular handlers for dynamic Tailwind classes with prefixes
 *
 * @description
 * Instead of a giant if/else chain, we use a Map of prefix -> handler.
 * This allows O(1) prefix lookup + targeted parsing.
 *
 * @performance
 * - Before: O(n) linear scan through all if/else conditions
 * - After: O(1) prefix lookup + O(1) value parsing
 *
 * @version 0.2.0 "Turbo"
 */

import type { CSSProperties } from "../css";
import type { ThemeConfig } from "../types";
import { normalizeColor } from "../utils/color";
import { colors } from "./colors";
import { borderRadius, boxShadow, fontSize, opacity, spacing } from "./scales";

// TYPES

export interface GradientState {
	from?: string;
	via?: string;
	to?: string;
	direction?: string;
}

export interface ParseContext {
	style: CSSProperties;
	gradient: GradientState;
	theme?: ThemeConfig;
	colorScheme?: "light" | "dark";
}

/**
 * Handler function type for prefix-based classes
 * @param value - The value after the prefix (e.g., "4" from "p-4")
 * @param ctx - Parse context with style object and gradient state
 */
export type PrefixHandler = (value: string, ctx: ParseContext) => void;

// UTILITY FUNCTIONS

/**
 * Parse a spacing value from Tailwind scale or fraction
 */
export function parseSpacingValue(value: string): number | string | undefined {
	// Check for fraction values like 1/2, 1/3, 1/4, etc.
	if (value.includes("/")) {
		const [num, denom] = value.split("/");
		const numerator = Number.parseInt(num!, 10);
		const denominator = Number.parseInt(denom!, 10);
		if (
			!Number.isNaN(numerator) &&
			!Number.isNaN(denominator) &&
			denominator !== 0
		) {
			return `${(numerator / denominator) * 100}%`;
		}
		return undefined;
	}

	// Check spacing scale
	const spacingValue = spacing[value];
	if (spacingValue !== undefined) {
		return spacingValue;
	}

	return undefined;
}

/**
 * Resolve a color value from theme or palette with opacity support
 */
export function resolveColorValue(
	name: string,
	theme?: ThemeConfig,
): string | undefined {
	if (!name) return undefined;

	const normalizedParts = name.split("/");
	const colorName = normalizedParts[0];
	const opacityStr = normalizedParts[1];

	if (!colorName) return undefined;

	let baseColor: string | undefined;

	if (theme?.[colorName]) {
		baseColor = theme[colorName];
	} else {
		baseColor = colors[colorName];
	}

	if (!baseColor) return undefined;
	baseColor = normalizeColor(baseColor);

	if (opacityStr && baseColor.startsWith("#")) {
		const alpha = Number.parseInt(opacityStr, 10) / 100;
		const r = Number.parseInt(baseColor.slice(1, 3), 16);
		const g = Number.parseInt(baseColor.slice(3, 5), 16);
		const b = Number.parseInt(baseColor.slice(5, 7), 16);
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	return baseColor;
}

/** Maximum length for arbitrary values to prevent DoS */
const MAX_ARBITRARY_VALUE_LENGTH = 100;

/** Patterns that could indicate malicious input */
const DANGEROUS_PATTERNS =
	/javascript:|data:text\/html|<script|<\/script|expression\s*\(/i;

/**
 * Parse arbitrary value from brackets [value]
 */
export function parseArbitraryValue(value: string): string | number {
	// Security: Limit value length
	if (value.length > MAX_ARBITRARY_VALUE_LENGTH) {
		if (process.env.NODE_ENV !== "production") {
			console.warn(
				`OGX: Arbitrary value exceeds ${MAX_ARBITRARY_VALUE_LENGTH} chars, truncating`,
			);
		}
		value = value.slice(0, MAX_ARBITRARY_VALUE_LENGTH);
	}

	// Security: Block dangerous patterns
	if (DANGEROUS_PATTERNS.test(value)) {
		if (process.env.NODE_ENV !== "production") {
			console.warn(`OGX: Potentially dangerous arbitrary value blocked`);
		}
		return 0;
	}

	// CSS value with units
	if (/^\d+(\.\d+)?(px|rem|em|%|vw|vh)$/.test(value)) {
		return value;
	}
	// Pure number
	if (/^\d+(\.\d+)?$/.test(value)) {
		return Number.parseFloat(value);
	}
	// Return as-is (colors, etc.)
	return value;
}

// PREFIX HANDLERS

/**
 * Map of prefix -> handler function
 * Order matters for prefixes that share common starts (e.g., "px-" before "p-")
 */
export const PREFIX_HANDLERS: ReadonlyMap<string, PrefixHandler> = new Map([
	// ─────────────────────────────────────────────────────────────────────────
	// PADDING (order: px/py before p)
	// ─────────────────────────────────────────────────────────────────────────
	[
		"px-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) {
				ctx.style.paddingLeft = v;
				ctx.style.paddingRight = v;
			}
		},
	],
	[
		"py-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) {
				ctx.style.paddingTop = v;
				ctx.style.paddingBottom = v;
			}
		},
	],
	[
		"pt-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.paddingTop = v;
		},
	],
	[
		"pr-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.paddingRight = v;
		},
	],
	[
		"pb-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.paddingBottom = v;
		},
	],
	[
		"pl-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.paddingLeft = v;
		},
	],
	[
		"p-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.padding = v;
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// MARGIN (order: mx/my before m)
	// ─────────────────────────────────────────────────────────────────────────
	[
		"mx-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) {
				ctx.style.marginLeft = v;
				ctx.style.marginRight = v;
			}
		},
	],
	[
		"my-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) {
				ctx.style.marginTop = v;
				ctx.style.marginBottom = v;
			}
		},
	],
	[
		"mt-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.marginTop = v;
		},
	],
	[
		"mr-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.marginRight = v;
		},
	],
	[
		"mb-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.marginBottom = v;
		},
	],
	[
		"ml-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.marginLeft = v;
		},
	],
	[
		"m-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.margin = v;
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// GAP (order: gap-x/gap-y before gap)
	// ─────────────────────────────────────────────────────────────────────────
	[
		"gap-x-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.columnGap = v;
		},
	],
	[
		"gap-y-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.rowGap = v;
		},
	],
	[
		"gap-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.gap = v;
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// WIDTH / HEIGHT
	// ─────────────────────────────────────────────────────────────────────────
	[
		"w-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.width = v;
		},
	],
	[
		"h-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.height = v;
		},
	],
	[
		"min-w-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.minWidth = v;
		},
	],
	[
		"min-h-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.minHeight = v;
		},
	],
	[
		"max-w-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.maxWidth = v;
		},
	],
	[
		"max-h-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.maxHeight = v;
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// INSET / POSITION
	// ─────────────────────────────────────────────────────────────────────────
	[
		"inset-x-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) {
				ctx.style.left = v;
				ctx.style.right = v;
			}
		},
	],
	[
		"inset-y-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) {
				ctx.style.top = v;
				ctx.style.bottom = v;
			}
		},
	],
	[
		"inset-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) {
				ctx.style.top = v;
				ctx.style.right = v;
				ctx.style.bottom = v;
				ctx.style.left = v;
			}
		},
	],
	[
		"top-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.top = v;
		},
	],
	[
		"right-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.right = v;
		},
	],
	[
		"bottom-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.bottom = v;
		},
	],
	[
		"left-",
		(value, ctx) => {
			const v = parseSpacingValue(value);
			if (v !== undefined) ctx.style.left = v;
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// Z-INDEX
	// ─────────────────────────────────────────────────────────────────────────
	[
		"z-",
		(value, ctx) => {
			const num = Number.parseInt(value, 10);
			if (!Number.isNaN(num)) ctx.style.zIndex = num;
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// BACKGROUND
	// ─────────────────────────────────────────────────────────────────────────
	[
		"bg-gradient-to-",
		(value, ctx) => {
			const directions: Record<string, string> = {
				t: "to top",
				tr: "to top right",
				r: "to right",
				br: "to bottom right",
				b: "to bottom",
				bl: "to bottom left",
				l: "to left",
				tl: "to top left",
			};
			if (directions[value]) {
				ctx.gradient.direction = directions[value];
			}
		},
	],
	[
		"bg-",
		(value, ctx) => {
			// Skip if it's a gradient direction
			if (value.startsWith("gradient-")) return;

			// Handle grid/dots/lines patterns
			if (
				value.startsWith("grid") ||
				value.startsWith("dots") ||
				value.startsWith("lines")
			) {
				handleBackgroundPattern(value, ctx);
				return;
			}

			// Handle grain
			if (value.startsWith("grain")) {
				handleBackgroundGrain(value, ctx);
				return;
			}

			// Regular color
			const resolved = resolveColorValue(value, ctx.theme);
			if (resolved) {
				ctx.style.backgroundColor = resolved;
			}
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// GRADIENT COLORS
	// ─────────────────────────────────────────────────────────────────────────
	[
		"from-",
		(value, ctx) => {
			const color = resolveColorValue(value, ctx.theme);
			if (color) ctx.gradient.from = color;
		},
	],
	[
		"via-",
		(value, ctx) => {
			const color = resolveColorValue(value, ctx.theme);
			if (color) ctx.gradient.via = color;
		},
	],
	[
		"to-",
		(value, ctx) => {
			const color = resolveColorValue(value, ctx.theme);
			if (color) ctx.gradient.to = color;
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// TEXT
	// ─────────────────────────────────────────────────────────────────────────
	[
		"text-",
		(value, ctx) => {
			// Check if it's a font size first
			const size = fontSize[value];
			if (size) {
				ctx.style.fontSize = `${size[0]}px`;
				ctx.style.lineHeight = `${size[1]}px`;
				return;
			}

			// Check alignment
			if (
				value === "left" ||
				value === "center" ||
				value === "right" ||
				value === "justify"
			) {
				ctx.style.textAlign = value;
				return;
			}

			// Otherwise it's a color
			const resolved = resolveColorValue(value, ctx.theme);
			if (resolved) {
				ctx.style.color = resolved;
			}
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// FONT
	// ─────────────────────────────────────────────────────────────────────────
	[
		"font-",
		(value, ctx) => {
			// Font weight is handled in static classes
			// This handles font-family if needed
			ctx.style.fontFamily = value;
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// LINE HEIGHT
	// ─────────────────────────────────────────────────────────────────────────
	[
		"leading-",
		(value, ctx) => {
			const spacingValue = spacing[value];
			if (spacingValue !== undefined) {
				ctx.style.lineHeight = spacingValue;
			} else {
				// Named values handled in static classes
				const num = Number.parseFloat(value);
				if (!Number.isNaN(num)) {
					ctx.style.lineHeight = num;
				}
			}
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// LETTER SPACING
	// ─────────────────────────────────────────────────────────────────────────
	[
		"tracking-",
		(value, ctx) => {
			// Named values handled in static classes
			// This handles arbitrary values like tracking-[0.5em]
			ctx.style.letterSpacing = value;
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// BORDER
	// ─────────────────────────────────────────────────────────────────────────
	[
		"border-",
		(value, ctx) => {
			// Check if it's a width
			const width = Number.parseInt(value, 10);
			if (!Number.isNaN(width) && value === String(width)) {
				ctx.style.borderWidth = width;
				ctx.style.borderStyle = "solid";
				return;
			}

			// Otherwise it's a color
			const resolved = resolveColorValue(value, ctx.theme);
			if (resolved) {
				ctx.style.borderColor = resolved;
			}
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// BORDER RADIUS
	// ─────────────────────────────────────────────────────────────────────────
	[
		"rounded-",
		(value, ctx) => {
			// Named values handled in static classes
			const radius = borderRadius[value];
			if (radius !== undefined) {
				ctx.style.borderRadius = radius;
			}
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// SHADOW
	// ─────────────────────────────────────────────────────────────────────────
	[
		"shadow-",
		(value, ctx) => {
			// Named values handled in static classes
			const shadow = boxShadow[value];
			if (shadow !== undefined) {
				ctx.style.boxShadow = shadow;
			}
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// OPACITY
	// ─────────────────────────────────────────────────────────────────────────
	[
		"opacity-",
		(value, ctx) => {
			const op = opacity[value];
			if (op !== undefined) {
				ctx.style.opacity = op;
			}
		},
	],

	// ─────────────────────────────────────────────────────────────────────────
	// ASPECT RATIO
	// ─────────────────────────────────────────────────────────────────────────
	[
		"aspect-",
		(value, ctx) => {
			// Named values handled in static classes
			// This handles arbitrary values like aspect-[4/3]
			if (value.includes("/")) {
				ctx.style.aspectRatio = value.replace("/", " / ");
			}
		},
	],
]);

// SPECIAL HANDLERS

/**
 * Handle background patterns (grid, dots, lines)
 */
function handleBackgroundPattern(value: string, ctx: ParseContext): void {
	const isGrid = value.startsWith("grid");
	const isDots = value.startsWith("dots");
	const type = isGrid ? "grid" : isDots ? "dots" : "lines";

	// Extract config after type
	const config = value.slice(type.length + 1) || ""; // +1 for the '-' or empty

	let color = "rgba(128, 128, 128, 0.1)";
	let size = 24;

	if (config) {
		const parts = config.split("-");
		const lastPart = parts[parts.length - 1];
		const isNumeric = lastPart && /^\d+$/.test(lastPart);

		if (isNumeric) {
			if (parts.length === 1) {
				size = Number.parseInt(lastPart, 10);
			} else if (parts.length >= 2) {
				size = Number.parseInt(lastPart, 10);
				const colorName = parts.slice(0, -1).join("-");
				if (colorName) {
					const resolved = resolveColorValue(colorName, ctx.theme);
					if (resolved) color = resolved;
				}
			}
		} else {
			const resolved = resolveColorValue(config, ctx.theme);
			if (resolved) color = resolved;
		}
	}

	ctx.style.backgroundSize = `${size}px ${size}px`;

	if (type === "grid") {
		ctx.style.backgroundImage = `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`;
	} else if (type === "dots") {
		ctx.style.backgroundImage = `radial-gradient(${color} 15%, transparent 16%)`;
	} else {
		ctx.style.backgroundImage = `linear-gradient(to bottom, ${color} 1px, transparent 1px)`;
		ctx.style.backgroundSize = `100% ${size}px`;
	}
}

/**
 * Handle background grain (noise) effect
 */
function handleBackgroundGrain(value: string, ctx: ParseContext): void {
	const opacityValue = value.includes("/")
		? Number.parseInt(value.split("/")[1]!, 10) / 100
		: 0.05;

	const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='${opacityValue}'/></svg>`;
	// Use btoa for cross-platform compatibility (Node.js, Edge, Browser)
	const base64 =
		typeof Buffer !== "undefined"
			? Buffer.from(svg).toString("base64")
			: btoa(svg);
	const noiseUrl = `url(data:image/svg+xml;base64,${base64})`;

	ctx.style.backgroundImage = ctx.style.backgroundImage
		? `${ctx.style.backgroundImage}, ${noiseUrl}`
		: noiseUrl;
}

// ARBITRARY VALUE HANDLER

/**
 * Handle arbitrary values like p-[32px], bg-[#ff0000]
 */
export function handleArbitraryValue(
	prefix: string,
	value: string,
	ctx: ParseContext,
): void {
	const parsedValue = parseArbitraryValue(value);

	switch (prefix) {
		// Gradient
		case "from":
			ctx.gradient.from = String(parsedValue);
			break;
		case "via":
			ctx.gradient.via = String(parsedValue);
			break;
		case "to":
			ctx.gradient.to = String(parsedValue);
			break;

		// Padding
		case "p":
			ctx.style.padding = parsedValue;
			break;
		case "px":
			ctx.style.paddingLeft = parsedValue;
			ctx.style.paddingRight = parsedValue;
			break;
		case "py":
			ctx.style.paddingTop = parsedValue;
			ctx.style.paddingBottom = parsedValue;
			break;
		case "pt":
			ctx.style.paddingTop = parsedValue;
			break;
		case "pr":
			ctx.style.paddingRight = parsedValue;
			break;
		case "pb":
			ctx.style.paddingBottom = parsedValue;
			break;
		case "pl":
			ctx.style.paddingLeft = parsedValue;
			break;

		// Margin
		case "m":
			ctx.style.margin = parsedValue;
			break;
		case "mx":
			ctx.style.marginLeft = parsedValue;
			ctx.style.marginRight = parsedValue;
			break;
		case "my":
			ctx.style.marginTop = parsedValue;
			ctx.style.marginBottom = parsedValue;
			break;
		case "mt":
			ctx.style.marginTop = parsedValue;
			break;
		case "mr":
			ctx.style.marginRight = parsedValue;
			break;
		case "mb":
			ctx.style.marginBottom = parsedValue;
			break;
		case "ml":
			ctx.style.marginLeft = parsedValue;
			break;

		// Size
		case "w":
			ctx.style.width = parsedValue;
			break;
		case "h":
			ctx.style.height = parsedValue;
			break;
		case "min-w":
			ctx.style.minWidth = parsedValue;
			break;
		case "min-h":
			ctx.style.minHeight = parsedValue;
			break;
		case "max-w":
			ctx.style.maxWidth = parsedValue;
			break;
		case "max-h":
			ctx.style.maxHeight = parsedValue;
			break;

		// Gap
		case "gap":
			ctx.style.gap = parsedValue;
			break;
		case "gap-x":
			ctx.style.columnGap = parsedValue;
			break;
		case "gap-y":
			ctx.style.rowGap = parsedValue;
			break;

		// Position
		case "top":
			ctx.style.top = parsedValue;
			break;
		case "right":
			ctx.style.right = parsedValue;
			break;
		case "bottom":
			ctx.style.bottom = parsedValue;
			break;
		case "left":
			ctx.style.left = parsedValue;
			break;
		case "inset":
			ctx.style.top = parsedValue;
			ctx.style.right = parsedValue;
			ctx.style.bottom = parsedValue;
			ctx.style.left = parsedValue;
			break;

		// Colors
		case "bg":
			ctx.style.backgroundColor = normalizeColor(String(parsedValue));
			break;
		case "text":
			// Could be color or size
			if (
				String(parsedValue).includes("px") ||
				String(parsedValue).includes("rem")
			) {
				ctx.style.fontSize = parsedValue;
			} else {
				ctx.style.color = normalizeColor(String(parsedValue));
			}
			break;

		// Border
		case "border":
			if (
				typeof parsedValue === "string" &&
				(parsedValue.startsWith("#") ||
					parsedValue.startsWith("rgb") ||
					parsedValue.startsWith("hsl") ||
					parsedValue.startsWith("oklch"))
			) {
				ctx.style.borderColor = normalizeColor(parsedValue);
			} else {
				ctx.style.borderWidth = parsedValue;
			}
			ctx.style.borderStyle = "solid";
			break;

		// Misc
		case "rounded":
			ctx.style.borderRadius = parsedValue;
			break;
		case "opacity":
			ctx.style.opacity = Number.parseFloat(String(parsedValue)) / 100;
			break;
		case "z":
			ctx.style.zIndex = parsedValue;
			break;
		case "aspect":
			ctx.style.aspectRatio = String(parsedValue).replace("/", " / ");
			break;
	}
}

// PREFIX MATCHING

/**
 * Ordered list of prefixes for matching (longest first to avoid false matches)
 */
export const ORDERED_PREFIXES: readonly string[] = [
	// Long prefixes first
	"bg-gradient-to-",
	"gap-x-",
	"gap-y-",
	"inset-x-",
	"inset-y-",
	"min-w-",
	"min-h-",
	"max-w-",
	"max-h-",
	// Medium prefixes
	"rounded-",
	"shadow-",
	"border-",
	"leading-",
	"tracking-",
	"opacity-",
	"aspect-",
	"inset-",
	"from-",
	"via-",
	"to-",
	"bg-",
	// Short prefixes (order matters)
	"px-",
	"py-",
	"pt-",
	"pr-",
	"pb-",
	"pl-",
	"mx-",
	"my-",
	"mt-",
	"mr-",
	"mb-",
	"ml-",
	"gap-",
	"text-",
	"font-",
	"top-",
	"right-",
	"bottom-",
	"left-",
	"w-",
	"h-",
	"p-",
	"m-",
	"z-",
];

/**
 * Index prefixes by first character for O(1) initial lookup
 * Each character maps to array of prefixes starting with that char
 * Prefixes are pre-sorted by length (longest first)
 */
const PREFIX_INDEX = new Map<string, readonly string[]>();

// Build index at module load (one-time cost)
(() => {
	const byChar = new Map<string, string[]>();
	for (const prefix of ORDERED_PREFIXES) {
		const char = prefix[0]!;
		if (!byChar.has(char)) {
			byChar.set(char, []);
		}
		byChar.get(char)!.push(prefix);
	}
	// Ensure each char's prefixes are sorted by length (longest first)
	for (const [char, prefixes] of byChar) {
		prefixes.sort((a, b) => b.length - a.length);
		PREFIX_INDEX.set(char, Object.freeze(prefixes) as readonly string[]);
	}
})();

/**
 * Find matching prefix handler for a class
 * @performance O(k) where k = prefixes starting with same char (usually 2-4)
 *
 * @param cls - Tailwind class name
 * @returns [handler, value] tuple or undefined
 */
export function findPrefixHandler(
	cls: string,
): [PrefixHandler, string] | undefined {
	// Get prefixes for first character
	const firstChar = cls[0];
	if (!firstChar) return undefined;

	const candidates = PREFIX_INDEX.get(firstChar);
	if (!candidates) return undefined;

	// Check candidates (already sorted by length)
	const len = candidates.length;
	for (let i = 0; i < len; i++) {
		const prefix = candidates[i]!;
		if (cls.startsWith(prefix)) {
			const handler = PREFIX_HANDLERS.get(prefix);
			if (handler) {
				return [handler, cls.slice(prefix.length)];
			}
		}
	}
	return undefined;
}
