/**
 * @ogxjs/core - Tailwind Class Cache
 * Per-class caching for maximum performance
 *
 * @description
 * Caches individual parsed classes instead of full class strings.
 * This allows reuse across different elements with overlapping classes.
 *
 * @example
 * Element A: "flex bg-blue-500 p-4"
 * Element B: "flex bg-red-500 p-4"
 * → "flex" and "p-4" are parsed once, reused for both
 *
 * @performance
 * - Eliminates redundant parsing for common classes
 * - Reduces memory by sharing parsed results
 * - O(1) lookup per class
 *
 * @version 0.2.0 "Turbo"
 */

import type { CSSProperties } from "../css";

// CONFIGURATION

/**
 * Maximum cache size to prevent memory leaks
 * ~5000 classes × ~200 bytes avg = ~1MB max
 */
const MAX_CACHE_SIZE = 5000;

/**
 * Classes to never cache (dynamic/theme-dependent)
 */
const UNCACHEABLE_PATTERNS = [
	/^dark:/, // Dark mode variants (theme-dependent)
];

// CLASS CACHE

/**
 * Cache for individual parsed Tailwind classes
 * Key: class name (e.g., "bg-blue-500")
 * Value: parsed CSS properties
 *
 * @performance v0.2.0 Turbo optimizations:
 * - Direct reference return (no spread copy) - trust consumers
 * - No Object.freeze - avoid expensive operation
 * - Lazy eviction check
 */
class TailwindClassCache {
	private cache = new Map<string, CSSProperties>();
	private hits = 0;
	private misses = 0;

	/**
	 * Get cached CSS properties for a class
	 * @returns Cached properties or undefined if not cached
	 *
	 * @performance Returns direct reference - DO NOT MUTATE
	 */
	get(cls: string): CSSProperties | undefined {
		const cached = this.cache.get(cls);
		if (cached !== undefined) {
			this.hits++;
			return cached; // Direct reference - no copy overhead
		}
		this.misses++;
		return undefined;
	}

	/**
	 * Cache CSS properties for a class
	 * @param cls - Tailwind class name
	 * @param props - Parsed CSS properties (will be stored directly)
	 */
	set(cls: string, props: CSSProperties): void {
		// Don't cache theme-dependent classes
		if (this.isUncacheable(cls)) return;

		// Evict oldest entries if cache is full (lazy check)
		if (this.cache.size >= MAX_CACHE_SIZE) {
			this.evictOldest();
		}

		// Store directly - no copy, no freeze
		this.cache.set(cls, props);
	}

	/**
	 * Check if a class has cached properties
	 */
	has(cls: string): boolean {
		return this.cache.has(cls);
	}

	/**
	 * Clear the entire cache
	 */
	clear(): void {
		this.cache.clear();
		this.hits = 0;
		this.misses = 0;
	}

	/**
	 * Get cache statistics
	 */
	getStats(): CacheStats {
		const total = this.hits + this.misses;
		return {
			size: this.cache.size,
			maxSize: MAX_CACHE_SIZE,
			hits: this.hits,
			misses: this.misses,
			hitRate: total > 0 ? this.hits / total : 0,
		};
	}

	/**
	 * Check if a class should not be cached
	 */
	private isUncacheable(cls: string): boolean {
		return UNCACHEABLE_PATTERNS.some((pattern) => pattern.test(cls));
	}

	/**
	 * Evict oldest entries (FIFO strategy)
	 * Removes 10% of cache to avoid frequent evictions
	 */
	private evictOldest(): void {
		const toRemove = Math.ceil(MAX_CACHE_SIZE * 0.1);
		const iterator = this.cache.keys();

		for (let i = 0; i < toRemove; i++) {
			const { value, done } = iterator.next();
			if (done) break;
			this.cache.delete(value);
		}
	}
}

// FULL STRING CACHE

/**
 * Cache for full class strings (entire tw prop)
 * Useful when the same exact class string is used multiple times
 *
 * Key: "flex bg-blue-500 p-4"
 * Value: merged CSS properties
 *
 * @performance v0.2.0 Turbo optimizations:
 * - Direct reference return (no spread copy)
 * - No Object.freeze
 * - Efficient LRU-like eviction
 */
class TailwindStringCache {
	private cache = new Map<string, CSSProperties>();
	private maxSize = 1000;

	/**
	 * Get cached properties for a full class string
	 * @performance Returns direct reference - DO NOT MUTATE
	 */
	get(key: string): CSSProperties | undefined {
		return this.cache.get(key);
	}

	/**
	 * Cache properties for a full class string
	 */
	set(key: string, props: CSSProperties): void {
		if (this.cache.size >= this.maxSize) {
			// Simple eviction: delete oldest entries (first 20%)
			const toRemove = Math.ceil(this.maxSize * 0.2);
			const iterator = this.cache.keys();
			for (let i = 0; i < toRemove; i++) {
				const { value, done } = iterator.next();
				if (done) break;
				this.cache.delete(value);
			}
		}
		// Store directly - no copy, no freeze
		this.cache.set(key, props);
	}

	/**
	 * Check if a string has cached properties
	 */
	has(key: string): boolean {
		return this.cache.has(key);
	}

	/**
	 * Clear the cache
	 */
	clear(): void {
		this.cache.clear();
	}

	/**
	 * Get cache size
	 */
	get size(): number {
		return this.cache.size;
	}
}

// TYPES

export interface CacheStats {
	/** Current number of cached classes */
	size: number;
	/** Maximum cache size */
	maxSize: number;
	/** Number of cache hits */
	hits: number;
	/** Number of cache misses */
	misses: number;
	/** Hit rate (0-1) */
	hitRate: number;
}

// EXPORTS

/**
 * Singleton instance for class-level caching
 */
export const classCache = new TailwindClassCache();

/**
 * Singleton instance for full string caching
 */
export const stringCache = new TailwindStringCache();

/**
 * Clear all Tailwind caches
 * Useful for testing or when theme changes
 */
export function clearAllCaches(): void {
	classCache.clear();
	stringCache.clear();
}

/**
 * Get combined cache statistics
 */
export function getCacheStats(): {
	classCache: CacheStats;
	stringCacheSize: number;
} {
	return {
		classCache: classCache.getStats(),
		stringCacheSize: stringCache.size,
	};
}
