import Link from "next/link";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
			<main className="mx-auto max-w-2xl space-y-12 p-8">
				{/* Header */}
				<div className="space-y-4 text-center">
					<h1 className="text-6xl font-black tracking-tighter text-white">
						OGX + Next.js
					</h1>
					<p className="text-xl text-zinc-400">
						Dynamic Open Graph image generation with{" "}
						<span className="font-semibold text-white">60ms render time</span>
					</p>
				</div>

				{/* OG Preview */}
				<div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur">
					<div className="mb-4 flex items-center justify-between">
						<span className="text-sm font-mono text-zinc-500 uppercase tracking-wider">
							Live OG Preview
						</span>
						<div className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500">
							1200 × 630
						</div>
					</div>
					<Image
						src="/og"
						alt="OG Preview"
						className="w-full rounded-xl border border-zinc-800"
						width={1200}
						height={630}
					/>
				</div>
				
				<div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur">
					<div className="border-b border-zinc-800 px-6 py-3">
						<span className="text-sm font-mono text-zinc-500">
							app/og/route.tsx
						</span>
					</div>
					<pre className="overflow-x-auto p-6">
						<code className="text-sm text-zinc-300">
							{`import { ogxResponse } from "@ogxjs/next";

export async function GET(req: Request) {
  return ogxResponse({
    preset: "social",
    title: "OGX + Next.js",
    description: "High-performance OG images",
    brand: "Example App",
    colorScheme: "dark",
  }, req);
}`}
						</code>
					</pre>
				</div>

				{/* Links */}
				<div className="flex flex-col gap-4 sm:flex-row">
					<Link
						href="https://ogx-three.vercel.app/docs"
						className="flex h-12 items-center justify-center rounded-full bg-white px-6 font-medium text-black transition-transform hover:scale-105"
					>
						Documentation
					</Link>
					<Link
						href="https://ogx-three.vercel.app/playground"
						className="flex h-12 items-center justify-center rounded-full border border-zinc-700 px-6 font-medium text-white transition-colors hover:bg-zinc-800"
					>
						Try Playground
					</Link>
				</div>
			</main>
		</div>
	);
}
