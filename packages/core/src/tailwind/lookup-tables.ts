/**
 * @ogxjs/core - Tailwind Lookup Tables
 * O(1) lookup for static classes (no dynamic values)
 *
 * @description
 * This module provides instant lookup for ~200+ static Tailwind classes.
 * Instead of iterating through if/else chains, we use Map for O(1) access.
 *
 * @performance
 * - Before: O(n) where n = number of if/else conditions (~100)
 * - After: O(1) constant time lookup
 *
 * @version 0.2.0 "Turbo"
 */

import type { CSSProperties } from "../css";
/**
 * Static classes that map directly to CSS properties
 * No parsing needed - just lookup and return
 */
export const STATIC_CLASSES = new Map<string, CSSProperties>([
	// DISPLAY
	["flex", { display: "flex" }],
	["hidden", { display: "none" }],
	["block", { display: "block" }],
	["inline", { display: "inline" }],
	["inline-flex", { display: "inline-flex" }],
	["inline-block", { display: "inline-block" }],

	// FLEX DIRECTION
	["flex-row", { flexDirection: "row" }],
	["flex-col", { flexDirection: "column" }],
	["flex-row-reverse", { flexDirection: "row-reverse" }],
	["flex-col-reverse", { flexDirection: "column-reverse" }],

	// FLEX WRAP
	["flex-wrap", { flexWrap: "wrap" }],
	["flex-nowrap", { flexWrap: "nowrap" }],
	["flex-wrap-reverse", { flexWrap: "wrap-reverse" }],

	// FLEX GROW / SHRINK / BASIS
	["flex-1", { flexGrow: 1, flexShrink: 1, flexBasis: "0%" }],
	["flex-auto", { flexGrow: 1, flexShrink: 1, flexBasis: "auto" }],
	["flex-initial", { flexGrow: 0, flexShrink: 1, flexBasis: "auto" }],
	["flex-none", { flexGrow: 0, flexShrink: 0, flexBasis: "auto" }],
	["grow", { flexGrow: 1 }],
	["grow-0", { flexGrow: 0 }],
	["shrink", { flexShrink: 1 }],
	["shrink-0", { flexShrink: 0 }],

	// ALIGN ITEMS
	["items-start", { alignItems: "flex-start" }],
	["items-end", { alignItems: "flex-end" }],
	["items-center", { alignItems: "center" }],
	["items-baseline", { alignItems: "baseline" }],
	["items-stretch", { alignItems: "stretch" }],

	// ALIGN SELF
	["self-auto", { alignSelf: "auto" }],
	["self-start", { alignSelf: "flex-start" }],
	["self-end", { alignSelf: "flex-end" }],
	["self-center", { alignSelf: "center" }],
	["self-stretch", { alignSelf: "stretch" }],
	["self-baseline", { alignSelf: "baseline" }],

	// JUSTIFY CONTENT
	["justify-start", { justifyContent: "flex-start" }],
	["justify-end", { justifyContent: "flex-end" }],
	["justify-center", { justifyContent: "center" }],
	["justify-between", { justifyContent: "space-between" }],
	["justify-around", { justifyContent: "space-around" }],
	["justify-evenly", { justifyContent: "space-evenly" }],

	["justify-items-start", { justifyItems: "start" }],
	["justify-items-end", { justifyItems: "end" }],
	["justify-items-center", { justifyItems: "center" }],
	["justify-items-stretch", { justifyItems: "stretch" }],

	// JUSTIFY SELF
	["justify-self-auto", { justifySelf: "auto" }],
	["justify-self-start", { justifySelf: "start" }],
	["justify-self-end", { justifySelf: "end" }],
	["justify-self-center", { justifySelf: "center" }],
	["justify-self-stretch", { justifySelf: "stretch" }],

	// ALIGN CONTENT
	["content-start", { alignContent: "flex-start" }],
	["content-end", { alignContent: "flex-end" }],
	["content-center", { alignContent: "center" }],
	["content-between", { alignContent: "space-between" }],
	["content-around", { alignContent: "space-around" }],
	["content-evenly", { alignContent: "space-evenly" }],
	["content-stretch", { alignContent: "stretch" }],

	// POSITION
	["relative", { position: "relative" }],
	["absolute", { position: "absolute" }],
	["fixed", { position: "fixed" }],
	["sticky", { position: "sticky" }],
	["static", { position: "static" }],

	// INSET (Static values)

	["inset-0", { top: 0, right: 0, bottom: 0, left: 0 }],
	["inset-auto", { top: "auto", right: "auto", bottom: "auto", left: "auto" }],
	["inset-x-0", { left: 0, right: 0 }],
	["inset-y-0", { top: 0, bottom: 0 }],
	["top-0", { top: 0 }],
	["right-0", { right: 0 }],
	["bottom-0", { bottom: 0 }],
	["left-0", { left: 0 }],
	["top-auto", { top: "auto" }],
	["right-auto", { right: "auto" }],
	["bottom-auto", { bottom: "auto" }],
	["left-auto", { left: "auto" }],

	// WIDTH (Static values)

	["w-full", { width: "100%" }],
	["w-screen", { width: "100vw" }],
	["w-auto", { width: "auto" }],
	["w-fit", { width: "fit-content" }],
	["w-min", { width: "min-content" }],
	["w-max", { width: "max-content" }],
	["w-0", { width: 0 }],
	["w-px", { width: 1 }],
	["w-1/2", { width: "50%" }],
	["w-1/3", { width: "33.333333%" }],
	["w-2/3", { width: "66.666667%" }],
	["w-1/4", { width: "25%" }],
	["w-3/4", { width: "75%" }],
	["w-1/5", { width: "20%" }],
	["w-2/5", { width: "40%" }],
	["w-3/5", { width: "60%" }],
	["w-4/5", { width: "80%" }],

	// HEIGHT (Static values)

	["h-full", { height: "100%" }],
	["h-screen", { height: "100vh" }],
	["h-auto", { height: "auto" }],
	["h-fit", { height: "fit-content" }],
	["h-min", { height: "min-content" }],
	["h-max", { height: "max-content" }],
	["h-0", { height: 0 }],
	["h-px", { height: 1 }],
	["h-1/2", { height: "50%" }],
	["h-1/3", { height: "33.333333%" }],
	["h-2/3", { height: "66.666667%" }],
	["h-1/4", { height: "25%" }],
	["h-3/4", { height: "75%" }],
	["h-1/5", { height: "20%" }],
	["h-2/5", { height: "40%" }],
	["h-3/5", { height: "60%" }],
	["h-4/5", { height: "80%" }],

	// MIN/MAX WIDTH/HEIGHT

	["min-w-0", { minWidth: 0 }],
	["min-w-full", { minWidth: "100%" }],
	["min-w-min", { minWidth: "min-content" }],
	["min-w-max", { minWidth: "max-content" }],
	["min-w-fit", { minWidth: "fit-content" }],
	["max-w-full", { maxWidth: "100%" }],
	["max-w-none", { maxWidth: "none" }],
	["max-w-min", { maxWidth: "min-content" }],
	["max-w-max", { maxWidth: "max-content" }],
	["max-w-fit", { maxWidth: "fit-content" }],
	["min-h-0", { minHeight: 0 }],
	["min-h-full", { minHeight: "100%" }],
	["min-h-screen", { minHeight: "100vh" }],
	["min-h-min", { minHeight: "min-content" }],
	["min-h-max", { minHeight: "max-content" }],
	["min-h-fit", { minHeight: "fit-content" }],
	["max-h-full", { maxHeight: "100%" }],
	["max-h-screen", { maxHeight: "100vh" }],
	["max-h-none", { maxHeight: "none" }],
	["max-h-min", { maxHeight: "min-content" }],
	["max-h-max", { maxHeight: "max-content" }],
	["max-h-fit", { maxHeight: "fit-content" }],

	// MARGIN (Static values)

	["m-0", { margin: 0 }],
	["m-auto", { margin: "auto" }],
	["m-px", { margin: 1 }],
	["mx-0", { marginLeft: 0, marginRight: 0 }],
	["mx-auto", { marginLeft: "auto", marginRight: "auto" }],
	["mx-px", { marginLeft: 1, marginRight: 1 }],
	["my-0", { marginTop: 0, marginBottom: 0 }],
	["my-auto", { marginTop: "auto", marginBottom: "auto" }],
	["my-px", { marginTop: 1, marginBottom: 1 }],
	["mt-0", { marginTop: 0 }],
	["mt-auto", { marginTop: "auto" }],
	["mt-px", { marginTop: 1 }],
	["mr-0", { marginRight: 0 }],
	["mr-auto", { marginRight: "auto" }],
	["mr-px", { marginRight: 1 }],
	["mb-0", { marginBottom: 0 }],
	["mb-auto", { marginBottom: "auto" }],
	["mb-px", { marginBottom: 1 }],
	["ml-0", { marginLeft: 0 }],
	["ml-auto", { marginLeft: "auto" }],
	["ml-px", { marginLeft: 1 }],

	// PADDING (Static values)

	["p-0", { padding: 0 }],
	["p-px", { padding: 1 }],
	["px-0", { paddingLeft: 0, paddingRight: 0 }],
	["px-px", { paddingLeft: 1, paddingRight: 1 }],
	["py-0", { paddingTop: 0, paddingBottom: 0 }],
	["py-px", { paddingTop: 1, paddingBottom: 1 }],
	["pt-0", { paddingTop: 0 }],
	["pt-px", { paddingTop: 1 }],
	["pr-0", { paddingRight: 0 }],
	["pr-px", { paddingRight: 1 }],
	["pb-0", { paddingBottom: 0 }],
	["pb-px", { paddingBottom: 1 }],
	["pl-0", { paddingLeft: 0 }],
	["pl-px", { paddingLeft: 1 }],

	// GAP (Static values)

	["gap-0", { gap: 0 }],
	["gap-px", { gap: 1 }],
	["gap-x-0", { columnGap: 0 }],
	["gap-x-px", { columnGap: 1 }],
	["gap-y-0", { rowGap: 0 }],
	["gap-y-px", { rowGap: 1 }],

	// BORDER RADIUS

	["rounded-none", { borderRadius: 0 }],
	["rounded-sm", { borderRadius: 2 }],
	["rounded", { borderRadius: 4 }],
	["rounded-md", { borderRadius: 6 }],
	["rounded-lg", { borderRadius: 8 }],
	["rounded-xl", { borderRadius: 12 }],
	["rounded-2xl", { borderRadius: 16 }],
	["rounded-3xl", { borderRadius: 24 }],
	["rounded-full", { borderRadius: 9999 }],

	// BORDER WIDTH

	["border", { borderWidth: 1, borderStyle: "solid" }],
	["border-0", { borderWidth: 0 }],
	["border-2", { borderWidth: 2, borderStyle: "solid" }],
	["border-4", { borderWidth: 4, borderStyle: "solid" }],
	["border-8", { borderWidth: 8, borderStyle: "solid" }],
	["border-t", { borderTopWidth: 1, borderStyle: "solid" }],
	["border-r", { borderRightWidth: 1, borderStyle: "solid" }],
	["border-b", { borderBottomWidth: 1, borderStyle: "solid" }],
	["border-l", { borderLeftWidth: 1, borderStyle: "solid" }],
	["border-t-0", { borderTopWidth: 0 }],
	["border-r-0", { borderRightWidth: 0 }],
	["border-b-0", { borderBottomWidth: 0 }],
	["border-l-0", { borderLeftWidth: 0 }],
	["border-t-2", { borderTopWidth: 2, borderStyle: "solid" }],
	["border-r-2", { borderRightWidth: 2, borderStyle: "solid" }],
	["border-b-2", { borderBottomWidth: 2, borderStyle: "solid" }],
	["border-l-2", { borderLeftWidth: 2, borderStyle: "solid" }],

	// BORDER STYLE

	["border-solid", { borderStyle: "solid" }],
	["border-dashed", { borderStyle: "dashed" }],
	["border-dotted", { borderStyle: "dotted" }],
	["border-double", { borderStyle: "double" }],
	["border-none", { borderStyle: "none" }],

	// SHADOWS

	["shadow-none", { boxShadow: "none" }],
	["shadow-sm", { boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" }],
	[
		"shadow",
		{
			boxShadow:
				"0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
		},
	],
	[
		"shadow-md",
		{
			boxShadow:
				"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
		},
	],
	[
		"shadow-lg",
		{
			boxShadow:
				"0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
		},
	],
	[
		"shadow-xl",
		{
			boxShadow:
				"0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
		},
	],
	["shadow-2xl", { boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }],
	["shadow-inner", { boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)" }],
	[
		"shadow-premium",
		{
			boxShadow:
				"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 40px 60px -15px rgba(0, 0, 0, 0.25)",
		},
	],

	// OPACITY

	["opacity-0", { opacity: 0 }],
	["opacity-5", { opacity: 0.05 }],
	["opacity-10", { opacity: 0.1 }],
	["opacity-20", { opacity: 0.2 }],
	["opacity-25", { opacity: 0.25 }],
	["opacity-30", { opacity: 0.3 }],
	["opacity-40", { opacity: 0.4 }],
	["opacity-50", { opacity: 0.5 }],
	["opacity-60", { opacity: 0.6 }],
	["opacity-70", { opacity: 0.7 }],
	["opacity-75", { opacity: 0.75 }],
	["opacity-80", { opacity: 0.8 }],
	["opacity-90", { opacity: 0.9 }],
	["opacity-95", { opacity: 0.95 }],
	["opacity-100", { opacity: 1 }],

	// OVERFLOW

	["overflow-auto", { overflow: "auto" }],
	["overflow-hidden", { overflow: "hidden" }],
	["overflow-visible", { overflow: "visible" }],
	["overflow-scroll", { overflow: "scroll" }],
	["overflow-x-auto", { overflowX: "auto" }],
	["overflow-x-hidden", { overflowX: "hidden" }],
	["overflow-x-visible", { overflowX: "visible" }],
	["overflow-x-scroll", { overflowX: "scroll" }],
	["overflow-y-auto", { overflowY: "auto" }],
	["overflow-y-hidden", { overflowY: "hidden" }],
	["overflow-y-visible", { overflowY: "visible" }],
	["overflow-y-scroll", { overflowY: "scroll" }],

	// TEXT ALIGN

	["text-left", { textAlign: "left" }],
	["text-center", { textAlign: "center" }],
	["text-right", { textAlign: "right" }],
	["text-justify", { textAlign: "justify" }],

	// TEXT DECORATION

	["underline", { textDecoration: "underline" }],
	["line-through", { textDecoration: "line-through" }],
	["no-underline", { textDecoration: "none" }],
	["overline", { textDecoration: "overline" }],

	// TEXT TRANSFORM

	["uppercase", { textTransform: "uppercase" }],
	["lowercase", { textTransform: "lowercase" }],
	["capitalize", { textTransform: "capitalize" }],
	["normal-case", { textTransform: "none" }],

	// TEXT OVERFLOW

	[
		"truncate",
		{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
	],
	["text-ellipsis", { textOverflow: "ellipsis" }],
	["text-clip", { textOverflow: "clip" }],

	// WHITESPACE

	["whitespace-normal", { whiteSpace: "normal" }],
	["whitespace-nowrap", { whiteSpace: "nowrap" }],
	["whitespace-pre", { whiteSpace: "pre" }],
	["whitespace-pre-line", { whiteSpace: "pre-line" }],
	["whitespace-pre-wrap", { whiteSpace: "pre-wrap" }],

	// WORD BREAK

	["break-normal", { wordBreak: "normal", overflowWrap: "normal" }],
	["break-words", { overflowWrap: "break-word" }],
	["break-all", { wordBreak: "break-all" }],

	// FONT WEIGHT

	["font-thin", { fontWeight: 100 }],
	["font-extralight", { fontWeight: 200 }],
	["font-light", { fontWeight: 300 }],
	["font-normal", { fontWeight: 400 }],
	["font-medium", { fontWeight: 500 }],
	["font-semibold", { fontWeight: 600 }],
	["font-bold", { fontWeight: 700 }],
	["font-extrabold", { fontWeight: 800 }],
	["font-black", { fontWeight: 900 }],

	// FONT STYLE

	["italic", { fontStyle: "italic" }],
	["not-italic", { fontStyle: "normal" }],

	// FONT SIZE (with line-height)

	["text-xs", { fontSize: "12px", lineHeight: "16px" }],
	["text-sm", { fontSize: "14px", lineHeight: "20px" }],
	["text-base", { fontSize: "16px", lineHeight: "24px" }],
	["text-lg", { fontSize: "18px", lineHeight: "28px" }],
	["text-xl", { fontSize: "20px", lineHeight: "28px" }],
	["text-2xl", { fontSize: "24px", lineHeight: "32px" }],
	["text-3xl", { fontSize: "30px", lineHeight: "36px" }],
	["text-4xl", { fontSize: "36px", lineHeight: "40px" }],
	["text-5xl", { fontSize: "48px", lineHeight: "48px" }],
	["text-6xl", { fontSize: "60px", lineHeight: "60px" }],
	["text-7xl", { fontSize: "72px", lineHeight: "72px" }],
	["text-8xl", { fontSize: "96px", lineHeight: "96px" }],
	["text-9xl", { fontSize: "128px", lineHeight: "128px" }],

	// LINE HEIGHT

	["leading-none", { lineHeight: 1 }],
	["leading-tight", { lineHeight: 1.25 }],
	["leading-snug", { lineHeight: 1.375 }],
	["leading-normal", { lineHeight: 1.5 }],
	["leading-relaxed", { lineHeight: 1.625 }],
	["leading-loose", { lineHeight: 2 }],

	// LETTER SPACING

	["tracking-tighter", { letterSpacing: "-0.05em" }],
	["tracking-tight", { letterSpacing: "-0.025em" }],
	["tracking-normal", { letterSpacing: "0" }],
	["tracking-wide", { letterSpacing: "0.025em" }],
	["tracking-wider", { letterSpacing: "0.05em" }],
	["tracking-widest", { letterSpacing: "0.1em" }],
	// Custom OGX tracking
	["tracking-tightest", { letterSpacing: "-0.075em" }],

	// OBJECT FIT

	["object-contain", { objectFit: "contain" }],
	["object-cover", { objectFit: "cover" }],
	["object-fill", { objectFit: "fill" }],
	["object-none", { objectFit: "none" }],
	["object-scale-down", { objectFit: "scale-down" }],

	// OBJECT POSITION

	["object-bottom", { objectPosition: "bottom" }],
	["object-center", { objectPosition: "center" }],
	["object-left", { objectPosition: "left" }],
	["object-left-bottom", { objectPosition: "left bottom" }],
	["object-left-top", { objectPosition: "left top" }],
	["object-right", { objectPosition: "right" }],
	["object-right-bottom", { objectPosition: "right bottom" }],
	["object-right-top", { objectPosition: "right top" }],
	["object-top", { objectPosition: "top" }],

	// Z-INDEX

	["z-0", { zIndex: 0 }],
	["z-10", { zIndex: 10 }],
	["z-20", { zIndex: 20 }],
	["z-30", { zIndex: 30 }],
	["z-40", { zIndex: 40 }],
	["z-50", { zIndex: 50 }],
	["z-auto", { zIndex: "auto" }],

	// POINTER EVENTS (útil para overlays)

	["pointer-events-none", { pointerEvents: "none" }],
	["pointer-events-auto", { pointerEvents: "auto" }],

	// USER SELECT

	["select-none", { userSelect: "none" }],
	["select-text", { userSelect: "text" }],
	["select-all", { userSelect: "all" }],
	["select-auto", { userSelect: "auto" }],

	// ASPECT RATIO (Satori support)

	["aspect-auto", { aspectRatio: "auto" }],
	["aspect-square", { aspectRatio: "1 / 1" }],
	["aspect-video", { aspectRatio: "16 / 9" }],
]);

/**
 * Check if a class is static (can be looked up directly)
 */
export function isStaticClass(cls: string): boolean {
	return STATIC_CLASSES.has(cls);
}

/**
 * Get CSS properties for a static class
 * Returns undefined if not a static class
 */
export function getStaticClass(cls: string): CSSProperties | undefined {
	return STATIC_CLASSES.get(cls);
}
