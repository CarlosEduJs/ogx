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
} from "./builder";

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
export { render } from "./render-png";
export { renderToSVG } from "./render-svg";
export { parseTailwind } from "./tailwind";

// Presets - Ready-to-use templates
export {
	blogPreset,
	docsPreset,
	minimalPreset,
	presets,
	socialPreset,
} from "./presets";
export type {
	BlogPresetProps,
	DocsPresetProps,
	MinimalPresetProps,
	SocialPresetProps,
} from "./presets";

// Platform - Target dimensions
export { getPlatformDimensions } from "./targets";
export type { Platform } from "./targets";

// Utilities
export { snapshotCache } from "./cache";
export { loadAsset, toDataUri } from "./utils/assets";
export { calculateFittingFontSize } from "./utils/text";
export type { FitTextOptions } from "./utils/text";

// Types
export type { CSSProperties } from "./css";
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
