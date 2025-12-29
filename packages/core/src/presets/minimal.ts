import { absolute, h1, p, stack } from "../builder";
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
		background = "bg-zinc-950",
		textColor = "text-white",
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
			"p-24",
			"relative",
			bgClass as any,
		],
		[
			// Subtle Background Texture
			absolute([
				"inset-0 opacity-[0.03]",
				background.includes("light") || background === "bg-white"
					? "bg-grid-black-32"
					: "bg-grid-white-32",
			]),
			absolute(["bg-grain/5"]), // Quality Boost: Dithering

			// Content
			stack(
				"items-center justify-center relative",
				slots.content ?? [
					h1(
						[
							"text-9xl",
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
									"text-3xl",
									"text-center",
									"mt-10",
									"opacity-40",
									"font-medium",
									"tracking-wide",
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
