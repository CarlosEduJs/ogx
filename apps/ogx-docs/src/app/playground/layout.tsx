import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
	title: "Playground | OGX",
	description:
		"Live editor for creating OG images with OGX. Preview, customize, and export your designs.",
	openGraph: {
		title: "OGX Playground",
		description:
			"Live editor for creating OG images with OGX. Preview, customize, and export.",
		type: "website",
		images: [
			{
				url: `${baseUrl}/og/playground`,
				width: 1200,
				height: 630,
				alt: "OGX Playground",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "OGX Playground",
		description:
			"Live editor for creating OG images with OGX. Preview, customize, and export.",
		images: [`${baseUrl}/og/playground`],
	},
};

export default function PlaygroundLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
