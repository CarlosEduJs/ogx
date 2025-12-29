import {
	Monitor,
	Smartphone,
	Download,
	RefreshCcw,
	Code,
	Check,
	Zap,
	Layout,
} from "lucide-react";
import { CopyIcon } from "./Common";
interface PlaygroundCanvasProps {
	activeTab: "edit" | "code";
	viewport: "desktop" | "mobile";
	setViewport: (v: "desktop" | "mobile") => void;
	isRendering: boolean;
	svg: string;
	generatedCode: string;
	copied: boolean;
	onCopy: () => void;
	onDownload: () => void;
}

export function PlaygroundCanvas({
	activeTab,
	viewport,
	setViewport,
	isRendering,
	svg,
	generatedCode,
	copied,
	onCopy,
	onDownload,
}: PlaygroundCanvasProps) {
	return (
		<main className="flex-1 bg-zinc-900/40 relative flex flex-col overflow-hidden m-4 rounded-2xl py-4">
			<div className="h-14 px-6 flex items-center justify-between shrink-0 bg-zinc-950/5 backdrop-blur-2xl">
				<div className="flex items-center gap-6">
					<div className="flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/5 shadow-inner">
						<div className="relative flex items-center justify-center">
							<div
								className={`w-2 h-2 rounded-full ${isRendering ? "bg-amber-500" : "bg-emerald-500"}`}
							/>
							{isRendering && (
								<div className="absolute inset-0 w-2 h-2 rounded-full bg-amber-500 animate-ping opacity-75" />
							)}
						</div>
						<span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
							{isRendering ? "Rendering" : "Optimized"}
						</span>
					</div>
					<div className="h-4 w-px bg-white/10" />
					<div className="flex bg-white/5 p-1 rounded-lg">
						<button
							type="button"
							onClick={() => setViewport("desktop")}
							className={`p-1.5 rounded-md transition-all ${viewport === "desktop" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
						>
							<Monitor className="w-4 h-4" />
						</button>
						<button
							type="button"
							onClick={() => setViewport("mobile")}
							className={`p-1.5 rounded-md transition-all ${viewport === "mobile" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
						>
							<Smartphone className="w-4 h-4" />
						</button>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={onDownload}
						className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={!svg || isRendering}
					>
						<Download className="w-3.5 h-3.5" />
						Download SVG
					</button>
				</div>
			</div>

			<div className="flex-1 overflow-auto p-12 lg:p-20 flex items-center justify-center custom-scrollbar">
				{activeTab === "edit" ? (
					<div
						className={`relative transition-all duration-700 ${viewport === "mobile" ? "w-[400px] aspect-4/5" : "max-w-6xl w-full aspect-1200/630"} group`}
					>
						{/* Shadow Decor */}
						<div className="absolute -inset-10 bg-indigo-500/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

						{/* Canvas Container */}
						<div className="relative w-full h-full bg-zinc-950 rounded-4xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
							{svg ? (
								<div
									className="w-full h-full"
									// biome-ignore lint/security/noDangerouslySetInnerHtml: Used for SVG preview
									dangerouslySetInnerHTML={{ __html: svg }}
								/>
							) : (
								<div className="w-full h-full flex flex-col items-center justify-center gap-4">
									<RefreshCcw className="w-10 h-10 text-zinc-700 animate-spin" />
									<span className="text-zinc-500 font-mono text-sm">
										Initializing Engine...
									</span>
								</div>
							)}
						</div>

						{/* Dimensions Label */}
						<div className="absolute -bottom-8 left-0 right-0 flex justify-center">
							<span className="text-[10px] font-mono font-medium text-zinc-600 uppercase tracking-widest">
								{viewport === "desktop"
									? "1200px × 630px"
									: "Platform Specific Dimension"}
							</span>
						</div>
					</div>
				) : (
					<div className="w-full max-w-4xl h-full flex flex-col gap-6">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Code className="w-5 h-5 text-indigo-400" />
								<span className="font-bold tracking-tight">
									Implementation Details
								</span>
							</div>
							<button
								type="button"
								onClick={onCopy}
								className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${copied ? "bg-green-500/10 border-green-500/50 text-green-400" : "bg-white/5 border-white/10 text-white hover:bg-white/10"}`}
							>
								{copied ? (
									<Check className="w-3.5 h-3.5" />
								) : (
									<CopyIcon className="w-3.5 h-3.5" />
								)}
								{copied ? "Copied" : "Copy Snippet"}
							</button>
						</div>

						<div className="flex-1 bg-zinc-950 rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl">
							<div className="absolute top-0 left-0 right-0 h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
								<div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
								<div className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
								<div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
								<div className="ml-2 px-3 py-1 bg-zinc-900 rounded-md text-[10px] font-mono text-zinc-500 italic">
									social-card.tsx
								</div>
							</div>
							<pre className="p-12 pt-16 text-[13px] font-mono leading-relaxed text-zinc-400 overflow-auto h-full selection:bg-indigo-500/40">
								{generatedCode}
							</pre>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-2">
								<h4 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
									Dependencies
								</h4>
								<div className="flex flex-wrap gap-2 pt-1">
									<span className="px-2 py-1 rounded bg-zinc-950 border border-white/5 text-[10px] font-mono">
										@ogxjs/react
									</span>
									<span className="px-2 py-1 rounded bg-zinc-950 border border-white/5 text-[10px] font-mono">
										@ogxjs/core
									</span>
								</div>
							</div>
							<div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-2">
								<h4 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
									Features
								</h4>
								<div className="flex flex-wrap gap-2 pt-1">
									<span className="px-2 py-1 rounded bg-zinc-950 border border-white/5 text-[10px] font-mono flex items-center gap-1.5 align-middle">
										<Zap className="w-2.5 h-2.5 text-amber-500" />
										Zero Bundle Impact
									</span>
									<span className="px-2 py-1 rounded bg-zinc-950 border border-white/5 text-[10px] font-mono flex items-center gap-1.5">
										<Layout className="w-2.5 h-2.5 text-blue-500" />
										Flex Layout
									</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</main>
	);
}
