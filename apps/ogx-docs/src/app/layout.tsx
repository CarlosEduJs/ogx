import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
	subsets: ["latin"],
});

const baseUrl =
	process.env.NEXT_PUBLIC_SITE_URL || "https://ogx-three.vercel.app";

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: "OGX - High-Performance OG Image Engine",
		template: "%s | OGX",
	},
	description:
		"Generate dynamic Open Graph images with Tailwind CSS. 60ms render time, built-in caching, and seamless Next.js integration.",
	keywords: [
		"og image",
		"open graph",
		"social media",
		"tailwind css",
		"next.js",
		"bun",
		"node.js",
		"deno",
		"react",
		"image generation",
		"satori",
	],
	authors: [{ name: "Carlos Eduardo", url: "https://github.com/carlosedujs" }],
	creator: "Carlos Eduardo",
	publisher: "OGX",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: "Bco0meN-73Wimh1fOAJS4gtnEdGqooYR5zKQOfH0CkU",
	},
};

export default function Layout({ children }: LayoutProps<"/">) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "OGX",
		applicationCategory: "DeveloperApplication",
		description:
			"High-performance Open Graph image generation with Tailwind CSS support",
		url: baseUrl,
		author: {
			"@type": "Person",
			name: "Carlos Eduardo",
			url: "https://github.com/carlosedujs",
		},
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
		operatingSystem: "Any",
		softwareVersion: "0.1.0",
	};

	return (
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className="flex flex-col min-h-screen">
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
