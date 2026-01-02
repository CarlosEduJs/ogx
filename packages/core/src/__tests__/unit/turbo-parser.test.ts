/**
 * @ogxjs/core - Turbo Parser Tests
 * Tests for the v0.2.0 high-performance parser
 */

import { describe, expect, it } from "vitest";
import { getStaticClass, isStaticClass } from "../../tailwind/lookup-tables";
import {
	clearAllCaches,
	getCacheStats,
	parseTailwind,
} from "../../tailwind/parser-v2";
import { findPrefixHandler } from "../../tailwind/prefix-handlers";

describe("Turbo Parser v0.2.0", () => {
	describe("parseTailwind", () => {
		it("deve parsear classes estáticas via lookup O(1)", () => {
			const result = parseTailwind("flex items-center justify-between");

			expect(result.display).toBe("flex");
			expect(result.alignItems).toBe("center");
			expect(result.justifyContent).toBe("space-between");
		});

		it("deve parsear classes com prefixo", () => {
			const result = parseTailwind("bg-blue-500 text-white p-4");

			expect(result.backgroundColor).toBe("#3b82f6");
			expect(result.color).toBe("#ffffff");
			expect(result.padding).toBe(16);
		});

		it("deve parsear arrays de classes", () => {
			const result = parseTailwind(["flex", "gap-4", "rounded-lg"]);

			expect(result.display).toBe("flex");
			expect(result.gap).toBe(16);
			expect(result.borderRadius).toBe(8);
		});

		it("deve suportar valores arbitrários", () => {
			const result = parseTailwind(
				"bg-[#ff0000] text-[24px] p-[20px] w-[300px]",
			);

			expect(result.backgroundColor).toBe("#ff0000");
			// Valores com unidades são mantidos como string
			expect(result.fontSize).toBe("24px");
			expect(result.padding).toBe("20px");
			expect(result.width).toBe("300px");
		});

		it("deve cachear resultados para strings repetidas", () => {
			clearAllCaches();

			// First call - cache miss
			const result1 = parseTailwind("flex items-center");

			// Second call - should return same result
			const result2 = parseTailwind("flex items-center");

			expect(result1).toEqual(result2);

			// Check that caches have entries
			const stats = getCacheStats();
			expect(stats.stringCacheSize).toBeGreaterThan(0);
		});

		it("deve ignorar classes vazias e undefined", () => {
			const result = parseTailwind("flex  items-center  ");

			expect(result.display).toBe("flex");
			expect(result.alignItems).toBe("center");
		});

		it("deve suportar gradientes", () => {
			const result = parseTailwind(
				"bg-gradient-to-r from-blue-500 to-purple-500",
			);

			expect(result.backgroundImage).toContain("linear-gradient");
			expect(result.backgroundImage).toContain("#3b82f6");
			expect(result.backgroundImage).toContain("#a855f7");
		});
	});

	describe("Lookup Tables", () => {
		it("deve identificar classes estáticas", () => {
			expect(isStaticClass("flex")).toBe(true);
			expect(isStaticClass("hidden")).toBe(true);
			expect(isStaticClass("items-center")).toBe(true);
			expect(isStaticClass("bg-blue-500")).toBe(false); // tem prefixo
			expect(isStaticClass("custom-class")).toBe(false);
		});

		it("deve retornar estilos para classes estáticas", () => {
			expect(getStaticClass("flex")).toEqual({ display: "flex" });
			expect(getStaticClass("hidden")).toEqual({ display: "none" });
			expect(getStaticClass("items-center")).toEqual({ alignItems: "center" });
			expect(getStaticClass("unknown")).toBeUndefined();
		});
	});

	describe("Prefix Handlers", () => {
		it("deve encontrar handler para prefixos conhecidos", () => {
			expect(findPrefixHandler("bg-blue-500")).toBeDefined();
			expect(findPrefixHandler("text-white")).toBeDefined();
			expect(findPrefixHandler("p-4")).toBeDefined();
			expect(findPrefixHandler("m-auto")).toBeDefined();
			expect(findPrefixHandler("w-full")).toBeDefined();
		});

		it("deve retornar undefined para classes sem handler", () => {
			expect(findPrefixHandler("flex")).toBeUndefined(); // estática
			expect(findPrefixHandler("unknown-class")).toBeUndefined();
		});
	});

	describe("Cache Management", () => {
		it("deve limpar todos os caches", () => {
			// Populate cache
			parseTailwind("flex items-center p-4");

			// Clear
			clearAllCaches();

			// Check stats
			const stats = getCacheStats();
			expect(stats.classCache.size).toBe(0);
			expect(stats.stringCacheSize).toBe(0);
		});

		it("deve fornecer estatísticas de cache", () => {
			clearAllCaches();

			parseTailwind("flex");
			parseTailwind("flex"); // hit

			const stats = getCacheStats();
			expect(stats.classCache.size).toBeGreaterThan(0);
			expect(stats.stringCacheSize).toBeGreaterThan(0);
		});
	});
});
