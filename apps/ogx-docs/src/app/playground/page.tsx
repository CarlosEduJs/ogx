"use client";

import { useState, useEffect, useMemo } from "react";
import { Stack, Row, Absolute, H1, P, Badge, Span } from "@ogxjs/react";
import { renderToSVG } from "@ogxjs/react/svg";

import { THEMES, INITIAL_STATE } from "./constants";
import type { PlaygroundState } from "./types";
import {
	PlaygroundHeader,
	PlaygroundSidebar,
	PlaygroundCanvas,
} from "./_components";

export default function PlaygroundPage() {
	const [state, setState] = useState<PlaygroundState>(() => {
		// Initial state from URL if available
		if (typeof window !== "undefined") {
			const params = new URLSearchParams(window.location.search);
			const data = params.get("data");
			if (data) {
				try {
					return JSON.parse(atob(data));
				} catch (e) {
					console.error("Failed to parse state from URL", e);
				}
			}
		}
		return INITIAL_STATE;
	});

	const [svg, setSvg] = useState<string>("");
	const [isRendering, setIsRendering] = useState(false);
	const [activeTab, setActiveTab] = useState<"edit" | "code">("edit");
	const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
	const [copied, setCopied] = useState(false);
	const [shared, setShared] = useState(false);

	// --- Theme Helper ---
	const currentTheme = THEMES[state.theme];

	// --- Functions ---
	const sharePlayground = () => {
		const data = btoa(JSON.stringify(state));
		const url = `${window.location.origin}${window.location.pathname}?data=${data}`;
		navigator.clipboard.writeText(url);
		setShared(true);
		setTimeout(() => setShared(false), 2000);
	};

	const downloadSVG = () => {
		const blob = new Blob([svg], { type: "image/svg+xml" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `ogx-playground-${state.theme}-${Date.now()}.svg`;
		a.click();
		URL.revokeObjectURL(url);
	};

	// --- OGX Layout ---
	const layout = useMemo(() => {
		const isMobile = viewport === "mobile";
		const width = isMobile ? 400 : 1200;
		const height = isMobile ? 500 : 630;
		const p = isMobile ? "p-12" : "p-24";

		// Scale font sizes for mobile
		const titleSize = isMobile
			? state.fontSizeTitle * 0.6
			: state.fontSizeTitle;
		const descSize = isMobile
			? state.fontSizeDescription * 0.8
			: state.fontSizeDescription;
		const badgeSize = isMobile
			? state.fontSizeBadge * 0.9
			: state.fontSizeBadge;
		const categorySize = isMobile
			? state.fontSizeCategory * 0.9
			: state.fontSizeCategory;

		return (
			<Stack
				tw={`w-[${width}px] h-[${height}px] ${p} justify-center items-start ${state.colorScheme === "dark" ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"}`}
			>
				{state.showGrid && (
					<Absolute tw="inset-0 opacity-10">
						<div tw={`w-full h-full bg-grid-${state.theme}-500`} />
					</Absolute>
				)}

				<Row tw="items-center gap-2 mb-8">
					<Badge color={currentTheme.badge}>
						<span style={{ fontSize: badgeSize }}>{state.badge}</span>
					</Badge>
					<Span
						tw="text-zinc-500 font-mono tracking-widest uppercase"
						style={{ fontSize: categorySize }}
					>
						{state.category}
					</Span>
				</Row>

				<H1
					tw={`max-w-[1000px] font-black tracking-tighter leading-[0.9]`}
					style={{ fontSize: titleSize, color: currentTheme.primary }}
				>
					{state.title}
				</H1>

				<P
					tw="mt-6 text-zinc-400 max-w-[800px] font-light leading-relaxed"
					style={{ fontSize: descSize }}
				>
					{state.description}
				</P>

				<Stack
					tw={`absolute ${isMobile ? "bottom-12 left-12" : "bottom-20 left-24"}`}
				>
					<Stack>
						<Span
							tw={`text-white font-bold ${isMobile ? "text-sm" : "text-lg"} leading-none uppercase`}
						>
							{state.author}
						</Span>
						{!isMobile && (
							<Span tw="text-zinc-500 text-sm mt-1">
								Rendered with OGX Engine
							</Span>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}, [state, currentTheme, viewport]);

	// --- Render Preview ---
	useEffect(() => {
		let active = true;
		const render = async () => {
			setIsRendering(true);
			try {
				const svgContent = await renderToSVG(layout, {
					width: viewport === "mobile" ? 400 : 1200,
					height: viewport === "mobile" ? 500 : 630,
				});

				if (active) setSvg(svgContent);
			} catch (err) {
				console.error("Render failed:", err);
			} finally {
				if (active) setIsRendering(false);
			}
		};

		const timer = setTimeout(render, 300);
		return () => {
			active = false;
			clearTimeout(timer);
		};
	}, [layout, viewport]);

	// --- Generated Code Snippet ---
	const generatedCode = `import { Stack, Row, H1, P, Badge, Span } from "@ogxjs/react";

export function SocialCard() {
  return (
    <Stack tw="w-[1200px] h-[630px] p-24 ${state.colorScheme === "dark" ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"}">
      <Row tw="items-center gap-2 mb-8">
        <Badge tw="text-[${state.fontSizeBadge}px]" color="${currentTheme.badge}">${state.badge}</Badge>
        <Span tw="font-mono text-[${state.fontSizeCategory}px] tracking-widest uppercase text-zinc-500">
          ${state.category}
        </Span>
      </Row>

      <H1 tw="font-black tracking-tighter text-[${state.fontSizeTitle}px] leading-[0.9] text-[${currentTheme.primary}]">
        ${state.title}
      </H1>

      <P tw="mt-6 text-[${state.fontSizeDescription}px] font-light text-zinc-400">
        ${state.description}
      </P>
    </Stack>
  );
}`;

	const copyCode = () => {
		navigator.clipboard.writeText(generatedCode);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="min-h-screen bg-zinc-950 text-white flex flex-col antialiased selection:bg-indigo-500/30">
			<PlaygroundHeader
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				shared={shared}
				onShare={sharePlayground}
			/>

			<div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
				<PlaygroundSidebar state={state} setState={setState} />

				<PlaygroundCanvas
					activeTab={activeTab}
					viewport={viewport}
					setViewport={setViewport}
					isRendering={isRendering}
					svg={svg}
					generatedCode={generatedCode}
					copied={copied}
					onCopy={copyCode}
					onDownload={downloadSVG}
				/>
			</div>

			<style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .preserve-3d {
            transform-style: preserve-3d;
        }
      `}</style>
		</div>
	);
}
