import { ArrowLeft, Check, Code, Layout, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PlaygroundHeaderProps {
	activeTab: "edit" | "code";
	setActiveTab: (tab: "edit" | "code") => void;
	shared: boolean;
	onShare: () => void;
}

export function PlaygroundHeader({
	activeTab,
	setActiveTab,
	shared,
	onShare,
}: PlaygroundHeaderProps) {
	return (
		<nav className="h-16 px-6  flex items-center justify-between bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
			<div className="flex items-center gap-4">
				<Link
					href="/"
					className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
				>
					<ArrowLeft className="w-5 h-5 text-zinc-400 group-hover:text-white" />
				</Link>
				<div className="h-4 w-px bg-white/10" />
				<div className="flex items-center gap-2">
					<Image src="/logo.svg" alt="OGX Logo" width={24} height={24} />
					<span className="font-bold tracking-tight">OGX Playground</span>
				</div>
			</div>

			<div className="flex items-center gap-3">
				<div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
					<button
						type="button"
						onClick={() => setActiveTab("edit")}
						className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === "edit" ? "bg-white/10 text-white shadow-sm" : "text-zinc-400 hover:text-white"}`}
					>
						<Layout className="w-4 h-4" />
						Editor
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("code")}
						className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === "code" ? "bg-white/10 text-white shadow-sm" : "text-zinc-400 hover:text-white"}`}
					>
						<Code className="w-4 h-4" />
						Code
					</button>
				</div>
				<div className="h-4 w-px bg-white/10 mx-2" />
				<button
					type="button"
					onClick={onShare}
					className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg ${shared ? "bg-green-500 shadow-green-500/20" : "bg-indigo-500 hover:bg-indigo-400 shadow-indigo-500/20"}`}
				>
					{shared ? (
						<Check className="w-4 h-4" />
					) : (
						<Share2 className="w-4 h-4" />
					)}
					{shared ? "Link Copied" : "Share"}
				</button>
			</div>
		</nav>
	);
}
