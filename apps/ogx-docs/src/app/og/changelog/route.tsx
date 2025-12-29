import {
	absolute,
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

	await fontRegistry.registerInter([400, 600, 700]);
	const logo = await loadAsset(logoPath);

	const element = stack(
		"w-full h-full bg-zinc-950 p-20 items-center justify-center",
		[
			absolute(
				"bg-gradient-to-br from-green-500/10 via-transparent to-purple-500/10",
			),
			stack("items-center gap-12", [
				row("", [img(logo, "w-24")]),

				stack("items-center gap-4", [
					h1(
						"text-white text-6xl font-bold tracking-tight text-center",
						"OGX Changelog",
					),
					p(
						"text-slate-400 text-2xl text-center",
						"Every fix, every feature, every millisecond saved",
					),
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
