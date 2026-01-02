import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import {
	Activity,
	ArrowRight,
	Blend,
	Box,
	Copy,
	Cpu,
	Database,
	Globe,
	Layers,
	Terminal,
	Wind,
	Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
	BunLogo,
	DenoLogo,
	NextjsLogo,
	NodejsLogo,
	ReactLogo,
} from "@/components/logos";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
	title: "OGX - High-Performance OG Image Engine",
	description:
		"Generate dynamic Open Graph images with Tailwind CSS. ~40ms render time, Cache v2 with LRU, Parser v2 with O(1) lookups, and seamless Next.js integration.",
	openGraph: {
		title: "OGX - High-Performance OG Image Engine",
		description:
			"Generate dynamic Open Graph images with Tailwind CSS. ~40ms render time, Cache v2 with LRU, Parser v2 with O(1) lookups, and seamless Next.js integration.",
		type: "website",
		images: [
			{
				url: `${baseUrl}/og/home`,
				width: 1200,
				height: 630,
				alt: "OGX Engine",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "OGX - High-Performance OG Image Engine",
		description:
			"Generate dynamic Open Graph images with Tailwind CSS. ~40ms render time.",
		images: [`${baseUrl}/og/home`],
	},
};

const codeExample = `import { ogxResponse } from "@ogxjs/next";

export async function GET(req: Request) {
  return ogxResponse({
    preset: "docs",
    title: "Visionary Layouts",
    siteName: "OGX",
    logo: "/logo.svg"
  }, req);
}`;

export default function HomePage() {
	return (
		<main className="flex flex-col min-h-screen bg-fd-background text-fd-foreground selection:bg-fd-primary/30 antialiased overflow-x-hidden">
			<section className="relative px-6 pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden border-b border-fd-border/50">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1000px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--fd-primary)/0.15)_0%,transparent_50%)] z-0" />

				<div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
					<div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
						<Link
							href="/changelog"
							className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-fd-primary/5 border border-fd-primary/20 text-[10px] font-mono tracking-[0.2em] text-fd-primary uppercase transition-all hover:bg-fd-primary/10 cursor-default"
						>
							<span className="w-1.5 h-1.5 rounded-full bg-fd-primary animate-pulse" />
							v0.2.0-alpha.1 Turbo Engine
						</Link>

						<div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 group/title">
							<Image
								src="/logo.svg"
								alt="OGX Logo"
								width={160}
								height={160}
								className="w-20 md:w-32 h-auto grayscale opacity-50 group-hover/title:grayscale-0 group-hover/title:opacity-100 transition-all duration-700 pointer-events-none"
							/>
							<h1 className="text-7xl md:text-[8rem] xl:text-[12rem] font-black -tracking-widest leading-[0.8] flex items-center cursor-default select-none transition-all duration-500 group-hover/title:scale-105">
								<span className="text-green-500 transition-all duration-500 hover:scale-110 hover:-rotate-6 hover:drop-shadow-[0_0_40px_rgba(34,197,94,0.6)]">
									O
								</span>
								<span className="text-blue-500 transition-all duration-500 hover:scale-110 hover:rotate-3 hover:drop-shadow-[0_0_40px_rgba(59,130,246,0.6)] delay-75">
									G
								</span>
								<span className="text-fd-primary transition-all duration-500 hover:scale-110 hover:rotate-12 hover:drop-shadow-[0_0_40px_rgba(217,70,239,0.6)] delay-150">
									X
								</span>
								<span className="text-fd-primary animate-pulse">.</span>
							</h1>
						</div>

						<p className="text-xl md:text-3xl xl:text-4xl font-light text-fd-muted-foreground tracking-tight max-w-2xl leading-tight">
							The high-performance engine for <br className="hidden md:block" />
							<span className="text-fd-foreground font-semibold uppercase tracking-tighter">
								Dynamic Open Graph images.
							</span>
						</p>

						<div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
							<Link
								href="/docs"
								className="group relative flex items-center gap-3 px-12 py-5 bg-fd-primary text-fd-primary-foreground rounded-2xl font-bold text-lg transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(var(--fd-primary),0.3)]"
							>
								Go to Documentation
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</Link>

							<Link
								href="/playground"
								className="group relative flex items-center gap-3 px-12 py-5 bg-green-500 text-fd-primary-foreground rounded-2xl font-bold text-lg transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(var(--fd-primary),0.3)]"
							>
								Playground
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</Link>

							<div className="flex items-center gap-4 p-1 pl-6 pr-2 bg-fd-secondary/50 backdrop-blur-md rounded-md font-mono text-sm group cursor-pointer transition-all">
								<span className="text-fd-muted-foreground opacity-50">#</span>
								<span className="font-medium">npm i @ogxjs/core</span>
								<div className="p-1.5 rounded-xl bg-fd-background/50  group-hover:text-fd-primary transition-colors">
									<Copy className="w-4 h-4" />
								</div>
							</div>
						</div>
					</div>

					<div className="lg:col-span-5 hidden lg:block animate-in fade-in slide-in-from-right-12 duration-1000">
						<div className="relative group">
							<div className="absolute -inset-1 bg-linear-to-r from-fd-primary/20 to-purple-600/20 rounded-4xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />
							<div className="relative bg-fd-card p-2 rounded-3xl border border-fd-border/50 shadow-2xl skew-y-1 group-hover:skew-y-0 transition-transform duration-700">
								<Image
									src={"/og.png"}
									alt="OGX Showcase"
									width={1200}
									height={630}
									className="rounded-2xl shadow-inner"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Universal Runtime & Framework Agnostic */}
			<section className="py-16 border-b border-fd-border/50 bg-fd-secondary/5 relative z-10 overflow-hidden">
				<div className="max-w-6xl mx-auto px-6">
					<div className="flex flex-col md:flex-row items-center justify-between gap-12">
						<div className="space-y-2 text-center md:text-left">
							<h3 className="text-xs font-mono tracking-[0.3em] font-bold text-fd-primary uppercase">
								Universal Compatibility
							</h3>
							<p className="text-fd-muted-foreground text-sm font-light">
								Runtime agnostic. Built for the modern ecosystem.
							</p>
						</div>
						<div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
							<NextjsLogo className="h-6 w-auto text-fd-muted-foreground/40 hover:text-fd-foreground transition-all duration-300 cursor-default" />
							<NodejsLogo className="h-8 w-auto text-fd-muted-foreground/40 hover:text-[#339933] transition-all duration-300 cursor-default" />
							<BunLogo className="h-8 w-auto text-fd-muted-foreground/40 hover:text-yellow-500 transition-all duration-300 cursor-default" />
							<DenoLogo className="h-8 w-auto text-fd-muted-foreground/40 hover:text-fd-foreground transition-all duration-300 cursor-default" />
							<ReactLogo className="h-7 w-auto text-fd-muted-foreground/40 hover:text-[#61DAFB] transition-all duration-300 cursor-default" />
						</div>
					</div>
				</div>
			</section>

			{/* Philosophy / Manifesto */}
			<section className="py-24 px-6 md:py-40 bg-fd-background border-b border-fd-border/50">
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
					<PhilosophyItem
						title="ZERO BROWSER"
						desc="No Puppeteer. No Chromium. Pure Wasm execution for native-level performance."
					/>
					<PhilosophyItem
						title="TAILWIND NATIVE"
						desc="Your 디자인 시스템 is your code. Every utility class mapped to visual perfection."
					/>
					<PhilosophyItem
						title="EDGE FIRST"
						desc="Built for the modern web. Deploy to Vercel, Cloudflare, or Deno in seconds."
					/>
				</div>
			</section>

			<section className="py-24 px-6 md:py-40 bg-fd-muted/5 relative ">
				<div className="absolute bottom-[-200px] right-0 w-[600px] h-[600px] bg-fd-primary/5 blur-[120px] rounded-full translate-x-1/2 " />
				<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
					<div className="lg:col-span-5 space-y-12 text-center lg:text-left items-center lg:items-start flex flex-col">
						<div className="space-y-6">
							<div className="w-12 h-1 bg-fd-primary rounded-full mx-auto lg:mx-0" />
							<h2 className="text-5xl font-bold tracking-tighter leading-none uppercase">
								THE LABORATORY.
							</h2>
							<p className="text-xl text-fd-muted-foreground leading-relaxed font-light">
								Turn static code into dynamic visual assets. Chain utilities
								with the{" "}
								<span className="text-fd-foreground border-b border-fd-primary/50 font-medium">
									Fluent API
								</span>{" "}
								and deploy with native speed.
							</p>
						</div>

						<div className="grid grid-cols-2 gap-8 pt-4 w-full text-left">
							<TechnicalStat icon={<Zap />} label="LATENCY" value="~40ms" />
							<TechnicalStat icon={<Cpu />} label="ENGINE" value="Parser v2" />
							<TechnicalStat
								icon={<Layers />}
								label="TYPES"
								value="Strict TS"
							/>
							<TechnicalStat
								icon={<Globe />}
								label="RUNTIME"
								value="Universal"
							/>
						</div>
					</div>

					<div className="lg:col-span-7 relative group">
						<div className="absolute -inset-1 bg-linear-to-r from-fd-primary via-indigo-500 to-purple-600 rounded-4xl blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-700" />
						<div className="relative shadow-2xl scale-100 group-hover:scale-[1.01] transition-transform duration-500">
							<CodeBlock
								title="src/app/og/docs/[...slug]/route.ts"
								icon={<Terminal className="w-4 h-4 text-fd-primary" />}
								className="rounded-3xl border border-fd-border bg-fd-secondary/50 backdrop-blur-xl overflow-hidden"
							>
								<Pre className="p-8 text-[13px] font-mono leading-relaxed overflow-x-auto text-fd-foreground/90 selection:bg-fd-primary/40">
									{codeExample}
								</Pre>
							</CodeBlock>
						</div>
					</div>
				</div>
			</section>

			{/* Performance Debt Section */}
			<section className="py-24 px-6 md:py-40 bg-fd-background border-b border-fd-border/50 relative overflow-hidden">
				<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-fd-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
				<div className="max-w-6xl mx-auto">
					<div className="mb-20 space-y-4">
						<h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
							The Weight of Choice.
						</h2>
						<p className="text-fd-muted-foreground text-xl">
							OGX vs Traditional Browser-based rendering.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-fd-border border border-fd-border rounded-4xl overflow-hidden shadow-2xl">
						<ComparisonCard
							label="LEGACY (Browser)"
							stats={[
								{ name: "BUNDLE SIZE", value: "~300MB", highlight: false },
								{ name: "LATENCY", value: "2s - 5s", highlight: false },
								{ name: "MEMORY", value: "512MB+", highlight: false },
								{ name: "EDGE", value: "NOT SUPPORTED", highlight: true },
							]}
						/>
						<ComparisonCard
							label="OGX ENGINE"
							stats={[
								{ name: "BUNDLE SIZE", value: "< 1MB", highlight: true },
								{ name: "LATENCY", value: "~50ms", highlight: true },
								{ name: "MEMORY", value: "Minimal", highlight: true },
								{ name: "EDGE", value: "NATIVE", highlight: true },
							]}
							isPrimary
						/>
					</div>
				</div>
			</section>

			<section className="py-24 px-6 md:py-40 border-b border-fd-border/50 bg-fd-background">
				<div className="max-w-6xl mx-auto text-center space-y-24">
					<div className="space-y-4">
						<h2 className="text-5xl font-black tracking-tighter uppercase">
							Programmatic Branding.
						</h2>
						<p className="text-fd-muted-foreground text-xl max-w-2xl mx-auto">
							Replaced manual design exports with a declarative pipeline that
							scales with your content.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
						<WorkflowStep
							num="01"
							title="Compose"
							desc="Build layouts using familiar Tailwind CSS classes. No manual SVG pathing or canvas math."
							icon={<Wind className="text-fd-primary" />}
						/>
						<WorkflowStep
							num="02"
							title="Dynamic"
							desc="Inject server-side data into your templates. All properties update on-the-fly with 100% fidelity."
							icon={<Blend className="text-purple-400" />}
						/>
						<WorkflowStep
							num="03"
							title="Deploy"
							desc="Edge-optimized runtime. Satori-powered rendering designed for fast execution across global CDNs."
							icon={<Box className="text-blue-400" />}
						/>
					</div>
				</div>
			</section>

			{/* Architecture Stack Section */}
			<section className="py-24 px-6 md:py-40 bg-fd-background border-b border-fd-border/50 relative overflow-hidden">
				{/* Decorative background grid/lines */}
				<div className="absolute inset-0 bg-linear-to-r from-fd-border/20 via-transparent to-fd-border/20 bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

				<div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
					<div className="lg:col-span-6 space-y-12">
						<div className="space-y-6">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-fd-primary/20 text-[10px] font-mono font-bold text-fd-primary uppercase tracking-widest">
								System Architecture
							</div>
							<h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
								The Engine <br />{" "}
								<span className="text-fd-primary">Precision.</span>
							</h2>
							<p className="text-xl text-fd-muted-foreground font-light leading-relaxed max-w-xl">
								OGX coordinates specialized engines with micron-level precision,
								merging design flexibility with raw execution power.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 group/stack-info">
							<StackInfo
								title="Fluent API"
								desc="A declarative builder for intricate layouts."
								icon={<Terminal className="w-5 h-5" />}
								tier="3"
								accent="bg-fd-primary"
							/>
							<StackInfo
								title="Tailwind JIT"
								desc="Real-time translation of utility classes to CSS."
								icon={<Database className="w-5 h-5" />}
								tier="2"
								accent="bg-indigo-500"
							/>
							<StackInfo
								title="Satori Engine"
								desc="Yoga-powered layout reconciliation."
								icon={<Cpu className="w-5 h-5" />}
								tier="1"
								accent="bg-purple-600"
							/>
							<StackInfo
								title="Resvg Raster"
								desc="Native-speed Wasm rasterization engine."
								icon={<Activity className="w-5 h-5" />}
								tier="0"
								accent="bg-blue-600"
							/>
						</div>
					</div>

					<div className="lg:col-span-6 relative perspective-2000 py-20 lg:py-0">
						<div className="relative flex flex-col items-center justify-center gap-0 preserve-3d group/stack-viz">
							<StackLayer
								label="DX / FLUENT API"
								color="bg-fd-primary"
								index={3}
								desc="User Interface"
								tier="3"
							/>
							<StackLayer
								label="TAILWIND PARSER"
								color="bg-indigo-500"
								index={2}
								desc="Styling Logic"
								tier="2"
							/>
							<StackLayer
								label="SATORI ENGINE"
								color="bg-purple-600"
								index={1}
								desc="Layout Engine"
								tier="1"
							/>
							<StackLayer
								label="RESVG-JS / WASM"
								color="bg-blue-600"
								index={0}
								desc="Rasterization"
								tier="0"
							/>

							{/* Vertical connector line */}
							<div className="absolute top-0 bottom-0 w-px bg-linear-to-b from-fd-primary/50 via-purple-500/50 to-blue-500/50 opacity-20 -translate-z-20" />
						</div>
					</div>
				</div>
			</section>

			<section className="py-24 px-6 md:py-40 bg-fd-background">
				<div className="max-w-6xl mx-auto">
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
						<div className="space-y-4 text-center md:text-left">
							<h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase">
								PRESETS<span className="text-fd-primary opacity-50">_</span>
							</h2>
							<div className="flex items-center justify-center md:justify-start gap-4 text-fd-muted-foreground font-mono text-[10px] tracking-[0.3em] uppercase">
								<span>Production Ready</span>
								<div className="w-12 h-px bg-fd-border" />
								<span>Open Source</span>
							</div>
						</div>
						<p className="max-w-xs text-fd-muted-foreground leading-relaxed italic opacity-80 border-l-2 border-fd-primary/30 pl-6 hidden md:block">
							"The missing link between your library's core and its brand
							presence on the web."
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						<GalleryItem
							image="/showcase/docs.png"
							tag="01"
							label="Documentation Engine"
						/>
						<GalleryItem
							image="/showcase/blog.png"
							tag="02"
							label="Article Distribution"
						/>
						<GalleryItem
							image="/showcase/social.png"
							tag="03"
							label="Social Branding"
						/>
						<GalleryItem
							image="/showcase/premium.png"
							tag="04"
							label="Premium Showcase"
						/>
					</div>
				</div>
			</section>

			<section className="py-24 px-6 md:py-48 text-center relative overflow-hidden">
				<div className="absolute inset-0 bg-linear-to-t from-fd-primary/5 via-transparent to-transparent pointer-events-none" />
				<div className="max-w-3xl mx-auto space-y-12 relative z-10">
					<h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase line-clamp-2">
						Build the next <br className="md:hidden" /> visual standard.
					</h2>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
						<Link
							href="/docs"
							className="w-full sm:w-auto px-16 py-6 bg-fd-foreground text-fd-background rounded-2xl font-bold text-xl transition-all hover:bg-fd-primary hover:text-fd-primary-foreground hover:scale-105 shadow-xl"
						>
							Get Started
						</Link>
						<Link
							href="https://github.com/carlosedujs/ogx"
							className="w-full sm:w-auto px-16 py-6 border border-fd-border rounded-2xl font-bold text-xl transition-all hover:bg-fd-secondary hover:scale-105"
						>
							GitHub
						</Link>
					</div>
				</div>
			</section>

			<PerformanceSection />

			<footer className="py-16 border-t border-fd-border/30 text-center bg-fd-muted/5">
				<div className="flex flex-col items-center gap-4">
					<Image
						alt="OGX"
						src="/logo.svg"
						width={128}
						height={128}
						className="w-32 h-32"
						aria-label="OGX"
					/>
					<p className="text-[10px] font-mono uppercase tracking-[0.5em] text-fd-muted-foreground/40">
						{"OGX Engine // v0.2.0-alpha.1 Turbo"}
					</p>
				</div>
			</footer>
		</main>
	);
}

function PerformanceSection() {
	return (
		<section className="py-24 px-6 md:py-40 border-b border-fd-border/50 bg-fd-secondary/5 relative overflow-hidden">
			<div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-fd-primary/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
			<div className="max-w-6xl mx-auto space-y-24">
				<div className="space-y-4 text-center md:text-left">
					<h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
						Raw execution. <br className="md:hidden" /> Subsonic Speeds.
					</h2>
					<p className="text-fd-muted-foreground text-xl">
						True benchmarks on Node.js 24. Powered by Satori + Resvg.
					</p>
				</div>

				<PerformanceTable
					data={[
						{
							scenario: "Minimal Preset",
							mean: "39.23ms",
							notes:
								"Fast and lightweight, perfect for simple images and blogs.",
						},
						{
							scenario: "Social Preset",
							mean: "55.63ms",
							notes:
								"Complex gradients, multiple fonts, rich layout, shadows, brand + handle. Fast Fast Fast.",
						},
						{
							scenario: "Docs Preset",
							mean: "46.96ms",
							notes: "Ideal for documentation pages or content-heavy layouts.",
						},
						{
							scenario: "With Cache",
							mean: "0.03ms",
							notes:
								"~1000x faster than cold render. Instant retrieval via snapshot caching.",
							isHighlight: true,
						},
					]}
				/>
			</div>
		</section>
	);
}

function PerformanceTable({
	data,
}: {
	data: {
		scenario: string;
		mean: string;
		notes: string;
		isHighlight?: boolean;
	}[];
}) {
	return (
		<div className="w-full overflow-x-auto rounded-3xl border border-fd-border/50 bg-fd-card/30 backdrop-blur-md">
			<table className="w-full text-left border-collapse">
				<thead>
					<tr className="border-b border-fd-border/50">
						<th className="p-8 text-[10px] font-mono font-bold text-fd-muted-foreground uppercase tracking-widest">
							Scenario
						</th>
						<th className="p-8 text-[10px] font-mono font-bold text-fd-muted-foreground uppercase tracking-widest">
							Mean (ms)
						</th>
						<th className="p-8 text-[10px] font-mono font-bold text-fd-muted-foreground uppercase tracking-widest">
							Notes
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row) => (
						<tr
							key={row.scenario}
							className={`border-b border-fd-border/20 last:border-0 transition-colors hover:bg-fd-primary/5 ${row.isHighlight ? "bg-fd-primary/5" : ""}`}
						>
							<td className="p-8">
								<div className="flex items-center gap-3">
									{row.isHighlight && (
										<div className="w-1.5 h-1.5 rounded-full bg-fd-primary animate-pulse" />
									)}
									<span
										className={`font-bold ${row.isHighlight ? "text-fd-primary" : "text-fd-foreground"}`}
									>
										{row.scenario}
									</span>
								</div>
							</td>
							<td className="p-8 font-mono text-lg tabular-nums">{row.mean}</td>
							<td className="p-8 text-sm text-fd-muted-foreground leading-relaxed max-w-md">
								{row.isHighlight ? (
									<span className="text-fd-foreground font-medium">
										<span className="text-fd-primary">1000x faster</span> than
										cold render. Instant, even for complex presets.
									</span>
								) : (
									row.notes
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function PhilosophyItem({ title, desc }: { title: string; desc: string }) {
	return (
		<div className="space-y-4">
			<div className="h-px w-8 bg-fd-primary/50" />
			<h3 className="text-xs font-mono tracking-[0.3em] font-bold text-fd-primary uppercase">
				{title}
			</h3>
			<p className="text-lg font-light text-fd-muted-foreground leading-snug">
				{desc}
			</p>
		</div>
	);
}

function ComparisonCard({
	label,
	stats,
	isPrimary,
}: {
	label: string;
	stats: { name: string; value: string; highlight: boolean }[];
	isPrimary?: boolean;
}) {
	return (
		<div
			className={`p-12 space-y-10 ${isPrimary ? "bg-fd-secondary/30 backdrop-blur-xl" : "bg-fd-background"}`}
		>
			<h4
				className={`text-xs font-mono tracking-[0.2em] font-bold uppercase ${isPrimary ? "text-fd-primary" : "text-fd-muted-foreground"}`}
			>
				{label}
			</h4>
			<div className="space-y-6">
				{stats.map((stat) => (
					<div
						key={stat.name}
						className="flex justify-between items-baseline border-b border-fd-border/30 pb-4"
					>
						<span className="text-[10px] font-mono text-fd-muted-foreground uppercase">
							{stat.name}
						</span>
						<span
							className={`font-mono text-lg font-bold ${stat.highlight ? (isPrimary ? "text-fd-primary" : "text-fd-foreground") : "text-fd-muted-foreground/50 line-through"}`}
						>
							{stat.value}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

function StackInfo({
	title,
	desc,
	icon,
	tier,
	accent,
}: {
	title: string;
	desc: string;
	icon: React.ReactNode;
	tier: string;
	accent: string;
}) {
	return (
		<div className="group space-y-3 relative" data-tier-trigger={tier}>
			<div className="flex items-center gap-3">
				<div
					className={`p-2 rounded-lg bg-fd-primary/10 border border-fd-primary/20 text-fd-primary`}
				>
					{icon}
				</div>
				<h4 className="font-bold tracking-tight uppercase text-sm group-hover:text-fd-primary transition-colors">
					{title}
				</h4>
				<div
					className={`w-1 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${accent}`}
				/>
			</div>
			<p className="text-sm text-fd-muted-foreground leading-relaxed font-light pl-11">
				{desc}
			</p>
		</div>
	);
}

function StackLayer({
	label,
	color,
	index,
	desc,
	tier,
}: {
	label: string;
	color: string;
	index: number;
	desc: string;
	tier: string;
}) {
	return (
		<div
			className="relative group/layer preserve-3d py-4 w-full max-w-[400px] transition-all duration-500"
			style={{
				transform: `translateZ(${index * 40}px)`,
				zIndex: index + 1,
			}}
			data-tier={tier}
		>
			<div
				className={`relative p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-[10px] font-mono font-bold tracking-[0.2em] text-white shadow-2xl transition-all duration-500 opacity-80 group-hover/layer:opacity-100 group-hover/layer:-translate-y-4 group-hover/layer:rotate-x-12 cursor-default overflow-hidden ${color}`}
			>
				{/* Shine effect */}
				<div className="absolute inset-0 bg-linear-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover/layer:opacity-100 transition-opacity duration-500" />

				{/* Technical detail: Slots/Pins */}
				<div className="absolute top-2 left-6 right-6 flex justify-between opacity-30">
					<div className="w-1 h-3 bg-white/40 rounded-full" />
					<div className="w-1 h-3 bg-white/40 rounded-full" />
					<div className="w-1 h-3 bg-white/40 rounded-full" />
					<div className="w-1 h-3 bg-white/40 rounded-full" />
				</div>

				<span className="relative z-10">{label}</span>
				<span className="absolute bottom-2 text-[8px] opacity-40 font-mono tracking-widest uppercase">
					{desc}
				</span>
			</div>

			{/* Drop shadow for 3D effect */}
			<div className="absolute top-1/2 left-4 right-4 h-full bg-black/40 blur-3xl -translate-z-10 opacity-0 group-hover/layer:opacity-100 transition-opacity duration-500 pointer-events-none" />
		</div>
	);
}

function TechnicalStat({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
}) {
	return (
		<div className="space-y-2">
			<div className="flex items-center gap-2 text-fd-primary">
				{icon}
				<span className="text-[10px] font-mono tracking-widest font-bold">
					{label}
				</span>
			</div>
			<div className="text-xl font-bold font-mono tracking-tight tabular-nums">
				{value}
			</div>
		</div>
	);
}

function WorkflowStep({
	num,
	title,
	desc,
	icon,
}: {
	num: string;
	title: string;
	desc: string;
	icon: React.ReactNode;
}) {
	return (
		<div className="space-y-6 group">
			<div className="flex items-center gap-4">
				<span className="text-4xl font-black text-fd-muted-foreground/20 group-hover:text-fd-primary/30 transition-colors uppercase tabular-nums">
					{num}
				</span>
				<div className="h-px flex-1 bg-fd-border/50" />
				<div className="p-3 rounded-xl bg-fd-muted/30 border border-fd-border">
					{icon}
				</div>
			</div>
			<h3 className="text-2xl font-bold tracking-tight uppercase tabular-nums">
				{title}
			</h3>
			<p className="text-fd-muted-foreground font-light leading-relaxed">
				{desc}
			</p>
		</div>
	);
}

function GalleryItem({
	image,
	tag,
	label,
}: {
	image: string;
	tag: string;
	label: string;
}) {
	return (
		<div className="group space-y-6 flex flex-col">
			<div className="relative overflow-hidden rounded-4xl border border-fd-border bg-fd-background transition-all duration-700 hover:border-fd-primary/50 group-hover:shadow-[0_0_80px_rgba(var(--fd-primary),0.05)]">
				<Image
					src={image}
					alt={label}
					width={600}
					height={315}
					className="w-full h-auto transition-all duration-1000 scale-100 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
				/>
				<div className="absolute top-6 right-6 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity">
					PRESET {tag}
				</div>
			</div>
			<div className="flex items-baseline justify-between px-4">
				<h3 className="text-2xl font-bold tracking-tighter group-hover:text-fd-primary transition-colors tabular-nums">
					{label}
				</h3>
				<span className="text-[10px] font-mono text-fd-muted-foreground tabular-nums">
					1200px × 630px
				</span>
			</div>
		</div>
	);
}
