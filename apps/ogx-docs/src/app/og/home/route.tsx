import {
	absolute,
	badge,
	fontRegistry,
	h1,
	img,
	loadAsset,
	p,
	render,
	row,
	stack,
} from "@ogxjs/core";
import { join } from "node:path";

export const revalidate = false;
export const dynamic = "force-dynamic";

export async function GET() {
	const logoPath = join(process.cwd(), "public/logo.svg");

	await fontRegistry.registerInterFromUrl([400, 600, 700]);
	const logo = await loadAsset(logoPath);

	const element = stack(
		"w-full h-full bg-zinc-950 p-20 items-center justify-center",
		[
			// Background gradient
			absolute(
				"bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20",
			),

			// Content
			stack("items-center gap-12", [
				img(logo, "w-40"),

				stack("items-center gap-4", [
					h1(
						"text-white text-7xl font-bold tracking-tight text-center",
						"OGX Engine",
					),
					p(
						"text-slate-400 text-3xl text-center",
						"High-Performance OG Image Generation",
					),
				]),

				row("gap-4 mt-4", [
					badge("Tailwind Native", "purple"),
					badge("Satori Powered", "blue"),
					badge("60ms Render", "green"),
				]),
			]),
		],
	);

	const png = await render(element);

	return new Response(Buffer.from(png), {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}
