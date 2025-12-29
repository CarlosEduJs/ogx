import { describe, it, expect, vi, beforeEach } from "vitest";
import { ogxResponse } from "../../response";
import * as core from "@ogxjs/core";

// Mock do @ogxjs/core
vi.mock("@ogxjs/core", () => ({
	ogx: vi.fn(),
}));

describe("ogxResponse", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("Headers", () => {
		it("retorna Response com Content-Type correto", async () => {
			vi.mocked(core.ogx).mockResolvedValue(new Uint8Array([1, 2, 3]));

			const response = await ogxResponse({
				preset: "minimal",
				title: "Test",
			});

			expect(response.headers.get("Content-Type")).toBe("image/png");
		});

		it("retorna status 200 para sucesso", async () => {
			vi.mocked(core.ogx).mockResolvedValue(new Uint8Array([1, 2, 3]));

			const response = await ogxResponse({
				preset: "minimal",
				title: "Test",
			});

			expect(response.status).toBe(200);
		});
	});

	describe("Body", () => {
		it("retorna buffer válido", async () => {
			const mockBuffer = new Uint8Array([1, 2, 3, 4, 5]);
			vi.mocked(core.ogx).mockResolvedValue(mockBuffer);

			const response = await ogxResponse({
				preset: "minimal",
				title: "Test",
			});

			const buffer = await response.arrayBuffer();
			expect(buffer.byteLength).toBe(5);
		});

		it("retorna Uint8Array do ogx core", async () => {
			const mockImage = new Uint8Array([10, 20, 30]);
			vi.mocked(core.ogx).mockResolvedValue(mockImage);

			const response = await ogxResponse({
				preset: "blog",
				title: "My Post",
			});

			const arrayBuffer = await response.arrayBuffer();
			const uint8 = new Uint8Array(arrayBuffer);

			expect(uint8).toEqual(mockImage);
		});
	});

	describe("Config", () => {
		it("aceita config com preset", async () => {
			vi.mocked(core.ogx).mockResolvedValue(new Uint8Array([1]));

			await ogxResponse({
				preset: "docs",
				title: "Documentation",
				siteName: "My Docs",
			});

			expect(core.ogx).toHaveBeenCalledWith({
				preset: "docs",
				title: "Documentation",
				siteName: "My Docs",
			});
		});

		it("aceita Request como segundo argumento", async () => {
			vi.mocked(core.ogx).mockResolvedValue(new Uint8Array([1]));

			const request = new Request("http://localhost:3000/api/og");

			await ogxResponse(
				{
					preset: "minimal",
					title: "Test",
				},
				request,
			);

			expect(core.ogx).toHaveBeenCalled();
		});
	});
});
