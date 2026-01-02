/**
 * @ogxjs/core - Tailwind Module
 * High-performance Tailwind CSS parser
 *
 * @version 0.2.0 "Turbo"
 */

export type { CacheStats } from "./class-cache";
export { classCache, stringCache } from "./class-cache";
export { colors } from "./colors";

// Advanced exports for customization
export { getStaticClass, isStaticClass, STATIC_CLASSES } from "./lookup-tables";
// Main parser (v2 with O(1) lookups)
export {
	clearAllCaches,
	getCacheStats,
	parseTailwind,
	parseTailwindBatch,
} from "./parser-v2";
// Types
export type { GradientState, ParseContext } from "./prefix-handlers";
export {
	ORDERED_PREFIXES,
	PREFIX_HANDLERS,
	parseSpacingValue,
	resolveColorValue,
} from "./prefix-handlers";
// Scales and values
export { borderRadius, fontSize, fontWeight, opacity, spacing } from "./scales";
