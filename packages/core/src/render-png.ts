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
	const profile = process.env.OGX_PROFILE === "1";
	const tStart = profile ? performance.now() : 0;

	const svg = await renderToSVG(element, options);
	const tAfterSvg = profile ? performance.now() : 0;

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
	const result = pngData.asPng();

	if (profile) {
		const tEnd = performance.now();
		console.log(
			`[OGX PROFILE] render png: svg=${(tAfterSvg - tStart).toFixed(2)}ms resvg=${(tEnd - tAfterSvg).toFixed(2)}ms total=${(tEnd - tStart).toFixed(2)}ms`,
		);
	}

	return result;
}
