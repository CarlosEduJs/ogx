import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import ChangelogView from "./_components/ChangelogView";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
	title: "Changelog | OGX",
	description: "All the latest updates, improvements, and fixes to OGX.",
	openGraph: {
		title: "Changelog | OGX",
		description: "Every fix, every feature, every millisecond saved.",
		type: "website",
		images: [
			{
				url: `${baseUrl}/og/changelog`,
				width: 1200,
				height: 630,
				alt: "OGX Changelog",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Changelog | OGX",
		description: "Every fix, every feature, every millisecond saved.",
		images: [`${baseUrl}/og/changelog`],
	},
};

export default function ChangelogPage() {
	return (
		<NuqsAdapter>
			<Suspense fallback={<div>Loading...</div>}>
				<ChangelogView />
			</Suspense>
		</NuqsAdapter>
	);
}
