import type { CSSProperties } from "./css";
import type { Platform } from "./targets";
export type { Platform };

/**
 * Known Tailwind color names
 */
export type TailwindBaseColor =
	| "inherit"
	| "current"
	| "transparent"
	| "black"
	| "white"
	| "slate"
	| "gray"
	| "zinc"
	| "neutral"
	| "stone"
	| "red"
	| "orange"
	| "amber"
	| "yellow"
	| "lime"
	| "green"
	| "emerald"
	| "teal"
	| "cyan"
	| "sky"
	| "blue"
	| "indigo"
	| "violet"
	| "purple"
	| "fuchsia"
	| "pink"
	| "rose";

/**
 * Standard Tailwind color weights
 */
export type TailwindColorWeight =
	| "50"
	| "100"
	| "200"
	| "300"
	| "400"
	| "500"
	| "600"
	| "700"
	| "800"
	| "900"
	| "950";

/**
 * Standard Tailwind spacing scale
 */
export type TailwindSpacing =
	| "0"
	| "px"
	| "0.5"
	| "1"
	| "1.5"
	| "2"
	| "2.5"
	| "3"
	| "3.5"
	| "4"
	| "5"
	| "6"
	| "7"
	| "8"
	| "9"
	| "10"
	| "11"
	| "12"
	| "14"
	| "16"
	| "20"
	| "24"
	| "28"
	| "32"
	| "36"
	| "40"
	| "44"
	| "48"
	| "52"
	| "56"
	| "60"
	| "64"
	| "72"
	| "80"
	| "96";

/**
 * Standard Tailwind opacity scale
 */
export type TailwindOpacity =
	| "0"
	| "5"
	| "10"
	| "20"
	| "25"
	| "30"
	| "40"
	| "50"
	| "60"
	| "70"
	| "75"
	| "80"
	| "90"
	| "95"
	| "100";

/**
 * Semantic theme color names from ThemeConfig
 */
export type ThemeColorName =
	| "background"
	| "foreground"
	| "primary"
	| "primary-foreground"
	| "secondary"
	| "secondary-foreground"
	| "muted"
	| "muted-foreground"
	| "accent"
	| "accent-foreground"
	| "destructive"
	| "destructive-foreground"
	| "border"
	| "input"
	| "ring";

/**
 * Combined color type for suggestions
 */
export type TailwindColor =
	| TailwindBaseColor
	| ThemeColorName
	| `${Exclude<TailwindBaseColor, "inherit" | "current" | "transparent" | "black" | "white">}-${TailwindColorWeight}`;

/**
 * Common Tailwind utility classes for autocompletion
 * The (string & {}) trick allows autocompletion while still accepting any string
 */
export type TailwindUtility =
	| "flex"
	| "flex-col"
	| "flex-row"
	| "flex-1"
	| "flex-none"
	| "flex-wrap"
	| "items-start"
	| "items-center"
	| "items-end"
	| "items-baseline"
	| "items-stretch"
	| "justify-start"
	| "justify-center"
	| "justify-end"
	| "justify-between"
	| "justify-around"
	| "justify-evenly"
	| "w-full"
	| "w-screen"
	| "h-full"
	| "h-screen"
	| "relative"
	| "absolute"
	| "fixed"
	| "top-0"
	| "right-0"
	| "bottom-0"
	| "left-0"
	| "inset-0"
	| "rounded"
	| "rounded-sm"
	| "rounded-md"
	| "rounded-lg"
	| "rounded-xl"
	| "rounded-2xl"
	| "rounded-3xl"
	| "rounded-full"
	| "font-thin"
	| "font-extralight"
	| "font-light"
	| "font-normal"
	| "font-medium"
	| "font-semibold"
	| "font-bold"
	| "font-extrabold"
	| "font-black"
	| "text-xs"
	| "text-sm"
	| "text-base"
	| "text-lg"
	| "text-xl"
	| "text-2xl"
	| "text-3xl"
	| "text-4xl"
	| "text-5xl"
	| "text-6xl"
	| "text-7xl"
	| "text-8xl"
	| "text-9xl"
	| "text-left"
	| "text-center"
	| "text-right"
	| "text-justify"
	| "leading-none"
	| "leading-tight"
	| "leading-snug"
	| "leading-normal"
	| "leading-relaxed"
	| "leading-loose"
	| `bg-${TailwindColor}`
	| `text-${TailwindColor}`
	| `border-${TailwindColor}`
	| `p-${TailwindSpacing}`
	| `px-${TailwindSpacing}`
	| `py-${TailwindSpacing}`
	| `pt-${TailwindSpacing}`
	| `pr-${TailwindSpacing}`
	| `pb-${TailwindSpacing}`
	| `pl-${TailwindSpacing}`
	| `m-${TailwindSpacing}`
	| `mx-${TailwindSpacing}`
	| `my-${TailwindSpacing}`
	| `mt-${TailwindSpacing}`
	| `mr-${TailwindSpacing}`
	| `mb-${TailwindSpacing}`
	| `ml-${TailwindSpacing}`
	| `gap-${TailwindSpacing}`
	| `opacity-${TailwindOpacity}`
	| "rounded-none"
	| "rounded-sm"
	| "rounded-md"
	| "rounded-lg"
	| "rounded-xl"
	| "rounded-2xl"
	| "rounded-3xl"
	| "rounded-full"
	| "shadow"
	| "shadow-sm"
	| "shadow-md"
	| "shadow-lg"
	| "shadow-xl"
	| "shadow-2xl"
	| "shadow-inner"
	| "shadow-none"
	| "bg-grid"
	| "bg-dots"
	| "bg-lines"
	| (string & {});

/**
 * JSX-like element for OGX rendering
 */
export interface OGXElement {
	type: string;
	props: OGXElementProps;
}

export interface OGXElementProps {
	/** Tailwind-like utility classes */
	tw?: TailwindUtility | TailwindUtility[];
	/** Inline styles (takes precedence over tw) */
	style?: CSSProperties;
	/** Child elements */
	children?: OGXChildren;
	/** Image source */
	src?: string;
	/** Image alt text */
	alt?: string;
	/** Any other props */
	[key: string]: unknown;
}

export type OGXChildren =
	| OGXElement
	| (OGXElement | null)[]
	| string
	| number
	| null
	| undefined;

/**
 * Font configuration for Satori
 */
export interface FontConfig {
	name: string;
	data: ArrayBuffer;
	weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
	style?: "normal" | "italic";
}

/**
 * Custom theme colors for design system integration
 * Allows using semantic color names like bg-background, text-primary, etc.
 */
export interface ThemeConfig {
	/** Background color */
	background?: string;
	/** Foreground/text color */
	foreground?: string;
	/** Primary brand color */
	primary?: string;
	/** Primary foreground (text on primary) */
	"primary-foreground"?: string;
	/** Secondary color */
	secondary?: string;
	/** Secondary foreground */
	"secondary-foreground"?: string;
	/** Muted background */
	muted?: string;
	/** Muted foreground */
	"muted-foreground"?: string;
	/** Accent color */
	accent?: string;
	/** Accent foreground */
	"accent-foreground"?: string;
	/** Destructive/error color */
	destructive?: string;
	/** Destructive foreground */
	"destructive-foreground"?: string;
	/** Border color */
	border?: string;
	/** Input border color */
	input?: string;
	/** Ring/focus color */
	ring?: string;
	/** Any other custom colors */
	[key: string]: string | undefined;
}

/**
 * Render options
 */
export interface RenderOptions {
	/** Target platform for automatic dimensions */
	platform?: Platform;
	/** Image width in pixels (default: platform default or 1200) */
	width?: number;
	/** Image height in pixels (default: platform default or 630) */
	height?: number;
	/** Custom fonts */
	fonts?: FontConfig[];
	/** Debug mode - shows layout boxes */
	debug?: boolean;
	/** Custom theme colors */
	theme?: ThemeConfig;
	/** Color scheme for dark mode (light or dark) */
	colorScheme?: "light" | "dark";
	/** Custom response headers */
	headers?: Record<string, string>;
}

/**
 * Preset configuration base
 */
export interface OGXBaseConfig {
	/** Target platform(s) for automatic dimensions */
	platform?: Platform | Platform[];
	/** Custom slot overrides */
	slots?: Record<string, OGXElement>;
	/** Render options (merged with top-level options) */
	options?: RenderOptions;
	/** Quick debug toggle */
	debug?: boolean;
	/** Custom fonts (if not provided, Inter will be loaded) */
	fonts?: FontConfig[];
	/** Custom theme colors */
	theme?: ThemeConfig;
	/** Color scheme for dark mode (light or dark) */
	colorScheme?: "light" | "dark";
	/** Enable snapshot caching (default: true) */
	cache?: boolean;
	/**
	 * Declarative font registration for Inter.
	 * Automatically handles registration of requested weights.
	 */
	inter?: (300 | 400 | 500 | 600 | 700)[];
}

export type OGXConfig<T extends PresetName = PresetName> = OGXBaseConfig & {
	preset: T;
} & PresetProps[T];

/**
 * Preset function type
 */
export type Preset<TProps> = (props: TProps) => OGXElement;

import { blogPreset } from "./presets/blog";
import { docsPreset } from "./presets/docs";
import { minimalPreset } from "./presets/minimal";
import { socialPreset } from "./presets/social";

export const presets = {
	docs: docsPreset,
	blog: blogPreset,
	minimal: minimalPreset,
	social: socialPreset,
} as const;

export type PresetName = keyof typeof presets;

export type PresetProps = {
	docs: Parameters<typeof docsPreset>[0];
	blog: Parameters<typeof blogPreset>[0];
	minimal: Parameters<typeof minimalPreset>[0];
	social: Parameters<typeof socialPreset>[0];
};
