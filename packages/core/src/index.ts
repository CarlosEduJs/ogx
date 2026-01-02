/**
 * @ogxjs/core - High-performance OG Image Generator
 *
 * @description
 * Generate beautiful Open Graph images using Tailwind CSS classes.
 * Built for Node.js, Bun, and Deno.
 *
 * @version 0.2.0 "Turbo"
 * @see https://ogx-three.vercel.app
 */

// ═══════════════════════════════════════════════════════════════════════════
// BUILDER - Element construction
// ═══════════════════════════════════════════════════════════════════════════
export {
	absolute,
	badge,
	card,
	div,
	fluent,
	footer,
	grid,
	h,
	h1,
	h2,
	header,
	img,
	imgFromUrl,
	main,
	p,
	row,
	spacer,
	span,
	stack,
	svgFromContent,
	unsafe_img,
	validateImageUrl,
} from "./builder";
export type {
	LRUCacheOptions,
	LRUCacheStats,
	SnapshotCacheOptions,
	SnapshotCacheStats,
} from "./cache/index";
// ═══════════════════════════════════════════════════════════════════════════
// CACHE - v2 with LRU + Fast Hash
// ═══════════════════════════════════════════════════════════════════════════
export {
	configureSnapshotCache,
	fastHash,
	fnv1a,
	getSnapshotCache,
	hashObject,
	LRUCache,
	snapshotCache,
} from "./cache/index";
// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════
export type { CSSProperties } from "./css";
// ═══════════════════════════════════════════════════════════════════════════
// FONTS - Loading and registration
// ═══════════════════════════════════════════════════════════════════════════
export { fontRegistry } from "./font-registry";
export {
	createFont,
	loadFont,
	loadFontFromUrl,
	loadInterFont,
	loadInterFromUrl,
} from "./fonts";
// ═══════════════════════════════════════════════════════════════════════════
// RENDERING - SVG and PNG generation
// ═══════════════════════════════════════════════════════════════════════════
export { ogx, ogxToSVG } from "./ogx";
export type { TimingAggregate, TimingEntry, TimingReport } from "./perf";
// ═══════════════════════════════════════════════════════════════════════════
// PERFORMANCE - Timing API
// ═══════════════════════════════════════════════════════════════════════════
export {
	benchmark,
	benchmarkSync,
	quickTime,
	quickTimeSync,
	Timer,
	timing,
} from "./perf";
export type {
	BlogPresetProps,
	DocsPresetProps,
	MinimalPresetProps,
	SocialPresetProps,
} from "./presets";
// ═══════════════════════════════════════════════════════════════════════════
// PRESETS - Ready-to-use templates
// ═══════════════════════════════════════════════════════════════════════════
export {
	blogPreset,
	docsPreset,
	minimalPreset,
	presets,
	socialPreset,
} from "./presets";
export { render } from "./render-png";
export { renderToSVG } from "./render-svg";
export type { CacheStats, GradientState, ParseContext } from "./tailwind";
// ═══════════════════════════════════════════════════════════════════════════
// TAILWIND - Parser v2 with O(1) lookups
// ═══════════════════════════════════════════════════════════════════════════
export {
	clearAllCaches,
	getCacheStats,
	isStaticClass,
	parseTailwind,
	parseTailwindBatch,
	STATIC_CLASSES,
} from "./tailwind";
export type { Platform } from "./targets";
// ═══════════════════════════════════════════════════════════════════════════
// PLATFORM - Target dimensions
// ═══════════════════════════════════════════════════════════════════════════
export { getPlatformDimensions } from "./targets";
export type {
	FontConfig,
	OGXBaseConfig,
	OGXChildren,
	OGXConfig,
	OGXElement,
	OGXElementProps,
	Preset,
	PresetName,
	PresetProps,
	RenderOptions,
	ThemeConfig,
} from "./types";

// ═══════════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════════
export { loadAsset, toDataUri } from "./utils/assets";
export type { FitTextOptions } from "./utils/text";
export { calculateFittingFontSize } from "./utils/text";
