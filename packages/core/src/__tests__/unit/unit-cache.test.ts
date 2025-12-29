import { describe, expect, it } from "vitest";
import { snapshotCache } from "../../cache";

describe("Snapshot Cache", () => {
  it("deve gerar hashes consistentes para o mesmo config", () => {
    const config1 = { preset: "docs", title: "Test" };
    const config2 = { preset: "docs", title: "Test" };

    expect(snapshotCache.getHash(config1)).toBe(snapshotCache.getHash(config2));
  });

  it("deve gerar hashes diferentes para configs diferentes", () => {
    const config1 = { preset: "docs", title: "Test A" };
    const config2 = { preset: "docs", title: "Test B" };

    expect(snapshotCache.getHash(config1)).not.toBe(
      snapshotCache.getHash(config2),
    );
  });

  it("deve armazenar e recuperar dados do cache", () => {
    const data = new Uint8Array([1, 2, 3]);
    const hash = "test-hash";

    snapshotCache.set(hash, data);
    expect(snapshotCache.get(hash)).toBe(data);
  });

  it("deve ignorar o cache se cache: false for passado no config (via hashing)", () => {
    // Isso é testado no ogx.ts, mas se pode verificar que strings de format diferentes geram hashes diferentes
    const h1 = snapshotCache.getHash({ preset: "docs", format: "png" });
    const h2 = snapshotCache.getHash({ preset: "docs", format: "svg" });
    expect(h1).not.toBe(h2);
  });
});
