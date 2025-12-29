import { absolute, h1, img, row, span, stack } from "../builder";
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
    gradient = "to-br",
    fromColor = "oklch(65% 0.25 260)", // Vibrant Indigo-ish
    toColor = "oklch(60% 0.3 300)", // Vibrant Purple-ish
    slots = {},
  } = props;

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
      // Background Gradient
      absolute("", null, { style: { backgroundImage: gradientStyle } }),

      // Subtle Background Texture (Grain/Noise-like mesh)
      absolute(["inset-0 opacity-20", "bg-grid-white/5-32"]),
      absolute(["bg-grain/15"]), // Quality Boost: Dithering

      // Content Layout
      stack("flex-1 justify-between relative", [
        // Header
        slots.header ??
          row("items-center justify-between", [
            row("items-center gap-4", [
              logo ? img(logo, "w-12 h-12 rounded-xl bg-zinc-950") : null,
              brand
                ? span(
                    ["text-2xl font-black text-white tracking-tighter"],
                    brand.toUpperCase(),
                  )
                : null,
            ]),
            // Subtle platform indicator
            span(
              ["text-white/30 text-xs font-bold tracking-widest"],
              "SOCIAL CARD",
            ),
          ]),

        // Main content
        stack("gap-6 overflow-hidden", [
          h1(
            [
              "text-7xl",
              "font-black",
              "text-white",
              "leading-[1.05]",
              "tracking-tight", // Quality Boost
            ],
            title,
          ),
        ]),

        // Footer with user info (Clean Glass Badge)
        slots.footer ??
          (handle || avatar
            ? row(
                [
                  "items-center gap-4 p-3 pr-6 rounded-full self-start shadow-premium",
                  "bg-black/10 border border-white/10 backdrop-blur-md",
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
                          "text-xl font-bold text-white/90 tracking-tight",
                          "w-fit truncate shrink-0",
                        ],
                        handle,
                      )
                    : null,
                ],
              )
            : null),
      ]),
    ],
  );
};
