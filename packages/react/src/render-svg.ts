import type { RenderOptions } from "@ogxjs/core";
import { renderToSVG as coreRenderToSVG } from "@ogxjs/core/svg";
import type React from "react";
import { toOGX } from "./to-ogx";

/**
 * Renders a React node to an SVG string.
 * Browser-safe: only uses Satori, no Node.js dependencies
 */
export async function renderToSVG(
	element: React.ReactNode,
	options?: RenderOptions,
): Promise<string> {
	const ogxElement = toOGX(element);
	return coreRenderToSVG(ogxElement as any, options);
}
