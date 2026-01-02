import { ogxResponse } from "@ogxjs/next";
import { notFound } from "next/navigation";
import { getPageImage, source } from "@/lib/source";

export const revalidate = false;
export const dynamic = "force-dynamic";

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ slug: string[] }> },
) {
	const { slug } = await params;
	const page = source.getPage(slug.slice(0, -1));
	if (!page) notFound();

	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
	const logoUrl = `${baseUrl}/logo.svg`;

	return ogxResponse(
		{
			preset: "docs",
			logo: logoUrl,
			title: page.data.title,
			description: page.data.description,
			siteName: "OGX Docs",
			colorScheme: "dark",
			inter: [400, 700],
			detailsOG: true,
		},
		req,
	);
}

export function generateStaticParams() {
	return source.getPages().map((page) => ({
		lang: page.locale,
		slug: getPageImage(page).segments,
	}));
}
