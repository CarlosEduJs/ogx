import { Palette, SwatchBook, Type, Zap } from "lucide-react";
import { THEMES } from "../constants";
import type { PlaygroundState, ThemeName } from "../types";
import { ControlGroup, Field } from "./Common";

interface PlaygroundSidebarProps {
	state: PlaygroundState;
	setState: React.Dispatch<React.SetStateAction<PlaygroundState>>;
}

export function PlaygroundSidebar({ state, setState }: PlaygroundSidebarProps) {
	return (
		<aside className="w-full md:w-[400px] bg-zinc-950 flex flex-col overflow-y-auto shrink-0 custom-scrollbar">
			<div className="p-8 space-y-10">
				<div>
					<h2 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">
						Configuration
					</h2>
					<div className="space-y-6">
						<ControlGroup
							icon={<SwatchBook className="w-4 h-4" />}
							label="Basic Info"
						>
							<div className="space-y-4">
								<Field label="State Title">
									<input
										className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500/50 transition-colors"
										value={state.title}
										onChange={(e) =>
											setState((s) => ({ ...s, title: e.target.value }))
										}
									/>
								</Field>
								<Field label="Description">
									<textarea
										className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500/50 transition-colors resize-none h-24"
										value={state.description}
										onChange={(e) =>
											setState((s) => ({
												...s,
												description: e.target.value,
											}))
										}
									/>
								</Field>
								<div className="grid grid-cols-2 gap-4">
									<Field label="Badge">
										<input
											className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500/50 transition-colors"
											value={state.badge}
											onChange={(e) =>
												setState((s) => ({ ...s, badge: e.target.value }))
											}
										/>
									</Field>
									<Field label="Category">
										<input
											className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500/50 transition-colors"
											value={state.category}
											onChange={(e) =>
												setState((s) => ({
													...s,
													category: e.target.value,
												}))
											}
										/>
									</Field>
								</div>
							</div>
						</ControlGroup>

						<ControlGroup
							icon={<Palette className="w-4 h-4" />}
							label="Visual Styling"
						>
							<div className="space-y-6">
								<Field label="Theme Color">
									<div className="flex flex-wrap gap-2 pt-1">
										{(Object.keys(THEMES) as ThemeName[]).map((t) => (
											<button
												key={t}
												type="button"
												onClick={() => setState((s) => ({ ...s, theme: t }))}
												className={`w-10 h-10 rounded-xl border-2 transition-all duration-300 relative group/theme ${state.theme === t ? "border-white scale-110 shadow-xl z-10" : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"}`}
												style={{ backgroundColor: THEMES[t].primary }}
											>
												{state.theme === t && (
													<div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg">
														<div
															className="w-2 h-2 rounded-full"
															style={{ backgroundColor: THEMES[t].primary }}
														/>
													</div>
												)}
											</button>
										))}
									</div>
								</Field>

								<div className="grid grid-cols-2 gap-6">
									<Field label="Color Scheme">
										<div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
											<button
												type="button"
												onClick={() =>
													setState((s) => ({ ...s, colorScheme: "dark" }))
												}
												className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${state.colorScheme === "dark" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
											>
												Dark
											</button>
											<button
												type="button"
												onClick={() =>
													setState((s) => ({ ...s, colorScheme: "light" }))
												}
												className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${state.colorScheme === "light" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
											>
												Light
											</button>
										</div>
									</Field>

									<Field label="Grid Pattern">
										<button
											type="button"
											onClick={() =>
												setState((s) => ({ ...s, showGrid: !s.showGrid }))
											}
											className={`w-full py-2.5 rounded-xl border text-xs font-medium transition-all ${state.showGrid ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-400" : "bg-white/5 border-white/10 text-zinc-500 hover:border-white/20"}`}
										>
											{state.showGrid ? "Enabled" : "Disabled"}
										</button>
									</Field>
								</div>

								<Field
									label={
										<div className="flex items-center justify-between w-full">
											<span>Title Size</span>
											<span className="text-indigo-400 font-mono">
												{state.fontSizeTitle}px
											</span>
										</div>
									}
								>
									<div className="flex items-center gap-4">
										<input
											type="range"
											min="32"
											max="96"
											className="flex-1 accent-indigo-500 bg-white/10 rounded-lg h-1.5 appearance-none cursor-pointer"
											value={state.fontSizeTitle}
											onChange={(e) =>
												setState((s) => ({
													...s,
													fontSizeTitle: Number.parseInt(e.target.value, 10),
												}))
											}
										/>
										<input
											type="number"
											min="32"
											max="96"
											className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono outline-none focus:border-indigo-500/50 transition-colors text-center"
											value={state.fontSizeTitle}
											onChange={(e) =>
												setState((s) => ({
													...s,
													fontSizeTitle:
														Number.parseInt(e.target.value, 10) || 32,
												}))
											}
										/>
									</div>
								</Field>

								<Field
									label={
										<div className="flex items-center justify-between w-full">
											<span>Description Size</span>
											<span className="text-indigo-400 font-mono">
												{state.fontSizeDescription}px
											</span>
										</div>
									}
								>
									<div className="flex items-center gap-4">
										<input
											type="range"
											min="12"
											max="35"
											className="flex-1 accent-indigo-500 bg-white/10 rounded-lg h-1.5 appearance-none cursor-pointer"
											value={state.fontSizeDescription}
											onChange={(e) =>
												setState((s) => ({
													...s,
													fontSizeDescription: Number.parseInt(
														e.target.value,
														10,
													),
												}))
											}
										/>
										<input
											type="number"
											min="12"
											max="48"
											className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono outline-none focus:border-indigo-500/50 transition-colors text-center"
											value={state.fontSizeDescription}
											onChange={(e) =>
												setState((s) => ({
													...s,
													fontSizeDescription:
														Number.parseInt(e.target.value, 10) || 12,
												}))
											}
										/>
									</div>
								</Field>

								<Field
									label={
										<div className="flex items-center justify-between w-full">
											<span>Badge Size</span>
											<span className="text-indigo-400 font-mono">
												{state.fontSizeBadge}px
											</span>
										</div>
									}
								>
									<div className="flex items-center gap-4">
										<input
											type="range"
											min="10"
											max="24"
											className="flex-1 accent-indigo-500 bg-white/10 rounded-lg h-1.5 appearance-none cursor-pointer"
											value={state.fontSizeBadge}
											onChange={(e) =>
												setState((s) => ({
													...s,
													fontSizeBadge: Number.parseInt(e.target.value, 10),
												}))
											}
										/>
										<input
											type="number"
											min="10"
											max="24"
											className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono outline-none focus:border-indigo-500/50 transition-colors text-center"
											value={state.fontSizeBadge}
											onChange={(e) =>
												setState((s) => ({
													...s,
													fontSizeBadge:
														Number.parseInt(e.target.value, 10) || 10,
												}))
											}
										/>
									</div>
								</Field>

								<Field
									label={
										<div className="flex items-center justify-between w-full">
											<span>Category Size</span>
											<span className="text-indigo-400 font-mono">
												{state.fontSizeCategory}px
											</span>
										</div>
									}
								>
									<div className="flex items-center gap-4">
										<input
											type="range"
											min="8"
											max="20"
											className="flex-1 accent-indigo-500 bg-white/10 rounded-lg h-1.5 appearance-none cursor-pointer"
											value={state.fontSizeCategory}
											onChange={(e) =>
												setState((s) => ({
													...s,
													fontSizeCategory: Number.parseInt(e.target.value, 10),
												}))
											}
										/>
										<input
											type="number"
											min="8"
											max="20"
											className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono outline-none focus:border-indigo-500/50 transition-colors text-center"
											value={state.fontSizeCategory}
											onChange={(e) =>
												setState((s) => ({
													...s,
													fontSizeCategory:
														Number.parseInt(e.target.value, 10) || 8,
												}))
											}
										/>
									</div>
								</Field>
							</div>
						</ControlGroup>

						<ControlGroup icon={<Type className="w-4 h-4" />} label="Metadata">
							<Field label="Author / Site">
								<input
									className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500/50 transition-colors"
									value={state.author}
									onChange={(e) =>
										setState((s) => ({ ...s, author: e.target.value }))
									}
								/>
							</Field>
						</ControlGroup>
					</div>
				</div>

				<div className="pt-8 border-t border-white/5">
					<div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-3">
						<div className="flex items-center gap-2 text-indigo-400">
							<Zap className="w-4 h-4 fill-indigo-400/20" />
							<span className="text-[10px] font-mono font-bold uppercase tracking-wider">
								Engine Status
							</span>
						</div>
						<p className="text-xs text-zinc-500 leading-relaxed">
							The playground uses the <strong>@ogxjs/react</strong> adapter.
							Changes are rendered directly to SVG using the Satori Wasm engine
							in your browser.
						</p>
					</div>
				</div>
			</div>
		</aside>
	);
}
