// @ogxjs/core - Main exports

// Builder - Element construction
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
// Utilities
export { snapshotCache } from "./cache";
// Types
export type { CSSProperties } from "./css";
// Fonts - Loading and registration
export { fontRegistry } from "./font-registry";
export {
	createFont,
	loadFont,
	loadFontFromUrl,
	loadInterFont,
	loadInterFromUrl,
} from "./fonts";
// Rendering - SVG and PNG generation
export { ogx, ogxToSVG } from "./ogx";
export type {
	BlogPresetProps,
	DocsPresetProps,
	MinimalPresetProps,
	SocialPresetProps,
} from "./presets";

// Presets - Ready-to-use templates
export {
	blogPreset,
	docsPreset,
	minimalPreset,
	presets,
	socialPreset,
} from "./presets";
export { render } from "./render-png";
export { renderToSVG } from "./render-svg";
export { parseTailwind } from "./tailwind";
export type { Platform } from "./targets";
// Platform - Target dimensions
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
} from "./types";
export { loadAsset, toDataUri } from "./utils/assets";
export type { FitTextOptions } from "./utils/text";
export { calculateFittingFontSize } from "./utils/text";
