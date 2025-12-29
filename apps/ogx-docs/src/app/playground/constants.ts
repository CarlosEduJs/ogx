import type { PlaygroundState, ThemeConfig, ThemeName } from "./types";

export const THEMES: Record<ThemeName, ThemeConfig> = {
	indigo: {
		primary: "#6366f1",
		accent: "#818cf8",
		bg: "bg-indigo-500/10",
		badge: "purple",
	},
	rose: {
		primary: "#f43f5e",
		accent: "#fb7185",
		bg: "bg-rose-500/10",
		badge: "rose",
	},
	emerald: {
		primary: "#10b981",
		accent: "#34d399",
		bg: "bg-emerald-500/10",
		badge: "emerald",
	},
	amber: {
		primary: "#f59e0b",
		accent: "#fbbf24",
		bg: "bg-amber-500/10",
		badge: "amber",
	},
	blue: {
		primary: "#3b82f6",
		accent: "#60a5fa",
		bg: "bg-blue-500/10",
		badge: "blue",
	},
	zinc: {
		primary: "#3f3f46",
		accent: "#71717a",
		bg: "bg-zinc-500/10",
		badge: "slate",
	},
};

export const INITIAL_STATE: PlaygroundState = {
	title: "The OGX Playground",
	description:
		"Build beautiful high-performance dynamic visuals with the OGX React adapter. Pure wasm rendering, edge-optimized.",
	badge: "BETA",
	category: "Architecture",
	theme: "indigo",
	colorScheme: "dark",
	showGrid: true,
	author: "ogx.dev",
	fontSizeTitle: 64,
	fontSizeDescription: 24,
	fontSizeBadge: 14,
	fontSizeCategory: 12,
};
