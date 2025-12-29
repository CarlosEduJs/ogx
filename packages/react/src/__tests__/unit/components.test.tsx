import type { OGXElement } from "@ogxjs/core";
import { describe, expect, it } from "vitest";
import { Badge, Box, H1, H2, P, Row, Spacer, Stack } from "../../components";
import { toOGX } from "../../to-ogx";

describe("Components", () => {
	describe("Stack", () => {
		it("cria elemento com flex-col", () => {
			const ogx = toOGX(<Stack tw="bg-red-500">Hello</Stack>) as OGXElement;

			expect(ogx.type).toBe("div");
			expect(ogx.props.tw).toContain("flex-col");
			expect(ogx.props.tw).toContain("bg-red-500");
		});

		it("renderiza children corretamente", () => {
			const ogx = toOGX(
				<Stack>
					<div>Child 1</div>
					<div>Child 2</div>
				</Stack>,
			) as OGXElement;

			expect(Array.isArray(ogx.props.children)).toBe(true);
		});
	});

	describe("Row", () => {
		it("cria elemento com flex-row", () => {
			const ogx = toOGX(<Row tw="gap-4">Items</Row>) as OGXElement;

			expect(ogx.type).toBe("div");
			expect(ogx.props.tw).toContain("flex-row");
			expect(ogx.props.tw).toContain("gap-4");
		});
	});

	describe("Box", () => {
		it("cria div genérico", () => {
			const ogx = toOGX(<Box tw="p-4">Content</Box>) as OGXElement;

			expect(ogx.type).toBe("div");
			expect(ogx.props.tw).toBe("p-4");
		});
	});

	describe("H1", () => {
		it("aplica estilos de heading", () => {
			const ogx = toOGX(<H1>Title</H1>) as OGXElement;

			expect(ogx.props.tw).toContain("text-6xl");
			expect(ogx.props.tw).toContain("font-bold");
		});

		it("aceita props tw customizadas", () => {
			const ogx = toOGX(<H1 tw="text-white">Title</H1>) as OGXElement;

			expect(ogx.props.tw).toContain("text-white");
		});
	});

	describe("H2", () => {
		it("aplica estilos corretos", () => {
			const ogx = toOGX(<H2>Subtitle</H2>) as OGXElement;

			expect(ogx.props.tw).toContain("text-4xl");
			expect(ogx.props.tw).toContain("font-semibold");
		});
	});

	describe("P", () => {
		it("aplica estilos de parágrafo", () => {
			const ogx = toOGX(<P>Text</P>) as OGXElement;

			expect(ogx.props.tw).toContain("text-lg");
			expect(ogx.props.tw).toContain("text-slate-400");
		});
	});

	describe("Badge", () => {
		it("aplica cor padrão (blue)", () => {
			const ogx = toOGX(<Badge>New</Badge>) as OGXElement;

			expect(ogx.props.tw).toContain("blue");
		});

		it("aceita cores customizadas", () => {
			const ogx = toOGX(<Badge color="green">Active</Badge>) as OGXElement;

			expect(ogx.props.tw).toContain("green");
		});
	});

	describe("Spacer", () => {
		it("cria spacer com flex-1 padrão", () => {
			const ogx = toOGX(<Spacer />) as OGXElement;

			expect(ogx.props.tw).toContain("flex-1");
		});

		it("aceita tamanho customizado", () => {
			const ogx = toOGX(<Spacer size={20} />) as OGXElement;

			expect((ogx.props.style as any)?.flex).toBe("0 0 20px");
		});
	});
});
