import { renderToSVG } from "./render-svg";
import type { OGXElement, RenderOptions } from "./types";

/**
 * Render an OGX element to PNG image
 * Node.js only: uses @resvg/resvg-js for SVG → PNG conversion
 */
export async function render(
	element: OGXElement,
	options: RenderOptions = {},
): Promise<Uint8Array> {
	const svg = await renderToSVG(element, options);

	const width = options.width ?? 1200;

	const resvgPkg = "@resvg/resvg-js";
	const { Resvg } = await import(resvgPkg);

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: "width",
			value: width,
		},
	});

	const pngData = resvg.render();
	return pngData.asPng();
}
