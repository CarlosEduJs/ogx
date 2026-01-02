import { h1, p, stack } from "../builder";
import type { OGXElement, Preset } from "../types";

export interface MinimalPresetProps {
	/** Main text */
	title: string;
	/** Secondary text */
	subtitle?: string;
	/** Background color (Tailwind class or hex) */
	background?: string;
	/** Text color (Tailwind class or hex) */
	textColor?: string;
	/** Color scheme */
	colorScheme?: "dark" | "light";
	/** Custom slot overrides */
	slots?: {
		content?: OGXElement;
	};
}

/**
 * Minimal preset - ultra clean, just text
 */
export const minimalPreset: Preset<MinimalPresetProps> = (props) => {
	const {
		title,
		subtitle,
		colorScheme = "dark",
		background = colorScheme === "dark" ? "bg-zinc-950" : "bg-white",
		textColor = colorScheme === "dark" ? "text-white" : "text-zinc-950",
		slots = {},
	} = props;

	const bgClass = background.startsWith("bg-")
		? background
		: `bg-[${background}]`;
	const textClass = textColor.startsWith("text-")
		? textColor
		: `text-[${textColor}]`;

	return stack(
		[
			"w-full",
			"h-full",
			"items-center",
			"justify-center",
			"p-16",
			"relative",
			bgClass as any,
		],
		[
			// Content
			stack(
				"items-center justify-center relative gap-6",
				slots.content ?? [
					h1(
						[
							"text-8xl",
							"font-black",
							"text-center",
							"tracking-tightest", // Quality Boost
							"leading-none",
							textClass as any,
						],
						title,
					),
					subtitle
						? p(
								[
									"text-2xl",
									"text-center",
									"mt-2",
									"opacity-40",
									"font-medium",
									"tracking-tight",
									textClass as any,
								],
								subtitle.toUpperCase(),
							)
						: null,
				],
			),
		],
	);
};
