import { describe, it, expect } from "vitest";
import { render } from "../../render-png";
import { renderToSVG } from "../../render-svg";
import { Stack, H1, P, Box } from "../../components";

describe("Render Integration", () => {
	describe("PNG Rendering", () => {
		it("renderiza componente simples como PNG", async () => {
			const image = await render(<H1>Test Title</H1>);

			expect(image).toBeInstanceOf(Uint8Array);
			expect(image.byteLength).toBeGreaterThan(0);
		});

		it("renderiza layout complexo", async () => {
			const Layout = () => (
				<Stack tw="w-full h-full bg-blue-500 p-20">
					<H1 tw="text-white">Title</H1>
					<P tw="text-white/80">Subtitle</P>
				</Stack>
			);

			const image = await render(<Layout />);
			expect(image).toBeInstanceOf(Uint8Array);
		});
	});

	describe("SVG Rendering", () => {
		it("renderiza componente simples como SVG", async () => {
			const svg = await renderToSVG(<H1>Test Title</H1>);

			expect(typeof svg).toBe("string");
			expect(svg).toContain("<svg");
		});

		it("renderiza Box como SVG", async () => {
			const svg = await renderToSVG(<Box tw="bg-red-500 p-10">Content</Box>);

			expect(typeof svg).toBe("string");
			expect(svg).toContain("<svg");
		});

		it("renderiza componentes aninhados", async () => {
			const svg = await renderToSVG(
				<Stack tw="w-full h-full">
					<H1>Heading</H1>
					<P>Paragraph text</P>
				</Stack>,
			);

			expect(svg).toContain("<svg");
		});
	});
});
