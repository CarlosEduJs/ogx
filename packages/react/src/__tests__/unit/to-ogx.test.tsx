import type { OGXElement } from "@ogxjs/core";
import { describe, expect, it } from "vitest";
import { H1, Stack } from "../../components";
import { toOGX } from "../../to-ogx";

describe("toOGX", () => {
	it("converte React element simples para OGX", () => {
		const ogx = toOGX(<div tw="bg-blue-500">Hello</div>) as OGXElement;

		expect(ogx).toMatchObject({
			type: "div",
			props: {
				tw: "bg-blue-500",
				children: "Hello",
			},
		});
	});

	it("converte componentes para OGX", () => {
		const ogx = toOGX(<Stack tw="w-full">Content</Stack>) as OGXElement;

		expect(ogx.type).toBe("div");
		expect(ogx.props.tw).toContain("flex-col");
		expect(ogx.props.tw).toContain("w-full");
	});

	it("converte componentes aninhados", () => {
		const ogx = toOGX(
			<Stack tw="w-full">
				<H1>Title</H1>
			</Stack>,
		);

		expect(ogx).toBeDefined();
		expect((ogx as OGXElement).type).toBe("div");
		expect((ogx as OGXElement).props.children).toBeDefined();
	});

	it("preserve props customizadas", () => {
		const ogx = toOGX(
			<Stack tw="p-10" style={{ backgroundColor: "#000" }}>
				Test
			</Stack>,
		) as OGXElement;

		expect(ogx.props.style).toBeDefined();
		expect(ogx.props.style!.backgroundColor).toBe("#000");
	});

	it("converte múltiplos children", () => {
		const ogx = toOGX(
			<Stack>
				<div>One</div>
				<div>Two</div>
				<div>Three</div>
			</Stack>,
		) as OGXElement;

		expect(Array.isArray(ogx.props.children)).toBe(true);
		expect(ogx.props.children).toHaveLength(3);
	});

	it("converte strings como children", () => {
		const ogx = toOGX(<H1>Simple Text</H1>) as OGXElement;

		expect(ogx.props.children).toBe("Simple Text");
	});
});
