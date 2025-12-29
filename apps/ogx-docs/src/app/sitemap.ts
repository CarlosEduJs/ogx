import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl =
		process.env.NEXT_PUBLIC_SITE_URL || "https://ogx-three.vercel.app";

	// Static pages
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${baseUrl}/playground`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/changelog`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
	];

	// Documentation pages
	const docPages: MetadataRoute.Sitemap = source.getPages().map((page) => ({
		url: `${baseUrl}${page.url}`,
		lastModified: new Date(),
		changeFrequency: "weekly" as const,
		priority: 0.9,
	}));

	return [...staticPages, ...docPages];
}
