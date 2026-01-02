/**
 * @ogxjs/core - Cache System Tests
 * Tests for LRU cache, hash functions, and snapshot cache
 */

import { beforeEach, describe, expect, it } from "vitest";
import { fastHash, fnv1a, fnv1aHex, hashObject } from "../../cache/hash";
import { LRUCache } from "../../cache/lru";
import { SnapshotCacheV2 } from "../../cache/snapshot";

describe("Cache System v0.2.0", () => {
	describe("Hash Functions", () => {
		it("fnv1a deve gerar hashes consistentes", () => {
			const hash1 = fnv1a("test string");
			const hash2 = fnv1a("test string");

			expect(hash1).toBe(hash2);
			expect(typeof hash1).toBe("number");
		});

		it("fnv1a deve gerar hashes diferentes para strings diferentes", () => {
			const hash1 = fnv1a("hello");
			const hash2 = fnv1a("world");

			expect(hash1).not.toBe(hash2);
		});

		it("fastHash deve retornar número", () => {
			const hash = fastHash("test");

			expect(typeof hash).toBe("number");
		});

		it("fnv1aHex deve retornar string hexadecimal", () => {
			const hash = fnv1aHex("test");

			expect(typeof hash).toBe("string");
			expect(hash.length).toBe(8); // 32-bit hex
		});

		it("hashObject deve serializar e hashear objetos", () => {
			const obj = { a: 1, b: "test", c: [1, 2, 3] };
			const hash1 = hashObject(obj);
			const hash2 = hashObject(obj);

			expect(hash1).toBe(hash2);
			expect(typeof hash1).toBe("string");
		});

		it("hashObject deve gerar hashes diferentes para objetos diferentes", () => {
			const hash1 = hashObject({ a: 1 });
			const hash2 = hashObject({ a: 2 });

			expect(hash1).not.toBe(hash2);
		});
	});

	describe("LRU Cache", () => {
		let cache: LRUCache<string, number>;

		beforeEach(() => {
			cache = new LRUCache<string, number>({ maxSize: 3 });
		});

		it("deve armazenar e recuperar valores", () => {
			cache.set("a", 1);
			cache.set("b", 2);

			expect(cache.get("a")).toBe(1);
			expect(cache.get("b")).toBe(2);
		});

		it("deve retornar undefined para chaves não existentes", () => {
			expect(cache.get("nonexistent")).toBeUndefined();
		});

		it("deve remover o item menos recentemente usado quando cheio", () => {
			cache.set("a", 1);
			cache.set("b", 2);
			cache.set("c", 3);
			cache.set("d", 4); // "a" should be evicted

			expect(cache.get("a")).toBeUndefined();
			expect(cache.get("b")).toBe(2);
			expect(cache.get("c")).toBe(3);
			expect(cache.get("d")).toBe(4);
		});

		it("deve atualizar posição no acesso (get)", () => {
			cache.set("a", 1);
			cache.set("b", 2);
			cache.set("c", 3);

			// Access "a" to make it recently used
			cache.get("a");

			// Add new item - "b" should be evicted (oldest)
			cache.set("d", 4);

			expect(cache.get("a")).toBe(1); // still there
			expect(cache.get("b")).toBeUndefined(); // evicted
			expect(cache.get("c")).toBe(3);
			expect(cache.get("d")).toBe(4);
		});

		it("deve verificar existência com has()", () => {
			cache.set("a", 1);

			expect(cache.has("a")).toBe(true);
			expect(cache.has("b")).toBe(false);
		});

		it("deve deletar itens", () => {
			cache.set("a", 1);
			cache.delete("a");

			expect(cache.get("a")).toBeUndefined();
			expect(cache.has("a")).toBe(false);
		});

		it("deve limpar todos os itens", () => {
			cache.set("a", 1);
			cache.set("b", 2);
			cache.clear();

			expect(cache.get("a")).toBeUndefined();
			expect(cache.get("b")).toBeUndefined();
			expect(cache.size).toBe(0);
		});

		it("deve fornecer estatísticas corretas", () => {
			cache.set("a", 1);
			cache.get("a"); // hit
			cache.get("b"); // miss

			const stats = cache.stats;
			expect(stats.size).toBe(1);
			expect(stats.maxSize).toBe(3);
			expect(stats.hits).toBe(1);
			expect(stats.misses).toBe(1);
		});

		it("deve calcular hit rate corretamente", () => {
			cache.set("a", 1);
			cache.get("a"); // hit
			cache.get("a"); // hit
			cache.get("b"); // miss
			cache.get("c"); // miss

			const stats = cache.stats;
			expect(stats.hitRate).toBe(0.5); // 2 hits / 4 total
		});
	});

	describe("Snapshot Cache V2", () => {
		let cache: SnapshotCacheV2;

		beforeEach(() => {
			cache = new SnapshotCacheV2({ maxSize: 10 });
		});

		it("deve gerar hash para config", () => {
			const config = { width: 1200, height: 630, title: "Test" };
			const hash = cache.getHash(config);

			expect(typeof hash).toBe("string");
			expect(hash.length).toBeGreaterThan(0);
		});

		it("deve armazenar e recuperar imagens por hash", () => {
			const config = { width: 1200, title: "Test" };
			const hash = cache.getHash(config);
			const imageData = new Uint8Array([1, 2, 3, 4]);

			cache.set(hash, imageData);

			expect(cache.get(hash)).toEqual(imageData);
		});

		it("deve verificar existência com has()", () => {
			const hash = cache.getHash({ test: true });

			expect(cache.has(hash)).toBe(false);

			cache.set(hash, "svg-data");

			expect(cache.has(hash)).toBe(true);
		});

		it("deve fornecer estatísticas", () => {
			const stats = cache.stats;

			expect(stats).toHaveProperty("size");
			expect(stats).toHaveProperty("maxSize");
			expect(stats).toHaveProperty("hits");
			expect(stats).toHaveProperty("misses");
			expect(stats).toHaveProperty("memoryEstimate");
		});

		it("deve limpar cache", () => {
			cache.set("test1", "data1");
			cache.set("test2", "data2");
			cache.clear();

			expect(cache.has("test1")).toBe(false);
			expect(cache.has("test2")).toBe(false);
		});
	});
});
