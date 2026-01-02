/**
 * @ogxjs/core - Snapshot Cache v2
 * High-performance image cache with LRU eviction
 *
 * @description
 * Refactored cache system for v0.2.0 "Turbo":
 * - Uses fast sync hash (FNV-1a/xxHash) instead of SHA-256
 * - LRU eviction instead of simple Map
 * - Optional TTL support
 * - Memory bounded
 *
 * @version 0.2.0 "Turbo"
 */

import { hashObject } from "./hash";
import { LRUCache, type LRUCacheStats } from "./lru";

// TYPES

export interface SnapshotCacheOptions {
	/** Maximum number of cached images (default: 500) */
	maxSize?: number;
	/** Time-to-live in milliseconds (default: 0 = no expiration) */
	ttl?: number;
}

export interface SnapshotCacheStats extends LRUCacheStats {
	/** Memory estimate in bytes */
	memoryEstimate: number;
}

// SNAPSHOT CACHE CLASS

/**
 * Cache for generated OG images
 *
 * Uses LRU eviction to bound memory usage.
 * Keys are generated from config objects using fast hash.
 *
 * @example
 * ```ts
 * const cache = new SnapshotCacheV2({ maxSize: 100, ttl: 60000 });
 *
 * const hash = cache.getHash(config);
 * if (!cache.has(hash)) {
 *   const image = await render(element);
 *   cache.set(hash, image);
 * }
 * return cache.get(hash);
 * ```
 */
export class SnapshotCacheV2 {
	private cache: LRUCache<string, Uint8Array | string>;
	private memoryEstimate = 0;

	constructor(options: SnapshotCacheOptions = {}) {
		this.cache = new LRUCache({
			maxSize: options.maxSize ?? 500,
			ttl: options.ttl ?? 0,
			onEvict: (_key, value) => {
				// Update memory estimate on eviction
				if (value instanceof Uint8Array) {
					this.memoryEstimate -= value.byteLength;
				} else if (typeof value === "string") {
					this.memoryEstimate -= value.length * 2; // UTF-16
				}
			},
		});
	}

	/**
	 * Generate a hash key for a configuration object
	 * Uses fast sync hash (no await needed)
	 */
	getHash(config: unknown): string {
		return hashObject(config);
	}

	/**
	 * Get a cached image by hash
	 */
	get(hash: string): Uint8Array | string | undefined {
		return this.cache.get(hash);
	}

	/**
	 * Check if a hash exists in cache
	 */
	has(hash: string): boolean {
		return this.cache.has(hash);
	}

	/**
	 * Store an image in cache
	 */
	set(hash: string, data: Uint8Array | string): void {
		// Update memory estimate
		if (data instanceof Uint8Array) {
			this.memoryEstimate += data.byteLength;
		} else if (typeof data === "string") {
			this.memoryEstimate += data.length * 2;
		}

		this.cache.set(hash, data);
	}

	/**
	 * Delete a cached image
	 */
	delete(hash: string): boolean {
		const existing = this.cache.get(hash);
		if (existing) {
			if (existing instanceof Uint8Array) {
				this.memoryEstimate -= existing.byteLength;
			} else if (typeof existing === "string") {
				this.memoryEstimate -= existing.length * 2;
			}
		}
		return this.cache.delete(hash);
	}

	/**
	 * Clear the entire cache
	 */
	clear(): void {
		this.cache.clear();
		this.memoryEstimate = 0;
	}

	/**
	 * Get cache size
	 */
	get size(): number {
		return this.cache.size;
	}

	/**
	 * Get cache statistics
	 */
	get stats(): SnapshotCacheStats {
		return {
			...this.cache.stats,
			memoryEstimate: this.memoryEstimate,
		};
	}

	/**
	 * Prune expired entries
	 */
	prune(): number {
		return this.cache.prune();
	}

	// ═══════════════════════════════════════════════════════════════════════
	// LEGACY COMPATIBILITY
	// ═══════════════════════════════════════════════════════════════════════

	/**
	 * @deprecated Use getHash() instead (sync, no await needed)
	 */
	async getHashAsync(config: unknown): Promise<string> {
		return this.getHash(config);
	}

	/**
	 * Set cache TTL
	 * Note: Only affects new entries, not existing ones
	 */
	setTTL(_milliseconds: number): void {
		console.warn(
			"SnapshotCacheV2.setTTL() is deprecated. Pass ttl in constructor options.",
		);
	}
}

// SINGLETON INSTANCE

/**
 * Global singleton cache instance
 * Configured with sensible defaults
 */
let _instance: SnapshotCacheV2 | null = null;

export function getSnapshotCache(): SnapshotCacheV2 {
	if (!_instance) {
		_instance = new SnapshotCacheV2({
			maxSize: 500,
			ttl: 0, // No expiration by default
		});
	}
	return _instance;
}

/**
 * Configure the global cache instance
 * Must be called before any cache operations
 */
export function configureSnapshotCache(options: SnapshotCacheOptions): void {
	_instance = new SnapshotCacheV2(options);
}

/**
 * Legacy export for backward compatibility
 */
export const snapshotCache = {
	get instance() {
		return getSnapshotCache();
	},

	getHash(config: unknown): string {
		return getSnapshotCache().getHash(config);
	},

	async getHashAsync(config: unknown): Promise<string> {
		return getSnapshotCache().getHash(config);
	},

	get(hash: string): Uint8Array | string | undefined {
		return getSnapshotCache().get(hash);
	},

	has(hash: string): boolean {
		return getSnapshotCache().has(hash);
	},

	set(hash: string, data: Uint8Array | string): void {
		getSnapshotCache().set(hash, data);
	},

	delete(hash: string): boolean {
		return getSnapshotCache().delete(hash);
	},

	clear(): void {
		getSnapshotCache().clear();
	},

	get size(): number {
		return getSnapshotCache().size;
	},

	get stats(): SnapshotCacheStats {
		return getSnapshotCache().stats;
	},

	setTTL(ms: number): void {
		getSnapshotCache().setTTL(ms);
	},
};
