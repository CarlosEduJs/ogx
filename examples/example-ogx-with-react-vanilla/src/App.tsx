import { useState, useEffect } from "react";
import { renderToSVG } from "@ogxjs/react/svg";
import { Stack, Row, H1, P, Badge, Span } from "@ogxjs/react";
import "./App.css";

function App() {
	const [title, setTitle] = useState("OGX React");
	const [description, setDescription] = useState(
		"Build OG images with React components and Tailwind CSS",
	);
	const [svg, setSvg] = useState<string>("");
	const [isRendering, setIsRendering] = useState(false);

	// OGX Layout
	const layout = (
		<Stack tw="w-[1200px] h-[630px] bg-zinc-950 p-24 justify-center items-start">
			<Row tw="items-center gap-3 mb-8">
				<Badge color="purple">REACT</Badge>
				<Span tw="text-zinc-500 font-mono text-sm tracking-widest uppercase">
					Open Graph
				</Span>
			</Row>

			<H1 tw="text-white text-7xl font-bold tracking-tight max-w-[900px]">
				{title}
			</H1>
			<P tw="mt-6 text-zinc-400 text-2xl max-w-[800px] font-light">
				{description}
			</P>

			<Stack tw="absolute bottom-24 left-24">
				<Span tw="text-white font-bold text-lg uppercase">OGX Engine</Span>
				<Span tw="text-zinc-500 text-sm mt-1">Rendered in browser</Span>
			</Stack>
		</Stack>
	);

	// Update preview on changes
	useEffect(() => {
		const updatePreview = async () => {
			setIsRendering(true);
			try {
				const svgString = await renderToSVG(layout, {
					width: 1200,
					height: 630,
				});
				setSvg(svgString);
			} catch (err) {
				console.error("Render failed:", err);
			} finally {
				setIsRendering(false);
			}
		};

		const timer = setTimeout(updatePreview, 300);
		return () => clearTimeout(timer);
	}, [title, description]);

	const downloadSVG = () => {
		const blob = new Blob([svg], { type: "image/svg+xml" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `ogx-${Date.now()}.svg`;
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className="app">
			<header className="header">
				<div className="header-content">
					<h1 className="header-title">
						OGX <span className="highlight">React</span>
					</h1>
					<p className="header-subtitle">
						Browser-safe OG image rendering with JSX
					</p>
				</div>
			</header>

			<main className="main">
				<div className="sidebar">
					<div className="section">
						<label className="label">Title</label>
						<input
							className="input"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter title"
						/>
					</div>

					<div className="section">
						<label className="label">Description</label>
						<textarea
							className="textarea"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Enter description"
							rows={3}
						/>
					</div>

					<div className="info-box">
						<h3 className="info-title">Features</h3>
						<ul className="info-list">
							<li>
								<strong>JSX Rendering:</strong> Use React components directly
							</li>
							<li>
								<strong>Tailwind Support:</strong> Full utility class support
							</li>
							<li>
								<strong>Browser Safe:</strong> No server required
							</li>
						</ul>
					</div>
				</div>

				<div className="preview">
					<div className="preview-header">
						<span className="preview-label">Live Preview</span>
						<div className="preview-actions">
							<span className="preview-size">1200 × 630</span>
							{isRendering && <div className="spinner" />}
						</div>
					</div>

					<div className="preview-canvas">
						<div dangerouslySetInnerHTML={{ __html: svg }} />
					</div>

					<button onClick={downloadSVG} className="download-btn">
						Download SVG
					</button>
				</div>
			</main>
		</div>
	);
}

export default App;
