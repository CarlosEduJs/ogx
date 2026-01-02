import { absolute, div, h1, img, row, span, stack } from "../builder";
import type { OGXElement, Preset } from "../types";

export interface BlogPresetProps {
	/** Blog post title */
	title: string;
	/** Author name */
	author?: string;
	/** Author avatar URL */
	authorAvatar?: string;
	/** Publication date */
	date?: string;
	/** Category or tag */
	category?: string;
	/** Reading time */
	readingTime?: string;
	/** Cover image URL */
	coverImage?: string;
	/** Logo URL or base64 */
	logo?: string;
	/** Color scheme */
	colorScheme?: "dark" | "light";
	/** Custom slot overrides */
	slots?: {
		header?: OGXElement;
		footer?: OGXElement;
	};
}

/**
 * Blog preset - ideal for blog posts
 */
export const blogPreset: Preset<BlogPresetProps> = (props) => {
	const {
		title,
		author,
		authorAvatar,
		date,
		category,
		readingTime,
		coverImage,
		colorScheme = "dark",
		slots = {},
	} = props;

	const isDark = colorScheme === "dark";

	return row(
		[
			"w-full",
			"h-full",
			isDark ? "bg-zinc-950" : "bg-zinc-50",
			"overflow-hidden",
			"relative",
		],
		[
			// Background Accent
			absolute([
				isDark ? "bg-grid-white/5-64" : "bg-grid-zinc-900/5-64",
				"inset-0",
			]),
			absolute(["bg-grain/5"]), // Quality Boost: Dithering

			// Left content
			stack("flex-[3.5] p-20 justify-between gap-12 relative", [
				// Header
				slots.header ??
					row("items-center justify-between", [
						category
							? div(
									[
										"px-4 py-1.5 rounded-full text-xs font-bold tracking-widest",
										isDark
											? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
											: "bg-indigo-600/5 text-indigo-600 border border-indigo-600/10",
									],
									category.toUpperCase(),
								)
							: span(""),
					]),

				// Main content
				stack("gap-6", [
					h1(
						[
							"text-7xl",
							"font-black",
							isDark ? "text-white" : "text-zinc-950",
							"leading-[1.12]",
							"tracking-tight", // Quality Boost
						],
						title,
					),
				]),

				// Footer with author info (Glass Card effect)
				slots.footer ??
					row(
						["items-center gap-5"],
						[
							authorAvatar
								? img(
										authorAvatar,
										"w-16 h-16 rounded-full border-2 border-white/20 shadow-md",
									)
								: null,
							stack("gap-1.5", [
								author
									? span(
											[
												"text-2xl",
												"font-bold",
												isDark ? "text-white" : "text-zinc-950",
												"tracking-tight",
											],
											author,
										)
									: null,
								span(
									[
										"text-lg",
										"font-medium",
										isDark ? "text-zinc-400" : "text-zinc-600",
									],
									[date, readingTime].filter(Boolean).join(" · "),
								),
							]),
						],
					),
			]),

			// Right side cover image
			coverImage
				? row("flex-[2] h-full overflow-hidden relative", [
						// Gradient transition from content to image
						absolute([
							"inset-0 z-10",
							isDark
								? "bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent"
								: "bg-gradient-to-r from-zinc-50 via-zinc-50/20 to-transparent",
						]),
						img(coverImage, "w-full h-full object-cover"),
					])
				: // Decorative background for no-image blogs
					row(
						[
							"flex-[2]",
							"h-full",
							isDark ? "bg-zinc-900" : "bg-zinc-100",
							"items-center",
							"justify-center",
							"bg-grid-zinc-500/5-24",
							"relative",
						],
						[
							absolute([
								isDark
									? "bg-gradient-to-r from-zinc-950 to-transparent"
									: "bg-gradient-to-r from-zinc-50 to-transparent",
								"inset-0",
							]),
						],
					),
		],
	);
};
