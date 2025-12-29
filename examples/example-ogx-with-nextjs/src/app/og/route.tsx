import { ogxResponse } from "@ogxjs/next";

export const revalidate = false;

export async function GET(req: Request) {
	return ogxResponse(
		{
			preset: "social",
			title: "OGX + Next.js",
			brand: "Example App",
			handle: "@ogx",
			colorScheme: "dark",
			inter: [400, 700],
		},
		req,
	);
}
