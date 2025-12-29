import satori from "satori";
import type { FontConfig } from "../types";

export interface FitTextOptions {
  maxWidth: number;
  maxHeight?: number;
  minFontSize?: number;
  maxFontSize?: number;
  fonts: FontConfig[];
}

/**
 * Estimate the best font size to fit text within a container
 * Uses binary search with Satori's layout engine for accuracy
 */
export async function calculateFittingFontSize(
  text: string,
  options: FitTextOptions,
): Promise<number> {
  const {
    maxWidth,
    maxHeight = Infinity,
    minFontSize = 12,
    maxFontSize = 200,
    fonts,
  } = options;

  let low = minFontSize;
  let high = maxFontSize;
  let optimal = minFontSize;

  // We need a simple element to measure
  const getLayout = async (fontSize: number) => {
    const svg = await satori(
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            fontSize: `${fontSize}px`,
          },
          children: text,
        },
      } as any,
      {
        width: maxWidth * 2,
        fonts: fonts.map((f) => ({
          name: f.name,
          data: f.data,
          weight: f.weight as any,
          style: f.style as any,
        })),
      },
    );

    const widthMatch = svg.match(/width="([\d.]+)"/);
    const heightMatch = svg.match(/height="([\d.]+)"/);

    return {
      width: widthMatch?.[1] ? parseFloat(widthMatch[1]) : 0,
      height: heightMatch?.[1] ? parseFloat(heightMatch[1]) : 0,
    };
  };

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const layout = await getLayout(mid);

    if (layout.width <= maxWidth && layout.height <= maxHeight) {
      optimal = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return optimal;
}
