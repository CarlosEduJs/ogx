import { absolute, div, h1, img, p, row, span, stack } from "../builder";
import type { OGXElement, Preset } from "../types";

export interface DocsPresetProps {
  /** Page title */
  title: string;
  /** Page description */
  description?: string;
  /** Logo URL or base64 */
  logo?: string;
  /** Site name */
  siteName?: string;
  /** Color scheme */
  colorScheme?: "dark" | "light";
  /** Custom slot overrides */
  slots?: {
    header?: OGXElement;
    footer?: OGXElement;
  };
}

/**
 * Docs preset - ideal for documentation sites
 */
export const docsPreset: Preset<DocsPresetProps> = (props) => {
  const {
    title,
    description,
    logo,
    siteName,
    colorScheme = "dark",
    slots = {},
  } = props;

  const isDark = colorScheme === "dark";

  return stack(
    [
      "w-full",
      "h-full",
      isDark ? "bg-zinc-950" : "bg-white",
      "p-20",
      "relative",
    ],
    [
      // Background Accent (Subtle Grid + Glow)
      absolute([
        isDark ? "bg-grid-white/5-64" : "bg-grid-zinc-900/5-64",
        "inset-0",
      ]),
      absolute([
        "inset-0",
        isDark
          ? "bg-gradient-to-tr from-zinc-950 via-transparent to-indigo-500/10"
          : "bg-gradient-to-tr from-white via-transparent to-indigo-500/5",
      ]),
      absolute(["bg-grain/10"]), // Quality Boost: Dithering

      // Content Layout
      stack("flex-1 gap-12 relative", [
        // Header
        slots.header ??
          row("items-center justify-between", [
            row("items-center gap-4", [
              logo ? img(logo, "w-10 h-10 rounded-lg shadow-sm") : null,
              siteName
                ? span(
                    [
                      "text-2xl",
                      "font-bold",
                      isDark ? "text-white" : "text-zinc-900",
                      "tracking-tight",
                    ],
                    siteName,
                  )
                : null,
            ]),

            div(
              [
                "px-5 py-1 rounded-full border text-xs font-semibold",
                isDark
                  ? "bg-white/5 border-white/10 text-zinc-400"
                  : "bg-zinc-100 border-zinc-200 text-zinc-600",
              ],
              "DOCUMENTATION",
            ),
          ]),

        // Main content
        stack("flex-1 justify-center gap-8", [
          h1(
            [
              "text-8xl",
              "font-black",
              isDark ? "text-white" : "text-zinc-950",
              "leading-[1.1]",
              "tracking-tight", // Quality Boost
            ],
            title,
          ),
          description
            ? p(
                [
                  "text-4xl",
                  isDark ? "text-zinc-400" : "text-zinc-500",
                  "max-w-[900px]",
                  "leading-relaxed",
                  "font-semibold",
                ],
                description,
              )
            : null,
        ]),

        // Footer / Bottom Indicator
        slots.footer ??
          row("items-center gap-2", [
            div(
              [
                "h-1 w-12 rounded-full",
                isDark ? "bg-indigo-500" : "bg-indigo-600",
              ],
              "",
            ),
            div(
              [
                "h-1 w-1.5 rounded-full",
                isDark ? "bg-zinc-800" : "bg-zinc-200",
              ],
              "",
            ),
            div(
              [
                "h-1 w-1.5 rounded-full",
                isDark ? "bg-zinc-800" : "bg-zinc-200",
              ],
              "",
            ),
          ]),
      ]),
    ],
  );
};
