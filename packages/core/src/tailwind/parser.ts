import type { CSSProperties } from "../css";
import type { ThemeConfig } from "../types";
import { normalizeColor } from "../utils/color";
import { colors } from "./colors";
import {
  borderRadius,
  boxShadow,
  fontSize,
  fontWeight,
  opacity,
  spacing,
} from "./scales";

export interface GradientState {
  from?: string;
  via?: string;
  to?: string;
  direction?: string;
}

const parserCache = new Map<string, CSSProperties>();

/**
 * Main Tailwind parser function
 */
export function parseTailwind(
  tw: string | string[],
  theme?: ThemeConfig,
  colorScheme?: "light" | "dark",
): CSSProperties {
  const style: CSSProperties = { display: "flex" };
  const classes = (Array.isArray(tw) ? tw : [tw])
    .flatMap((t) => t.split(/\s+/))
    .filter(Boolean);

  // Performance: Memoization Cache
  const cacheKey = `${classes.join(" ")}|${colorScheme || "light"}`;
  if (parserCache.has(cacheKey)) {
    return { ...parserCache.get(cacheKey)! };
  }

  const gradient: GradientState = {};

  for (let cls of classes) {
    if (cls.startsWith("dark:")) {
      if (colorScheme !== "dark") continue;
      cls = cls.slice(5);
    }
    parseUtility(cls, style, gradient, theme);
  }

  // Apply gradient if direction is set
  if (gradient.direction) {
    const from = gradient.from || "transparent";
    const to = gradient.to || "transparent";
    if (gradient.via) {
      style.backgroundImage = `linear-gradient(${gradient.direction}, ${from}, ${gradient.via}, ${to})`;
    } else {
      style.backgroundImage = `linear-gradient(${gradient.direction}, ${from}, ${to})`;
    }
  }

  // Performance: Save to cache
  if (!theme) {
    // Only cache if no custom theme is provided (to avoid theme-specific bugs)
    parserCache.set(cacheKey, { ...style });
  }

  return style;
}

function parseUtility(
  cls: string,
  style: CSSProperties,
  gradient: GradientState,
  theme?: ThemeConfig,
): void {
  // Handle arbitrary values: p-[32px], bg-[#1a1a1a]
  const arbitraryMatch = cls.match(/^(.+?)-\[(.+)\]$/);
  if (arbitraryMatch) {
    const [, prefix, value] = arbitraryMatch;
    parseArbitrary(prefix!, value!, style, gradient);
    return;
  }

  // Display
  if (cls === "flex") {
    style.display = "flex";
    return;
  }
  if (cls === "hidden") {
    style.display = "none";
    return;
  }

  // Flex direction
  if (cls === "flex-row") {
    style.flexDirection = "row";
    return;
  }
  if (cls === "flex-col") {
    style.flexDirection = "column";
    return;
  }
  if (cls === "flex-row-reverse") {
    style.flexDirection = "row-reverse";
    return;
  }
  if (cls === "flex-col-reverse") {
    style.flexDirection = "column-reverse";
    return;
  }

  // Flex wrap
  if (cls === "flex-wrap") {
    style.flexWrap = "wrap";
    return;
  }
  if (cls === "flex-nowrap") {
    style.flexWrap = "nowrap";
    return;
  }

  // Flex grow/shrink
  if (cls === "flex-1") {
    style.flexGrow = 1;
    style.flexShrink = 1;
    style.flexBasis = "0%";
    return;
  }
  if (cls === "flex-auto") {
    style.flexGrow = 1;
    style.flexShrink = 1;
    style.flexBasis = "auto";
    return;
  }
  if (cls === "flex-initial") {
    style.flexGrow = 0;
    style.flexShrink = 1;
    style.flexBasis = "auto";
    return;
  }
  if (cls === "flex-none") {
    style.flexGrow = 0;
    style.flexShrink = 0;
    style.flexBasis = "auto";
    return;
  }
  if (cls === "grow") {
    style.flexGrow = 1;
    return;
  }
  if (cls === "grow-0") {
    style.flexGrow = 0;
    return;
  }
  if (cls === "shrink") {
    style.flexShrink = 1;
    return;
  }
  if (cls === "shrink-0") {
    style.flexShrink = 0;
    return;
  }

  // Align self
  if (cls === "self-auto") {
    style.alignSelf = "auto";
    return;
  }
  if (cls === "self-start") {
    style.alignSelf = "flex-start";
    return;
  }
  if (cls === "self-end") {
    style.alignSelf = "flex-end";
    return;
  }
  if (cls === "self-center") {
    style.alignSelf = "center";
    return;
  }
  if (cls === "self-stretch") {
    style.alignSelf = "stretch";
    return;
  }
  if (cls === "self-baseline") {
    style.alignSelf = "baseline";
    return;
  }

  // Align items
  if (cls === "items-start") {
    style.alignItems = "flex-start";
    return;
  }
  if (cls === "items-end") {
    style.alignItems = "flex-end";
    return;
  }
  if (cls === "items-center") {
    style.alignItems = "center";
    return;
  }
  if (cls === "items-baseline") {
    style.alignItems = "baseline";
    return;
  }
  if (cls === "items-stretch") {
    style.alignItems = "stretch";
    return;
  }

  // Justify content
  if (cls === "justify-start") {
    style.justifyContent = "flex-start";
    return;
  }
  if (cls === "justify-end") {
    style.justifyContent = "flex-end";
    return;
  }
  if (cls === "justify-center") {
    style.justifyContent = "center";
    return;
  }
  if (cls === "justify-between") {
    style.justifyContent = "space-between";
    return;
  }
  if (cls === "justify-around") {
    style.justifyContent = "space-around";
    return;
  }
  if (cls === "justify-evenly") {
    style.justifyContent = "space-evenly";
    return;
  }

  // Position
  if (cls === "relative") {
    style.position = "relative";
    return;
  }
  if (cls === "absolute") {
    style.position = "absolute";
    return;
  }

  // Inset
  if (cls.startsWith("inset-")) {
    const value = parseSpacingValue(cls.slice(6));
    if (value !== undefined) {
      style.top = value;
      style.right = value;
      style.bottom = value;
      style.left = value;
    }
    return;
  }
  if (cls.startsWith("top-")) {
    const value = parseSpacingValue(cls.slice(4));
    if (value !== undefined) style.top = value;
    return;
  }
  if (cls.startsWith("right-")) {
    const value = parseSpacingValue(cls.slice(6));
    if (value !== undefined) style.right = value;
    return;
  }
  if (cls.startsWith("bottom-")) {
    const value = parseSpacingValue(cls.slice(7));
    if (value !== undefined) style.bottom = value;
    return;
  }
  if (cls.startsWith("left-")) {
    const value = parseSpacingValue(cls.slice(5));
    if (value !== undefined) style.left = value;
    return;
  }

  // Gap
  if (cls.startsWith("gap-x-")) {
    const value = parseSpacingValue(cls.slice(6));
    if (value !== undefined) style.columnGap = value;
    return;
  }
  if (cls.startsWith("gap-y-")) {
    const value = parseSpacingValue(cls.slice(6));
    if (value !== undefined) style.rowGap = value;
    return;
  }
  if (cls.startsWith("gap-")) {
    const value = parseSpacingValue(cls.slice(4));
    if (value !== undefined) style.gap = value;
    return;
  }

  // Width
  if (cls === "w-full") {
    style.width = "100%";
    return;
  }
  if (cls === "w-screen") {
    style.width = "100vw";
    return;
  }
  if (cls === "w-auto") {
    style.width = "auto";
    return;
  }
  if (cls === "w-fit") {
    style.width = "auto";
    return;
  }
  if (cls.startsWith("w-")) {
    const value = parseSpacingValue(cls.slice(2));
    if (value !== undefined) style.width = value;
    return;
  }

  // Height
  if (cls === "h-full") {
    style.height = "100%";
    return;
  }
  if (cls === "h-screen") {
    style.height = "100vh";
    return;
  }
  if (cls === "h-auto") {
    style.height = "auto";
    return;
  }
  if (cls === "h-fit") {
    style.height = "auto";
    return;
  }
  if (cls.startsWith("h-")) {
    const value = parseSpacingValue(cls.slice(2));
    if (value !== undefined) style.height = value;
    return;
  }

  // Min/Max width and height
  if (cls === "min-w-full") {
    style.minWidth = "100%";
    return;
  }
  if (cls === "max-w-full") {
    style.maxWidth = "100%";
    return;
  }
  if (cls.startsWith("max-w-")) {
    const value = parseSpacingValue(cls.slice(6));
    if (value !== undefined) style.maxWidth = value;
    return;
  }
  if (cls === "min-h-full") {
    style.minHeight = "100%";
    return;
  }
  if (cls === "max-h-full") {
    style.maxHeight = "100%";
    return;
  }

  // Padding (px/py MUST come before p- to avoid prefix collision)
  if (cls.startsWith("px-")) {
    const value = parseSpacingValue(cls.slice(3));
    if (value !== undefined) {
      style.paddingLeft = value;
      style.paddingRight = value;
    }
    return;
  }
  if (cls.startsWith("py-")) {
    const value = parseSpacingValue(cls.slice(3));
    if (value !== undefined) {
      style.paddingTop = value;
      style.paddingBottom = value;
    }
    return;
  }
  if (cls.startsWith("p-")) {
    const value = parseSpacingValue(cls.slice(2));
    if (value !== undefined) style.padding = value;
    return;
  }
  if (cls.startsWith("pt-")) {
    const value = parseSpacingValue(cls.slice(3));
    if (value !== undefined) style.paddingTop = value;
    return;
  }
  if (cls.startsWith("pr-")) {
    const value = parseSpacingValue(cls.slice(3));
    if (value !== undefined) style.paddingRight = value;
    return;
  }
  if (cls.startsWith("pb-")) {
    const value = parseSpacingValue(cls.slice(3));
    if (value !== undefined) style.paddingBottom = value;
    return;
  }
  if (cls.startsWith("pl-")) {
    const value = parseSpacingValue(cls.slice(3));
    if (value !== undefined) style.paddingLeft = value;
    return;
  }

  // Margin
  if (cls === "m-auto") {
    style.margin = "auto";
    return;
  }
  if (cls === "mx-auto") {
    style.marginLeft = "auto";
    style.marginRight = "auto";
    return;
  }
  if (cls === "my-auto") {
    style.marginTop = "auto";
    style.marginBottom = "auto";
    return;
  }
  if (cls.startsWith("m-")) {
    const value = parseSpacingValue(cls.slice(2));
    if (value !== undefined) style.margin = value;
    return;
  }
  if (cls.startsWith("mx-")) {
    const value = parseSpacingValue(cls.slice(3));
    if (value !== undefined) {
      style.marginLeft = value;
      style.marginRight = value;
    }
    return;
  }
  if (cls.startsWith("my-")) {
    const value = parseSpacingValue(cls.slice(3));
    if (value !== undefined) {
      style.marginTop = value;
      style.marginBottom = value;
    }
    return;
  }
  if (cls.startsWith("mt-")) {
    const value = parseSpacingValue(cls.slice(3));
    if (value !== undefined) style.marginTop = value;
    return;
  }
  if (cls.startsWith("mr-")) {
    const value = parseSpacingValue(cls.slice(3));
    if (value !== undefined) style.marginRight = value;
    return;
  }
  if (cls.startsWith("mb-")) {
    const value = parseSpacingValue(cls.slice(3));
    if (value !== undefined) style.marginBottom = value;
    return;
  }
  if (cls.startsWith("ml-")) {
    const value = parseSpacingValue(cls.slice(3));
    if (value !== undefined) style.marginLeft = value;
    return;
  }

  // Background Gradients
  if (cls.startsWith("bg-gradient-to-")) {
    const dir = cls.slice(15);
    const directions: Record<string, string> = {
      t: "to top",
      tr: "to top right",
      r: "to right",
      br: "to bottom right",
      b: "to bottom",
      bl: "to bottom left",
      l: "to left",
      tl: "to top left",
    };
    if (directions[dir] && gradient) {
      gradient.direction = directions[dir];
    }
    return;
  }

  if (cls.startsWith("from-") && gradient) {
    const color = colors[cls.slice(5)];
    if (color) gradient.from = color;
    return;
  }

  if (cls.startsWith("via-") && gradient) {
    const color = colors[cls.slice(4)];
    if (color) gradient.via = color;
    return;
  }

  if (cls.startsWith("to-") && gradient) {
    const color = colors[cls.slice(3)];
    if (color) gradient.to = color;
    return;
  }

  if (
    cls.startsWith("bg-grid") ||
    cls.startsWith("bg-dots") ||
    cls.startsWith("bg-lines")
  ) {
    const isGrid = cls.startsWith("bg-grid");
    const isDots = cls.startsWith("bg-dots");
    const type = isGrid ? "grid" : isDots ? "dots" : "lines";
    const config = cls.startsWith("bg-grid-")
      ? cls.slice(8)
      : cls.startsWith("bg-dots-")
        ? cls.slice(8)
        : cls.startsWith("bg-lines-")
          ? cls.slice(9)
          : "";

    let color = "rgba(128, 128, 128, 0.1)";
    let size = 24;

    if (config) {
      const parts = config.split("-");
      // Improved size extraction
      const lastPart = parts[parts.length - 1];
      const isNumeric = lastPart && /^\d+$/.test(lastPart);

      if (isNumeric) {
        // If it's just 'bg-grid-20'
        if (parts.length === 1) {
          size = parseInt(lastPart, 10);
        }
        // If it's 'bg-grid-zinc-800-20' or 'bg-dots-slate-500-10'
        else if (parts.length >= 3) {
          const secondToLast = parts[parts.length - 2];
          if (secondToLast && /^\d+$/.test(secondToLast)) {
            size = parseInt(lastPart, 10);
            const colorName = parts.slice(0, -1).join("-");
            if (colorName) {
              const resolved = resolveColorValue(colorName, theme);
              if (resolved) color = resolved;
            }
          }
        } else if (parts.length === 2 && /^\d+$/.test(lastPart)) {
          if (
            parts[0]?.match(
              /^(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)$/,
            )
          ) {
            const resolved = resolveColorValue(config, theme);
            if (resolved) color = resolved;
          } else {
            size = parseInt(lastPart, 10);
          }
        }
      } else {
        const resolved = resolveColorValue(config, theme);
        if (resolved) color = resolved;
      }
    }

    style.backgroundSize = `${size}px ${size}px`;
    if (type === "grid") {
      style.backgroundImage = `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`;
    } else if (type === "dots") {
      style.backgroundImage = `radial-gradient(${color} 15%, transparent 16%)`;
    } else {
      style.backgroundImage = `linear-gradient(to bottom, ${color} 1px, transparent 1px)`;
      style.backgroundSize = `100% ${size}px`;
    }
    return;
  }

  // Background color
  if (cls.startsWith("bg-")) {
    const colorName = cls.slice(3);
    if (colorName.startsWith("gradient-")) return;

    const resolved = resolveColorValue(colorName, theme);
    if (resolved) {
      style.backgroundColor = resolved;
    }
    return;
  }

  // Text color
  if (cls.startsWith("text-")) {
    const rest = cls.slice(5);
    // Check if it's a font size
    const size = fontSize[rest];
    if (size) {
      style.fontSize = `${size[0]}px`;
      style.lineHeight = `${size[1]}px`;
      return;
    }

    const resolved = resolveColorValue(rest, theme);
    if (resolved) {
      style.color = resolved;
    }

    // Text align
    if (rest === "left") style.textAlign = "left";
    if (rest === "center") style.textAlign = "center";
    if (rest === "right") style.textAlign = "right";
    if (rest === "justify") style.textAlign = "justify";
    return;
  }

  // Font weight
  if (cls.startsWith("font-")) {
    const weightName = cls.slice(5);
    const weight = fontWeight[weightName];
    if (weight) {
      style.fontWeight = weight;
    }
    return;
  }

  // Line height
  if (cls.startsWith("leading-")) {
    const value = cls.slice(8);
    const spacingValue = spacing[value];
    if (spacingValue !== undefined) {
      style.lineHeight = spacingValue;
    } else if (value === "none") {
      style.lineHeight = "1";
    } else if (value === "tight") {
      style.lineHeight = "1.25";
    } else if (value === "snug") {
      style.lineHeight = "1.375";
    } else if (value === "normal") {
      style.lineHeight = "1.5";
    } else if (value === "relaxed") {
      style.lineHeight = "1.625";
    } else if (value === "loose") {
      style.lineHeight = "2";
    }
    return;
  }

  // Letter spacing
  if (cls.startsWith("tracking-")) {
    const value = cls.slice(9);
    if (value === "tighter") style.letterSpacing = "-0.05em";
    else if (value === "tight") style.letterSpacing = "-0.025em";
    else if (value === "normal") style.letterSpacing = "0";
    else if (value === "wide") style.letterSpacing = "0.025em";
    else if (value === "wider") style.letterSpacing = "0.05em";
    else if (value === "widest") style.letterSpacing = "0.1em";
    return;
  }

  // Background Grain (Noise)
  if (cls.startsWith("bg-grain")) {
    const opacityValue = cls.includes("/")
      ? Number.parseInt(cls.split("/")[1]!, 10) / 100
      : 0.05;
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='${opacityValue}'/></svg>`;
    const base64 = Buffer.from(svg).toString("base64");
    const noiseUrl = `url(data:image/svg+xml;base64,${base64})`;
    style.backgroundImage = style.backgroundImage
      ? `${style.backgroundImage}, ${noiseUrl}`
      : noiseUrl;
    return;
  }

  // Border radius
  if (cls.startsWith("rounded")) {
    if (cls === "rounded") {
      style.borderRadius = borderRadius[""] ?? 4;
      return;
    }
    const suffix = cls.slice(8); // remove 'rounded-'
    const radius = borderRadius[suffix];
    if (radius !== undefined) {
      style.borderRadius = radius;
    }
    return;
  }

  // Shadows
  if (cls.startsWith("shadow")) {
    if (cls === "shadow") {
      style.boxShadow = boxShadow[""];
      return;
    }
    if (cls === "shadow-premium") {
      // Multi-layered soft shadow
      style.boxShadow =
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 40px 60px -15px rgba(0, 0, 0, 0.25)";
      return;
    }
    const suffix = cls.startsWith("shadow-") ? cls.slice(7) : cls.slice(6);
    const shadow = boxShadow[suffix];
    if (shadow !== undefined) {
      style.boxShadow = shadow;
    }
    return;
  }

  // Border width
  if (cls === "border") {
    style.borderWidth = 1;
    style.borderStyle = "solid";
    return;
  }
  if (cls.startsWith("border-") && !cls.includes("-")) {
    const width = parseInt(cls.slice(7), 10);
    if (!Number.isNaN(width)) {
      style.borderWidth = width;
      style.borderStyle = "solid";
    }
    return;
  }

  // Border color
  if (cls.startsWith("border-")) {
    const colorName = cls.slice(7);
    // Check theme colors first
    if (theme?.[colorName]) {
      style.borderColor = normalizeColor(theme[colorName]!);
      return;
    }
    // fallback to tailwind colors
    const color = colors[colorName];
    if (color) {
      style.borderColor = normalizeColor(String(color));
    }
    return;
  }

  // Opacity
  if (cls.startsWith("opacity-")) {
    const value = cls.slice(8);
    const op = opacity[value];
    if (op !== undefined) {
      style.opacity = op;
    }
    return;
  }

  // Overflow
  if (cls === "overflow-hidden") {
    style.overflow = "hidden";
    return;
  }
  if (cls === "overflow-visible") {
    style.overflow = "visible";
    return;
  }

  // Text decoration
  if (cls === "underline") {
    style.textDecoration = "underline";
    return;
  }
  if (cls === "line-through") {
    style.textDecoration = "line-through";
    return;
  }
  if (cls === "no-underline") {
    style.textDecoration = "none";
    return;
  }

  // Text transform
  if (cls === "uppercase") {
    style.textTransform = "uppercase";
    return;
  }
  if (cls === "lowercase") {
    style.textTransform = "lowercase";
    return;
  }
  if (cls === "capitalize") {
    style.textTransform = "capitalize";
    return;
  }
  if (cls === "normal-case") {
    style.textTransform = "none";
    return;
  }

  // Whitespace
  if (cls === "whitespace-normal") {
    style.whiteSpace = "normal";
    return;
  }
  if (cls === "whitespace-nowrap") {
    style.whiteSpace = "nowrap";
    return;
  }
  if (cls === "whitespace-pre") {
    style.whiteSpace = "pre";
    return;
  }
  if (cls === "whitespace-pre-line") {
    style.whiteSpace = "pre-line";
    return;
  }
  if (cls === "whitespace-pre-wrap") {
    style.whiteSpace = "pre-wrap";
    return;
  }

  // Truncate
  if (cls === "truncate") {
    style.overflow = "hidden";
    style.textOverflow = "ellipsis";
    style.whiteSpace = "nowrap";
    return;
  }

  // Text overflow
  if (cls === "text-ellipsis") {
    style.textOverflow = "ellipsis";
    return;
  }
  if (cls === "text-clip") {
    style.textOverflow = "clip";
    return;
  }

  // Object fit
  if (cls === "object-contain") {
    style.objectFit = "contain";
    return;
  }
  if (cls === "object-cover") {
    style.objectFit = "cover";
    return;
  }
  if (cls === "object-none") {
    style.objectFit = "none";
    return;
  }

  // Shadow
  if (cls === "shadow") {
    style.boxShadow =
      "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
    return;
  }
  if (cls === "shadow-sm") {
    style.boxShadow = "0 1px 2px 0 rgb(0 0 0 / 0.05)";
    return;
  }
  if (cls === "shadow-md") {
    style.boxShadow =
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
    return;
  }
  if (cls === "shadow-lg") {
    style.boxShadow =
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
    return;
  }
  if (cls === "shadow-xl") {
    style.boxShadow =
      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
    return;
  }
  if (cls === "shadow-2xl") {
    style.boxShadow = "0 25px 50px -12px rgb(0 0 0 / 0.25)";
    return;
  }
  if (cls === "shadow-none") {
    style.boxShadow = "none";
    return;
  }
}

function parseSpacingValue(value: string): number | string | undefined {
  // Check for fraction values like 1/2, 1/3, 1/4, etc.
  if (value.includes("/")) {
    const [num, denom] = value.split("/");
    const numerator = parseInt(num!, 10);
    const denominator = parseInt(denom!, 10);
    if (
      !Number.isNaN(numerator) &&
      !Number.isNaN(denominator) &&
      denominator !== 0
    ) {
      return `${(numerator / denominator) * 100}%`;
    }
    return undefined;
  }

  // Check spacing scale
  const spacingValue = spacing[value];
  if (spacingValue !== undefined) {
    return spacingValue;
  }

  return undefined;
}

function parseArbitrary(
  prefix: string,
  value: string,
  style: CSSProperties,
  gradient: GradientState,
): void {
  const parsedValue = parseArbitraryValue(value);

  switch (prefix) {
    case "from":
      if (gradient) gradient.from = String(parsedValue);
      break;
    case "via":
      if (gradient) gradient.via = String(parsedValue);
      break;
    case "to":
      if (gradient) gradient.to = String(parsedValue);
      break;
    case "p":
      style.padding = parsedValue;
      break;
    case "px":
      style.paddingLeft = parsedValue;
      style.paddingRight = parsedValue;
      break;
    case "py":
      style.paddingTop = parsedValue;
      style.paddingBottom = parsedValue;
      break;
    case "pt":
      style.paddingTop = parsedValue;
      break;
    case "pr":
      style.paddingRight = parsedValue;
      break;
    case "pb":
      style.paddingBottom = parsedValue;
      break;
    case "pl":
      style.paddingLeft = parsedValue;
      break;
    case "m":
      style.margin = parsedValue;
      break;
    case "mx":
      style.marginLeft = parsedValue;
      style.marginRight = parsedValue;
      break;
    case "my":
      style.marginTop = parsedValue;
      style.marginBottom = parsedValue;
      break;
    case "mt":
      style.marginTop = parsedValue;
      break;
    case "mr":
      style.marginRight = parsedValue;
      break;
    case "mb":
      style.marginBottom = parsedValue;
      break;
    case "ml":
      style.marginLeft = parsedValue;
      break;
    case "w":
      style.width = parsedValue;
      break;
    case "h":
      style.height = parsedValue;
      break;
    case "min-w":
      style.minWidth = parsedValue;
      break;
    case "min-h":
      style.minHeight = parsedValue;
      break;
    case "max-w":
      style.maxWidth = parsedValue;
      break;
    case "max-h":
      style.maxHeight = parsedValue;
      break;
    case "gap":
      style.gap = parsedValue;
      break;
    case "top":
      style.top = parsedValue;
      break;
    case "right":
      style.right = parsedValue;
      break;
    case "bottom":
      style.bottom = parsedValue;
      break;
    case "left":
      style.left = parsedValue;
      break;
    case "inset":
      style.top = parsedValue;
      style.right = parsedValue;
      style.bottom = parsedValue;
      style.left = parsedValue;
      break;
    case "bg":
      style.backgroundColor = normalizeColor(String(parsedValue));
      break;
    case "text":
      // Could be color or size
      if (
        parsedValue.toString().includes("px") ||
        parsedValue.toString().includes("rem")
      ) {
        style.fontSize = parsedValue;
      } else {
        style.color = normalizeColor(String(parsedValue));
      }
      break;
    case "rounded":
      style.borderRadius = parsedValue;
      break;
    case "border":
      // If it looks like a color, normalize and set borderColor
      if (
        typeof parsedValue === "string" &&
        (parsedValue.startsWith("#") ||
          parsedValue.startsWith("rgb") ||
          parsedValue.startsWith("hsl") ||
          parsedValue.startsWith("oklch"))
      ) {
        style.borderColor = normalizeColor(parsedValue);
      } else {
        style.borderWidth = parsedValue;
      }
      style.borderStyle = "solid";
      break;
    case "opacity":
      style.opacity = parseFloat(String(parsedValue)) / 100;
      break;
  }
}

function parseArbitraryValue(value: string): string | number {
  // If it's a CSS value with units, return as string
  if (/^\d+(\.\d+)?(px|rem|em|%|vw|vh)$/.test(value)) {
    return value;
  }
  // If it's a pure number, parse it
  if (/^\d+(\.\d+)?$/.test(value)) {
    return parseFloat(value);
  }
  // Otherwise return as-is (colors, etc.)
  return value;
}

/**
 * Resolve a color value from theme or palette with opacity support
 */
function resolveColorValue(
  name: string,
  theme?: ThemeConfig,
): string | undefined {
  if (!name) return undefined;

  const normalizedParts = name.split("/");
  const colorName = normalizedParts[0];
  const opacityStr = normalizedParts[1];

  if (!colorName) return undefined;

  let baseColor: string | undefined;

  if (theme?.[colorName]) {
    baseColor = theme[colorName];
  } else {
    baseColor = colors[colorName];
  }

  if (!baseColor) return undefined;
  baseColor = normalizeColor(baseColor);

  if (opacityStr && baseColor.startsWith("#")) {
    const alpha = parseInt(opacityStr, 10) / 100;
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return baseColor;
}

export { colors } from "./colors";
export { borderRadius, fontSize, fontWeight, opacity, spacing } from "./scales";
