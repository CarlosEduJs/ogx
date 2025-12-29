/**
 * Simple in-memory cache for generated images
 */
export class SnapshotCache {
	private static instance: SnapshotCache;
	private cache = new Map<string, { data: any; timestamp: number }>();
	private ttl: number = 0; // Cache TTL in milliseconds, 0 means no expiration

	private constructor() {}

	static getInstance(): SnapshotCache {
		if (!SnapshotCache.instance) {
			SnapshotCache.instance = new SnapshotCache();
		}
		return SnapshotCache.instance;
	}

	/**
	 * Set cache TTL
	 */
	setTTL(milliseconds: number): void {
		this.ttl = milliseconds;
	}

	/**
	 * Calculate a hash for a configuration object
	 */
	getHash(config: any): string {
		// Stringify config
		const str = JSON.stringify(config, (key, value) => {
			if (typeof value === "function") return undefined;
			if (key === "debug") return undefined;
			return value;
		});

		// Basic hash for browser/fallback
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash |= 0; // Convert to 32bit integer
		}
		return `hash-${hash}`;
	}

	/**
	 * Get an item from cache
	 */
	get(hash: string): any | null {
		const item = this.cache.get(hash);
		if (!item) return null;

		if (this.ttl > 0 && Date.now() - item.timestamp > this.ttl) {
			this.cache.delete(hash);
			return null;
		}

		return item.data;
	}

	/**
	 * Store an item in cache
	 */
	set(hash: string, data: any): void {
		this.cache.set(hash, {
			data,
			timestamp: Date.now(),
		});
	}

	/**
	 * Clear the cache
	 */
	clear(): void {
		this.cache.clear();
	}
}

export const snapshotCache = SnapshotCache.getInstance();
