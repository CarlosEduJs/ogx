interface Release {
	version: string;
	date: string;
	title: string;
	description?: string;
	changes: {
		type: "added" | "fixed" | "changed" | "performance";
		items: string[];
	}[];
	isLatest?: boolean;
}

export const releases: Release[] = [
	{
		version: "0.1.0",
		date: "2025-12-28",
		title: "Initial Beta Release",
		description:
			"The first public beta of OGX, the high-performance engine for dynamic Open Graph images.",
		isLatest: true,
		changes: [
			{
				type: "added",
				items: [
					"`@ogxjs/core` - Core rendering engine with Tailwind JIT support",
					"`@ogxjs/next` - Next.js adapter with `ogxResponse()` helper",
					"`@ogxjs/react` - React adapter with JSX support and `tw` prop",
					"Built-in presets: `minimal`, `docs`, `blog`, `social`",
					"Fluent Builder API for programmatic image composition",
					"Built-in font registry with Inter font support",
					"PNG and SVG rendering (Node.js via Resvg, browser via Satori)",
					"Intelligent caching system for sub-millisecond repeat renders",
					"Full Tailwind CSS utility class support",
					"Multi-platform support (Node.js, Bun, Deno)",
					"Interactive Playground for live previews",
					"Comprehensive documentation site",
				],
			},
			{
				type: "performance",
				items: [
					"Minimal preset: ~60ms average",
					"Docs preset: ~89ms average",
					"Social preset: ~690ms average (with complex gradients)",
					"Cached renders: ~0.7ms (85x faster than cold render)",
				],
			},
		],
	},
];