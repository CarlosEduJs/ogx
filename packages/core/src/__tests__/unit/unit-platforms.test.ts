import { describe, expect, it } from "vitest";
import { getPlatformDimensions } from "../../targets";

describe("Platform Resolution", () => {
	it("deve retornar dimensões corretas para insta (square)", () => {
		const dims = getPlatformDimensions("instagram");
		expect(dims).toEqual({ width: 1080, height: 1080 });
	});

	it("deve retornar dimensões corretas para pinterest (vertical)", () => {
		const dims = getPlatformDimensions("pinterest");
		expect(dims).toEqual({ width: 1000, height: 1500 });
	});

	it("deve retornar meta (padrao) para plataformas desconhecidas", () => {
		// @ts-expect-error
		const dims = getPlatformDimensions("unknown");
		expect(dims).toEqual({ width: 1200, height: 630 });
	});

	it("deve ter dimensões corretas para youtube", () => {
		const dims = getPlatformDimensions("youtube");
		expect(dims).toEqual({ width: 1280, height: 720 });
	});
});
