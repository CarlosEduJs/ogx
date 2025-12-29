export interface PlaygroundState {
	title: string;
	description: string;
	badge: string;
	category: string;
	theme: ThemeName;
	colorScheme: "dark" | "light";
	showGrid: boolean;
	author: string;
	fontSizeTitle: number;
	fontSizeDescription: number;
	fontSizeBadge: number;
	fontSizeCategory: number;
}

export type ThemeName =
	| "indigo"
	| "rose"
	| "emerald"
	| "amber"
	| "blue"
	| "zinc";

export interface ThemeConfig {
	primary: string;
	accent: string;
	bg: string;
	badge: "purple" | "rose" | "emerald" | "amber" | "blue" | "slate";
}
