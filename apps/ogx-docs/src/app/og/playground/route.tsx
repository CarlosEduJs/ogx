import { join } from "node:path";
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

export const revalidate = false;
export const dynamic = "force-dynamic";

export async function GET() {
	const logoPath = join(process.cwd(), "public/logo.svg");

	await fontRegistry.registerInterFromUrl([400, 600, 700]);
	const logo = await loadAsset(logoPath);

	const element = stack(
		"w-full h-full bg-zinc-950 p-20 items-center justify-center",
		[
			absolute("bg-grid-zinc-950/20-40"),
			stack("items-center gap-12", [
				img(logo, "w-32"),

				stack("items-center gap-4", [
					h1(
						"text-white text-6xl font-bold tracking-tight text-center",
						"OGX Playground",
					),
					p(
						"text-slate-400 text-2xl text-center",
						"Live preview & code generation for OG images",
					),
				]),

				row("gap-4 mt-4", [
					badge("Live Editor", "blue"),
					badge("Export Code", "green"),
					badge("Dark Mode", "purple"),
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
