"use client";

import { ArrowUpRight, Calendar, GitBranch, Home, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import { cn } from "@/lib/cn";
import { releases } from "../_constantes/releasesData";

const scopeConfig: Record<
	string,
	{ label: string; color: string; bg: string }
> = {
	global: {
		label: "All Packages",
		color: "text-purple-400",
		bg: "border-purple-500/30",
	},
	"ogxjs-core": {
		label: "@ogxjs/core",
		color: "text-blue-400",
		bg: "border-blue-500/30",
	},
	"ogxjs-next": {
		label: "@ogxjs/next",
		color: "text-green-400",
		bg: "border-green-500/30",
	},
	"ogxjs-react": {
		label: "@ogxjs/react",
		color: "text-orange-400",
		bg: "border-orange-500/30",
	},
	"ogxjs-playground": {
		label: "Playground",
		color: "text-pink-400",
		bg: "border-pink-500/30",
	},
};

type Scope = keyof typeof scopeConfig | "all";

export default function ChangelogView() {
	const [activeFilter, setActiveFilter] = useQueryState("s", {
		defaultValue: "all",
	});

	const filteredReleases = useMemo(() => {
		if (activeFilter === "all") return releases;
		return releases.filter(
			(r) => r.scope === activeFilter || r.scope === "global",
		);
	}, [activeFilter]);

	const highlightedScopes = new Set<string>();

	return (
		<main className="min-h-screen bg-fd-background text-fd-foreground space-y-10">
			<section className="relative px-6 py-24 md:py-32 overflow-hidden ">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,hsl(var(--fd-primary)/0.15)_0%,transparent_50%)] z-0" />
				<div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-fd-primary/5 blur-[120px] rounded-full pointer-events-none" />
				<div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-fd-primary/5 blur-[120px] rounded-full pointer-events-none" />

				<div className="max-w-5xl mx-auto relative z-10 space-y-12">
					<div className="flex flex-col items-center md:items-start space-y-4">
						<Link href="/" className="flex items-center gap-2">
							<button
								type="button"
								className="p-2 rounded-md text-2xl font-mono font-bold uppercase tracking-wider transition-all duration-300 text-fd-muted-foreground hover:text-fd-primary"
							>
								<Home className="w-4 h-4" />
							</button>
						</Link>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fd-primary/20 text-[10px] font-mono font-bold tracking-[0.2em] text-fd-primary uppercase">
							<GitBranch className="w-3 h-3" />
							Updates history
						</div>
						<div className="flex items-center gap-2">
							<h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
								Changelog
							</h1>
							<Image src="/logo.svg" alt="OGX Logo" width={100} height={100} />
						</div>
						<p className="text-fd-muted-foreground text-lg md:text-xl font-light max-w-2xl text-center md:text-left leading-relaxed">
							Evolution of the high-performance OG engine. Every fix, every
							feature, every millisecond saved.
						</p>
					</div>

					<div className="flex flex-wrap items-center gap-2 pt-4">
						<button
							type="button"
							onClick={() => setActiveFilter("all")}
							className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider border transition-all duration-300 ${activeFilter === "all" ? "bg-fd-primary/10 border-fd-primary text-fd-primary shadow-[0_0_20px_rgba(var(--fd-primary),0.2)]" : "bg-transparent border-fd-border/50 text-fd-muted-foreground hover:border-fd-primary/50"}`}
						>
							All Updates
						</button>
						{Object.entries(scopeConfig)
							.filter(([key]) => key !== "global")
							.map(([key, config]) => (
								<button
									key={key}
									type="button"
									onClick={() => setActiveFilter(key as Scope)}
									className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider border transition-all duration-300 ${activeFilter === key ? `bg-fd-primary/10 border-fd-primary text-fd-primary shadow-[0_0_20px_rgba(var(--fd-primary),0.2)]` : "bg-transparent border-fd-border/50 text-fd-muted-foreground hover:border-fd-primary/50"}`}
								>
									{config.label.replace("@ogxjs/", "")}
								</button>
							))}
					</div>
				</div>
			</section>

			<section className="px-6 pb-40">
				<div className="max-w-5xl mx-auto">
					<div className="relative space-y-32 md:space-y-48">
						{filteredReleases.map((release) => {
							const isScopeLatest =
								!highlightedScopes.has(release.scope) &&
								release.isLatest !== false;
							if (isScopeLatest) {
								highlightedScopes.add(release.scope);
							}

							return (
								<div
									key={release.version}
									className="group relative grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16 transition-all duration-500 border-b pb-5"
								>
									<div className="md:sticky md:top-32 h-fit space-y-4">
										<div className="flex flex-col gap-2">
											<Link
												className="text-4xl md:text-3xl font-black font-mono tracking-tighter text-fd-foreground group-hover:text-fd-primary transition-colors duration-500"
												href={release.npmLink}
											>
												{release.version}
											</Link>
											{isScopeLatest && (
												<div className="flex items-center gap-2">
													<span className="px-2 py-0.5 rounded-full bg-fd-primary/20 text-fd-primary text-[10px] font-mono font-bold uppercase tracking-wider animate-pulse w-fit">
														Latest
													</span>
												</div>
											)}
											<div
												className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-sm font-mono font-medium ${scopeConfig[release.scope]?.bg || "bg-fd-secondary/50 border-fd-border"}`}
											>
												<Package
													className={cn(
														scopeConfig[release.scope]?.color ||
															"text-fd-muted-foreground",
														"w-3.5 h-3.5",
													)}
												/>
												<span
													className={
														scopeConfig[release.scope]?.color ||
														"text-fd-muted-foreground"
													}
												>
													{scopeConfig[release.scope]?.label || release.scope}
												</span>
											</div>
											<div
												className="flex items-center gap-2 px-2 text-fd-muted-foreground/60 font-semibold text-xs tracking-widest uppercase"
												suppressHydrationWarning
											>
												<Calendar className="w-3 h-3" />
												{new Date(
													`${release.date}T12:00:00`,
												).toLocaleDateString("en-US", {
													month: "long",
													day: "numeric",
													year: "numeric",
												})}
											</div>
										</div>
									</div>

									<div className="relative">
										<div className="hidden md:block absolute -left-8 top-4 bottom-0 w-px bg-linear-to-b from-fd-primary/50 via-fd-border/30 to-transparent" />
										<div className="space-y-12">
											<div className="space-y-4">
												<h2 className="text-3xl md:text-4xl font-bold tracking-tight">
													{release.title}
												</h2>
												{release.description && (
													<p className="text-xl text-fd-muted-foreground font-light leading-relaxed">
														{release.description}
													</p>
												)}
											</div>

											<div className="grid grid-cols-1 gap-12">
												{release.changes.map((change, index) => (
													<div
														key={`${change.type}-${index}`}
														className="space-y-6"
													>
														<div className="flex items-center gap-3">
															<div className="w-2 h-2 rounded-full bg-fd-primary shadow-[0_0_10px_rgba(var(--fd-primary),0.5)]" />
															<span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-fd-primary">
																{change.type}
															</span>
														</div>
														<ul className="space-y-4 pl-0">
															{change.items.map((item, i) => (
																<li
																	key={`${item.substring(0, 20)}-${i}`}
																	className="group/item flex items-start gap-4 text-fd-muted-foreground leading-relaxed transition-colors hover:text-fd-foreground"
																>
																	<div className="mt-2.5 w-1.5 h-[2px] bg-fd-border group-hover/item:bg-fd-primary transition-colors" />
																	<span
																		className="text-[17px] font-light"
																		dangerouslySetInnerHTML={{
																			__html: item,
																		}}
																	/>
																</li>
															))}
														</ul>
													</div>
												))}
											</div>

											<div className="pt-10 border-t border-fd-border/20 flex items-center justify-between">
												<Link
													href={`https://github.com/carlosedujs/ogx/releases/tag/${release.version}`}
													target="_blank"
													className="group/link inline-flex items-center gap-2 text-sm font-mono font-medium text-fd-muted-foreground hover:text-fd-primary transition-all duration-300"
												>
													Release Notes
													<ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
												</Link>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</main>
	);
}
