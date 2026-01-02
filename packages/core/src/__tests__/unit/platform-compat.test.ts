/**
 * Platform Compatibility Tests
 * Test cross-platform compatibility (Node.js, Edge, Browser)
 */

import { describe, expect, it } from "vitest";

describe("Platform Compatibility", () => {
	describe("Base64 Encoding", () => {
		it("should handle Buffer when available (Node.js)", () => {
			const svg = "<svg>test</svg>";
			const base64 =
				typeof Buffer !== "undefined"
					? Buffer.from(svg).toString("base64")
					: btoa(svg);

			expect(base64).toBe("PHN2Zz50ZXN0PC9zdmc+");
		});

		it("should fallback to btoa when Buffer unavailable (Browser/Edge)", () => {
			const svg = "<svg>test</svg>";
			// Simulate browser environment
			const BufferBackup = globalThis.Buffer;
			// @ts-expect-error - Testing edge case
			globalThis.Buffer = undefined;

			const base64 =
				typeof Buffer !== "undefined"
					? Buffer.from(svg).toString("base64")
					: btoa(svg);

			expect(base64).toBe("PHN2Zz50ZXN0PC9zdmc+");

			// Restore Buffer
			globalThis.Buffer = BufferBackup;
		});
	});

	describe("Hash Functions - Bounds Safety", () => {
		it("should handle strings with non-multiple-of-4 length safely", async () => {
			const { fastHash } = await import("../../cache/hash.js");

			// Test various string lengths
			const strings = ["a", "ab", "abc", "abcd", "abcde", "abcdef", "abcdefg"];

			for (const str of strings) {
				const hash = fastHash(str);
				expect(hash).toBeTypeOf("number");
				expect(Number.isNaN(hash)).toBe(false);
				expect(hash).toBeGreaterThanOrEqual(0);
			}
		});

		it("should handle empty string", async () => {
			const { fastHash } = await import("../../cache/hash.js");
			const hash = fastHash("");
			expect(Number.isNaN(hash)).toBe(false);
		});

		it("should handle unicode characters", async () => {
			const { fastHash } = await import("../../cache/hash.js");
			const hash = fastHash("🚀 OGX Turbo 中文");
			expect(Number.isNaN(hash)).toBe(false);
		});
	});

	describe("LRU Cache - Type Safety", () => {
		it("should properly type onEvict callback", async () => {
			const { LRUCache } = await import("../../cache/lru.js");

			const evicted: Array<{ key: string; value: number }> = [];

			const cache = new LRUCache<string, number>({
				maxSize: 2,
				onEvict: (key, value) => {
					// These should be properly typed as string and number
					evicted.push({ key, value });
				},
			});

			cache.set("a", 1);
			cache.set("b", 2);
			cache.set("c", 3); // Should evict "a"

			expect(evicted).toEqual([{ key: "a", value: 1 }]);
		});

		it("should work with complex types", async () => {
			const { LRUCache } = await import("../../cache/lru.js");

			interface User {
				id: number;
				name: string;
			}

			const cache = new LRUCache<string, User>({
				maxSize: 10,
			});

			cache.set("user-1", { id: 1, name: "Alice" });
			const user = cache.get("user-1");

			expect(user).toEqual({ id: 1, name: "Alice" });
		});
	});
});
