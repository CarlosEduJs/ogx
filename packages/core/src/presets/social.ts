import { h1, img, row, span, stack } from "../builder";
import type { OGXElement, Preset } from "../types";

export interface SocialPresetProps {
	/** Main title or headline */
	title: string;
	/** Handle or username */
	handle?: string;
	/** Avatar URL */
	avatar?: string;
	/** Brand/app name */
	brand?: string;
	/** Brand logo URL */
	logo?: string;
	/** Gradient direction for background */
	gradient?: "to-r" | "to-br" | "to-b" | "to-bl";
	/** From color (hex) */
	fromColor?: string;
	/** To color (hex) */
	toColor?: string;
	/** Color scheme */
	colorScheme?: "dark" | "light";
	/** Custom slot overrides */
	slots?: {
		header?: OGXElement;
		footer?: OGXElement;
	};
}

/**
 * Social preset - card-style for social media
 */
export const socialPreset: Preset<SocialPresetProps> = (props) => {
	const {
		title,
		handle,
		avatar,
		brand,
		logo,
		colorScheme = "dark",
		gradient = "to-br",
		fromColor = "oklch(65% 0.25 260)", // Vibrant Indigo-ish
		toColor = "oklch(60% 0.3 300)", // Vibrant Purple-ish
		slots = {},
	} = props;

	const isDark = colorScheme === "dark";

	const gradientStyle = `linear-gradient(${
		gradient === "to-r"
			? "90deg"
			: gradient === "to-br"
				? "135deg"
				: gradient === "to-b"
					? "180deg"
					: "225deg"
	}, ${fromColor}, ${toColor})`;

	return stack(
		["w-full", "h-full", "p-20", "relative", "overflow-hidden"],
		[
			// Content Layout (background applied on container to avoid extra layers)
			stack("flex-1 justify-between relative", [
				// Header
				slots.header ??
					row("items-center justify-between", [
						row("items-center gap-4", [
							logo
								? img(logo, [
										"w-12 h-12 rounded-xl shadow-lg",
										isDark ? "bg-zinc-950" : "bg-white border border-zinc-200",
									])
								: null,
							brand
								? span(
										[
											"text-2xl font-black tracking-tighter",
											isDark ? "text-white" : "text-zinc-950",
										],
										brand.toUpperCase(),
									)
								: null,
						]),
						// Subtle platform indicator
						span(
							[
								isDark ? "text-white/30" : "text-black/30",
								"text-xs font-bold tracking-widest",
							],
							"SOCIAL CARD",
						),
					]),

				// Main content
				stack("gap-6 overflow-hidden", [
					h1(
						[
							"text-7xl",
							"font-black",
							isDark ? "text-white" : "text-zinc-950",
							"leading-[1.05]",
							"tracking-tight",
						],
						title,
					),
				]),

				// Footer with user info (Clean Glass Badge)
				slots.footer ??
					(handle || avatar
						? row(
								[
									"items-center gap-4 p-3 pr-6 rounded-full self-start shadow-lg",
									isDark
										? "bg-black/20 border border-white/20"
										: "bg-white/40 border border-black/10",
								],
								[
									avatar
										? img(
												avatar,
												"w-10 h-10 rounded-full border border-white/20 shadow-sm",
											)
										: null,
									handle
										? span(
												[
													"text-xl font-bold tracking-tight",
													isDark ? "text-white/90" : "text-zinc-900/90",
													"truncate",
												],
												handle,
											)
										: null,
								],
							)
						: null),
			]),
		],
		{ style: { backgroundImage: gradientStyle } },
	);
};
