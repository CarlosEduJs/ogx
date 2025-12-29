import type { RenderOptions } from "@ogxjs/core";
import { render as coreRender } from "@ogxjs/core/png";
import type React from "react";
import { toOGX } from "./to-ogx";

/**
 * Renders a React node to a PNG image buffer.
 * Node.js only: uses @resvg/resvg-js for PNG conversion
 */
export async function render(
	element: React.ReactNode,
	options?: RenderOptions,
): Promise<Uint8Array> {
	const ogxElement = toOGX(element);
	return coreRender(ogxElement as any, options);
}
