import { describe, expect, it } from "vitest";
import {
	absolute,
	badge,
	card,
	div,
	grid,
	h,
	h1,
	p,
	row,
	spacer,
	span,
	stack,
} from "../../builder";

describe("Builder API", () => {
	describe("Primitivos de baixo nível", () => {
		it("deve criar um elemento básico com h()", () => {
			const el = h("div", { tw: "bg-red-500", children: "Hello" });
			expect(el.type).toBe("div");
			expect(el.props.tw).toBe("bg-red-500");
			expect(el.props.children).toBe("Hello");
		});

		it("deve criar uma div com display flex por padrão", () => {
			const el = div("bg-blue-500", "Content");
			expect(el.type).toBe("div");
			expect(el.props.tw).toContain("flex");
			expect(el.props.children).toBe("Content");
		});

		it("deve criar um span", () => {
			const el = span("text-sm", "Text");
			expect(el.type).toBe("span");
			expect(el.props.tw).toEqual(["text-sm"]);
			expect(el.props.children).toBe("Text");
		});
	});

	describe("Layout Helpers", () => {
		it("stack() deve aplicar flex-col", () => {
			const el = stack("gap-4", []);
			expect(el.props.tw).toContain("flex");
			expect(el.props.tw).toContain("flex-col");
			expect(el.props.tw).toContain("gap-4");
		});

		it("row() deve aplicar flex-row", () => {
			const el = row("items-center", []);
			expect(el.props.tw).toContain("flex");
			expect(el.props.tw).toContain("flex-row");
			expect(el.props.tw).toContain("items-center");
		});

		it("absolute() deve aplicar absolute e inset-0", () => {
			const el = absolute("bg-black/50");
			expect(el.props.tw).toContain("absolute");
			expect(el.props.tw).toContain("inset-0");
		});

		it("grid() deve aplicar flex-wrap", () => {
			const el = grid("gap-2", []);
			expect(el.props.tw).toContain("flex-wrap");
		});

		it("spacer() deve crescer (flex-1)", () => {
			const el = spacer();
			expect(el.props.tw).toContain("flex-1");
		});
	});

	describe("Semantic Typography", () => {
		it("h1() deve ter estilos de título padrão", () => {
			const el = h1("Titulo");
			expect(el.props.tw).toContain("text-6xl");
			expect(el.props.tw).toContain("font-bold");
		});

		it("p() deve ter estilos de parágrafo padrão", () => {
			const el = p("Texto");
			expect(el.props.tw).toContain("text-lg");
			expect(el.props.tw).toContain("text-slate-400");
		});
	});

	describe("Configuráveis (High-level)", () => {
		it("badge() deve aplicar bordas e padding", () => {
			const el = badge("Primary", "blue");
			expect(el.props.tw).toContain("rounded-full");
			expect(el.props.tw).toContain("px-3");
		});

		it("card() deve aplicar sombras e cantos arredondados", () => {
			const el = card(["bg-white"], "Card Content");
			expect(el.props.tw).toContain("rounded-2xl");
			expect(el.props.tw).toContain("shadow-lg");
		});
	});
});
