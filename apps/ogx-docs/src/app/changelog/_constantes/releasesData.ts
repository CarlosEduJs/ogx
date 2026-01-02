// Auto-generated from CHANGELOG.md - DO NOT EDIT MANUALLY
// Run 'pnpm generate:changelog' to update

interface Release {
	version: string;
	date: string;
	title: string;
	description?: string;
	npmLink: string;
	changes: {
		type: "added" | "fixed" | "changed" | "performance" | "security";
		items: string[];
	}[];
	isLatest?: boolean;
	scope:
		| "ogxjs-core"
		| "ogxjs-next"
		| "ogxjs-react"
		| "ogxjs-playground"
		| "global";
}

export const releases: Release[] = [
	{
		scope: "ogxjs-core",
		version: "core-v0.2.0-alpha.1",
		date: "2026-01-02",
		title: "Turbo",
		npmLink: "https://www.npmjs.com/package/@ogxjs/core/v/0.2.0-alpha.1",
		changes: [
			{
				type: "performance",
				items: [
					"O(1) Static Class Lookup: Replaced O(n) if/else chain with Map-based lookup tables (~170 classes)",
					"Modular Prefix Handlers: Refactored dynamic class parsing into modular handlers for better maintainability",
					"Multi-Level Caching: Added class-level and string-level caches for maximum performance",
					"Class cache: Individual parsed classes are cached and reused across elements",
					'String cache: Full <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">tw</code> strings are cached to skip redundant parsing',
					"Expected improvement: ~10x faster parsing for typical workloads",
					"Fast Sync Hash: Replaced async SHA-256 with sync FNV-1a (~20x faster)",
					'New <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">fnv1a()</code> and <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">fastHash()</code> functions',
					'<code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">hashObject()</code> for quick object hashing',
					"LRU Cache: Implemented proper LRU eviction with O(1) operations",
					"Memory-bounded with configurable max size",
					"Optional TTL support",
					"Full statistics (hits, misses, hit rate)",
					"Snapshot Cache V2: Refactored image cache using new LRU implementation",
				],
			},
			{
				type: "added",
				items: [
					'Extended <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">CSSProperties</code> type with <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">borderStyle: &quot;dotted&quot; | &quot;double&quot; | &quot;none&quot;</code>',
					'Presets - Universal Theme Support: Fixed <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">colorScheme</code> propagation and implementation across all presets',
					'Unified light/dark theme behavior in <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">docs</code>, <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">blog</code>, <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">minimal</code>, and <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">social</code>',
					'Added missing theme support to <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">minimal</code> and <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">social</code> presets',
					"Improved light-mode contrast for secondary text and metadata",
					'Docs Preset - Enhanced Customization: Added <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">detailsOG</code> prop to toggle background grid and gradient effects',
				],
			},
			{
				type: "fixed",
				items: [
					'<code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">SnapshotCache.getHash()</code> is now sync (async version deprecated)',
					'Presets - Layout Refinement: Fixed title wrapping and alignment issues in <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">docs</code> preset',
					'Added <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">flex-col</code> and <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">break-all</code> to <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">h1</code> for better word breaking',
					"Expanded content container width to match headers/badges",
					'Core - Prop Propagation: Fixed bug in <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">ogx()</code> where <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">colorScheme</code> was not passed to preset functions',
				],
			},
		],
	},
	{
		scope: "ogxjs-core",
		version: "core-v0.1.2",
		date: "2025-12-30",
		title: "Security Patch",
		npmLink: "https://www.npmjs.com/package/@ogxjs/core/v/0.1.2",
		changes: [
			{
				type: "security",
				items: [
					"Validates URLs by default, blocking private networks and metadata endpoints in production",
					"Throws descriptive error for unsafe URLs",
					'Added <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">unsafe_img()</code> helper for explicit bypass cases (use with caution)',
				],
			},
		],
	},
	{
		scope: "ogxjs-next",
		version: "next-v0.1.1",
		date: "2025-12-30",
		title: "Security Patch",
		npmLink: "https://www.npmjs.com/package/@ogxjs/next/v/0.1.1",
		changes: [
			{
				type: "security",
				items: [
					"Production environments receive generic error messages",
					"Development environments still show detailed errors for debugging",
				],
			},
		],
	},
	{
		scope: "ogxjs-react",
		version: "react-v0.1.2",
		date: "2025-12-30",
		title: "Security Patch",
		npmLink: "https://www.npmjs.com/package/@ogxjs/react/v/0.1.2",
		changes: [
			{
				type: "security",
				items: [
					"Detailed error messages (including stack traces) now only appear in development",
					"Production environments receive no error logs to avoid exposing internal details",
				],
			},
			{
				type: "added",
				items: [
					'Migration guide from <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">@vercel/og</code>',
					"Troubleshooting documentation",
				],
			},
		],
	},
	{
		scope: "ogxjs-core",
		version: "core-v0.1.1",
		date: "2025-12-30",
		title: "Security Patch",
		npmLink: "https://www.npmjs.com/package/@ogxjs/core/v/0.1.1",
		changes: [
			{
				type: "security",
				items: [
					"Blocks localhost, private IPs (10.x, 172.16-31.x, 192.168.x), and metadata endpoints (169.254.169.254)",
					"Allows localhost in development for local testing",
					'Applied to <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">imgFromUrl()</code> and <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">loadFontFromUrl()</code>',
					"Added 10-second timeout for external font loading to prevent DoS",
					"Added validation for arbitrary Tailwind values",
					"Limited to 100 characters to prevent DoS",
					'Blocks potentially dangerous patterns (<code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">javascript:</code>, <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">data:text/html</code>, <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">&lt;script&gt;</code>)',
					"Improved cache hash algorithm",
					'Implemented SHA-256 via <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">getHashAsync()</code> for better collision resistance',
					"Kept djb2 as sync fallback (deprecated)",
				],
			},
			{
				type: "added",
				items: [
					'Added <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">size</code> getter to <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">SnapshotCache</code> for monitoring',
				],
			},
		],
	},
	{
		scope: "ogxjs-react",
		version: "react-v0.1.1",
		date: "2025-12-29",
		title: "Bug Fixes",
		npmLink: "https://www.npmjs.com/package/@ogxjs/react/v/0.1.1",
		changes: [
			{
				type: "fixed",
				items: [
					'Improved type safety in <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">toOGX</code> function',
					"Resolves Biome linter warnings",
				],
			},
		],
	},
	{
		scope: "global",
		version: "v0.1.0",
		date: "2025-12-28",
		title: "Initial Release",
		npmLink: "https://www.npmjs.com/package/@ogxjs/core/v/0.1.0",
		changes: [
			{
				type: "added",
				items: [
					'<code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">@ogxjs/core</code> - Core rendering engine with Tailwind JIT support',
					'<code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">@ogxjs/next</code> - Next.js adapter with <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">ogxResponse()</code> helper',
					'<code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">@ogxjs/react</code> - React adapter with JSX support and <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">tw</code> prop',
					'Built-in presets: <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">minimal</code>, <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">docs</code>, <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">blog</code>, <code class="px-1.5 py-0.5 rounded-md bg-fd-secondary/80 text-fd-foreground text-xs font-mono border border-fd-border/50">social</code>',
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
					"Docs preset: ~89ms average",
					"Social preset: ~690ms average (with complex gradients)",
					"Cached renders: ~0.7ms (85x faster than cold render)",
				],
			},
		],
		isLatest: false,
	},
];
